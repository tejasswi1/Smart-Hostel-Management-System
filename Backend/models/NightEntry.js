const mongoose = require("mongoose");

const nightEntrySchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  reason: {
    type: String,
    default:"",
    trim: true
  },

  lat: {
    type: Number,
    required: true
  },

  long: {
    type: Number,
    required: true
  },

  photo: {
    type: String,
    default: ""
  },

  date: {
    type: String,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  approvedByGuard: {
    type: Boolean,
    default: false
  },

  approvedByWarden: {
    type: Boolean,
    default: false
  },

  guardRemark: {
    type: String,
    default: ""
  },

  wardenRemark: {
    type: String,
    default: ""
  },

  status: {
    type: String,
    enum: ["PENDING", "GUARD_OK", "APPROVED", "REJECTED"],
    default: "PENDING"
  },

  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model("NightEntry", nightEntrySchema);