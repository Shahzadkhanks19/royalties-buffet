import mongoose from "mongoose";
import { Router } from "express";
import { databaseReady } from "../config/database.js";
import { requireAdmin } from "../middleware/adminAuth.js";
import { ApiError } from "../middleware/errors.js";
import Location from "../models/Location.js";
import SiteSettings from "../models/SiteSettings.js";
import { cleanText, requireText } from "../utils/validation.js";

const router = Router();

function ensureDatabase() {
  if (!databaseReady()) throw new ApiError(503, "Database is not connected yet.");
}

function validId(id) {
  if (!mongoose.isValidObjectId(id)) throw new ApiError(400, "Invalid location id.");
  return id;
}

function cleanServices(value) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => cleanText(item, 120)).filter(Boolean).slice(0, 12);
}

function locationPayload(body = {}) {
  return {
    city: requireText(body.city, "City", 2, 100),
    region: requireText(body.region, "Region", 2, 120),
    area: requireText(body.area, "Area", 2, 180),
    address: cleanText(body.address, 300),
    phone: cleanText(body.phone, 40),
    email: cleanText(body.email, 160).toLowerCase(),
    lunchHours: cleanText(body.lunchHours, 80),
    dinnerHours: cleanText(body.dinnerHours, 80),
    mapUrl: cleanText(body.mapUrl, 2000),
    image: requireText(body.image, "Image", 4, 2000),
    description: requireText(body.description, "Description", 5, 800),
    services: cleanServices(body.services),
    sortOrder: Number.isFinite(Number(body.sortOrder)) ? Number(body.sortOrder) : 0,
    isActive: body.isActive !== false,
  };
}

function settingsPayload(body = {}) {
  return {
    businessName: requireText(body.businessName, "Business name", 2, 120),
    regionLabel: requireText(body.regionLabel, "Region", 2, 120),
    phone: cleanText(body.phone, 40),
    email: cleanText(body.email, 160).toLowerCase(),
    weekdayHours: cleanText(body.weekdayHours, 80),
    weekendHours: cleanText(body.weekendHours, 80),
    openingNote: cleanText(body.openingNote, 120),
    instagramUrl: cleanText(body.instagramUrl, 2000),
    facebookUrl: cleanText(body.facebookUrl, 2000),
    youtubeUrl: cleanText(body.youtubeUrl, 2000),
  };
}

router.use(requireAdmin);

router.get("/settings", async (_req, res) => {
  ensureDatabase();
  const settings = await SiteSettings.findOne({ key: "main" }).lean();
  res.json({ ok: true, settings });
});

router.put("/settings", async (req, res) => {
  ensureDatabase();
  const settings = await SiteSettings.findOneAndUpdate(
    { key: "main" },
    { key: "main", ...settingsPayload(req.body) },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
  );
  res.json({ ok: true, settings });
});

router.get("/locations", async (_req, res) => {
  ensureDatabase();
  const items = await Location.find().sort({ sortOrder: 1, createdAt: 1 }).lean();
  res.json({ ok: true, items });
});

router.post("/locations", async (req, res) => {
  ensureDatabase();
  const item = await Location.create(locationPayload(req.body));
  res.status(201).json({ ok: true, item });
});

router.put("/locations/:id", async (req, res) => {
  ensureDatabase();
  const item = await Location.findByIdAndUpdate(validId(req.params.id), locationPayload(req.body), { new: true, runValidators: true });
  if (!item) throw new ApiError(404, "Location not found.");
  res.json({ ok: true, item });
});

router.delete("/locations/:id", async (req, res) => {
  ensureDatabase();
  const item = await Location.findByIdAndDelete(validId(req.params.id));
  if (!item) throw new ApiError(404, "Location not found.");
  res.json({ ok: true });
});

export default router;
