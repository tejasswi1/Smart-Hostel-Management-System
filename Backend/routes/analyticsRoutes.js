const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware"); // ✅ fixed import
const role = require("../middleware/roleMiddleware"); // ✅ fixed import
const { getWardenAnalytics } = require("../controllers/analyticsController");

// Warden analytics
router.get("/warden", auth, role("warden"), getWardenAnalytics);

module.exports = router;
