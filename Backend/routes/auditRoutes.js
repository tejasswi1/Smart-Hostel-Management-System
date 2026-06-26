const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware"); // ✅ fixed import
const role = require("../middleware/roleMiddleware"); // ✅ fixed import
const AuditLog = require("../models/AuditLog");

// Only warden can view audit logs
router.get("/", auth, role("warden"), async (req, res) => {
  try {
    const logs = await AuditLog.find()
      .populate("user", "name role")
      .sort({ createdAt: -1 });

    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch audit logs" });
  }
});

module.exports = router;
