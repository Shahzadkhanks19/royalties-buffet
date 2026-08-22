import { env } from "../config/env.js";
import AdminAccount from "../models/AdminAccount.js";
import { hashPassword } from "../utils/password.js";

export async function seedAdminAccount() {
  if (!env.adminEmail || !env.adminPassword) {
    console.warn("[admin] ADMIN_EMAIL / ADMIN_PASSWORD are not configured.");
    return;
  }

  const email = env.adminEmail.toLowerCase();
  const existing = await AdminAccount.findOne({ email });
  if (existing) return;

  await AdminAccount.create({ email, passwordHash: hashPassword(env.adminPassword) });
  console.log(`[admin] Seeded initial admin account for ${email}`);
}
