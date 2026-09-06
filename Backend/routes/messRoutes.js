const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

const ctrl = require("../controllers/messController");


/* ===========================================================
   STUDENT
   Upload ₹36,000 payment screenshot
=========================================================== */

router.post(
  "/payment/upload",
  auth,
  role("student"),
  upload.single("screenshot"),
  ctrl.uploadMessPayment
);


/* ===========================================================
   STUDENT
   Get own mess details
=========================================================== */

router.get(
  "/my",
  auth,
  role("student"),
  ctrl.myMess
);


/* ===========================================================
   STUDENT
   Scan Mess QR
=========================================================== */

router.post(
  "/scan",
  auth,
  role("student"),
  ctrl.scanQR
);


/* ===========================================================
   STUDENT
   Transaction history
=========================================================== */

router.get(
  "/history",
  auth,
  role("student"),
  ctrl.myTransactions
);


/* ===========================================================
   WARDEN
   Pending payment proofs
=========================================================== */

router.get(
  "/pending-payments",
  auth,
  role("warden"),
  ctrl.pendingMessPayments
);


/* ===========================================================
   WARDEN
   Approve ₹36,000
=========================================================== */

router.put(
  "/payment/approve/:id",
  auth,
  role("warden"),
  ctrl.approveMessPayment
);


/* ===========================================================
   WARDEN
   Reject ₹36,000
=========================================================== */

router.put(
  "/payment/reject/:id",
  auth,
  role("warden"),
  ctrl.rejectMessPayment
);


/* ===========================================================
   WARDEN
   All student mess records
=========================================================== */

router.get(
  "/records",
  auth,
  role("warden"),
  ctrl.allMessRecords
);


module.exports = router;