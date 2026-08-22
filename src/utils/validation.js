export const isValidIndianPhone = (value) => /^[6-9]\d{9}$/.test(String(value || "").replace(/\D/g, ""));

export const isValidEmail = (value) => {
  const email = String(value || "").trim();
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateCommonLeadFields = ({ name, phone, email, message, requireMessage = false }) => {
  const errors = {};
  const cleanName = String(name || "").trim();
  const cleanPhone = String(phone || "").replace(/\D/g, "");
  const cleanMessage = String(message || "").trim();

  if (cleanName.length < 2) errors.name = "Please enter at least 2 characters.";
  if (!isValidIndianPhone(cleanPhone)) errors.phone = "Enter a valid 10-digit Indian mobile number.";
  if (!isValidEmail(email)) errors.email = "Enter a valid email address.";
  if (requireMessage && cleanMessage.length < 10) errors.message = "Please enter at least 10 characters.";

  return errors;
};

export const fieldClass = (hasError) => `min-h-12 w-full border bg-black/55 px-4 text-sm text-white outline-none transition placeholder:text-white/28 focus-visible:outline-2 focus-visible:outline-offset-2 ${hasError ? "border-red-400/70 focus:border-red-300 focus-visible:outline-red-400" : "border-[#d8ab4d]/28 focus:border-[#d8ab4d]/65 focus-visible:outline-[#d8ab4d]"}`;

export const textareaClass = (hasError) => `w-full resize-none border bg-black/55 px-4 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-white/28 focus-visible:outline-2 focus-visible:outline-offset-2 ${hasError ? "border-red-400/70 focus:border-red-300 focus-visible:outline-red-400" : "border-[#d8ab4d]/28 focus:border-[#d8ab4d]/65 focus-visible:outline-[#d8ab4d]"}`;
