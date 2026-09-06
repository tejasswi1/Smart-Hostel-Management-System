const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

const {
  createComplaint,
  myComplaints,
  allComplaints,
  resolveComplaint,
} = require("../controllers/complaintController");

// Student
router.post(
  "/",
  auth,
  role("student"),
  upload.single("photo"),
  createComplaint
);

router.get(
  "/my",
  auth,
  role("student"),
  myComplaints
);

// Warden
router.get(
  "/",
  auth,
  role("warden"),
  allComplaints
);

router.put(
  "/resolve/:id",
  auth,
  role("warden"),
  resolveComplaint
);

module.exports = router;