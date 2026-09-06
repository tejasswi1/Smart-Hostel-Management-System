const express = require("express");

const router = express.Router();

const {
  getWardenAnalytics,
} = require("../controllers/analyticsController");

router.get("/warden", getWardenAnalytics);

module.exports = router;