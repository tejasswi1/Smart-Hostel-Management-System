const mongoose = require("mongoose");

const classGotoSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    outTime: { type: Date, required: true },
    inTime: { type: Date, default: null },

    date: { type: String, required: true },

    // 🔔 ALERT SYSTEM
    isAlert: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ClassGoto", classGotoSchema);