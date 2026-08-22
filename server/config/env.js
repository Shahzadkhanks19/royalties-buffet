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
};

export function assertProductionEnv() {
  if (env.nodeEnv === "production" && !env.mongoUri) {
    throw new Error("MONGODB_URI is required in production.");
  }
}
