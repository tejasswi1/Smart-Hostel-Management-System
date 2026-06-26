const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: ["Electricity", "Water", "Furniture", "WiFi", "Other"],
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    photo: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending","resolved"],
      default:"pending",
      lowercase:true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
