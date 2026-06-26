import { useEffect, useState } from "react";
import api from "../../api/axios";

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
    <div style={{ padding: "20px" }}>
      <h2>Class Goto Alerts</h2>

      {alerts.length === 0 ? (
        <p>No alerts</p>
      ) : (
        alerts.map((a) => (
          <div
            key={a._id}
            style={{
              borderBottom:
                "1px solid #ccc",

              marginBottom: "10px",
            }}
          >
            <p>
              <b>Student:</b>{" "}
              {a.student?.name ||
                "Unknown"}
            </p>

            <p>
              <b>Email:</b>{" "}
              {a.student?.email ||
                "N/A"}
            </p>

            <p>
              <b>Date:</b> {a.date}
            </p>

            <p>
              <b>Out Time:</b>{" "}
              {new Date(
                a.outTime
              ).toLocaleTimeString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}