import { createHmac, timingSafeEqual } from "node:crypto";
import { env } from "../config/env.js";

const SESSION_SECONDS = 60 * 60 * 8;

function base64url(value) {
  return Buffer.from(value).toString("base64url");
}

function sign(value) {
  return createHmac("sha256", env.adminSessionSecret).update(value).digest("base64url");
}

export function createAdminSession(email) {
  const payload = base64url(JSON.stringify({ email, exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS }));
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSession(token) {
  if (!token || !env.adminSessionSecret) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!data?.email || !data?.exp || data.exp <= Math.floor(Date.now() / 1000)) return null;
    return data;
  } catch {
    return null;
  }
}

export function readCookie(req, name) {
  const cookieHeader = req.headers.cookie || "";
  const match = cookieHeader.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : "";
}

export function sessionCookie(token) {
  return `rb_admin=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_SECONDS}${env.nodeEnv === "production" ? "; Secure" : ""}`;
}

export function clearSessionCookie() {
  return `rb_admin=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${env.nodeEnv === "production" ? "; Secure" : ""}`;
}
