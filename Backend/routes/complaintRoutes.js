// routes/complaintRoutes.js
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

// STUDENT → create complaint
router.post(
  "/",
  auth,
  role("student"),
  upload.single("photo"),   // 🔥 FIELD NAME MUST BE "photo"
  createComplaint
);

// STUDENT → my complaints
router.get(
  "/my",
  auth,
  role("student"),
  myComplaints
);

// WARDEN → all complaints
router.get(
  "/",
  auth,
  role("warden"),
  allComplaints
);

// WARDEN → resolve
router.put(
  "/resolve/:id",
  auth,
  role("warden"),
  resolveComplaint
);

module.exports = router;