import process from "node:process";

try {
  process.loadEnvFile?.(".env");
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}

const isVercel = Boolean(process.env.VERCEL);

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGODB_URI || "",
  clientOrigin: (process.env.CLIENT_ORIGIN || "http://localhost:5173").replace(/\/$/, ""),
  adminEmail: (process.env.ADMIN_EMAIL || "").trim().toLowerCase(),
  adminPassword: process.env.ADMIN_PASSWORD || "",
  adminSessionSecret: process.env.ADMIN_SESSION_SECRET || "",
  resendApiKey: process.env.RESEND_API_KEY || "",
  adminFromEmail: process.env.ADMIN_FROM_EMAIL || "",
  isVercel,
  trustProxy: isVercel || process.env.TRUST_PROXY === "true" || process.env.TRUST_PROXY === "1",
};

export function assertProductionEnv() {
  const missing = [];
  const invalid = [];

  if (!env.mongoUri) missing.push("MONGODB_URI");
  if (!env.adminEmail) missing.push("ADMIN_EMAIL");
  if (!env.adminPassword) missing.push("ADMIN_PASSWORD");
  if (!env.adminSessionSecret) missing.push("ADMIN_SESSION_SECRET");
  if (env.adminSessionSecret && env.adminSessionSecret.length < 48) invalid.push("ADMIN_SESSION_SECRET must be at least 48 characters");

  if (env.nodeEnv === "production") {
    if (!env.clientOrigin.startsWith("https://")) invalid.push("CLIENT_ORIGIN must use HTTPS in production");
    if (env.resendApiKey && !env.adminFromEmail) invalid.push("ADMIN_FROM_EMAIL is required when RESEND_API_KEY is configured");
    if (env.adminFromEmail && !env.resendApiKey) invalid.push("RESEND_API_KEY is required when ADMIN_FROM_EMAIL is configured");
    if (!env.trustProxy) invalid.push("TRUST_PROXY=true is required behind a production reverse proxy");
  }

  if (env.nodeEnv === "production" && (missing.length || invalid.length)) {
    const problems = [...missing.map((key) => `missing ${key}`), ...invalid];
    throw new Error(`Invalid production environment: ${problems.join("; ")}`);
  }
}
