import process from "node:process";

try {
  process.loadEnvFile?.(".env");
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGODB_URI || "",
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  adminEmail: (process.env.ADMIN_EMAIL || "").trim().toLowerCase(),
  adminPassword: process.env.ADMIN_PASSWORD || "",
  adminSessionSecret: process.env.ADMIN_SESSION_SECRET || "",
};

export function assertProductionEnv() {
  const missing = [];
  if (!env.mongoUri) missing.push("MONGODB_URI");
  if (!env.adminEmail) missing.push("ADMIN_EMAIL");
  if (!env.adminPassword) missing.push("ADMIN_PASSWORD");
  if (env.adminSessionSecret.length < 32) missing.push("ADMIN_SESSION_SECRET (minimum 32 characters)");

  if (env.nodeEnv === "production" && missing.length) {
    throw new Error(`Missing required production environment variables: ${missing.join(", ")}`);
  }
}
