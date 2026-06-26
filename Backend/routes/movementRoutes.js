const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const movementController = require("../controllers/movementController");

// Student goes out
router.post("/out", auth, role("student"), movementController.goOut);

// Student comes in
router.post("/in", auth, role("student"), movementController.goIn);

router.get(
  "/my-movements",
  auth,
  role("student"),
  movementController.myMovements
);

module.exports = router;
