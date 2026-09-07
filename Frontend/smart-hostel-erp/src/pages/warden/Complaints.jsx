import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Complaints.css";

export default function WardenComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      const res = await api.get("/complaints");

      console.log("📦 ALL COMPLAINTS:", res.data);

      setComplaints(res.data);
    } catch (err) {
      console.error("❌ FETCH ERROR:", err);

      alert(
        err.response?.data?.msg ||
          "Failed to load complaints"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (id) => {
    try {
      const res = await api.put(
        `/complaints/resolve/${id}`
      );

      alert(res.data.msg);

      fetchComplaints();
    } catch (err) {
      console.error("❌ RESOLVE ERROR:", err);

      alert(
        err.response?.data?.msg ||
          "Failed to resolve complaint"
      );
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  if (loading) {
    return (
      <div className="complaints-page">
        <div className="complaints-loading">
          <div className="loading-spinner"></div>
          <h3>Loading complaints...</h3>
          <p>Fetching student complaints</p>
        </div>
      </div>
    );
  }

  return (
    <div className="complaints-page">

      {/* ================= HEADER ================= */}

      <div className="complaints-header">

        <div>
          <p className="complaints-eyebrow">
            WARDEN MANAGEMENT
          </p>

          <h1>🛠️ Complaints</h1>

          <p>
            Review and manage complaints submitted
            by hostel students.
          </p>
        </div>

        <div className="complaints-count">
          <span>{complaints.length}</span>
          <small>Total</small>
        </div>

      </div>


      {/* ================= EMPTY ================= */}

      {complaints.length === 0 ? (

        <div className="complaints-empty">

          <div className="empty-icon">
            ✓
          </div>

          <h2>No Complaints Found</h2>

          <p>
            There are currently no complaints
            submitted by students.
          </p>

        </div>

      ) : (

        <div className="complaints-list">

          {complaints.map((c) => {

            const status =
              c.status?.toLowerCase();

            return (
              <div
                key={c._id}
                className={`complaint-card ${
                  status === "pending"
                    ? "complaint-pending"
                    : "complaint-resolved"
                }`}
              >

                {/* ================= CARD TOP ================= */}

                <div className="complaint-top">

                  <div className="complaint-title-area">

                    <div className="complaint-icon">
                      🛠️
                    </div>

                    <div>
                      <h2>
                        {c.title ||
                          c.category}
                      </h2>

                      <span>
                        {c.category}
                      </span>
                    </div>

                  </div>

                  <div
                    className={`status-badge ${
                      status === "pending"
                        ? "status-pending"
                        : "status-resolved"
                    }`}
                  >
                    {status === "pending"
                      ? "⏳ Pending"
                      : "✅ Resolved"}
                  </div>

                </div>


                {/* ================= STUDENT ================= */}

                <div className="student-info">

                  <div className="student-avatar">
                    {c.student?.name
                      ? c.student.name
                          .charAt(0)
                          .toUpperCase()
                      : "?"}
                  </div>

                  <div>

                    <small>Submitted by</small>

                    <strong>
                      {c.student?.name ||
                        "Unknown Student"}
                    </strong>

                    <span>
                      {c.student?.email ||
                        "No email available"}
                    </span>

                  </div>

                </div>


                {/* ================= DESCRIPTION ================= */}

                <div className="complaint-description">

                  <p className="section-label">
                    DESCRIPTION
                  </p>

                  <p>
                    {c.description ||
                      "No description provided."}
                  </p>

                </div>


                {/* ================= PHOTO ================= */}

                {c.photo && (
  <div className="complaint-photo-section">
    <p className="section-label">
      📷 COMPLAINT PHOTO
    </p>

    <img
      src={c.photo}
      alt="Complaint"
      className="complaint-photo"
    />
  </div>
)}

                {/* ================= FOOTER ================= */}

                <div className="complaint-footer">

                  <div className="complaint-meta">
                    <span>
                      Category:{" "}
                      <b>{c.category}</b>
                    </span>

                    {c.createdAt && (
                      <span>
                        Submitted:{" "}
                        {new Date(
                          c.createdAt
                        ).toLocaleString()}
                      </span>
                    )}
                  </div>


                  {/* RESOLVE */}

                  {status === "pending" && (
                    <button
                      onClick={() =>
                        handleResolve(c._id)
                      }
                      className="resolve-btn"
                    >
                      ✓ Mark Resolved
                    </button>
                  )}

                </div>

              </div>
            );
          })}

        </div>

      )}

    </div>
  );
}