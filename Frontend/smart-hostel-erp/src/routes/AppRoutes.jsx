import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import RoleRoute from "../routes/RoleRoute";
import Navbar from "../components/Navbar";

// AUTH
import Login from "../components/Login";

// STUDENT
import StudentDashboard from "../pages/student/StudentDashboard";
import NightEntry from "../pages/student/NightEntry";
import Mess from "../pages/student/Mess";
import ClassGoto from "../pages/student/ClassGoto";
import Complaints from "../pages/student/Complaints";
import MyEntries from "../pages/student/MyEntries";
import ScanQR from "../pages/student/ScanQR";

// GUARD
import GuardDashboard from "../pages/guard/GuardDashboard";
import GuardNightEntries from "../pages/guard/NightEntries";
import GuardClassGoto from "../pages/guard/ClassGoto";
import GuardStudents from "../pages/guard/Students";

// WARDEN
import WardenDashboard from "../pages/warden/WardenDashboard";
import WardenNightEntries from "../pages/warden/NightEntries";
import WardenComplaints from "../pages/warden/Complaints";
import WardenMess from "../pages/warden/Mess";
import WardenStudents from "../pages/warden/Students";
import WardenClassGoto from "../pages/warden/ClassGotoAlerts";
import Analytics from "../pages/warden/Analytics";
import AuditLog from "../pages/warden/AuditLog";

export default function App() {
  const { user } = useAuth();

  return (
    <>
      {user && <Navbar />}

      <main className="hostel-main-content">

        <Routes>
          {/* ================= PUBLIC ================= */}
          <Route path="/login" element={<Login />} />

          {/* ================= ROOT ================= */}
          <Route
            path="/"
            element={
              user ? <Navigate to={`/${user.role}`} /> : <Navigate to="/login" />
            }
          />

          {/* ================= STUDENT ================= */}
          <Route
            path="/student"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <StudentDashboard />
              </RoleRoute>
            }
          />

          <Route
            path="/student/night-entry"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <NightEntry />
              </RoleRoute>
            }
          />

          <Route
            path="/student/my-entries"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <MyEntries />
              </RoleRoute>
            }
          />

          <Route
            path="/student/class-goto"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <ClassGoto />
              </RoleRoute>
            }
          />

          <Route
            path="/student/mess"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <Mess />
              </RoleRoute>
            }
          />

          <Route
            path="/student/scan"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <ScanQR />
              </RoleRoute>
            }
          />

          <Route
            path="/student/complaints"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <Complaints />
              </RoleRoute>
            }
          />

          {/* ================= GUARD ================= */}
          <Route
            path="/guard"
            element={
              <RoleRoute allowedRoles={["guard"]}>
                <GuardDashboard />
              </RoleRoute>
            }
          />

          <Route
            path="/guard/night-entries"
            element={
              <RoleRoute allowedRoles={["guard"]}>
                <GuardNightEntries />
              </RoleRoute>
            }
          />

          <Route
            path="/guard/class-goto"
            element={
              <RoleRoute allowedRoles={["guard"]}>
                <GuardClassGoto />
              </RoleRoute>
            }
          />

          <Route
            path="/guard/students"
            element={
              <RoleRoute allowedRoles={["guard"]}>
                <GuardStudents />
              </RoleRoute>
            }
          />
          

          {/* ================= WARDEN ================= */}
          <Route
            path="/warden"
            element={
              <RoleRoute allowedRoles={["warden"]}>
                <WardenDashboard />
              </RoleRoute>
            }
          />

          <Route
            path="/warden/night-entries"
            element={
              <RoleRoute allowedRoles={["warden"]}>
                <WardenNightEntries />
              </RoleRoute>
            }
          />

          <Route
            path="/warden/class-goto"
            element={
              <RoleRoute allowedRoles={["warden"]}>
                <WardenClassGoto />
              </RoleRoute>
            }
          />

          <Route
            path="/warden/complaints"
            element={
              <RoleRoute allowedRoles={["warden"]}>
                <WardenComplaints />
              </RoleRoute>
            }
          />

          <Route
            path="/warden/mess"
            element={
              <RoleRoute allowedRoles={["warden"]}>
                <WardenMess />
              </RoleRoute>
            }
          />

          <Route
            path="/warden/students"
            element={
              <RoleRoute allowedRoles={["warden"]}>
                <WardenStudents />
              </RoleRoute>
            }
          />

          <Route
            path="/warden/analytics"
            element={
              <RoleRoute allowedRoles={["warden"]}>
                <Analytics />
              </RoleRoute>
            }
          />

          <Route
            path="/warden/audit-logs"
            element={
              <RoleRoute allowedRoles={["warden"]}>
                <AuditLog />
              </RoleRoute>
            }
          />

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>

      </main>
    </>
  );
}