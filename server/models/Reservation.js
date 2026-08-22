import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    action: { type: String, required: true, trim: true, maxlength: 80 },
    fromStatus: { type: String, trim: true, maxlength: 40, default: "" },
    toStatus: { type: String, trim: true, maxlength: 40, default: "" },
    fromDate: { type: String, trim: true, maxlength: 20, default: "" },
    toDate: { type: String, trim: true, maxlength: 20, default: "" },
    fromTime: { type: String, trim: true, maxlength: 20, default: "" },
    toTime: { type: String, trim: true, maxlength: 20, default: "" },
    note: { type: String, trim: true, maxlength: 500, default: "" },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

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
    history: { type: [historySchema], default: [] },
    isArchived: { type: Boolean, default: false, index: true },
    source: { type: String, default: "website" },
  },
  { timestamps: true },
);

reservationSchema.index({ date: 1, outlet: 1, status: 1 });
reservationSchema.index({ createdAt: -1 });

export default mongoose.models.Reservation || mongoose.model("Reservation", reservationSchema);
