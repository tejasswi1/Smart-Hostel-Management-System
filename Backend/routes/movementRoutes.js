const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const ctrl = require("../controllers/movementController");

// Student
router.post("/out", auth, role("student"), ctrl.goOut);
router.post("/in", auth, role("student"), ctrl.goIn);
router.get("/my", auth, role("student"), ctrl.myMovements);

module.exports = router;