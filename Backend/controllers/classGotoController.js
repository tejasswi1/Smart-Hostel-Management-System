const ClassGoto = require("../models/ClassGoto");

// =====================================================
// STUDENT → GO TO CLASS
// =====================================================

exports.go = async (req, res) => {
  try {
    // Check if student already has an active OUT entry
    const existingEntry = await ClassGoto.findOne({
      student: req.user.id,
      inTime: null,
    });

    if (existingEntry) {
      return res.status(400).json({
        msg: "You are already marked OUT. Please return first.",
      });
    }

    const now = new Date();

    const entry = await ClassGoto.create({
      student: req.user.id,
      outTime: now,
      date: now.toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata",
      }),
    });

    res.status(201).json({
      msg: "Class entry started",
      entry,
    });
  } catch (err) {
    console.error("CLASS GOTO ERROR:", err);

    res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
};


// =====================================================
// STUDENT → RETURN
// =====================================================

exports.returnBack = async (req, res) => {
  try {
    const entry = await ClassGoto.findOne({
      student: req.user.id,
      inTime: null,
    }).sort({ createdAt: -1 });

    if (!entry) {
      return res.status(400).json({
        msg: "No active class entry",
      });
    }

    entry.inTime = new Date();
    entry.isAlert = false;

    await entry.save();

    res.json({
      msg: "Returned successfully",
      entry,
    });
  } catch (err) {
    console.error("CLASS RETURN ERROR:", err);

    res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
};


// =====================================================
// AUTO DETECT UNRETURNED STUDENTS
// Runs every 10 minutes from server.js
// =====================================================

exports.detectAlerts = async () => {
  try {
    const now = new Date();

    const istParts = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(now);

    const hour = Number(
      istParts.find((p) => p.type === "hour").value
    );

    const minute = Number(
      istParts.find((p) => p.type === "minute").value
    );

    
    const currentMinutes = hour * 60 + minute;

// 5:00 PM
const cutoffMinutes = 20 * 60;

if (currentMinutes < cutoffMinutes) {
  return;
}

    const records = await ClassGoto.find({
      inTime: null,
      isAlert: false,
    });

    for (const record of records) {
      record.isAlert = true;
      await record.save();
    }

    console.log(
      `🚨 ClassGoto: ${records.length} unreturned entries marked as alerts`
    );
  } catch (err) {
    console.error("CLASS GOTO ALERT ERROR:", err);
  }
};


// =====================================================
// STUDENT → ALERTS
// =====================================================

exports.studentAlerts = async (req, res) => {
  try {
    const alerts = await ClassGoto.find({
      student: req.user.id,
      isAlert: true,
      inTime: null,
    }).sort({ createdAt: -1 });

    res.json(alerts);
  } catch (err) {
    console.error("STUDENT ALERT ERROR:", err);

    res.status(500).json({
      msg: "Server error",
    });
  }
};


// =====================================================
// WARDEN → ALERTS
// =====================================================

exports.wardenAlerts = async (req, res) => {
  try {
    const alerts = await ClassGoto.find({
      isAlert: true,
      inTime: null,
    })
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    res.json(alerts);
  } catch (err) {
    console.error("WARDEN ALERT ERROR:", err);

    res.status(500).json({
      msg: "Server error",
    });
  }
};


// =====================================================
// WARDEN → ONLY UNRETURNED
// =====================================================

exports.unreturned = async (req, res) => {
  try {
    const records = await ClassGoto.find({
      inTime: null,
    })
      .populate("student", "name email")
      .sort({ outTime: -1 });

    res.json(records);
  } catch (err) {
    console.error("UNRETURNED ERROR:", err);

    res.status(500).json({
      msg: "Server error",
    });
  }
};


// =====================================================
// GUARD → ALL RECORDS
// =====================================================

exports.records = async (req, res) => {
  try {
    const records = await ClassGoto.find()
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    res.json(records);
  } catch (err) {
    console.error("RECORDS ERROR:", err);

    res.status(500).json({
      msg: "Server error",
    });
  }
};


// =====================================================
// STUDENT → MY RECORDS
// =====================================================

exports.myRecords = async (req, res) => {
  try {
    const records = await ClassGoto.find({
      student: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(records);
  } catch (err) {
    console.error("MY RECORDS ERROR:", err);

    res.status(500).json({
      msg: "Server error",
    });
  }
};