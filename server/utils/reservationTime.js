const INDIA_TIME_ZONE = "Asia/Kolkata";

const TIME_24 = {
  "12:30 PM": [12, 30],
  "1:00 PM": [13, 0],
  "1:30 PM": [13, 30],
  "2:00 PM": [14, 0],
  "7:00 PM": [19, 0],
  "7:30 PM": [19, 30],
  "8:00 PM": [20, 0],
  "8:30 PM": [20, 30],
  "9:00 PM": [21, 0],
  "9:30 PM": [21, 30],
};

function indiaParts(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: INDIA_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  return Object.fromEntries(parts.map((part) => [part.type, part.value]));
}

export function indiaToday(now = new Date()) {
  const parts = indiaParts(now);
  return `${parts.year}-${parts.month}-${parts.day}`;
}

export function isPastReservationDate(date, now = new Date()) {
  return String(date) < indiaToday(now);
}

export function isPastReservationSlot(date, time, now = new Date()) {
  if (isPastReservationDate(date, now)) return true;
  if (String(date) !== indiaToday(now)) return false;

  const slot = TIME_24[time];
  if (!slot) return false;

  const parts = indiaParts(now);
  const currentMinutes = Number(parts.hour) * 60 + Number(parts.minute);
  const slotMinutes = slot[0] * 60 + slot[1];
  return slotMinutes <= currentMinutes;
}

export function assertFutureReservationSlot(date, time, ApiError) {
  if (isPastReservationDate(date)) {
    throw new ApiError(400, "Past reservation dates are not allowed.");
  }
  if (isPastReservationSlot(date, time)) {
    throw new ApiError(409, "That reservation time has already passed.");
  }
}
