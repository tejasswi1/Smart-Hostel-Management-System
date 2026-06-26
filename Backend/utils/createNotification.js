const Notification = require("../models/Notification");

// createNotification(userId, message)
const createNotification = async (userId, message) => {
  try {
    await Notification.create({
      user: userId, // ✅ fixed: was "useImperativeHandle" (wrong)
      message,
    });
  } catch (err) {
    console.error("Failed to create notification:", err);
  }
};

module.exports = createNotification;
