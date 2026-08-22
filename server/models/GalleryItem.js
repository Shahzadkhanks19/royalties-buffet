import mongoose from "mongoose";

const galleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    category: { type: String, required: true, trim: true, index: true },
    size: { type: String, required: true, enum: ["standard", "wide", "tall"], default: "standard" },
    image: { type: String, required: true, trim: true },
    sortOrder: { type: Number, default: 0, index: true },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

galleryItemSchema.index({ title: 1, category: 1 }, { unique: true });

export default mongoose.models.GalleryItem || mongoose.model("GalleryItem", galleryItemSchema);
