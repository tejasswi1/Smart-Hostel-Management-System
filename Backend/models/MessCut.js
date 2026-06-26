const mongoose = require("mongoose");

const messCutSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fromDate: Date,
  toDate: Date,
  reason: String,
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("MessCut", messCutSchema);
