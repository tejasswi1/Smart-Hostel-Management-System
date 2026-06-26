const mongoose = require("mongoose");

const movementSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["OUT", "IN"],
      default: "OUT",
    },
    time: {
      type: Date,
      default: Date.now, // ✅ pass function reference
    },
  },
  { timestamps: true } // optional: tracks createdAt and updatedAt
);

module.exports = mongoose.model("Movement", movementSchema);
