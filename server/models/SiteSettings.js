import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true, default: "main" },
    businessName: { type: String, required: true, trim: true, maxlength: 120 },
    regionLabel: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, trim: true, maxlength: 40, default: "" },
    email: { type: String, trim: true, lowercase: true, maxlength: 160, default: "" },
    weekdayHours: { type: String, trim: true, maxlength: 80, default: "" },
    weekendHours: { type: String, trim: true, maxlength: 80, default: "" },
    openingNote: { type: String, trim: true, maxlength: 120, default: "" },
    instagramUrl: { type: String, trim: true, maxlength: 2000, default: "" },
    facebookUrl: { type: String, trim: true, maxlength: 2000, default: "" },
    youtubeUrl: { type: String, trim: true, maxlength: 2000, default: "" },
  },
  { timestamps: true },
);

export default mongoose.models.SiteSettings || mongoose.model("SiteSettings", siteSettingsSchema);
