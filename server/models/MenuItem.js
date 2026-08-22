import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    category: { type: String, required: true, trim: true, index: true },
    type: { type: String, required: true, enum: ["veg", "non-veg"], index: true },
    protein: { type: String, trim: true, default: "" },
    copy: { type: String, required: true, trim: true, maxlength: 600 },
    image: { type: String, required: true, trim: true },
    sortOrder: { type: Number, default: 0, index: true },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

menuItemSchema.index({ title: 1, category: 1 }, { unique: true });

export default mongoose.models.MenuItem || mongoose.model("MenuItem", menuItemSchema);
