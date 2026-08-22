import { Router } from "express";
import { databaseReady } from "../config/database.js";
import { requireAdmin } from "../middleware/adminAuth.js";
import { ApiError } from "../middleware/errors.js";
import Location from "../models/Location.js";
import Reservation from "../models/Reservation.js";
import ReservationAvailability from "../models/ReservationAvailability.js";
import { cleanText } from "../utils/validation.js";

const router = Router();
router.use(requireAdmin);

const times = ["12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"];

function ensureDatabase() {
  if (!databaseReady()) throw new ApiError(503, "Database is not connected yet.");
}

function guestNumber(value = "") {
  const match = String(value).match(/\d+/);
  return match ? Number(match[0]) : 9;
}

router.get("/availability", async (req, res) => {
  ensureDatabase();
  const date = String(req.query.date || "").trim();
  const outlet = String(req.query.outlet || "").trim();
  const query = {};
  if (date) query.date = date;
  if (outlet) query.outlet = outlet;
  const [items, locations] = await Promise.all([
    ReservationAvailability.find(query).sort({ date: 1, outlet: 1, time: 1 }).lean(),
    Location.find({ isActive: true }).sort({ sortOrder: 1 }).select({ city: 1 }).lean(),
  ]);
  res.json({ ok: true, items, outlets: locations.map((item) => `Royalties Buffet - ${item.city}`), times });
});

router.put("/availability", async (req, res) => {
  ensureDatabase();
  const outlet = String(req.body?.outlet || "").trim();
  const date = String(req.body?.date || "").trim();
  const time = String(req.body?.time || "").trim();
  const capacity = Number(req.body?.capacity);
  if (!outlet || !date || !times.includes(time)) throw new ApiError(400, "Outlet, date and a valid time are required.");
  if (!Number.isInteger(capacity) || capacity < 1 || capacity > 1000) throw new ApiError(400, "Capacity must be between 1 and 1000 guests.");
  const item = await ReservationAvailability.findOneAndUpdate(
    { outlet, date, time },
    { outlet, date, time, capacity, isBlocked: Boolean(req.body?.isBlocked), note: cleanText(req.body?.note, 300) },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
  );
  res.json({ ok: true, item });
});

router.post("/availability/block-date", async (req, res) => {
  ensureDatabase();
  const outlet = String(req.body?.outlet || "").trim();
  const date = String(req.body?.date || "").trim();
  const blocked = req.body?.isBlocked !== false;
  const capacity = Number.isInteger(Number(req.body?.capacity)) ? Number(req.body.capacity) : 40;
  if (!outlet || !date) throw new ApiError(400, "Outlet and date are required.");
  await Promise.all(times.map((time) => ReservationAvailability.findOneAndUpdate(
    { outlet, date, time },
    { outlet, date, time, capacity, isBlocked: blocked, note: cleanText(req.body?.note, 300) },
    { upsert: true, runValidators: true, setDefaultsOnInsert: true },
  )));
  res.json({ ok: true });
});

router.get("/availability/usage", async (req, res) => {
  ensureDatabase();
  const outlet = String(req.query.outlet || "").trim();
  const date = String(req.query.date || "").trim();
  if (!outlet || !date) throw new ApiError(400, "Outlet and date are required.");
  const reservations = await Reservation.find({ outlet, date, status: { $in: ["pending", "confirmed"] }, isArchived: false }).select({ time: 1, guestCount: 1 }).lean();
  const usage = Object.fromEntries(times.map((time) => [time, 0]));
  for (const reservation of reservations) usage[reservation.time] = (usage[reservation.time] || 0) + guestNumber(reservation.guestCount);
  res.json({ ok: true, usage });
});

export default router;
