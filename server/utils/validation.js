import { ApiError } from "../middleware/errors.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const indianPhonePattern = /^[6-9]\d{9}$/;

export function cleanText(value, maxLength = 500) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export function requireText(value, label, minLength = 2, maxLength = 200) {
  const cleaned = cleanText(value, maxLength);
  if (cleaned.length < minLength) throw new ApiError(400, `${label} is required.`);
  return cleaned;
}

export function optionalEmail(value) {
  const cleaned = cleanText(value, 160).toLowerCase();
  if (!cleaned) return "";
  if (!emailPattern.test(cleaned)) throw new ApiError(400, "Please enter a valid email address.");
  return cleaned;
}

export function requirePhone(value) {
  const cleaned = String(value || "").replace(/\D/g, "").slice(-10);
  if (!indianPhonePattern.test(cleaned)) throw new ApiError(400, "Please enter a valid 10-digit Indian mobile number.");
  return cleaned;
}

export function oneOf(value, options, label) {
  if (!options.includes(value)) throw new ApiError(400, `${label} is invalid.`);
  return value;
}
