import { timingSafeEqual } from "node:crypto";
import mongoose from "mongoose";
import { Router } from "express";
import { env } from "../config/env.js";
import { databaseReady } from "../config/database.js";
import { requireAdmin } from "../middleware/adminAuth.js";
import { ApiError } from "../middleware/errors.js";
import GalleryItem from "../models/GalleryItem.js";
import MenuItem from "../models/MenuItem.js";
import { cleanText, requireText } from "../utils/validation.js";
import { clearSessionCookie, createAdminSession, sessionCookie } from "../utils/adminSession.js";

const router = Router();

function ensureDatabase() {
  if (!databaseReady()) throw new ApiError(503, "Database is not connected yet.");
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  return left.length === right.length && timingSafeEqual(left, right);
}

function validId(id) {
  if (!mongoose.isValidObjectId(id)) throw new ApiError(400, "Invalid content id.");
  return id;
}

function menuPayload(body = {}) {
  const type = body.type === "non-veg" ? "non-veg" : "veg";
  return {
    title: requireText(body.title, "Title", 2, 160),
    category: requireText(body.category, "Category", 2, 80),
    type,
    protein: type === "non-veg" ? cleanText(body.protein, 60) : "",
    copy: requireText(body.copy, "Description", 5, 600),
    image: requireText(body.image, "Image", 4, 2000),
    sortOrder: Number.isFinite(Number(body.sortOrder)) ? Number(body.sortOrder) : 0,
    isActive: body.isActive !== false,
  };
}

function galleryPayload(body = {}) {
  const size = ["standard", "wide", "tall"].includes(body.size) ? body.size : "standard";
  return {
    title: requireText(body.title, "Title", 2, 160),
    category: requireText(body.category, "Category", 2, 80),
    size,
    image: requireText(body.image, "Image", 4, 2000),
    sortOrder: Number.isFinite(Number(body.sortOrder)) ? Number(body.sortOrder) : 0,
    isActive: body.isActive !== false,
  };
}

router.post("/login", (req, res) => {
  const email = String(req.body?.email || "").trim().toLowerCase();
  const password = String(req.body?.password || "");
  if (!env.adminEmail || !env.adminPassword || env.adminSessionSecret.length < 32) {
    throw new ApiError(503, "Admin authentication is not configured.");
  }
  if (!safeEqual(email, env.adminEmail) || !safeEqual(password, env.adminPassword)) {
    throw new ApiError(401, "Invalid admin credentials.");
  }
  res.setHeader("Set-Cookie", sessionCookie(createAdminSession(email)));
  res.json({ ok: true, admin: { email } });
});

router.post("/logout", (_req, res) => {
  res.setHeader("Set-Cookie", clearSessionCookie());
  res.json({ ok: true });
});

router.get("/session", requireAdmin, (req, res) => {
  res.json({ ok: true, admin: { email: req.admin.email } });
});

router.get("/dashboard", requireAdmin, async (_req, res) => {
  ensureDatabase();
  const [menu, gallery] = await Promise.all([
    MenuItem.countDocuments(),
    GalleryItem.countDocuments(),
  ]);
  res.json({ ok: true, counts: { menu, gallery } });
});

router.get("/menu", requireAdmin, async (_req, res) => {
  ensureDatabase();
  const items = await MenuItem.find().sort({ sortOrder: 1, createdAt: 1 }).lean();
  res.json({ ok: true, items });
});

router.post("/menu", requireAdmin, async (req, res) => {
  ensureDatabase();
  const item = await MenuItem.create(menuPayload(req.body));
  res.status(201).json({ ok: true, item });
});

router.put("/menu/:id", requireAdmin, async (req, res) => {
  ensureDatabase();
  const item = await MenuItem.findByIdAndUpdate(validId(req.params.id), menuPayload(req.body), { new: true, runValidators: true });
  if (!item) throw new ApiError(404, "Menu item not found.");
  res.json({ ok: true, item });
});

router.delete("/menu/:id", requireAdmin, async (req, res) => {
  ensureDatabase();
  const item = await MenuItem.findByIdAndDelete(validId(req.params.id));
  if (!item) throw new ApiError(404, "Menu item not found.");
  res.json({ ok: true });
});

router.get("/gallery", requireAdmin, async (_req, res) => {
  ensureDatabase();
  const items = await GalleryItem.find().sort({ sortOrder: 1, createdAt: 1 }).lean();
  res.json({ ok: true, items });
});

router.post("/gallery", requireAdmin, async (req, res) => {
  ensureDatabase();
  const item = await GalleryItem.create(galleryPayload(req.body));
  res.status(201).json({ ok: true, item });
});

router.put("/gallery/:id", requireAdmin, async (req, res) => {
  ensureDatabase();
  const item = await GalleryItem.findByIdAndUpdate(validId(req.params.id), galleryPayload(req.body), { new: true, runValidators: true });
  if (!item) throw new ApiError(404, "Gallery item not found.");
  res.json({ ok: true, item });
});

router.delete("/gallery/:id", requireAdmin, async (req, res) => {
  ensureDatabase();
  const item = await GalleryItem.findByIdAndDelete(validId(req.params.id));
  if (!item) throw new ApiError(404, "Gallery item not found.");
  res.json({ ok: true });
});

export default router;
