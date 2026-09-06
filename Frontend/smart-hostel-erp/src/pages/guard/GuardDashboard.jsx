import { Link } from "react-router-dom";
import "./GuardDashboard.css";

export default function GuardDashboard() {
  return (
    <div className="guard-dashboard">

      {/* HEADER */}
      <div className="guard-header">
        <div>
          <span className="guard-label">
            SECURITY PANEL
          </span>

          <h1>🛡️ Guard Dashboard</h1>

          <p>
            Manage student movement and verify hostel entries.
          </p>
        </div>

        <div className="guard-profile">
          <div className="guard-profile-icon">
            🛡️
          </div>

          <div>
            <span>Logged in as</span>
            <strong>Guard</strong>
          </div>
        </div>
      </div>


      {/* STAT / INFO BAR */}

      <div className="guard-info-bar">

        <div className="guard-info-item">
          <div className="guard-info-icon night">
            🌙
          </div>

          <div>
            <strong>Night Entry</strong>
            <span>Verify student requests</span>
          </div>
        </div>

        <div className="guard-info-item">
          <div className="guard-info-icon movement">
            🚶
          </div>

          <div>
            <strong>Daily Movement</strong>
            <span>Track go & return</span>
          </div>
        </div>

        <div className="guard-info-item">
          <div className="guard-info-icon students">
            👩‍🎓
          </div>

          <div>
            <strong>Students</strong>
            <span>View student records</span>
          </div>
        </div>

      </div>


      {/* SERVICES */}

      <div className="guard-section-header">
        <div>
          <h2>Security Operations</h2>
          <p>Select an operation to continue</p>
        </div>
      </div>


      <div className="guard-services">

        {/* NIGHT ENTRY */}

        <Link
          to="/guard/night-entries"
          className="guard-service-card"
        >
          <div className="service-top">

            <div className="service-icon night-icon">
              🌙
            </div>

            <span className="service-arrow">
              →
            </span>

          </div>

          <h3>
            Night Entry Verification
          </h3>

          <p>
            Review student night entry requests,
            verify details and approve entries.
          </p>

          <span className="service-link">
            View Requests →
          </span>
        </Link>


        {/* CLASS GOTO */}

        <Link
          to="/guard/class-goto"
          className="guard-service-card"
        >
          <div className="service-top">

            <div className="service-icon movement-icon">
              🚶
            </div>

            <span className="service-arrow">
              →
            </span>

          </div>

          <h3>
            Daily Go / Return
          </h3>

          <p>
            Monitor student movement outside the
            hostel and track return status.
          </p>

          <span className="service-link">
            View Movements →
          </span>
        </Link>


        {/* STUDENTS */}

        <Link
          to="/guard/students"
          className="guard-service-card"
        >
          <div className="service-top">

            <div className="service-icon students-icon">
              👩‍🎓
            </div>

            <span className="service-arrow">
              →
            </span>

          </div>

          <h3>
            Student List
          </h3>

          <p>
            View registered students and access
            their basic hostel information.
          </p>

          <span className="service-link">
            View Students →
          </span>
        </Link>

      </div>


      {/* FOOTER INFO */}

      <div className="guard-security-note">

        <div className="security-note-icon">
          🔐
        </div>

        <div>
          <strong>
            Security & Verification
          </strong>

          <p>
            All student entry activities are recorded
            for hostel security and monitoring.
          </p>
        </div>

      </div>

    </div>
  );
}