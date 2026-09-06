const Movement = require("../models/movement"); // Make sure filename matches exactly

// Student goes out
exports.goOut = async (req, res) => {
  try {
    const movement = await Movement.create({
      student: req.user.id,
      status: "OUT",
    });

    res.json({ msg: "Marked OUT", movement });
  } catch (err) {
    console.error(err); // log for debugging
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Student comes in
exports.goIn = async (req, res) => {
  try {
    const movement = await Movement.create({
      student: req.user.id,
      status: "IN",
    });

    res.json({ msg: "Marked IN", movement });
  } catch (err) {
    console.error(err); // log for debugging
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Student movement history
exports.myMovements = async (req, res) => {
  try {
    const movements = await Movement.find({
      student: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(movements);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
};