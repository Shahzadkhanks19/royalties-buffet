import mongoose from "mongoose";

const cateringLeadSchema = new mongoose.Schema(
  {
    event: { type: String, required: true, trim: true, maxlength: 80 },
    guests: { type: String, required: true, trim: true, maxlength: 60 },
    area: { type: String, required: true, trim: true, maxlength: 100 },
    service: { type: String, required: true, trim: true, maxlength: 100 },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, required: true, trim: true, maxlength: 10 },
    email: { type: String, trim: true, lowercase: true, maxlength: 160, default: "" },
    venue: { type: String, trim: true, maxlength: 180, default: "" },
    notes: { type: String, trim: true, maxlength: 2500, default: "" },
    status: { type: String, enum: ["new", "contacted", "qualified", "proposal", "won", "lost"], default: "new", index: true },
    source: { type: String, default: "website" },
  },
  { timestamps: true },
);

cateringLeadSchema.index({ createdAt: -1 });

export default mongoose.models.CateringLead || mongoose.model("CateringLead", cateringLeadSchema);
