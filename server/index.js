import express from "express";
import { connectDatabase, databaseReady } from "./config/database.js";
import { assertProductionEnv, env } from "./config/env.js";
import { adminAudit } from "./middleware/adminAudit.js";
import { errorHandler, notFoundHandler } from "./middleware/errors.js";
import { generalApiLimiter, loginLimiter, mutationLimiter, passwordResetLimiter, rejectSuspiciousKeys, securityHeaders } from "./middleware/security.js";
import adminAvailabilityRoutes from "./routes/adminAvailability.js";
import adminConfigRoutes from "./routes/adminConfig.js";
import adminInsightsRoutes from "./routes/adminInsights.js";
import adminRoutes from "./routes/admin.js";
import publicConfigRoutes from "./routes/publicConfig.js";
import publicRoutes from "./routes/public.js";
import { seedAdminAccount } from "./services/seedAdmin.js";
import { seedCmsContent } from "./services/seedCms.js";

const app = express();

app.disable("x-powered-by");
if (env.trustProxy) app.set("trust proxy", 1);
app.use(express.json({ limit: "256kb", strict: true }));
app.use(express.urlencoded({ extended: false, limit: "64kb", parameterLimit: 100 }));
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
    timestamp: new Date().toISOString(),
  });
});

// Observe successful protected admin mutations without storing sensitive body data.
app.use("/api/admin", adminAudit);

// Public auth endpoints live inside adminRoutes, so it must be mounted before
// routers that protect every route globally.
app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminConfigRoutes);
app.use("/api/admin", adminAvailabilityRoutes);
app.use("/api/admin", adminInsightsRoutes);
app.use("/api", publicConfigRoutes);
app.use("/api", publicRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

async function start() {
  assertProductionEnv();
  await connectDatabase();

  if (databaseReady()) {
    await seedCmsContent();
    await seedAdminAccount();
  }

  app.listen(env.port, () => {
    console.log(`Royalties Buffet API running on http://localhost:${env.port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
