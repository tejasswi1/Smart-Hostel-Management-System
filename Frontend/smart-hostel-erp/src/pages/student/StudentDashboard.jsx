import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Moon,
  ClipboardList,
  Footprints,
  MessageSquare,
  Utensils,
  QrCode,
  ArrowRight,
} from "lucide-react";

import "./StudentDashboard.css";

export default function StudentDashboard() {
  const { user } = useAuth();

  return (
    <div className="student-dashboard">
      {/* ================= HEADER ================= */}

      <div className="student-header">
        <div>
          <p className="student-eyebrow">
            STUDENT PORTAL
          </p>

          <h1>
            🎓 Student Dashboard
          </h1>

          <p className="student-welcome">
            Welcome back,{" "}
            <strong>{user?.name || "Student"}</strong>
          </p>
        </div>

        <div className="student-role-card">
          <div className="student-avatar">
            {(user?.name || "Student")
              .charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <p className="student-role-name">
              {user?.name || "Student"}
            </p>

            <p className="student-role">
              {user?.role || "student"}
            </p>
          </div>
        </div>
      </div>

      {/* ================= SERVICES ================= */}

      <div className="student-services-header">
        <div>
          <h2>Student Services</h2>
          <p>
            Access your hostel services and manage your activities.
          </p>
        </div>
      </div>

      <div className="student-services-grid">

        {/* NIGHT ENTRY */}

        <Link
          to="/student/night-entry"
          className="student-service-card"
        >
          <div className="service-icon service-blue">
            <Moon size={24} />
          </div>

          <div className="service-content">
            <h3>Night Entry</h3>

            <p>
              Submit your night entry with location
              and photo verification.
            </p>
          </div>

          <div className="service-arrow">
            <ArrowRight size={18} />
          </div>
        </Link>

        {/* MY ENTRIES */}

        <Link
          to="/student/my-entries"
          className="student-service-card"
        >
          <div className="service-icon service-purple">
            <ClipboardList size={24} />
          </div>

          <div className="service-content">
            <h3>My Night Entries</h3>

            <p>
              View your previous night entries and
              their approval status.
            </p>
          </div>

          <div className="service-arrow">
            <ArrowRight size={18} />
          </div>
        </Link>

        {/* CLASS GOTO */}

        <Link
          to="/student/class-goto"
          className="student-service-card"
        >
          <div className="service-icon service-orange">
            <Footprints size={24} />
          </div>

          <div className="service-content">
            <h3>Class Go / Return</h3>

            <p>
              Mark your departure and return from
              class or other activities.
            </p>
          </div>

          <div className="service-arrow">
            <ArrowRight size={18} />
          </div>
        </Link>

        {/* COMPLAINTS */}

        <Link
          to="/student/complaints"
          className="student-service-card"
        >
          <div className="service-icon service-red">
            <MessageSquare size={24} />
          </div>

          <div className="service-content">
            <h3>Complaints</h3>

            <p>
              Raise hostel complaints and track
              their resolution.
            </p>
          </div>

          <div className="service-arrow">
            <ArrowRight size={18} />
          </div>
        </Link>

        {/* MESS */}

        <Link
          to="/student/mess"
          className="student-service-card"
        >
          <div className="service-icon service-green">
            <Utensils size={24} />
          </div>

          <div className="service-content">
            <h3>Mess Account</h3>

            <p>
              Manage your mess payment, balance and
              meal history.
            </p>
          </div>

          <div className="service-arrow">
            <ArrowRight size={18} />
          </div>
        </Link>

        {/* QR */}

        <Link
          to="/student/scan"
          className="student-service-card"
        >
          <div className="service-icon service-cyan">
            <QrCode size={24} />
          </div>

          <div className="service-content">
            <h3>Scan Mess QR</h3>

            <p>
              Scan the mess QR code to record your
              daily meal.
            </p>
          </div>

          <div className="service-arrow">
            <ArrowRight size={18} />
          </div>
        </Link>

      </div>
    </div>
  );
}