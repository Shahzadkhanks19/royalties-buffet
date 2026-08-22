import express from "express";
import { connectDatabase, databaseReady } from "./config/database.js";
import { assertProductionEnv, env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/errors.js";
import adminAvailabilityRoutes from "./routes/adminAvailability.js";
import adminConfigRoutes from "./routes/adminConfig.js";
import adminRoutes from "./routes/admin.js";
import publicConfigRoutes from "./routes/publicConfig.js";
import publicRoutes from "./routes/public.js";
import { seedAdminAccount } from "./services/seedAdmin.js";
import { seedCmsContent } from "./services/seedCms.js";

const app = express();

app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && origin === env.clientOrigin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  }

  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-Frame-Options", "DENY");

  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "royalties-buffet-api",
    environment: env.nodeEnv,
    database: databaseReady() ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/admin", adminConfigRoutes);
app.use("/api/admin", adminAvailabilityRoutes);
app.use("/api/admin", adminRoutes);
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
