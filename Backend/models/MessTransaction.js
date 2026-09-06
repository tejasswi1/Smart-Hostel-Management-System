const mongoose = require("mongoose");

const messTransactionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      default: 100,
    },

    mealDate: {
      type: String,
      required: true,
    },

    month: {
      type: String,
      required: true,
    },

    balanceAfter: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["SUCCESS"],
      default: "SUCCESS",
    },
  },
  {
    timestamps: true,
  }
);

// Only ONE meal per student per day
messTransactionSchema.index(
  { student: 1, mealDate: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "MessTransaction",
  messTransactionSchema
);