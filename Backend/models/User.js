const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "warden", "guard"],
      default: "student",
    },

    // ================= MESS =================

    // Fixed initial mess deposit
    messInitialAmount: {
      type: Number,
      default: 0,
    },

    // Total amount consumed through meals
    messUsedAmount: {
      type: Number,
      default: 0,
    },

    // Remaining amount
    messBalance: {
      type: Number,
      default: 0,
    },

    // Payment screenshot uploaded by student
    messPaymentScreenshot: {
      type: String,
      default: "",
    },

    // Payment approval status
    messPaymentStatus: {
      type: String,
      enum: ["NONE", "PENDING", "APPROVED", "REJECTED"],
      default: "NONE",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);