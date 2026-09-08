import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./NightEntries.css";

export default function GuardNightEntries() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    try {
      const res = await api.get("/night/pending");
      setEntries(res.data);
    } catch (err) {
      alert("Failed to load entries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const approveEntry = async (id) => {
    try {
      await api.post(`/night/approve/${id}`, {
        remark: "Approved by guard",
      });

      fetchEntries();
    } catch (err) {
      alert("Approval failed");
    }
  };

  if (loading) {
    return (
      <div className="guard-night-page">
        <div className="night-loading">
          <div className="night-spinner"></div>
          <h3>Loading night entries...</h3>
          <p>Fetching pending verification requests.</p>
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="guard-night-page">
        <div className="night-header">
          <div>
            <span className="night-label">
              SECURITY PANEL
            </span>

            <h1>🌙 Night Entry Verification</h1>

            <p>
              Review and verify student night entry requests.
            </p>
          </div>
        </div>

        <div className="night-empty">
          <div className="empty-icon">
            ✅
          </div>

          <h3>No entries to approve</h3>

          <p>
            There are currently no pending night entry requests.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="guard-night-page">

      {/* HEADER */}

      <div className="night-header">

        <div>
          <span className="night-label">
            SECURITY PANEL
          </span>

          <h1>🌙 Night Entry Verification</h1>

          <p>
            Review and verify student night entry requests.
          </p>
        </div>

        <div className="pending-count">
          <span>🌙</span>

          <div>
            <small>Pending Requests</small>
            <strong>{entries.length}</strong>
          </div>
        </div>

      </div>


      {/* INFO BAR */}

      <div className="night-info">

        <div className="night-info-icon">
          🛡️
        </div>

        <div>
          <strong>Guard Verification Required</strong>

          <p>
            Check the student's reason and selfie before
            approving the night entry.
          </p>
        </div>

      </div>


      {/* ENTRIES */}

      <div className="night-section">

        <div className="night-section-header">
          <div>
            <h2>Pending Requests</h2>
            <p>Students waiting for guard verification</p>
          </div>

          <span className="request-badge">
            {entries.length} Requests
          </span>
        </div>


        <div className="night-entries">

          {entries.map((e) => (

            <div
              key={e._id}
              className="night-entry-card"
            >

              {/* CARD HEADER */}

              <div className="entry-header">

                <div className="student-info">

                  <div className="student-avatar">
                    {e.student?.name
                      ?.charAt(0)
                      .toUpperCase() || "?"}
                  </div>

                  <div>
                    <h3>
                      {e.student?.name || "Unknown Student"}
                    </h3>

                    <span>
                      Night Entry Request
                    </span>
                  </div>

                </div>

                <span className="pending-badge">
                  ● {e.status}
                </span>

              </div>


              {/* DETAILS */}

              <div className="entry-details">

                <div className="detail-item">
                  <span>📝 Reason</span>
                  <strong>
                    {e.reason || "No reason provided"}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>📋 Status</span>
                  <strong>
                    {e.status}
                  </strong>
                </div>

              </div>


              {/* PHOTO */}

              {e.photo && (
  <div className="selfie-section">
    <div className="selfie-title">
      <span>📷</span>
      <strong>Student Selfie</strong>
    </div>

    <img
      src={e.photo}
      alt="Student Selfie"
      className="student-selfie"
    />
  </div>
)}
              {/* ACTION */}

              <div className="entry-actions">

                <button
                  onClick={() => approveEntry(e._id)}
                  className="approve-button"
                >
                  <span>✓</span>
                  Approve Entry
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}