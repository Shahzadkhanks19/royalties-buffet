import mongoose from "mongoose";

const contactEnquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, required: true, trim: true, maxlength: 10 },
    email: { type: String, trim: true, lowercase: true, maxlength: 160, default: "" },
    subject: { type: String, required: true, trim: true, maxlength: 80 },
    outlet: { type: String, required: true, trim: true, maxlength: 120 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    status: { type: String, enum: ["new", "in-progress", "resolved", "closed"], default: "new", index: true },
    source: { type: String, default: "website" },
  },
  { timestamps: true },
);

contactEnquirySchema.index({ createdAt: -1 });

export default mongoose.models.ContactEnquiry || mongoose.model("ContactEnquiry", contactEnquirySchema);
