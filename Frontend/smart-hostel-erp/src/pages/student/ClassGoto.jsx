import { useEffect, useState } from "react";
import api from "../../api/axios";

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

  // go to class
  const handleGo = async () => {
    try {
      await api.post("/class-goto/go");
      alert("Entry started");
      setActive(true);
    } catch (err) {
      alert("Error");
    }
  };

  // return back
  const handleReturn = async () => {
    try {
      await api.post("/class-goto/return");
      alert("Returned successfully");
      setActive(false);
    } catch (err) {
      alert("No active entry");
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Class Goto</h2>

      <button onClick={handleGo} disabled={active}>
        Go to Class
      </button>

      <button onClick={handleReturn} disabled={!active} style={{ marginLeft: "10px" }}>
        Return
      </button>

      {/* ALERTS */}
      {alerts.length > 0 && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <h3>⚠ Unreturned Alerts</h3>
          {alerts.map((a) => (
            <p key={a._id}>
              Date: {a.date} | Out Time: {new Date(a.outTime).toLocaleTimeString()}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}