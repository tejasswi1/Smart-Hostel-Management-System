import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function GuardNightEntries() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    try {
      const res = await api.get("/night/pending"); // guard pending list
      setEntries(res.data);
    } catch (err) {
      alert("Failed to load entries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const approveEntry = async (id) => {
    try {
      await api.post(`/night/approve/${id}`, {
        remark: "Approved by guard",
      });
      fetchEntries(); // refresh list
    } catch (err) {
      alert("Approval failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  if (entries.length === 0)
    return <p>No entries to approve</p>;

  return (
    <div>
      <h2>Guard – Night Entries</h2>

      {entries.map((e) => (
        <div key={e._id} style={{ borderBottom: "1px solid #ccc", margin: 10 }}>
          <p><b>Student:</b> {e.student?.name}</p>
          <p><b>Reason:</b> {e.reason}</p>
          <p><b>Status:</b> {e.status}</p>

          <button onClick={() => approveEntry(e._id)}>
            Approve
          </button>
        </div>
      ))}
    </div>
  );
}