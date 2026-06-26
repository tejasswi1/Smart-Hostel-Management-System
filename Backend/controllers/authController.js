const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } =
      req.body;

    if (
      !email.endsWith(
        "@mmmut.ac.in"
      )
    ) {
      return res.status(400).json({
        msg: "Use college email only",
      });
    }

    const hashed =
      await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashed,
      role: "student",
    });

    await user.save();

    res.json({
      msg: "Registered successfully",
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        msg: "Email already registered",
      });
    }

    res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // optional
    );

   res.json({
  token,
  user: {
    id: user._id,
    name: user.name,
    role: user.role,
  },
});
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
