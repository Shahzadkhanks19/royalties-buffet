import AdminAccount from "../models/AdminAccount.js";
import { ApiError } from "./errors.js";
import { readCookie, verifyAdminSession } from "../utils/adminSession.js";

export async function requireAdmin(req, _res, next) {
  try {
    const session = verifyAdminSession(readCookie(req, "rb_admin"));
    if (!session) return next(new ApiError(401, "Admin authentication required."));

    const account = await AdminAccount.findOne({ email: session.email }).lean();
    if (!account || account.sessionVersion !== session.sessionVersion) {
      return next(new ApiError(401, "Admin session has expired. Please sign in again."));
    }

    req.admin = { email: account.email, sessionVersion: account.sessionVersion };
    next();
  } catch (error) {
    next(error);
  }
}
