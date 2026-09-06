const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const User = require("../models/User");

router.get("/students", auth, async (req, res) => {
  try {
    // Only warden and guard can view students
    if (!["warden", "guard"].includes(req.user.role)) {
      return res.status(403).json({
        msg: "Access denied",
      });
    }

    const students = await User.find({ role: "student" })
      .select("-password")
      .sort({ name: 1 });

    res.json(students);
  } catch (err) {
    console.error("FETCH STUDENTS ERROR:", err);

    res.status(500).json({
      msg: "Failed to fetch students",
      error: err.message,
    });
  }
});

module.exports = router;