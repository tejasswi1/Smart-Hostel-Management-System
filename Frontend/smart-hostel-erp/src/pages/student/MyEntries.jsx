import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  Moon,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownLeft,
  FileText,
} from "lucide-react";

import "./MyEntries.css";

export default function MyEntries() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/night/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEntries(res.data);

        const movementRes = await api.get(
          "/class-goto/my-records",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMovements(movementRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load entries");
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  if (loading) {
    return (
      <div className="entries-page">
        <div className="entries-loading">
          <div className="loading-spinner"></div>
          <p>Loading your records...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="entries-page">
        <div className="entries-error">
          <AlertCircle size={22} />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="entries-page">
      <div className="entries-container">

        {/* ================= HEADER ================= */}

        <div className="entries-header">
          <div>
            <p className="entries-eyebrow">
              STUDENT RECORDS
            </p>

            <h1>My Entries</h1>

            <p>
              View your night entry and class movement history.
            </p>
          </div>

          <div className="entries-header-icon">
            <FileText size={26} />
          </div>
        </div>

        {/* ================= SUMMARY ================= */}

        <div className="entries-summary">

          <div className="summary-card">
            <div className="summary-icon night">
              <Moon size={20} />
            </div>

            <div>
              <span>Night Entries</span>
              <strong>{entries.length}</strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon movement">
              <ArrowUpRight size={20} />
            </div>

            <div>
              <span>Class Movements</span>
              <strong>{movements.length}</strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon success">
              <CheckCircle size={20} />
            </div>

            <div>
              <span>Approved Entries</span>
              <strong>
                {
                  entries.filter(
                    (entry) =>
                      entry.status === "APPROVED"
                  ).length
                }
              </strong>
            </div>
          </div>

        </div>

        {/* ================= NIGHT ENTRIES ================= */}

        <section className="records-section">

          <div className="section-header">
            <div className="section-title">
              <div className="section-icon night-icon">
                <Moon size={19} />
              </div>

              <div>
                <h2>Night Entry History</h2>
                <p>Your submitted night entry requests.</p>
              </div>
            </div>
          </div>

          {entries.length === 0 ? (
            <div className="empty-state">
              <Moon size={35} />
              <h3>No night entries</h3>
              <p>
                You haven't submitted any night entries yet.
              </p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="records-table">

                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Guard Remark</th>
                    <th>Warden Remark</th>
                  </tr>
                </thead>

                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry._id}>

                      <td>
                        <span className="date-value">
                          {entry.date}
                        </span>
                      </td>

                      <td>
                        <div className="time-value">
                          <Clock size={14} />
                          {entry.time}
                        </div>
                      </td>

                      <td>
                        <span className="reason-value">
                          {entry.reason || "-"}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`status-badge ${entry.status
                            ?.toLowerCase()
                            .replace("_", "-")}`}
                        >
                          {entry.status === "APPROVED" && (
                            <CheckCircle size={13} />
                          )}

                          {entry.status === "PENDING" && (
                            <Clock size={13} />
                          )}

                          {entry.status === "REJECTED" && (
                            <AlertCircle size={13} />
                          )}

                          {entry.status}
                        </span>
                      </td>

                      <td>
                        <span className="remark">
                          {entry.guardRemark || "-"}
                        </span>
                      </td>

                      <td>
                        <span className="remark">
                          {entry.wardenRemark || "-"}
                        </span>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </section>

        {/* ================= CLASS MOVEMENTS ================= */}

        <section className="records-section">

          <div className="section-header">
            <div className="section-title">
              <div className="section-icon movement-icon">
                <ArrowUpRight size={19} />
              </div>

              <div>
                <h2>Class Go / Return History</h2>
                <p>
                  Track your class and daily movement records.
                </p>
              </div>
            </div>
          </div>

          {movements.length === 0 ? (
            <div className="empty-state">
              <ArrowUpRight size={35} />
              <h3>No movement records</h3>
              <p>
                No class movement records have been created.
              </p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="records-table">

                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Out Time</th>
                    <th>Return Time</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {movements.map((m) => (
                    <tr key={m._id}>

                      <td>
                        <span className="date-value">
                          {m.date}
                        </span>
                      </td>

                      <td>
                        <div className="movement-time out-time">
                          <ArrowUpRight size={14} />

                          {new Date(
                            m.outTime
                          ).toLocaleTimeString()}
                        </div>
                      </td>

                      <td>
                        {m.inTime ? (
                          <div className="movement-time return-time">
                            <ArrowDownLeft size={14} />

                            {new Date(
                              m.inTime
                            ).toLocaleTimeString()}
                          </div>
                        ) : (
                          <span className="not-returned">
                            -
                          </span>
                        )}
                      </td>

                      <td>
                        {m.inTime ? (
                          <span className="movement-status returned">
                            <CheckCircle size={13} />
                            Returned
                          </span>
                        ) : (
                          <span className="movement-status active">
                            <AlertCircle size={13} />
                            Not Returned
                          </span>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </section>

      </div>
    </div>
  );
}