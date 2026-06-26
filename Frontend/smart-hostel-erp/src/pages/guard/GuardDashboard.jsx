// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import LocationMap from "../components/LocationMap";
// import Notifications from "../components/Notifications";

// export default function GuardDashboard() {
//   const [entries, setEntries] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch pending night entries
//   const fetchPendingEntries = async () => {
//     try {
//       const res = await api.get("/night/pending");
//       setEntries(res.data);
//     } catch (err) {
//       console.error("Failed to fetch entries:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPendingEntries();
//   }, []);

//   // Approve entry
//   const approveEntry = async (id) => {
//     try {
//       await api.post(`/night/approve/${id}`);
//       fetchPendingEntries();
//     } catch (err) {
//       alert("Failed to approve entry");
//     }
//   };

//   if (loading) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <Notifications />
//       <h1 className="text-2xl font-bold mb-4">🛡️ Guard Dashboard</h1>

//       {entries.length === 0 ? (
//         <p className="text-gray-500">No pending night entries.</p>
//       ) : (
//         <div className="space-y-4">
//           {entries.map((entry) => (
//             <div key={entry._id} className="bg-white p-4 rounded shadow space-y-3">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="font-semibold">{entry.student?.name || "Student"}</p>
//                   <p className="text-sm text-gray-600">{entry.date} • {entry.time}</p>
//                   <p className="text-sm">Reason: {entry.reason}</p>
//                 </div>
//                 <button
//                   onClick={() => approveEntry(entry._id)}
//                   className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                 >
//                   Approve
//                 </button>
//               </div>

//               {/* Map */}
//               {entry.location && (
//                 <LocationMap lat={entry.location.lat} long={entry.location.long} />
//               )}

//               {/* Photo */}
//               {entry.photo && (
//                 <img
//                   src={entry.photo}
//                   alt="Proof"
//                   className="w-full h-40 object-cover rounded"
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
import { Link } from "react-router-dom";

export default function GuardDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Guard Dashboard</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/guard/night-entries">
            🌙 Night Entry Verification
          </Link>
        </li>

        <li style={{ marginBottom: "10px" }}>
          <Link to="/guard/daily-movement">
            🚶 Daily Go / Return Entries
          </Link>
        </li>

        <li style={{ marginBottom: "10px" }}>
          <Link to="/guard/students">
            👩‍🎓 Student List
          </Link>
        </li>
      </ul>
    </div>
  );
}