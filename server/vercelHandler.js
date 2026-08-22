import app from "./app.js";
import { initializePersistence } from "./bootstrap.js";

export default async function vercelHandler(req, res) {
  try {
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
