
// models/activity.model.js
import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true,
  },
  status: {
    type: String, // "out" or "in"
    enum: ["out", "in"],
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  }
},
{
    timestamps:true
});

export const Activity = mongoose.model("Activity", activitySchema);
