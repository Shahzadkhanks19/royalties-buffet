import mongoose from "mongoose";

const adminPasswordResetSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    tokenHash: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
  },
  { timestamps: true },
);

export default mongoose.models.AdminPasswordReset || mongoose.model("AdminPasswordReset", adminPasswordResetSchema);
