import { createHash, randomBytes } from "node:crypto";
import mongoose from "mongoose";
import { Router } from "express";
import { env } from "../config/env.js";
import { databaseReady } from "../config/database.js";
import { requireAdmin } from "../middleware/adminAuth.js";
import { ApiError } from "../middleware/errors.js";
import AdminAccount from "../models/AdminAccount.js";
import AdminPasswordReset from "../models/AdminPasswordReset.js";
import CateringLead from "../models/CateringLead.js";
import ContactEnquiry from "../models/ContactEnquiry.js";
import FranchiseLead from "../models/FranchiseLead.js";
import GalleryItem from "../models/GalleryItem.js";
import MenuItem from "../models/MenuItem.js";
import Reservation from "../models/Reservation.js";
import { sendAdminResetEmail } from "../services/adminEmail.js";
import { cleanText, requireText } from "../utils/validation.js";
import { clearSessionCookie, createAdminSession, sessionCookie } from "../utils/adminSession.js";
import { hashPassword, validateAdminPassword, verifyPassword } from "../utils/password.js";

const router = Router();

const workflow = {
  reservations: { model: Reservation, statuses: ["pending", "confirmed", "cancelled", "completed"] },
  contacts: { model: ContactEnquiry, statuses: ["new", "in-progress", "resolved", "closed"] },
  catering: { model: CateringLead, statuses: ["new", "contacted", "qualified", "proposal", "won", "lost"] },
  franchise: { model: FranchiseLead, statuses: ["new", "contacted", "qualified", "discussion", "approved", "rejected"] },
};

function ensureDatabase() {
  if (!databaseReady()) throw new ApiError(503, "Database is not connected yet.");
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

router.post("/login", async (req, res) => {
  ensureDatabase();
  const email = String(req.body?.email || "").trim().toLowerCase();
  const password = String(req.body?.password || "");
  const account = await AdminAccount.findOne({ email });

  if (!account || !verifyPassword(password, account.passwordHash)) {
    throw new ApiError(401, "Invalid admin credentials.");
  }

  account.lastLoginAt = new Date();
  await account.save();
  res.setHeader("Set-Cookie", sessionCookie(createAdminSession(account.email, account.sessionVersion)));
  res.json({ ok: true, admin: { email: account.email } });
});

router.post("/forgot-password", async (req, res) => {
  ensureDatabase();
  const email = String(req.body?.email || "").trim().toLowerCase();
  const account = await AdminAccount.findOne({ email });

  let developmentResetUrl = "";
  if (account) {
    await AdminPasswordReset.deleteMany({ email });
    const token = randomBytes(32).toString("hex");
    const tokenHash = createHash("sha256").update(token).digest("hex");
    await AdminPasswordReset.create({ email, tokenHash, expiresAt: new Date(Date.now() + 30 * 60 * 1000) });
    const resetUrl = `${env.clientOrigin.replace(/\/$/, "")}/admin/reset-password?token=${encodeURIComponent(token)}`;
    const delivery = await sendAdminResetEmail(email, resetUrl);
    developmentResetUrl = delivery.developmentUrl || "";
  }

  res.json({
    ok: true,
    message: "If that admin email exists, a password reset link has been sent.",
    ...(env.nodeEnv !== "production" && developmentResetUrl ? { developmentResetUrl } : {}),
  });
});

router.post("/reset-password", async (req, res) => {
  ensureDatabase();
  const token = String(req.body?.token || "");
  const password = String(req.body?.password || "");
  const passwordError = validateAdminPassword(password);
  if (passwordError) throw new ApiError(400, passwordError);
  if (!token) throw new ApiError(400, "Reset token is required.");

  const tokenHash = createHash("sha256").update(token).digest("hex");
  const reset = await AdminPasswordReset.findOne({ tokenHash, expiresAt: { $gt: new Date() } });
  if (!reset) throw new ApiError(400, "This reset link is invalid or has expired.");

  const account = await AdminAccount.findOne({ email: reset.email });
  if (!account) throw new ApiError(400, "This reset link is invalid or has expired.");

  account.passwordHash = hashPassword(password);
  account.sessionVersion += 1;
  await account.save();
  await AdminPasswordReset.deleteMany({ email: account.email });
  res.setHeader("Set-Cookie", clearSessionCookie());
  res.json({ ok: true, message: "Password reset successfully. You can sign in with your new password." });
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
  const [menu, gallery, reservations, contacts, catering, franchise] = await Promise.all([
    MenuItem.countDocuments(),
    GalleryItem.countDocuments(),
    Reservation.countDocuments({ isArchived: false }),
    ContactEnquiry.countDocuments({ isArchived: false }),
    CateringLead.countDocuments({ isArchived: false }),
    FranchiseLead.countDocuments({ isArchived: false }),
  ]);
  res.json({ ok: true, counts: { menu, gallery, reservations, contacts, catering, franchise } });
});

for (const [resource, config] of Object.entries(workflow)) {
  router.get(`/${resource}`, requireAdmin, async (_req, res) => {
    ensureDatabase();
    const items = await config.model.find().sort({ createdAt: -1 }).lean();
    res.json({ ok: true, items, statuses: config.statuses });
  });

  router.patch(`/${resource}/:id`, requireAdmin, async (req, res) => {
    ensureDatabase();
    const update = {};
    if (req.body?.status !== undefined) {
      if (!config.statuses.includes(req.body.status)) throw new ApiError(400, "Invalid status.");
      update.status = req.body.status;
    }
    if (req.body?.adminNotes !== undefined) update.adminNotes = cleanText(req.body.adminNotes, 3000);
    if (req.body?.isArchived !== undefined) update.isArchived = Boolean(req.body.isArchived);
    const item = await config.model.findByIdAndUpdate(validId(req.params.id), update, { new: true, runValidators: true });
    if (!item) throw new ApiError(404, "Record not found.");
    res.json({ ok: true, item });
  });

  router.delete(`/${resource}/:id`, requireAdmin, async (req, res) => {
    ensureDatabase();
    const item = await config.model.findByIdAndDelete(validId(req.params.id));
    if (!item) throw new ApiError(404, "Record not found.");
    res.json({ ok: true });
  });
}

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
