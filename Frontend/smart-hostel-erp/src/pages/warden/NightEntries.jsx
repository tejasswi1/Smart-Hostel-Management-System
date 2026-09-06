import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./NightEntries.css";
export default function WardenNightEntries() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEntries = async () => {
    try {
      const res = await api.get("/night/warden-pending");
      setEntries(res.data);
    } catch (err) {
      alert("Failed to load entries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const approve = async (id) => {
    await api.post(`/night/warden-approve/${id}`, {
      remark: "Approved by warden",
    });
    loadEntries();
  };

  const reject = async (id) => {
    await api.post(`/night/warden-reject/${id}`, {
      remark: "Not allowed",
    });
    loadEntries();
  };

  if (loading) {
    return (
      <div className="warden-night-page">
        <div className="night-loading">
          <div className="loading-spinner"></div>
          <p>Loading night entries...</p>
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="warden-night-page">
        <div className="night-empty">
          <div className="empty-icon">🌙</div>
          <h2>No Pending Entries</h2>
          <p>
            There are currently no night entry requests
            waiting for your approval.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="warden-night-page">

      {/* ================= HEADER ================= */}

      <div className="night-page-header">

        <div>
          <p className="night-eyebrow">
            WARDEN MANAGEMENT
          </p>

          <h1>🌙 Night Entry Approvals</h1>

          <p>
            Review and approve student night entry requests.
          </p>
        </div>

        <div className="pending-count">
          <span>{entries.length}</span>
          <small>Pending</small>
        </div>

      </div>


      {/* ================= ENTRIES ================= */}

      <div className="night-entry-list">

        {entries.map((e) => (

          <div
            key={e._id}
            className="night-entry-card"
          >

            {/* CARD HEADER */}

            <div className="entry-card-header">

              <div className="student-info">

                <div className="student-avatar">
                  {e.student?.name
                    ? e.student.name.charAt(0).toUpperCase()
                    : "S"}
                </div>

                <div>
                  <h3>
                    {e.student?.name || "Student"}
                  </h3>

                  <span>
                    Night Entry Request
                  </span>
                </div>

              </div>

              <div className="pending-badge">
                ⏳ Pending
              </div>

            </div>


            {/* REQUEST DETAILS */}

            <div className="entry-details">

              <div className="detail-item">

                <span className="detail-icon">
                  📝
                </span>

                <div>
                  <small>Reason</small>
                  <strong>
                    {e.reason || "No reason provided"}
                  </strong>
                </div>

              </div>

              <div className="detail-item">

                <span className="detail-icon">
                  👤
                </span>

                <div>
                  <small>Student</small>
                  <strong>
                    {e.student?.name || "Unknown"}
                  </strong>
                </div>

              </div>

            </div>


            {/* SELFIE */}

            {e.photo && (
              <div className="student-photo-section">

                <div className="photo-heading">
                  <span>📸</span>
                  <strong>Student Selfie</strong>
                </div>

                <div className="photo-wrapper">

                  <img
                    src={`http://localhost:5000/${e.photo.replace(
                      /\\/g,
                      "/"
                    )}`}
                    alt="Student Selfie"
                  />

                </div>

              </div>
            )}


            {/* ACTIONS */}

            <div className="entry-actions">

              <button
                onClick={() => approve(e._id)}
                className="approve-btn"
              >
                <span>✓</span>
                Approve
              </button>

              <button
                onClick={() => reject(e._id)}
                className="reject-btn"
              >
                <span>✕</span>
                Reject
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}