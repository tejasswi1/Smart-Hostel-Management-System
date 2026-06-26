const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true, // remove extra spaces
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // createdAt and updatedAt
);

module.exports = mongoose.model("Notification", notificationSchema);
