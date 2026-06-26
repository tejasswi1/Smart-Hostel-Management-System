const AuditLog = require("../models/AuditLog");

// createAuditLog(userId, action, details)
const createAuditLog = async (userId, action, details = "") => {
  try {
    await AuditLog.create({
      user: userId,   // ✅ fixed
      action,         // ✅ fixed
      details,
    });
  } catch (err) {
    console.error("Failed to create audit log:", err);
  }
};

module.exports = createAuditLog;
