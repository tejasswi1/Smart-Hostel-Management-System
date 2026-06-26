const mongoose = require("mongoose");

const messBillSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    month: { type: String, required: true }, // YYYY-MM
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["DEDUCTED"],
      default: "DEDUCTED",
    },
  },
  { timestamps: true }
);

messBillSchema.index({ student: 1, month: 1 }, { unique: true });

module.exports = mongoose.model("MessBill", messBillSchema);