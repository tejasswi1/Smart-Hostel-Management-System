import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Auditlog.css";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLogs = async () => {
    try {
      const res = await api.get("/audit-logs");
      setLogs(res.data);
    } catch (err) {
      console.error("AUDIT LOG ERROR:", err);

      alert(
        err.response?.data?.msg ||
          "Failed to load audit logs"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  if (loading) {
    return (
      <div className="audit-page">
        <div className="audit-loading">
          <div className="audit-spinner"></div>
          <h3>Loading audit logs...</h3>
          <p>Fetching system activity records.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="audit-page">

      {/* HEADER */}

      <div className="audit-header">
        <div>
          <p className="audit-label">
            WARDEN PANEL
          </p>

          <h1>📋 Audit Logs</h1>

          <p>
            Track important activities performed across
            the hostel management system.
          </p>
        </div>

        <div className="log-count">
          <span>📑</span>

          <div>
            <small>Total Logs</small>
            <strong>{logs.length}</strong>
          </div>
        </div>
      </div>


      {/* LOGS */}

      <div className="audit-card">

        <div className="audit-card-header">
          <div>
            <h2>System Activity</h2>
            <p>
              Complete record of user actions
            </p>
          </div>

          <div className="activity-badge">
            ● Live Records
          </div>
        </div>


        {logs.length === 0 ? (
          <div className="audit-empty">

            <div className="empty-icon">
              📋
            </div>

            <h3>No audit logs found</h3>

            <p>
              System activities will appear here
              once actions are performed.
            </p>

          </div>
        ) : (
          <div className="audit-table-wrapper">

            <table className="audit-table">

              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Role</th>
                  <th>Action</th>
                  <th>Details</th>
                  <th>Date & Time</th>
                </tr>
              </thead>

              <tbody>

                {logs.map((log, index) => (

                  <tr key={log._id}>

                    {/* INDEX */}

                    <td className="log-index">
                      {index + 1}
                    </td>


                    {/* USER */}

                    <td>

                      <div className="log-user">

                        <div className="log-avatar">
                          {log.user?.name
                            ?.charAt(0)
                            .toUpperCase() || "?"}
                        </div>

                        <div>
                          <strong>
                            {log.user?.name ||
                              "Unknown"}
                          </strong>

                          <small>
                            User ID:{" "}
                            {log.user?._id
                              ? log.user._id.slice(-6)
                              : "-"}
                          </small>
                        </div>

                      </div>

                    </td>


                    {/* ROLE */}

                    <td>

                      <span
                        className={`role-badge ${
                          log.user?.role ||
                          "unknown"
                        }`}
                      >
                        {log.user?.role ||
                          "-"}
                      </span>

                    </td>


                    {/* ACTION */}

                    <td>

                      <span className="action-badge">
                        {log.action}
                      </span>

                    </td>


                    {/* DETAILS */}

                    <td className="details-cell">
                      {log.details || "-"}
                    </td>


                    {/* DATE */}

                    <td className="date-cell">

                      <strong>
                        {new Date(
                          log.createdAt
                        ).toLocaleDateString()}
                      </strong>

                      <small>
                        {new Date(
                          log.createdAt
                        ).toLocaleTimeString()}
                      </small>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}