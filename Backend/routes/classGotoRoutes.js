const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const ctrl = require("../controllers/classGotoController");


// STUDENT
router.post("/go", auth, role("student"), ctrl.go);
router.post("/return", auth, role("student"), ctrl.returnBack);
router.get("/alerts/student", auth, role("student"), ctrl.studentAlerts);
router.get(
  "/my-records",
  auth,
  role("student"),
  ctrl.myRecords
);

// WARDEN
router.get("/alerts/warden", auth, role("warden"), ctrl.wardenAlerts);
// WARDEN – only unreturned
router.get(
  "/unreturned",
  auth,
  role("warden"),
  ctrl.unreturned
);

// ALL RECORDS (guard)
router.get("/records", auth, role("guard"), ctrl.records);

module.exports = router;