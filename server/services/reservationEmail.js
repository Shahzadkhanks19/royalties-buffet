import { env } from "../config/env.js";

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function detailsRows(reservation) {
  const rows = [
    ["Outlet", reservation.outlet],
    ["Date", reservation.date],
    ["Time", reservation.time],
    ["Guests", reservation.guestCount],
    ["Occasion", reservation.occasion],
  ];

  return rows.map(([label, value]) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e7dccb;font-size:12px;font-weight:700;color:#8d7c66;text-transform:uppercase;letter-spacing:1px;">${escapeHtml(label)}</td>
      <td align="right" style="padding:10px 0;border-bottom:1px solid #e7dccb;font-size:14px;font-weight:700;color:#211b14;">${escapeHtml(value || "—")}</td>
    </tr>`).join("");
}

const copy = {
  received: {
    eyebrow: "Reservation Request Received",
    heading: "Your table request is with us.",
    intro: "Thank you for choosing Royalties Buffet. We have received your reservation request and our team will review it shortly.",
    note: "This is a request acknowledgement, not yet a final confirmation.",
    subject: "We received your Royalties Buffet reservation request",
  },
  confirmed: {
    eyebrow: "Reservation Confirmed",
    heading: "Your table is confirmed.",
    intro: "Your Royalties Buffet reservation has been confirmed. We look forward to welcoming you for a memorable buffet experience.",
    note: "Please arrive close to your reserved time. For changes, contact the restaurant team.",
    subject: "Your Royalties Buffet reservation is confirmed",
  },
  rescheduled: {
    eyebrow: "Reservation Rescheduled",
    heading: "Your reservation has been updated.",
    intro: "Your Royalties Buffet reservation has been moved to the updated date and time shown below.",
    note: "The previous reservation slot is no longer held for your booking.",
    subject: "Your Royalties Buffet reservation has been rescheduled",
  },
  cancelled: {
    eyebrow: "Reservation Cancelled",
    heading: "Your reservation has been cancelled.",
    intro: "Your Royalties Buffet reservation has been cancelled and the table has been released.",
    note: "We would be delighted to host you another time. You can place a new reservation request whenever convenient.",
    subject: "Your Royalties Buffet reservation has been cancelled",
  },
};

function template(type, reservation) {
  const meta = copy[type];
  const name = escapeHtml(reservation.name || "Guest");
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="color-scheme" content="light"/><title>${escapeHtml(meta.subject)}</title></head>
<body style="margin:0;padding:0;background:#eee6d8;font-family:Arial,Helvetica,sans-serif;color:#17130e;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(meta.intro)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#eee6d8;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:620px;background:#fffaf2;border:1px solid #ded1bd;">
        <tr><td style="background:#090909;padding:28px 32px;text-align:center;border-bottom:3px solid #d8ab4d;">
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:34px;font-weight:700;color:#f5e4b8;letter-spacing:.4px;">ROYALTIES BUFFET</div>
          <div style="margin-top:7px;font-size:10px;line-height:16px;font-weight:700;color:#d8ab4d;letter-spacing:3px;text-transform:uppercase;">Premium Buffet Experience</div>
        </td></tr>
        <tr><td style="padding:38px 34px 20px;">
          <div style="font-size:11px;line-height:18px;font-weight:700;color:#9a7026;letter-spacing:2px;text-transform:uppercase;">${escapeHtml(meta.eyebrow)}</div>
          <h1 style="margin:10px 0 14px;font-family:Georgia,'Times New Roman',serif;font-size:34px;line-height:41px;font-weight:700;color:#17130e;">${escapeHtml(meta.heading)}</h1>
          <p style="margin:0 0 10px;font-size:15px;line-height:25px;color:#655b4e;">Hello ${name},</p>
          <p style="margin:0;font-size:15px;line-height:25px;color:#655b4e;">${escapeHtml(meta.intro)}</p>
        </td></tr>
        <tr><td style="padding:6px 34px 30px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;">${detailsRows(reservation)}</table>
        </td></tr>
        <tr><td style="padding:0 34px 34px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#f3ecdf;border-left:3px solid #d8ab4d;"><tr><td style="padding:17px 18px;font-size:12px;line-height:20px;color:#655b4e;">${escapeHtml(meta.note)}</td></tr></table>
        </td></tr>
        <tr><td style="background:#17130e;padding:22px 32px;text-align:center;">
          <p style="margin:0;font-size:11px;line-height:18px;color:#b9aa94;">Thank you for choosing Royalties Buffet.</p>
          <p style="margin:8px 0 0;font-size:10px;line-height:16px;color:#d8ab4d;letter-spacing:1.6px;text-transform:uppercase;">Royalties Buffet · Delhi NCR</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function plainText(type, reservation) {
  const meta = copy[type];
  return [
    "ROYALTIES BUFFET",
    "",
    meta.heading,
    `Hello ${reservation.name || "Guest"},`,
    meta.intro,
    "",
    `Outlet: ${reservation.outlet}`,
    `Date: ${reservation.date}`,
    `Time: ${reservation.time}`,
    `Guests: ${reservation.guestCount}`,
    `Occasion: ${reservation.occasion}`,
    "",
    meta.note,
    "",
    "Royalties Buffet · Delhi NCR",
  ].join("\n");
}

export async function sendReservationEmail(type, reservation) {
  if (!reservation?.email || !copy[type]) return { delivered: false, skipped: true };
  if (!env.resendApiKey || !env.adminFromEmail) {
    if (env.nodeEnv !== "production") console.log(`[email] Skipped ${type} reservation email for ${reservation.email}: Resend not configured.`);
    return { delivered: false, skipped: true };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.resendApiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.adminFromEmail,
      to: [reservation.email],
      subject: copy[type].subject,
      html: template(type, reservation),
      text: plainText(type, reservation),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Reservation email failed: ${body}`);
  }
  return { delivered: true };
}

export function sendReservationEmailSafely(type, reservation) {
  return sendReservationEmail(type, reservation).catch((error) => {
    console.error(`[email] ${type} reservation email failed`, error.message);
    return { delivered: false, error: error.message };
  });
}
