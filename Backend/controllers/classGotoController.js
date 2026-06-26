const ClassGoto = require("../models/ClassGoto")
//student go
exports.go = async (req, res) => {
  const entry = await ClassGoto.create({
    student: req.user.id,
    outTime: new Date(),
    date: new Date().toISOString().slice(0, 10),
  });

  res.json(entry);
};
//student return
exports.returnBack = async (req, res) => {
  const entry = await ClassGoto.findOne({
    student: req.user.id,
    inTime: null,
  }).sort({ createdAt: -1 });

  if (!entry) {
    return res.status(400).json({ msg: "No active entry" });
  }

  entry.inTime = new Date();
  entry.isAlert = false; // clear alert
  await entry.save();

  res.json(entry);
};
//auto detect unreturned entries
exports.detectAlerts = async () => {
  const cutoffHour = 17; // 5 PM

  const records = await ClassGoto.find({
    inTime: null,
  });

  records.forEach(async (r) => {
    if (new Date(r.outTime).getHours() >= cutoffHour) {
      r.isAlert = true;
      await r.save();
    }
  });
};
//student alert
exports.studentAlerts = async (req, res) => {
  const alerts = await ClassGoto.find({
    student: req.user.id,
    isAlert: true,
  });

  res.json(alerts);
};
//warden alert
exports.wardenAlerts = async (req, res) => {
  const alerts = await ClassGoto.find({
    isAlert: true,
  }).populate("student", "name email");

  res.json(alerts);
};

// WARDEN – only unreturned entries
exports.unreturned = async (req, res) => {
  try {
    const records = await ClassGoto.find({
      inTime: null, // 🔴 NOT returned
    }).populate("student", "name email");

    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
//records
exports.records = async (req, res) => {
  const records = await ClassGoto.find()
    .populate("student", "name email");
  res.json(records);
};

exports.myRecords = async (req, res) => {
  try {
    const records = await ClassGoto.find({
      student: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};