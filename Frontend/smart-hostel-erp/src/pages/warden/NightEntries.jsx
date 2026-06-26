import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function WardenNightEntries() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEntries = async () => {
    try {
      const res = await api.get("/night/warden-pending");
      setEntries(res.data);
    } catch (err) {
      alert("Failed to load entries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const approve = async (id) => {
    await api.post(`/night/warden-approve/${id}`, {
      remark: "Approved by warden",
    });
    loadEntries();
  };

  const reject = async (id) => {
    await api.post(`/night/warden-reject/${id}`, {
      remark: "Not allowed",
    });
    loadEntries();
  };

  if (loading) return <p>Loading...</p>;
  if (entries.length === 0) return <p>No entries to approve</p>;

  return (
    <div>
      <h2>Warden – Night Entries</h2>

      {entries.map((e) => (
        <div key={e._id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <p><b>Student:</b> {e.student.name}</p>
          <p><b>Reason:</b> {e.reason}</p>

          <button onClick={() => approve(e._id)}>Approve</button>
          <button onClick={() => reject(e._id)} style={{ marginLeft: 10 }}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}