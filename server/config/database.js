import mongoose from "mongoose";
import { env } from "./env.js";

let connectionPromise = null;

export async function connectDatabase() {
  if (mongoose.connection.readyState === 1) return true;

  if (!env.mongoUri) {
    console.warn("MONGODB_URI is not set; API started without database persistence.");
    return false;
  }

  if (!connectionPromise) {
    mongoose.set("strictQuery", true);
    connectionPromise = mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 10,
    }).then(() => {
      console.log("MongoDB connected");
      return true;
    }).catch((error) => {
      connectionPromise = null;
      throw error;
    });
  }

  await connectionPromise;
  return mongoose.connection.readyState === 1;
}

export function databaseReady() {
  return mongoose.connection.readyState === 1;
}
