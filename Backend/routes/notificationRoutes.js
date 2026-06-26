const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Notification = require("../models/Notification"); // ✅ fix: import model, not roleMiddleware

// GET notifications
router.get("/", auth, async (req, res) => {
  try {
    const data = await Notification.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// MARK notification as read
router.put("/:id/read", auth, async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ msg: "Marked as read" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
