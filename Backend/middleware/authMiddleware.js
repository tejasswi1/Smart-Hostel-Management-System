const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ msg: "No token provided" });

    // Extract token from "Bearer TOKEN"
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "Token missing" });

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request object
    req.user = decoded; // { id: user._id, role: user.role }

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};
