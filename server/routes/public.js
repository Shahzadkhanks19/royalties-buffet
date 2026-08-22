import { Router } from "express";
import { databaseReady } from "../config/database.js";
import { ApiError } from "../middleware/errors.js";
import CateringLead from "../models/CateringLead.js";
import ContactEnquiry from "../models/ContactEnquiry.js";
import FranchiseLead from "../models/FranchiseLead.js";
import GalleryItem from "../models/GalleryItem.js";
import Location from "../models/Location.js";
import MenuItem from "../models/MenuItem.js";
import Reservation from "../models/Reservation.js";
import ReservationAvailability from "../models/ReservationAvailability.js";
import { sendReservationEmailSafely } from "../services/reservationEmail.js";
import { cleanText, oneOf, optionalEmail, requirePhone, requireText } from "../utils/validation.js";

const router = Router();
const reservationGuests = ["2 Guests", "3 Guests", "4 Guests", "5 Guests", "6 Guests", "7 Guests", "8 Guests", "9+ Guests"];
const reservationOccasions = ["Casual Dining", "Birthday", "Anniversary", "Family Celebration", "Corporate Dinner", "Other"];
const reservationPreferences = ["No Preference", "Mostly Vegetarian", "Mixed Veg & Non-Veg"];
const reservationTimes = ["12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"];
const defaultCapacity = 40;

function ensureDatabase() { if (!databaseReady()) throw new ApiError(503, "Database is not connected yet. Please try again shortly."); }
function guestNumber(value = "") { const match = String(value).match(/\d+/); return match ? Number(match[0]) : 9; }

router.get("/menu", async (_req, res) => { ensureDatabase(); const items = await MenuItem.find({ isActive: true }).sort({ sortOrder: 1, createdAt: 1 }).lean(); res.json({ ok: true, items }); });
router.get("/gallery", async (_req, res) => { ensureDatabase(); const items = await GalleryItem.find({ isActive: true }).sort({ sortOrder: 1, createdAt: 1 }).lean(); res.json({ ok: true, items }); });

router.get("/reservation-availability", async (req, res) => {
  ensureDatabase();
  const outlet = String(req.query.outlet || "").trim();
  const date = String(req.query.date || "").trim();
  if (!outlet || !date) throw new ApiError(400, "Outlet and date are required.");
  const [rules, reservations] = await Promise.all([
    ReservationAvailability.find({ outlet, date }).lean(),
    Reservation.find({ outlet, date, status: { $in: ["pending", "confirmed"] }, isArchived: false }).select({ time: 1, guestCount: 1 }).lean(),
  ]);
  const ruleMap = new Map(rules.map((item) => [item.time, item]));
  const usage = Object.fromEntries(reservationTimes.map((time) => [time, 0]));
  for (const item of reservations) usage[item.time] = (usage[item.time] || 0) + guestNumber(item.guestCount);
  const slots = reservationTimes.map((time) => {
    const rule = ruleMap.get(time);
    const capacity = rule?.capacity || defaultCapacity;
    const used = usage[time] || 0;
    return { time, capacity, used, remaining: Math.max(0, capacity - used), isBlocked: Boolean(rule?.isBlocked), available: !rule?.isBlocked && used < capacity };
  });
  res.json({ ok: true, slots });
});

router.post("/reservations", async (req, res) => {
  ensureDatabase();
  const body = req.body || {};
  const date = requireText(body.date, "Reservation date", 10, 20);
  const parsedDate = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsedDate.getTime())) throw new ApiError(400, "Reservation date is invalid.");
  const locations = await Location.find({ isActive: true }).select({ city: 1 }).lean();
  const reservationOutlets = locations.map((location) => `Royalties Buffet - ${location.city}`);
  if (!reservationOutlets.length) throw new ApiError(503, "No reservation outlets are currently available.");
  const outlet = oneOf(body.outlet, reservationOutlets, "Outlet");
  const time = oneOf(body.time, reservationTimes, "Reservation time");
  const guestCount = oneOf(body.guestCount, reservationGuests, "Guest count");
  const requestedGuests = guestNumber(guestCount);
  const [rule, reservations] = await Promise.all([
    ReservationAvailability.findOne({ outlet, date, time }).lean(),
    Reservation.find({ outlet, date, time, status: { $in: ["pending", "confirmed"] }, isArchived: false }).select({ guestCount: 1 }).lean(),
  ]);
  if (rule?.isBlocked) throw new ApiError(409, "This reservation slot is currently unavailable.");
  const capacity = rule?.capacity || defaultCapacity;
  const used = reservations.reduce((sum, item) => sum + guestNumber(item.guestCount), 0);
  if (used + requestedGuests > capacity) throw new ApiError(409, "This time slot no longer has enough availability for your party.");

  const reservation = await Reservation.create({ outlet, guestCount, occasion: oneOf(body.occasion, reservationOccasions, "Occasion"), preference: oneOf(body.preference, reservationPreferences, "Dining preference"), date, time, name: requireText(body.name, "Name", 2, 120), phone: requirePhone(body.phone), email: optionalEmail(body.email), requests: cleanText(body.requests, 1000) });
  await sendReservationEmailSafely("received", reservation);
  res.status(201).json({ ok: true, message: "Reservation request received.", id: reservation.id });
});

router.post("/contact", async (req, res) => { ensureDatabase(); const body = req.body || {}; const enquiry = await ContactEnquiry.create({ name: requireText(body.name, "Name", 2, 120), phone: requirePhone(body.phone), email: optionalEmail(body.email), subject: requireText(body.subject, "Subject", 2, 80), outlet: requireText(body.outlet, "Outlet / area", 2, 120), message: requireText(body.message, "Message", 10, 2000) }); res.status(201).json({ ok: true, message: "Message received.", id: enquiry.id }); });
router.post("/catering", async (req, res) => { ensureDatabase(); const body = req.body || {}; const lead = await CateringLead.create({ event: requireText(body.event, "Event type", 2, 80), guests: requireText(body.guests, "Guest count", 2, 60), area: requireText(body.area, "Area", 2, 100), service: requireText(body.service, "Service format", 2, 100), name: requireText(body.name, "Name", 2, 120), phone: requirePhone(body.phone), email: optionalEmail(body.email), venue: cleanText(body.venue, 180), notes: cleanText(body.notes, 2500) }); res.status(201).json({ ok: true, message: "Catering enquiry received.", id: lead.id }); });
router.post("/franchise", async (req, res) => { ensureDatabase(); const body = req.body || {}; const lead = await FranchiseLead.create({ city: requireText(body.city, "Preferred city", 2, 100), investment: requireText(body.investment, "Investment range", 2, 80), experience: requireText(body.experience, "Background", 2, 120), site: requireText(body.site, "Site status", 2, 100), name: requireText(body.name, "Name", 2, 120), phone: requirePhone(body.phone), email: optionalEmail(body.email), company: cleanText(body.company, 160), message: cleanText(body.message, 2500) }); res.status(201).json({ ok: true, message: "Franchise interest received.", id: lead.id }); });

export default router;
