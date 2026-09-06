import { Link } from "react-router-dom";
import "./WardenDashboard.css";

export default function WardenDashboard() {
  return (
    <div className="warden-page">

      {/* ================= HEADER ================= */}

      <div className="warden-header">
        <div>
          <p className="warden-eyebrow">
            SMART HOSTEL ERP
          </p>

          <h1>🧑‍🏫 Warden Dashboard</h1>

          <p className="warden-subtitle">
            Manage hostel operations, students and approvals
            from one place.
          </p>
        </div>

        <div className="warden-header-icon">
          🏫
        </div>
      </div>


      {/* ================= OVERVIEW ================= */}

      <div className="warden-welcome">
        <div className="welcome-icon">
          👋
        </div>

        <div>
          <h3>Welcome, Warden</h3>

          <p>
            Choose a section below to manage your hostel.
          </p>
        </div>
      </div>


      {/* ================= SERVICES ================= */}

      <div className="warden-section-title">
        <h2>Hostel Management</h2>

        <p>
          Access all important warden services
        </p>
      </div>


      <div className="warden-grid">

        {/* NIGHT ENTRY */}

        <Link
          to="/warden/night-entries"
          className="warden-card"
        >
          <div className="warden-card-icon night-icon">
            🌙
          </div>

          <div className="warden-card-content">
            <h3>Night Entry Approvals</h3>

            <p>
              Review and approve student night
              entry requests.
            </p>
          </div>

          <span className="warden-arrow">
            →
          </span>
        </Link>


        {/* COMPLAINTS */}

        <Link
          to="/warden/complaints"
          className="warden-card"
        >
          <div className="warden-card-icon complaint-icon">
            🛠️
          </div>

          <div className="warden-card-content">
            <h3>Complaints Management</h3>

            <p>
              Review student complaints and
              resolve hostel issues.
            </p>
          </div>

          <span className="warden-arrow">
            →
          </span>
        </Link>


        {/* MESS */}

        <Link
          to="/warden/mess"
          className="warden-card"
        >
          <div className="warden-card-icon mess-icon">
            🍽️
          </div>

          <div className="warden-card-content">
            <h3>Mess Management</h3>

            <p>
              Manage mess payments and student
              meal accounts.
            </p>
          </div>

          <span className="warden-arrow">
            →
          </span>
        </Link>


        {/* STUDENTS */}

        <Link
          to="/warden/students"
          className="warden-card"
        >
          <div className="warden-card-icon student-icon">
            👩‍🎓
          </div>

          <div className="warden-card-content">
            <h3>Student Records</h3>

            <p>
              View student information and
              hostel records.
            </p>
          </div>

          <span className="warden-arrow">
            →
          </span>
        </Link>


        {/* CLASS GOTO */}

        <Link
          to="/warden/class-goto"
          className="warden-card"
        >
          <div className="warden-card-icon alert-icon">
            🚨
          </div>

          <div className="warden-card-content">
            <h3>Class Goto Alerts</h3>

            <p>
              Monitor students who have not
              returned from class.
            </p>
          </div>

          <span className="warden-arrow">
            →
          </span>
        </Link>


        {/* ANALYTICS */}

        <Link
          to="/warden/analytics"
          className="warden-card"
        >
          <div className="warden-card-icon analytics-icon">
            📊
          </div>

          <div className="warden-card-content">
            <h3>Analytics</h3>

            <p>
              View hostel statistics and
              operational insights.
            </p>
          </div>

          <span className="warden-arrow">
            →
          </span>
        </Link>


        {/* AUDIT LOGS */}

        <Link
          to="/warden/audit-logs"
          className="warden-card"
        >
          <div className="warden-card-icon audit-icon">
            📋
          </div>

          <div className="warden-card-content">
            <h3>Audit Logs</h3>

            <p>
              Track important activities and
              system actions.
            </p>
          </div>

          <span className="warden-arrow">
            →
          </span>
        </Link>

      </div>

    </div>
  );
}