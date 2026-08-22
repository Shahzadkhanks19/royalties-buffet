import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    outlet: { type: String, required: true, trim: true, maxlength: 120 },
    guestCount: { type: String, required: true, trim: true, maxlength: 40 },
    occasion: { type: String, required: true, trim: true, maxlength: 80 },
    preference: { type: String, required: true, trim: true, maxlength: 80 },
    date: { type: String, required: true, trim: true, maxlength: 20 },
    time: { type: String, required: true, trim: true, maxlength: 20 },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, required: true, trim: true, maxlength: 10 },
    email: { type: String, trim: true, lowercase: true, maxlength: 160, default: "" },
    requests: { type: String, trim: true, maxlength: 1000, default: "" },
    status: { type: String, enum: ["pending", "confirmed", "cancelled", "completed"], default: "pending", index: true },
    adminNotes: { type: String, trim: true, maxlength: 3000, default: "" },
    isArchived: { type: Boolean, default: false, index: true },
    source: { type: String, default: "website" },
  },
  { timestamps: true },
);

reservationSchema.index({ date: 1, outlet: 1, status: 1 });
reservationSchema.index({ createdAt: -1 });

export default mongoose.models.Reservation || mongoose.model("Reservation", reservationSchema);
