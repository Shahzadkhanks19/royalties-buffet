import { Router } from "express";
import { databaseReady } from "../config/database.js";
import { ApiError } from "../middleware/errors.js";
import Location from "../models/Location.js";
import SiteSettings from "../models/SiteSettings.js";

const router = Router();

function ensureDatabase() {
  if (!databaseReady()) throw new ApiError(503, "Database is not connected yet. Please try again shortly.");
}

router.get("/locations", async (_req, res) => {
  ensureDatabase();
  const items = await Location.find({ isActive: true }).sort({ sortOrder: 1, createdAt: 1 }).lean();
  res.json({ ok: true, items });
});

router.get("/settings", async (_req, res) => {
  ensureDatabase();
  const settings = await SiteSettings.findOne({ key: "main" }).lean();
  res.json({ ok: true, settings: settings || null });
});

export default router;
