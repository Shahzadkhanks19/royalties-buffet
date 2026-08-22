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
  return Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(now).map((part) => [part.type, part.value]),
  );
}

export function indiaToday(now = new Date()) {
  const parts = indiaParts(now);
  return `${parts.year}-${parts.month}-${parts.day}`;
}

export function isPastReservationSlot(date, time, now = new Date()) {
  const today = indiaToday(now);
  if (date < today) return true;
  if (date > today) return false;
  const slot = TIME_24[time];
  if (!slot) return false;
  const parts = indiaParts(now);
  return slot[0] * 60 + slot[1] <= Number(parts.hour) * 60 + Number(parts.minute);
}

export function nextReservationDates(days = 7) {
  const parts = indiaParts();
  const base = new Date(Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day)));
  return Array.from({ length: days }, (_, index) => {
    const date = new Date(base);
    date.setUTCDate(base.getUTCDate() + index);
    const value = date.toISOString().slice(0, 10);
    return {
      value,
      label: date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" }),
      day: date.toLocaleDateString("en-IN", { weekday: "short", timeZone: "UTC" }),
      number: date.getUTCDate(),
      month: date.toLocaleDateString("en-IN", { month: "short", timeZone: "UTC" }),
    };
  });
}
