import { Router } from "express";
import { databaseReady } from "../config/database.js";
import { ApiError } from "../middleware/errors.js";
import CateringLead from "../models/CateringLead.js";
import ContactEnquiry from "../models/ContactEnquiry.js";
import FranchiseLead from "../models/FranchiseLead.js";
import Reservation from "../models/Reservation.js";
import { cleanText, oneOf, optionalEmail, requirePhone, requireText } from "../utils/validation.js";

const router = Router();

const reservationOutlets = ["Royalties Buffet - Gurugram", "Royalties Buffet - Delhi", "Royalties Buffet - Noida"];
const reservationGuests = ["2 Guests", "3 Guests", "4 Guests", "5 Guests", "6 Guests", "7 Guests", "8 Guests", "9+ Guests"];
const reservationOccasions = ["Casual Dining", "Birthday", "Anniversary", "Family Celebration", "Corporate Dinner", "Other"];
const reservationPreferences = ["No Preference", "Mostly Vegetarian", "Mixed Veg & Non-Veg"];
const reservationTimes = ["12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"];

function ensureDatabase() {
  if (!databaseReady()) throw new ApiError(503, "Database is not connected yet. Please try again shortly.");
}

router.post("/reservations", async (req, res) => {
  ensureDatabase();
  const body = req.body || {};
  const date = requireText(body.date, "Reservation date", 10, 20);
  const parsedDate = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsedDate.getTime())) throw new ApiError(400, "Reservation date is invalid.");

  const reservation = await Reservation.create({
    outlet: oneOf(body.outlet, reservationOutlets, "Outlet"),
    guestCount: oneOf(body.guestCount, reservationGuests, "Guest count"),
    occasion: oneOf(body.occasion, reservationOccasions, "Occasion"),
    preference: oneOf(body.preference, reservationPreferences, "Dining preference"),
    date,
    time: oneOf(body.time, reservationTimes, "Reservation time"),
    name: requireText(body.name, "Name", 2, 120),
    phone: requirePhone(body.phone),
    email: optionalEmail(body.email),
    requests: cleanText(body.requests, 1000),
  });

  res.status(201).json({ ok: true, message: "Reservation request received.", id: reservation.id });
});

router.post("/contact", async (req, res) => {
  ensureDatabase();
  const body = req.body || {};
  const enquiry = await ContactEnquiry.create({
    name: requireText(body.name, "Name", 2, 120),
    phone: requirePhone(body.phone),
    email: optionalEmail(body.email),
    subject: requireText(body.subject, "Subject", 2, 80),
    outlet: requireText(body.outlet, "Outlet / area", 2, 120),
    message: requireText(body.message, "Message", 10, 2000),
  });

  res.status(201).json({ ok: true, message: "Message received.", id: enquiry.id });
});

router.post("/catering", async (req, res) => {
  ensureDatabase();
  const body = req.body || {};
  const lead = await CateringLead.create({
    event: requireText(body.event, "Event type", 2, 80),
    guests: requireText(body.guests, "Guest count", 2, 60),
    area: requireText(body.area, "Area", 2, 100),
    service: requireText(body.service, "Service format", 2, 100),
    name: requireText(body.name, "Name", 2, 120),
    phone: requirePhone(body.phone),
    email: optionalEmail(body.email),
    venue: cleanText(body.venue, 180),
    notes: cleanText(body.notes, 2500),
  });

  res.status(201).json({ ok: true, message: "Catering enquiry received.", id: lead.id });
});

router.post("/franchise", async (req, res) => {
  ensureDatabase();
  const body = req.body || {};
  const lead = await FranchiseLead.create({
    city: requireText(body.city, "Preferred city", 2, 100),
    investment: requireText(body.investment, "Investment range", 2, 80),
    experience: requireText(body.experience, "Background", 2, 120),
    site: requireText(body.site, "Site status", 2, 100),
    name: requireText(body.name, "Name", 2, 120),
    phone: requirePhone(body.phone),
    email: optionalEmail(body.email),
    company: cleanText(body.company, 160),
    message: cleanText(body.message, 2500),
  });

  res.status(201).json({ ok: true, message: "Franchise interest received.", id: lead.id });
});

export default router;
