import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function GuardClassGoto() {
  const [entries, setEntries] = useState([]);

  const loadEntries = async () => {
    try {
      const res = await api.get("/class-goto/records");
      // sirf unreturned
      const open = res.data.filter(e => !e.inTime);
      setEntries(open);
    } catch (err) {
      alert("Failed to load class goto entries");
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Guard – Class Goto Monitor</h2>

      {entries.length === 0 ? (
        <p>No active students outside</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Student</th>
              <th>Email</th>
              <th>Date</th>
              <th>Out Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e._id}>
                <td>{e.student?.name}</td>
                <td>{e.student?.email}</td>
                <td>{e.date}</td>
                <td>{new Date(e.outTime).toLocaleTimeString()}</td>
                <td style={{ color: "red" }}>OUT</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}