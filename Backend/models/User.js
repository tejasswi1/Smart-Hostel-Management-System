const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["student", "warden","guard"],
    default: "student"
  },

  advanceAmount: { type: Number, default: 0 },
  usedAmount: { type: Number, default: 0 },

  advancePaymentScreenshot: String,
  advancePaymentStatus: {
    type: String,
    enum: ["NONE", "PENDING", "APPROVED"],
    default: "NONE"
  },
  pendingAdvanceAmount: { type: Number, default: 0 }
});

module.exports = mongoose.model("User", userSchema);