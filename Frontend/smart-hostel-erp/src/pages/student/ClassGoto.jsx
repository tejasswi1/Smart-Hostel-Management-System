import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Clock,
  MapPin,
} from "lucide-react";

import "./ClassGoto.css";

export default function ClassGoto() {
  const [active, setActive] = useState(false);
  const [alerts, setAlerts] = useState([]);

  // check alerts
  const loadAlerts = async () => {
    try {
      const res = await api.get("/class-goto/alerts/student");
      setAlerts(res.data);
    } catch (err) {
      console.log(
        err.response?.data || err.message
      );
    }
  };
 //get current status
 const loadCurrentStatus = async () => {
  try {
    const res = await api.get("/class-goto/my-records");

    const records = res.data;

    if (records.length > 0) {
      const latest = records[0];

      // inTime === null means student is OUT
      setActive(latest.inTime === null);
    } else {
      setActive(false);
    }
  } catch (err) {
    console.error(
      "STATUS ERROR:",
      err.response?.data || err.message
    );
  }
};
  // go to class
  const handleGo = async () => {
  try {
    const res = await api.post("/class-goto/go");

    console.log("GO RESPONSE:", res.data);

    alert("Entry started");
    setActive(true);
  } catch (err) {
    console.error("GO ERROR:", err.response?.data);

    alert(
      err.response?.data?.error ||
      err.response?.data?.msg ||
      err.message ||
      "Error"
    );
  }
};
  // return back
  const handleReturn = async () => {
  try {
    await api.post("/class-goto/return");

    alert("Returned successfully");

    setActive(false);

    loadAlerts();
    loadCurrentStatus();
  } catch (err) {
    console.error(
      "RETURN ERROR:",
      err.response?.data || err.message
    );

    alert(
      err.response?.data?.msg ||
      "No active entry"
    );
  }
};

  useEffect(() => {
    loadAlerts();
      loadCurrentStatus();
  }, []);

  return (
    <div className="class-goto-page">
      <div className="class-goto-container">

        {/* ================= HEADER ================= */}

        <div className="class-goto-header">
          <div>
            <p className="class-goto-eyebrow">
              DAILY MOVEMENT
            </p>

            <h1>Class Go / Return</h1>

            <p>
              Mark when you leave for class and when
              you return to the hostel.
            </p>
          </div>

          <div className="class-goto-header-icon">
            <MapPin size={25} />
          </div>
        </div>

        {/* ================= CURRENT STATUS ================= */}

        <div
          className={`movement-status-card ${
            active ? "status-away" : "status-inside"
          }`}
        >
          <div className="movement-status-icon">
            {active ? (
              <ArrowRight size={24} />
            ) : (
              <CheckCircle size={24} />
            )}
          </div>

          <div>
            <span className="movement-status-label">
              CURRENT STATUS
            </span>

            <h2>
              {active
                ? "You are currently OUT"
                : "You are currently IN"}
            </h2>

            <p>
              {active
                ? "Remember to mark your return after class."
                : "You can mark yourself OUT when leaving for class."}
            </p>
          </div>
        </div>

        {/* ================= ACTIONS ================= */}

        <div className="movement-actions">

          <button
            onClick={handleGo}
            disabled={active}
            className="movement-button go-button"
          >
            <div className="button-icon">
              <ArrowRight size={21} />
            </div>

            <div className="button-text">
              <strong>Go to Class</strong>
              <span>
                Mark yourself as leaving
              </span>
            </div>
          </button>

          <button
            onClick={handleReturn}
            disabled={!active}
            className="movement-button return-button"
          >
            <div className="button-icon">
              <ArrowLeft size={21} />
            </div>

            <div className="button-text">
              <strong>Return</strong>
              <span>
                Mark yourself as back
              </span>
            </div>
          </button>

        </div>

        {/* ================= INFORMATION ================= */}

        <div className="movement-info">

          <div className="movement-info-icon">
            <Clock size={18} />
          </div>

          <div>
            <strong>Movement tracking</strong>

            <p>
              Your movement is recorded with the
              date and time for hostel monitoring.
            </p>
          </div>

        </div>

        {/* ================= ALERTS ================= */}

        {alerts.length > 0 && (
          <div className="movement-alert-section">

            <div className="alert-header">

              <div className="alert-header-icon">
                <AlertTriangle size={20} />
              </div>

              <div>
                <h2>Unreturned Alerts</h2>

                <p>
                  You have movement records that
                  have not been marked as returned.
                </p>
              </div>

              <span className="alert-count">
                {alerts.length}
              </span>

            </div>

            <div className="alert-list">

              {alerts.map((a) => (
                <div
                  key={a._id}
                  className="alert-item"
                >

                  <div className="alert-item-icon">
                    <Clock size={17} />
                  </div>

                  <div className="alert-item-content">

                    <strong>
                      Unreturned movement
                    </strong>

                    <div className="alert-details">

                      <span>
                        Date: {a.date}
                      </span>

                      <span>
                        Out:{" "}
                        {new Date(
                          a.outTime
                        ).toLocaleTimeString()}
                      </span>

                    </div>

                  </div>
<button
  className="alert-badge"
  onClick={handleReturn}
>
  RETURN NOW
</button>

                </div>
              ))}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}