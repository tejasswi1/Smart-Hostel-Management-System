const User = require("../models/User");
const NightEntry = require("../models/NightEntry");
const Complaint = require("../models/Complaint");

exports.getWardenAnalytics = async (req, res) => {
  try {
    // ================= STUDENTS =================
    const totalStudents = await User.countDocuments({
      role: "student",
    });

    // ================= NIGHT ENTRIES =================
    const totalNightEntries = await NightEntry.countDocuments();

    const pendingNightEntries = await NightEntry.countDocuments({
      status: {
        $in: ["PENDING", "GUARD_OK"],
      },
    });

    const approvedNightEntries = await NightEntry.countDocuments({
      status: "APPROVED",
    });

    const rejectedNightEntries = await NightEntry.countDocuments({
      status: "REJECTED",
    });

    // ================= COMPLAINTS =================
    const totalComplaints = await Complaint.countDocuments();

    const pendingComplaints = await Complaint.countDocuments({
      status: {
        $regex: /^pending$/i,
      },
    });

    const resolvedComplaints = await Complaint.countDocuments({
      status: {
        $regex: /^resolved$/i,
      },
    });

    // ================= MESS =================
    const approvedMess = await User.countDocuments({
      role: "student",
      messPaymentStatus: "APPROVED",
    });

    const pendingMess = await User.countDocuments({
      role: "student",
      messPaymentStatus: "PENDING",
    });

    const rejectedMess = await User.countDocuments({
      role: "student",
      messPaymentStatus: "REJECTED",
    });

    const unpaidMess = await User.countDocuments({
      role: "student",
      $or: [
        { messPaymentStatus: "NONE" },
        { messPaymentStatus: { $exists: false } },
      ],
    });

    // ================= RESPONSE =================
    res.json({
      students: {
        total: totalStudents,
      },

      nightEntries: {
        total: totalNightEntries,
        pending: pendingNightEntries,
        approved: approvedNightEntries,
        rejected: rejectedNightEntries,
      },

      complaints: {
        total: totalComplaints,
        pending: pendingComplaints,
        resolved: resolvedComplaints,
      },

      mess: {
        approved: approvedMess,
        pending: pendingMess,
        rejected: rejectedMess,
        unpaid: unpaidMess,
      },
    });
  } catch (err) {
    console.error("ANALYTICS ERROR:", err);

    res.status(500).json({
      msg: "Failed to load analytics",
      error: err.message,
    });
  }
};