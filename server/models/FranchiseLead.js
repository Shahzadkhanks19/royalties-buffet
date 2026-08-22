import mongoose from "mongoose";

const franchiseLeadSchema = new mongoose.Schema(
  {
    city: { type: String, required: true, trim: true, maxlength: 100 },
    investment: { type: String, required: true, trim: true, maxlength: 80 },
    experience: { type: String, required: true, trim: true, maxlength: 120 },
    site: { type: String, required: true, trim: true, maxlength: 100 },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, required: true, trim: true, maxlength: 10 },
    email: { type: String, trim: true, lowercase: true, maxlength: 160, default: "" },
    company: { type: String, trim: true, maxlength: 160, default: "" },
    message: { type: String, trim: true, maxlength: 2500, default: "" },
    status: { type: String, enum: ["new", "contacted", "qualified", "discussion", "approved", "rejected"], default: "new", index: true },
    source: { type: String, default: "website" },
  },
  { timestamps: true },
);

franchiseLeadSchema.index({ createdAt: -1 });

export default mongoose.models.FranchiseLead || mongoose.model("FranchiseLead", franchiseLeadSchema);
