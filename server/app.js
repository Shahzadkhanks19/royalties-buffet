import path from "node:path";
import express from "express";
import { databaseReady } from "./config/database.js";
import { env } from "./config/env.js";
import { adminAudit } from "./middleware/adminAudit.js";
import { errorHandler, notFoundHandler } from "./middleware/errors.js";
import { generalApiLimiter, loginLimiter, mutationLimiter, passwordResetLimiter, rejectSuspiciousKeys, securityHeaders } from "./middleware/security.js";
import adminAvailabilityRoutes from "./routes/adminAvailability.js";
import adminConfigRoutes from "./routes/adminConfig.js";
import adminInsightsRoutes from "./routes/adminInsights.js";
import adminRoutes from "./routes/admin.js";
import publicConfigRoutes from "./routes/publicConfig.js";
import publicRoutes from "./routes/public.js";

export function createApp({ serveClient = false } = {}) {
  const app = express();
  const distDirectory = path.resolve(process.cwd(), "dist");

  app.disable("x-powered-by");
  if (env.trustProxy) app.set("trust proxy", 1);
  app.use((req, res, next) => {
    if (req.vercelParsedBody) return next();
    return express.json({ limit: "256kb", strict: true })(req, res, next);
  });
  app.use((req, res, next) => {
    if (req.vercelParsedBody) return next();
    return express.urlencoded({ extended: false, limit: "64kb", parameterLimit: 100 })(req, res, next);
  });
  app.use(securityHeaders);

  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin && origin === env.clientOrigin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Vary", "Origin");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    }

    if (req.method === "OPTIONS") {
      if (!origin || origin !== env.clientOrigin) return res.sendStatus(403);
      return res.sendStatus(204);
    }
    next();
  });

  app.use("/api", generalApiLimiter);
  app.use("/api", rejectSuspiciousKeys);
  app.use("/api/admin/login", loginLimiter);
  app.use("/api/admin/forgot-password", passwordResetLimiter);
  app.use("/api/admin/reset-password", passwordResetLimiter);
  app.use("/api", (req, res, next) => {
    if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) return mutationLimiter(req, res, next);
    next();
  });

  app.get("/api/health", (_req, res) => {
    res.setHeader("Cache-Control", "no-store");
    res.json({
      ok: true,
      service: "royalties-buffet-api",
      environment: env.nodeEnv,
      database: databaseReady() ? "connected" : "disconnected",
      runtime: process.env.VERCEL ? "vercel" : "node",
      timestamp: new Date().toISOString(),
    });
  });

  app.use("/api/admin", adminAudit);

  // Public auth endpoints live inside adminRoutes, so it must be mounted before
  // routers that protect every route globally.
  app.use("/api/admin", adminRoutes);
  app.use("/api/admin", adminConfigRoutes);
  app.use("/api/admin", adminAvailabilityRoutes);
  app.use("/api/admin", adminInsightsRoutes);
  app.use("/api", publicConfigRoutes);
  app.use("/api", publicRoutes);

  if (serveClient) {
    app.use(express.static(distDirectory, {
      index: false,
      setHeaders(res, filePath) {
        if (filePath.includes(`${path.sep}assets${path.sep}`)) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else {
          res.setHeader("Cache-Control", "public, max-age=3600");
        }
      },
    }));

    app.use((req, res, next) => {
      if (req.method !== "GET" || req.path.startsWith("/api/") || !req.accepts("html")) return next();
      res.setHeader("Cache-Control", "no-cache");
      return res.sendFile(path.join(distDirectory, "index.html"));
    });
  }

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

const app = createApp();
export default app;
