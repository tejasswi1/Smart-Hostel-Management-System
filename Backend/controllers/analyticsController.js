const User = require("../models/User");
const NightEntry = require("../models/NightEntry");
const Complaint = require("../models/Complaint");
const MessBill = require("../models/MessBill");

exports.getWardenAnalytics = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalNightEntries = await NightEntry.countDocuments();
    const pendingNightEntries = await NightEntry.countDocuments({
      approvedByWarden: false,
    });
    const totalComplaints = await Complaint.countDocuments();
    const pendingComplaints = await Complaint.countDocuments({
      status: "Pending",
    });
    const paidBills = await MessBill.countDocuments({ paid: true });
    const unpaidBills = await MessBill.countDocuments({ paid: false });

    res.json({
      totalStudents,
      totalNightEntries,
      pendingNightEntries,
      totalComplaints,
      pendingComplaints,
      paidBills,
      unpaidBills,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
