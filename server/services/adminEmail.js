import { env } from "../config/env.js";

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function resetEmailTemplate(resetUrl) {
  const safeResetUrl = escapeHtml(resetUrl);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <title>Reset your Royalties Buffet admin password</title>
  </head>
  <body style="margin:0;padding:0;background:#eee6d8;font-family:Arial,Helvetica,sans-serif;color:#17130e;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Securely reset your Royalties Buffet admin password. This link expires in 30 minutes.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#eee6d8;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:620px;background:#fffaf2;border:1px solid #ded1bd;">
            <tr>
              <td style="background:#090909;padding:28px 32px;text-align:center;border-bottom:3px solid #d8ab4d;">
                <div style="font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:34px;font-weight:700;color:#f5e4b8;letter-spacing:.4px;">ROYALTIES BUFFET</div>
                <div style="margin-top:7px;font-size:10px;line-height:16px;font-weight:700;color:#d8ab4d;letter-spacing:3px;text-transform:uppercase;">Admin Security</div>
              </td>
            </tr>
            <tr>
              <td style="padding:38px 34px 18px;">
                <div style="font-size:11px;line-height:18px;font-weight:700;color:#9a7026;letter-spacing:2px;text-transform:uppercase;">Password Reset Request</div>
                <h1 style="margin:10px 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:34px;line-height:41px;font-weight:700;color:#17130e;">Reset your admin password</h1>
                <p style="margin:0;font-size:15px;line-height:25px;color:#655b4e;">We received a request to reset the password for your Royalties Buffet administrator account. Use the secure button below to choose a new password.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 34px 24px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="background:#d8ab4d;">
                      <a href="${safeResetUrl}" style="display:inline-block;padding:15px 24px;font-size:12px;line-height:16px;font-weight:800;color:#120f09;text-decoration:none;letter-spacing:1.4px;text-transform:uppercase;">Reset Password</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 34px 32px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#f3ecdf;border-left:3px solid #d8ab4d;">
                  <tr>
                    <td style="padding:17px 18px;">
                      <div style="font-size:12px;line-height:19px;font-weight:700;color:#3f382f;">This secure link expires in 30 minutes.</div>
                      <div style="margin-top:4px;font-size:12px;line-height:19px;color:#776b5c;">For your security, a successful password reset will invalidate previously issued admin sessions.</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 34px 34px;">
                <p style="margin:0 0 8px;font-size:12px;line-height:20px;color:#837768;">If the button does not work, copy and paste this link into your browser:</p>
                <p style="margin:0;word-break:break-all;font-size:11px;line-height:18px;color:#9a7026;">${safeResetUrl}</p>
              </td>
            </tr>
            <tr>
              <td style="background:#17130e;padding:22px 32px;text-align:center;">
                <p style="margin:0;font-size:11px;line-height:18px;color:#b9aa94;">If you did not request this password reset, no action is required.</p>
                <p style="margin:8px 0 0;font-size:10px;line-height:16px;color:#d8ab4d;letter-spacing:1.6px;text-transform:uppercase;">Royalties Buffet · Delhi NCR</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function resetEmailText(resetUrl) {
  return [
    "ROYALTIES BUFFET - ADMIN SECURITY",
    "",
    "Reset your admin password",
    "",
    "We received a request to reset the password for your Royalties Buffet administrator account.",
    `Reset password: ${resetUrl}`,
    "",
    "This secure link expires in 30 minutes.",
    "A successful password reset will invalidate previously issued admin sessions.",
    "",
    "If you did not request this password reset, no action is required.",
    "",
    "Royalties Buffet · Delhi NCR",
  ].join("\n");
}

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
      html: resetEmailTemplate(resetUrl),
      text: resetEmailText(resetUrl),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Unable to send reset email: ${body}`);
  }

  return { delivered: true };
}
