import mongoose from "mongoose";

const reservationAvailabilitySchema = new mongoose.Schema(
  {
    outlet: { type: String, required: true, trim: true, maxlength: 120, index: true },
    date: { type: String, required: true, trim: true, maxlength: 20, index: true },
    time: { type: String, required: true, trim: true, maxlength: 20 },
    capacity: { type: Number, required: true, min: 1, max: 1000, default: 40 },
    isBlocked: { type: Boolean, default: false, index: true },
    note: { type: String, trim: true, maxlength: 300, default: "" },
  },
  { timestamps: true },
);

reservationAvailabilitySchema.index({ outlet: 1, date: 1, time: 1 }, { unique: true });

export default mongoose.models.ReservationAvailability || mongoose.model("ReservationAvailability", reservationAvailabilitySchema);
