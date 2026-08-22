import mongoose from "mongoose";

const adminAccountSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 160 },
    passwordHash: { type: String, required: true },
    sessionVersion: { type: Number, default: 1 },
    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export default mongoose.models.AdminAccount || mongoose.model("AdminAccount", adminAccountSchema);
