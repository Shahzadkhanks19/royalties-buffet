import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    city: { type: String, required: true, trim: true, maxlength: 100 },
    region: { type: String, required: true, trim: true, maxlength: 120 },
    area: { type: String, required: true, trim: true, maxlength: 180 },
    address: { type: String, trim: true, maxlength: 300, default: "" },
    phone: { type: String, trim: true, maxlength: 40, default: "" },
    email: { type: String, trim: true, lowercase: true, maxlength: 160, default: "" },
    lunchHours: { type: String, trim: true, maxlength: 80, default: "" },
    dinnerHours: { type: String, trim: true, maxlength: 80, default: "" },
    mapUrl: { type: String, trim: true, maxlength: 2000, default: "" },
    image: { type: String, required: true, trim: true, maxlength: 2000 },
    description: { type: String, required: true, trim: true, maxlength: 800 },
    services: [{ type: String, trim: true, maxlength: 120 }],
    sortOrder: { type: Number, default: 0, index: true },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

locationSchema.index({ city: 1, region: 1 }, { unique: true });

export default mongoose.models.Location || mongoose.model("Location", locationSchema);
