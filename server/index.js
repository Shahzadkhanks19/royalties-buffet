import express from "express";
import mongoose from "mongoose";

const app = express();
const port = Number(process.env.PORT ?? 5000);

app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "royalties-buffet-api" });
});

async function start() {
  const mongoUri = process.env.MONGODB_URI;

  if (mongoUri) {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
  } else {
    console.warn("MONGODB_URI is not set; API is running without a database connection.");
  }

  app.listen(port, () => {
    console.log(`Royalties Buffet API running on http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
