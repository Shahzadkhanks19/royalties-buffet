import { Router } from "express";
import { databaseReady } from "../config/database.js";
import { requireAdmin } from "../middleware/adminAuth.js";
import { ApiError } from "../middleware/errors.js";
import ActivityLog from "../models/ActivityLog.js";
import CateringLead from "../models/CateringLead.js";
import ContactEnquiry from "../models/ContactEnquiry.js";
import FranchiseLead from "../models/FranchiseLead.js";
import Reservation from "../models/Reservation.js";

const router = Router();
router.use(requireAdmin);

function ensureDatabase() {
  if (!databaseReady()) throw new ApiError(503, "Database is not connected yet.");
}

function istDateString(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

router.get("/analytics", async (_req, res) => {
  ensureDatabase();
  const today = istDateString();
  const sevenDaysAgo = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000);
  const sevenDayDates = Array.from({ length: 7 }, (_, index) => istDateString(new Date(sevenDaysAgo.getTime() + index * 24 * 60 * 60 * 1000)));

  const [reservations, contacts, catering, franchise, recentActivity] = await Promise.all([
    Reservation.find({ isArchived: false }).sort({ createdAt: -1 }).lean(),
    ContactEnquiry.find({ isArchived: false }).sort({ createdAt: -1 }).limit(8).lean(),
    CateringLead.find({ isArchived: false }).sort({ createdAt: -1 }).lean(),
    FranchiseLead.find({ isArchived: false }).sort({ createdAt: -1 }).lean(),
    ActivityLog.find().sort({ createdAt: -1 }).limit(8).lean(),
  ]);

  const statusCounts = { pending: 0, confirmed: 0, cancelled: 0, completed: 0 };
  const outletCounts = {};
  const timeCounts = {};
  const trend = Object.fromEntries(sevenDayDates.map((date) => [date, 0]));
  const upcoming = [];

  for (const item of reservations) {
    statusCounts[item.status] = (statusCounts[item.status] || 0) + 1;
    outletCounts[item.outlet] = (outletCounts[item.outlet] || 0) + 1;
    timeCounts[item.time] = (timeCounts[item.time] || 0) + 1;
    const createdDate = istDateString(item.createdAt);
    if (createdDate in trend) trend[createdDate] += 1;
    if (item.date >= today && ["pending", "confirmed"].includes(item.status)) upcoming.push(item);
  }

  upcoming.sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));

  const leadFunnels = {
    catering: catering.reduce((acc, item) => ({ ...acc, [item.status]: (acc[item.status] || 0) + 1 }), {}),
    franchise: franchise.reduce((acc, item) => ({ ...acc, [item.status]: (acc[item.status] || 0) + 1 }), {}),
  };

  const topEntries = (record, limit = 5) => Object.entries(record).sort((a, b) => b[1] - a[1]).slice(0, limit).map(([label, count]) => ({ label, count }));

  res.json({
    ok: true,
    reservations: {
      total: reservations.length,
      statusCounts,
      trend: sevenDayDates.map((date) => ({ date, count: trend[date] })),
      upcoming: upcoming.slice(0, 8),
      busiestOutlets: topEntries(outletCounts),
      busiestTimes: topEntries(timeCounts),
    },
    leads: { catering: catering.length, franchise: franchise.length, funnels: leadFunnels },
    recentContacts: contacts,
    recentActivity,
  });
});

router.get("/activity", async (req, res) => {
  ensureDatabase();
  const limit = Math.min(Math.max(Number(req.query.limit) || 100, 1), 250);
  const resource = String(req.query.resource || "").trim();
  const query = resource ? { resource } : {};
  const items = await ActivityLog.find(query).sort({ createdAt: -1 }).limit(limit).lean();
  res.json({ ok: true, items });
});

export default router;
