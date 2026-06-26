const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

const ctrl = require("../controllers/messController");

/* ================= ADVANCE WALLET ================= */
// STUDENT → upload advance payment
router.put(
  "/advance/upload",
  auth,
  role("student"),
  upload.single("screenshot"),
  ctrl.uploadAdvancePayment
);

// WARDEN → approve advance payment
router.put(
  "/advance/approve/:id",
  auth,
  role("warden"),
  ctrl.approveAdvancePayment
);

/* ================= MESS BILLS ================= */
// WARDEN → create monthly bill
router.post(
  "/",
  auth,
  role("warden"),
  ctrl.createMessBill
);

// STUDENT → view wallet + own bills
router.get(
  "/my",
  auth,
  role("student"),
  ctrl.myMessBills
);

// WARDEN / PUBLIC → view all bills
router.get(
  "/all",
  auth,
  role("warden"),
  ctrl.allMessBills
);

/* ================= MESS CUT ================= */
// STUDENT → request mess cut
router.post(
  "/cut/:id",
  auth,
  role("student"),
  ctrl.requestMessCut
);

// WARDEN → approve mess cut
router.put(
  "/cut/approve/:id",
  auth,
  role("warden"),
  ctrl.approveMessCut
);

// WARDEN → reject mess cut
router.put(
  "/cut/reject/:id",
  auth,
  role("warden"),
  ctrl.rejectMessCut
);

module.exports = router;