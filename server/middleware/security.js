const buckets = new Map();

function clientKey(req) {
  return String(req.ip || req.socket?.remoteAddress || "unknown").slice(0, 120);
}

function prune(now) {
  if (buckets.size < 2000) return;
  for (const [key, value] of buckets) {
    if (value.resetAt <= now) buckets.delete(key);
  }
}

export function createRateLimiter({ windowMs, max, prefix = "api", message = "Too many requests. Please try again shortly." }) {
  return (req, res, next) => {
    const now = Date.now();
    prune(now);
    const key = `${prefix}:${clientKey(req)}`;
    const current = buckets.get(key);
    const bucket = !current || current.resetAt <= now ? { count: 0, resetAt: now + windowMs } : current;
    bucket.count += 1;
    buckets.set(key, bucket);

    const remaining = Math.max(0, max - bucket.count);
    res.setHeader("RateLimit-Limit", String(max));
    res.setHeader("RateLimit-Remaining", String(remaining));
    res.setHeader("RateLimit-Reset", String(Math.ceil(bucket.resetAt / 1000)));

    if (bucket.count > max) {
      const retryAfter = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
      res.setHeader("Retry-After", String(retryAfter));
      return res.status(429).json({ ok: false, message });
    }
    next();
  };
}

export const generalApiLimiter = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 300, prefix: "general" });
export const mutationLimiter = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 90, prefix: "mutation", message: "Too many submissions from this connection. Please wait and try again." });
export const loginLimiter = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 8, prefix: "login", message: "Too many sign-in attempts. Please wait 15 minutes and try again." });
export const passwordResetLimiter = createRateLimiter({ windowMs: 60 * 60 * 1000, max: 5, prefix: "password-reset", message: "Too many password reset requests. Please try again later." });

export function securityHeaders(req, res, next) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=()");
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  res.setHeader("X-Permitted-Cross-Domain-Policies", "none");
  res.setHeader("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'");
  if (req.secure) res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  next();
}

export function rejectSuspiciousKeys(req, res, next) {
  function unsafe(value, depth = 0) {
    if (!value || typeof value !== "object" || depth > 8) return false;
    if (Array.isArray(value)) return value.some((item) => unsafe(item, depth + 1));
    return Object.entries(value).some(([key, child]) => key === "__proto__" || key === "constructor" || key === "prototype" || key.startsWith("$") || key.includes(".") || unsafe(child, depth + 1));
  }
  if (unsafe(req.body)) return res.status(400).json({ ok: false, message: "Invalid request payload." });
  next();
}
