const Complaint = require("../models/Complaint");
const createAuditLog = require("../utils/createAuditLog");
const createNotification = require("../utils/createNotification");

// Student creates a complaint
const createComplaint = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const complaint = await Complaint.create({
      student: req.user.id,
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      photo: req.file ? req.file.path : null,
      status: "pending",
    });

    console.log("PHOTO URL:", complaint.photo);
    console.log("STATUS SAVED:", complaint.status);

    await createAuditLog(
      req.user.id,
      "COMPLAINT_SUBMITTED",
      `Complaint ID: ${complaint._id}`
    );

    res.status(201).json({
      msg: "Complaint submitted",
      complaint,
    });

  } catch (err) {
    console.error("CREATE COMPLAINT ERROR:", err);

    res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
};
// Student views own complaints
const myComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ student: req.user.id });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Warden views all complaints
const allComplaints = async (req, res) => {
  console.log("warden api hit",req.user.role);
  try {
    const complaints = await Complaint.find().populate(
      "student",
      "name email"
    );
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Warden resolves complaint
const resolveComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: "resolved"},
      { new: true }
    ).populate("student");

    if (!complaint)
      return res.status(404).json({ msg: "Complaint not found" });

    await createNotification(
      complaint.student._id,
      "Your hostel complaint has been resolved."
    );

    await createAuditLog(
      req.user.id,
      "COMPLAINT_RESOLVED",
      `Complaint ID: ${complaint._id}`
    );

    res.json({ msg: "Complaint resolved", complaint });
  } catch (err) {
    console.error("RESOLVE ERROR:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

module.exports = {
  createComplaint,
  myComplaints,
  allComplaints,
  resolveComplaint,
};