import app from "../server/app.js";
import { initializePersistence } from "../server/bootstrap.js";

export default async function gateway(req, res) {
  try {
    const pathValue = Array.isArray(req.query?.path) ? req.query.path.join("/") : String(req.query?.path || "");
    const query = new URLSearchParams();

    for (const [key, value] of Object.entries(req.query || {})) {
      if (key === "path") continue;
      if (Array.isArray(value)) {
        for (const entry of value) query.append(key, String(entry));
      } else if (value !== undefined) {
        query.set(key, String(value));
      }
    }

    req.url = `/api/${pathValue}${query.size ? `?${query.toString()}` : ""}`;
    req.originalUrl = req.url;

    // Vercel may provide an already parsed request body. Mark it so the
    // Express app can skip reparsing the consumed request stream.
    if (req.body !== undefined && req.body !== null) req.vercelParsedBody = true;

    await initializePersistence();
    return app(req, res);
  } catch (error) {
    console.error("Vercel function bootstrap failed", error);
    if (!res.headersSent) {
      return res.status(500).json({ ok: false, message: "Service initialization failed." });
    }
    return undefined;
  }
}
