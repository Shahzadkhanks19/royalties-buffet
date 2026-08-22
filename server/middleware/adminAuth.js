import { ApiError } from "./errors.js";
import { readCookie, verifyAdminSession } from "../utils/adminSession.js";

export function requireAdmin(req, _res, next) {
  const session = verifyAdminSession(readCookie(req, "rb_admin"));
  if (!session) return next(new ApiError(401, "Admin authentication required."));
  req.admin = session;
  next();
}
