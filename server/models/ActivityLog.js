import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    actorEmail: { type: String, trim: true, lowercase: true, maxlength: 160, default: "" },
    action: { type: String, required: true, trim: true, maxlength: 80, index: true },
    resource: { type: String, required: true, trim: true, maxlength: 80, index: true },
    path: { type: String, trim: true, maxlength: 500, default: "" },
    method: { type: String, trim: true, maxlength: 12, default: "" },
    statusCode: { type: Number, default: 200 },
    summary: { type: String, trim: true, maxlength: 500, default: "" },
    ip: { type: String, trim: true, maxlength: 120, default: "" },
    userAgent: { type: String, trim: true, maxlength: 500, default: "" },
  },
  { timestamps: true },
);

activityLogSchema.index({ createdAt: -1 });
activityLogSchema.index({ resource: 1, createdAt: -1 });

export default mongoose.models.ActivityLog || mongoose.model("ActivityLog", activityLogSchema);
