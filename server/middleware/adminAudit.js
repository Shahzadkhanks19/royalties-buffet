import ActivityLog from "../models/ActivityLog.js";

const actionByMethod = {
  POST: "created",
  PUT: "updated",
  PATCH: "updated",
  DELETE: "deleted",
};

function resourceFromPath(pathname = "") {
  const parts = pathname.split("?")[0].split("/").filter(Boolean);
  const adminIndex = parts.indexOf("admin");
  return adminIndex >= 0 ? (parts[adminIndex + 1] || "admin") : "admin";
}

function summaryFromRequest(req) {
  const status = req.body?.status ? `status → ${String(req.body.status)}` : "";
  const blocked = req.body?.isBlocked !== undefined ? `blocked → ${Boolean(req.body.isBlocked)}` : "";
  const title = req.body?.title ? `item: ${String(req.body.title).slice(0, 120)}` : "";
  const city = req.body?.city ? `location: ${String(req.body.city).slice(0, 100)}` : "";
  return [status, blocked, title, city].filter(Boolean).join(" · ").slice(0, 500);
}

export function adminAudit(req, res, next) {
  const method = req.method.toUpperCase();
  if (!actionByMethod[method]) return next();

  res.on("finish", () => {
    if (!req.admin?.email || res.statusCode >= 400) return;

    ActivityLog.create({
      actorEmail: req.admin.email,
      action: actionByMethod[method],
      resource: resourceFromPath(req.originalUrl),
      path: req.originalUrl,
      method,
      statusCode: res.statusCode,
      summary: summaryFromRequest(req),
      ip: req.ip || req.socket?.remoteAddress || "",
      userAgent: String(req.headers["user-agent"] || "").slice(0, 500),
    }).catch((error) => {
      console.error("[audit] Unable to save admin activity", error.message);
    });
  });

  next();
}
