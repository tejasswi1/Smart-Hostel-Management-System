const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

router.get("/student", auth, (req, res) => {
  if (req.user.role !== "student") {
    return res.status(403).json({ msg: "Access denied" });
  }

  res.json({
    msg: "Student route working",
    user: req.user,
  });
});

module.exports = router;