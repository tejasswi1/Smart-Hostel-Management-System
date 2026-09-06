import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./ClassGotoAlerts.css";

export default function ClassGotoAlerts() {
  const [alerts, setAlerts] =
    useState([]);

  const loadAlerts = async () => {
    try {
      const res = await api.get(
        "/class-goto/unreturned"
      );

      setAlerts(res.data);
    } catch (err) {
      console.log(
        err.response?.data ||
        err.message
      );

      alert("Failed to load alerts");
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  return (
    <div className="class-alert-page">

      {/* ================= HEADER ================= */}

      <div className="class-alert-header">

        <div>
          <p className="class-alert-eyebrow">
            WARDEN MONITORING
          </p>

          <h1>🚨 Class Goto Alerts</h1>

          <p>
            Monitor students who have not yet
            returned from class.
          </p>
        </div>

        <div className="alert-count">
          <span>{alerts.length}</span>
          <small>Unreturned</small>
        </div>

      </div>


      {/* ================= ALERT STATUS ================= */}

      <div
        className={
          alerts.length > 0
            ? "alert-status active"
            : "alert-status clear"
        }
      >

        <div className="alert-status-icon">
          {alerts.length > 0 ? "⚠️" : "✓"}
        </div>

        <div>
          <strong>
            {alerts.length > 0
              ? "Attention Required"
              : "Everything Looks Good"}
          </strong>

          <p>
            {alerts.length > 0
              ? `${alerts.length} student${
                  alerts.length > 1 ? "s are" : " is"
                } currently unreturned.`
              : "There are no unreturned class movements."}
          </p>
        </div>

      </div>


      {/* ================= ALERTS ================= */}

      {alerts.length === 0 ? (

        <div className="class-alert-empty">

          <div className="empty-alert-icon">
            ✓
          </div>

          <h2>No Active Alerts</h2>

          <p>
            All students have returned from
            their class movements.
          </p>

        </div>

      ) : (

        <div className="class-alert-list">

          {alerts.map((a) => (

            <div
              key={a._id}
              className="class-alert-card"
            >

              {/* CARD HEADER */}

              <div className="alert-card-header">

                <div className="alert-student">

                  <div className="alert-avatar">
                    {a.student?.name
                      ? a.student.name
                          .charAt(0)
                          .toUpperCase()
                      : "?"}
                  </div>

                  <div>
                    <h3>
                      {a.student?.name ||
                        "Unknown Student"}
                    </h3>

                    <span>
                      Student has not returned
                    </span>
                  </div>

                </div>

                <div className="unreturned-badge">
                  ⚠ Unreturned
                </div>

              </div>


              {/* DETAILS */}

              <div className="alert-details">

                <div className="alert-detail">

                  <div className="detail-symbol">
                    ✉️
                  </div>

                  <div>
                    <small>Email</small>

                    <strong>
                      {a.student?.email ||
                        "N/A"}
                    </strong>
                  </div>

                </div>


                <div className="alert-detail">

                  <div className="detail-symbol">
                    📅
                  </div>

                  <div>
                    <small>Date</small>

                    <strong>
                      {a.date}
                    </strong>
                  </div>

                </div>


                <div className="alert-detail">

                  <div className="detail-symbol">
                    🕐
                  </div>

                  <div>
                    <small>Out Time</small>

                    <strong>
                      {new Date(
                        a.outTime
                      ).toLocaleTimeString()}
                    </strong>
                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}