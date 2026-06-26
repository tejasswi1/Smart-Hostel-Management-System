// import { useEffect, useState } from "react";
// import { getAllComplaints, resolveComplaint } from "../../api/complaint.api";

// export default function WardenComplaints() {
//   const [complaints, setComplaints] = useState([]);

//   useEffect(() => {
//     getAllComplaints().then(res => setComplaints(res.data));
//   }, []);

//   const resolve = async (id) => {
//     await resolveComplaint(id);
//     setComplaints(c => c.map(x => x._id === id ? {...x, status: "Resolved"} : x));
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Complaints</h2>
//       {complaints.map(c => (
//         <div key={c._id} className="border p-3 mb-3">
//           <p><b>{c.category}</b> – {c.student.name}</p>
//           <p>{c.description}</p>
//           <p>Status: {c.status}</p>
//           {c.status === "Pending" && (
//             <button onClick={() => resolve(c._id)} className="bg-green-600 text-white px-3 py-1 mt-2">
//               Mark Resolved
//             </button>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";

export default function WardenComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // =========================
  // FETCH ALL COMPLAINTS
  // =========================
  const fetchComplaints = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/complaints",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("📦 ALL COMPLAINTS:", res.data);

      setComplaints(res.data);
    } catch (err) {
      console.error("❌ FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // RESOLVE COMPLAINT
  // =========================
  const resolveComplaint = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/complaints/resolve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Complaint resolved");

      fetchComplaints(); // refresh list
    } catch (err) {
      console.error("❌ RESOLVE ERROR:", err);
      alert("Failed to resolve complaint");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  if (loading) return <p>Loading complaints...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>🛠 Warden – Complaints</h2>

      {complaints.length === 0 ? (
        <p>No complaints found</p>
      ) : (
        complaints.map((c) => {
          const status = String(c.status).toLowerCase();

          console.log("🟡 STATUS:", status);

          return (
            <div
              key={c._id}
              style={{
                border: "1px solid #ccc",
                padding: 15,
                marginBottom: 12,
                borderRadius: 6,
              }}
            >
              <h4>{c.category}</h4>
              <p>{c.description}</p>

              <p>
                <b>Student:</b>{" "}
                {c.student?.name || "Unknown"}
              </p>

              <p>
                <b>Status:</b>{" "}
                {status === "pending" ? "⏳ Pending" : "✅ Resolved"}
              </p>

              {/* 🔥 RESOLVE BUTTON */}
              {status === "pending" && (
                <button
                  onClick={() => resolveComplaint(c._id)}
                  style={{
                    padding: "6px 12px",
                    background: "#28a745",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: 4,
                  }}
                >
                  Resolve
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}