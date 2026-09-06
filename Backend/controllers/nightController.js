const NightEntry = require("../models/NightEntry");
const createAuditLog = require("../utils/createAuditLog");
const createNotification = require("../utils/createNotification");

// ================= HOSTEL LOCATION =================
const HOSTEL_LAT = 26.7321546; // 🔴 Replace with actual hostel latitude
const HOSTEL_LONG = 83.4315236; // 🔴 Replace with actual hostel longitude

const MAX_DISTANCE = 200; // metres


// ================= DISTANCE CALCULATION =================
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Earth radius in metres

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c =
    2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};


// ================= STUDENT SUBMITS =================
exports.submit = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { reason, lat, long } = req.body;

    // Required fields
 if (!lat || !long) {
  return res.status(400).json({
    msg: "Location is required",
  });
}

if (!req.file) {
  return res.status(400).json({
    msg: "Selfie is required",
  });
}

    // ================= TIME CHECK =================


const now = new Date();

const istTime = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
}).formatToParts(now);

const hour = Number(
  istTime.find((part) => part.type === "hour").value
);

const minute = Number(
  istTime.find((part) => part.type === "minute").value
);

const currentMinutes = hour * 60 + minute;

console.log("=================================");
console.log("SERVER CURRENT TIME:", now);
console.log("IST HOUR:", hour);
console.log("IST MINUTE:", minute);
console.log("IST TOTAL MINUTES:", currentMinutes);
console.log("=================================");

if (currentMinutes < 1200 || currentMinutes >= 1320) {
  return res.status(403).json({
    msg: "Night entry is allowed only between 8 PM and 10 PM",
    serverISTTime: `${hour}:${String(minute).padStart(2, "0")}`,
  });
}


    // ================= LOCATION CHECK =================
    const studentLat = Number(lat);
    const studentLong = Number(long);

    if (
      Number.isNaN(studentLat) ||
      Number.isNaN(studentLong)
    ) {
      return res.status(400).json({
        msg: "Invalid GPS coordinates",
      });
    }

    const distance = getDistance(
      studentLat,
      studentLong,
      HOSTEL_LAT,
      HOSTEL_LONG
    );
    const isInsideHostel = distance <= MAX_DISTANCE;
        console.log("Student distance from hostel:", distance, "metres");
if (!isInsideHostel && !reason?.trim()) {
  return res.status(400).json({
    msg: "Reason is required when you are outside the hostel.",
  });
}



    const photo = req.file.path;

    // ================= DUPLICATE CHECK =================
    const existingEntry = await NightEntry.findOne({
      student: req.user.id,
      status: {
        $in: ["PENDING", "GUARD_OK"],
      },
    });

    if (existingEntry) {
      return res.status(400).json({
        msg: "You already have a night entry pending approval.",
      });
    }

    // ================= CREATE ENTRY =================
    const entry = new NightEntry({
      student: req.user.id,
      reason,
      lat: studentLat,
      long: studentLong,
      photo,

      date: now.toISOString().split("T")[0],
      time: now.toTimeString().split(" ")[0],

      status: "PENDING",
      approvedByGuard: false,
      approvedByWarden: false,
    });

    await entry.save();

    // ================= AUDIT =================
    await createAuditLog(
      req.user.id,
      "NIGHT_ENTRY_SUBMITTED",
      `Night entry submitted. Distance from hostel: ${Math.round(
        distance
      )} metres`
    );

    res.status(201).json({
      msg: "Night entry submitted successfully",
      distance: Math.round(distance),
      entry,
    });
  } catch (err) {
    console.error("NIGHT ENTRY SUBMIT ERROR:", err);

    res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
};


// ================= GUARD APPROVES =================
exports.guardApprove = async (req, res) => {
  try {
    const entry = await NightEntry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({
        msg: "Entry not found",
      });
    }

    entry.approvedByGuard = true;
    entry.status = "GUARD_OK";
    entry.guardRemark =
      req.body.remark || "Approved by guard";

    await entry.save();

    // Student notification
    await createNotification(
      entry.student,
      "Your night entry was approved by guard."
    );

    // Audit log
    await createAuditLog(
      req.user.id,
      "GUARD_APPROVED_NIGHT_ENTRY",
      `Night entry ID: ${entry._id}`
    );

    res.json({
      msg: "Guard approved",
      entry,
    });
  } catch (err) {
    console.error("GUARD APPROVAL ERROR:", err);

    res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
};


// ================= WARDEN APPROVES =================
exports.wardenApprove = async (req, res) => {
  try {
    const entry = await NightEntry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({
        msg: "Entry not found",
      });
    }

    if (entry.status !== "GUARD_OK") {
      return res.status(400).json({
        msg: "Entry not approved by guard yet",
      });
    }

    entry.approvedByWarden = true;
    entry.status = "APPROVED";
    entry.wardenRemark =
      req.body.remark || "Approved by warden";

    await entry.save();

    // Student notification
    await createNotification(
      entry.student,
      "Your night entry was approved by warden."
    );

    // Audit log
    await createAuditLog(
      req.user.id,
      "WARDEN_APPROVED_NIGHT_ENTRY",
      `Night entry ID: ${entry._id}`
    );

    res.json({
      msg: "Night entry approved by warden",
      entry,
    });
  } catch (err) {
    console.error("WARDEN APPROVAL ERROR:", err);

    res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
};


// ================= WARDEN REJECTS =================
exports.wardenReject = async (req, res) => {
  try {
    const entry = await NightEntry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({
        msg: "Entry not found",
      });
    }

    entry.status = "REJECTED";
    entry.wardenRemark =
      req.body.remark || "Rejected by warden";

    await entry.save();

    // Student notification
    await createNotification(
      entry.student,
      `Your night entry was rejected by warden. Reason: ${entry.wardenRemark}`
    );

    // Audit log
    await createAuditLog(
      req.user.id,
      "WARDEN_REJECTED_NIGHT_ENTRY",
      `Night entry ID: ${entry._id}`
    );

    res.json({
      msg: "Night entry rejected by warden",
      entry,
    });
  } catch (err) {
    console.error("WARDEN REJECT ERROR:", err);

    res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
};


// ================= WARDEN PENDING =================
exports.wardenPending = async (req, res) => {
  try {
    const entries = await NightEntry.find({
      status: "GUARD_OK",
    }).populate("student", "name email");

    res.json(entries);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      msg: "Server error",
    });
  }
};


// ================= GUARD PENDING =================
exports.pendingList = async (req, res) => {
  try {
    if (!["guard", "warden"].includes(req.user.role)) {
      return res.status(403).json({
        msg: "Access denied",
      });
    }

    const data = await NightEntry.find({
      status: "PENDING",
    }).populate("student", "name email");

    res.json(data);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
};


// ================= STUDENT ENTRIES =================
exports.myEntries = async (req, res) => {
  try {
    const data = await NightEntry.find({
      student: req.user.id,
    })
      .sort({ createdAt: -1 })
      .populate("student", "name email");

    res.json(data);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
};


