const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const User = require("../models/User");

router.get(
  "/students",
  auth,
  role("warden"),
  async (req, res) => {
    const students = await User.find({ role: "student" }).select("_id name");
    res.json(students);
  }
);

module.exports = router;