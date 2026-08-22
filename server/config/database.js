import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDatabase() {
  if (!env.mongoUri) {
    console.warn("MONGODB_URI is not set; API started without database persistence.");
    return false;
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(env.mongoUri, {
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: 10,
  });

  console.log("MongoDB connected");
  return true;
}

export function databaseReady() {
  return mongoose.connection.readyState === 1;
}
