import { useEffect, useState } from "react";
import api from "../../api/axios";

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

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Night Entries</h2>

      {entries.length === 0 ? (
        <p>No entries found</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ width: "100%", marginTop: "15px" }}
        >
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
                <td>{entry.date}</td>
                <td>{entry.time}</td>
                <td>{entry.reason}</td>
                <td>
                  <b>{entry.status}</b>
                </td>
                <td>{entry.guardRemark || "-"}</td>
                <td>{entry.wardenRemark || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
            <h2 style={{ marginTop: "30px" }}>Class Go / Return History</h2>

      {movements.length === 0 ? (
        <p>No class movement records found</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ width: "100%", marginTop: "15px" }}
        >
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
                <td>{m.date}</td>
                <td>{new Date(m.outTime).toLocaleTimeString()}</td>
                <td>
                  {m.inTime
                    ? new Date(m.inTime).toLocaleTimeString()
                    : "-"}
                </td>
                <td>{m.inTime ? "Returned" : "Not Returned"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}