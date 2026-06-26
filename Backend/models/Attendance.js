const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    present: {
      type: Boolean,
      default: false,
    },
    month: {
      type: String, // format: YYYY-MM
      required: true,
    },
  },
  { timestamps: true }
);

// prevent duplicate attendance for same student + date
attendanceSchema.index({ student: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);