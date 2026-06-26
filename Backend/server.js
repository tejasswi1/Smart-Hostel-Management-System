const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ===================== MIDDLEWARE ===================== */
app.use(cors());
app.use(express.json());
app.use("/uploads",express.static("uploads"));

/* ===================== ROUTE IMPORTS ===================== */
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const nightRoutes = require("./routes/nightRoutes");
const movementRoutes = require("./routes/movementRoutes");
const messBillRoutes = require("./routes/messBillRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const auditRoutes = require("./routes/auditRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const classGotoRoutes = require("./routes/classGotoRoutes");
const userRoutes = require("./routes/userRoutes");

/* ===================== ROUTE MIDDLEWARE ===================== */

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/night", nightRoutes);
app.use("/api/movement", movementRoutes);
app.use("/api/messbill", messBillRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/audit-logs", auditRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/class-goto", classGotoRoutes);
app.use("/api/users",userRoutes);


/* ===================== HEALTH CHECK ===================== */
app.get("/", (req, res) => {
  res.send("Smart Hostel ERP Backend Running 🚀");
});

/* ===================== DB CONNECT ===================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) =>
    console.error("❌ MongoDB Connection Error:", err.message)
  );

/* ===================== ALERT JOB ===================== */
// Auto-detect unreturned class goto entries
const { detectAlerts } = require("./controllers/classGotoController");

// Run every 10 minutes
setInterval(() => {
  detectAlerts();
  console.log("🔔 ClassGoto alert check executed");
}, 10 * 60 * 1000);

/* ===================== START SERVER ===================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
