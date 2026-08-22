import { env } from "../config/env.js";

export async function sendAdminResetEmail(email, resetUrl) {
  if (!env.resendApiKey || !env.adminFromEmail) {
    if (env.nodeEnv !== "production") {
      console.log(`[admin] Password reset URL: ${resetUrl}`);
      return { delivered: false, developmentUrl: resetUrl };
    }
    throw new Error("Password reset email is not configured.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.adminFromEmail,
      to: [email],
      subject: "Reset your Royalties Buffet admin password",
      html: `<div style="font-family:Arial,sans-serif;color:#17130e"><h2>Royalties Buffet Admin</h2><p>A password reset was requested for your admin account.</p><p><a href="${resetUrl}">Reset your password</a></p><p>This link expires in 30 minutes. If you did not request this, you can ignore this email.</p></div>`,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Unable to send reset email: ${body}`);
  }

  return { delivered: true };
}
