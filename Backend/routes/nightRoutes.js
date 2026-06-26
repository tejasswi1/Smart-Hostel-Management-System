const express = require("express");
const router = express.Router();
const nightController = require("../controllers/nightController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

// Student submits night entry
router.post(
  "/submit",
  auth,
  role("student"),
  upload.single("photo"),
  nightController.submit
);

// Guard approves night entry
router.post("/approve/:id", auth, role("guard"), nightController.guardApprove);

// Warden approves night entry
router.post("/warden-approve/:id", auth, role("warden"), nightController.wardenApprove);
//warden rejects
router.post(
  "/warden-reject/:id",
  auth,
  role("warden"),
  nightController.wardenReject
);

// List all pending entries (for guard)
router.get("/pending", auth, role("guard"), nightController.pendingList);
//list all pending entries(for warden)
router.get("/warden-pending", auth, role("warden"), nightController.wardenPending);
// List all entries of the logged-in student
router.get("/my", auth, role("student"), nightController.myEntries);

module.exports = router;
