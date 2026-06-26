const NightEntry = require("../models/NightEntry");

// Student submits night entry
exports.submit = async (req, res) => {
  try {
console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    const { reason, lat, long } = req.body;

const photo = req.file ? req.file.path : null;

    const now = new Date();
    const hr = now.getHours();

    // Example time check (adjust as needed)
    if (hr < 0 || hr > 23) {
      return res.status(403).json({ msg: "Night entry closed" });
    }

    const entry = new NightEntry({
      student: req.user.id,
      reason,
      lat,
      long,
      photo,
      date: now.toISOString().split("T")[0],
      time: now.toTimeString().split(" ")[0],
      status: "PENDING",
      approvedByGuard: false,
      approvedByWarden: false
    });

    await entry.save();
    res.json({ msg: "Night entry submitted", entry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Guard approves night entry
exports.guardApprove = async (req, res) => {
  try {
    const entry = await NightEntry.findById(req.params.id);
    if (!entry) return res.status(404).json({ msg: "Entry not found" });

    entry.approvedByGuard = true;
    entry.status = "GUARD_OK";
    entry.guardRemark = req.body.remark || "";

    await entry.save();
    res.json({ msg: "Guard approved", entry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Warden approves night entry
exports.wardenApprove = async (req, res) => {
  try {
    const entry = await NightEntry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ msg: "Entry not found" });
    }

    if (entry.status !== "GUARD_OK") {
      return res.status(400).json({ msg: "Entry not approved by guard yet" });
    }

    entry.approvedByWarden = true;
    entry.status = "APPROVED";
    entry.wardenRemark = req.body.remark || "";

    await entry.save();

    res.json({
      msg: "Night entry approved by warden",
      entry,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
//warden rejects
exports.wardenReject = async (req, res) => {
  try {
    const entry = await NightEntry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ msg: "Entry not found" });
    }

    entry.status = "REJECTED";
    entry.wardenRemark = req.body.remark || "Rejected by warden";

    await entry.save();

    res.json({
      msg: "Night entry rejected by warden",
      entry,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
//pending of warden
exports.wardenPending = async (req, res) => {
  try {
    const entries = await NightEntry.find({ status: "GUARD_OK" })
      .populate("student", "name email");

    res.json(entries);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
// List all pending night entries (guard/warden)
exports.pendingList = async (req, res) => {
  try {
    if (!["guard", "warden"].includes(req.user.role)) {
      return res.status(403).json({ msg: "Access denied" });
    }

    const data = await NightEntry.find({ status: "PENDING" })
      .populate("student", "name email");

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// List all night entries of the logged-in student
exports.myEntries = async (req, res) => {
  try {
    const data = await NightEntry.find({ student: req.user.id })
      .sort({ createdAt: -1 })
      .populate("student", "name email");

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};



