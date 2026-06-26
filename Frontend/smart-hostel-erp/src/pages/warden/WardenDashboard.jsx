// import { useEffect, useState } from "react";
// import api from "../../api/axios";
// import LocationMap from "../../components/LocationMap";
// import Notifications from "../../components/Notifications";
// import { Link, Outlet } from "react-router-dom"; // ✅ Outlet for nested routes

// export default function WardenDashboard() {
//   const [entries, setEntries] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch guard-approved entries pending warden approval
//   const fetchEntries = async () => {
//     try {
//       const res = await api.get("/night/guard-approved");
//       setEntries(res.data);
//     } catch (err) {
//       console.error("Failed to fetch entries:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEntries();
//   }, []);

//   // Final approval by warden
//   const approveEntry = async (id) => {
//     try {
//       await api.post(`/night/warden-approve/${id}`);
//       fetchEntries();
//     } catch (err) {
//       alert("Approval failed");
//     }
//   };

//   if (loading) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <Notifications />

//       <h1 className="text-2xl font-bold mb-4">🧑‍🏫 Warden Dashboard</h1>

//       {/* Action Links */}
//       <div className="flex gap-4 mb-4">
//         <Link
//           to="/warden/analytics"
//           className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//         >
//           Analytics
//         </Link>
//         <Link
//           to="/warden/audit-logs"
//           className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
//         >
//           Audit Logs
//         </Link>
//         <Link
//           to="/warden/complaints"
//           className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
//         >
//           Complaints
//         </Link>
//       </div>

//       {entries.length === 0 ? (
//         <p className="text-gray-500">No entries pending final approval.</p>
//       ) : (
//         <div className="space-y-4">
//           {entries.map((entry) => (
//             <div
//               key={entry._id}
//               className="bg-white p-4 rounded shadow flex flex-col space-y-3"
//             >
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="font-semibold">{entry.student?.name || "Student"}</p>
//                   <p className="text-sm text-gray-600">{entry.date} • {entry.time}</p>
//                   <p className="text-sm">Reason: {entry.reason}</p>
//                   <p className="text-xs text-green-600">Guard Approved ✔</p>
//                 </div>
//                 <button
//                   onClick={() => approveEntry(entry._id)}
//                   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                   Final Approve
//                 </button>
//               </div>

//               {/* Map */}
//               {entry.location?.lat && entry.location?.long ? (
//                 <LocationMap lat={entry.location.lat} long={entry.location.long} />
//               ) : (
//                 <p className="text-gray-500 text-sm">No location data available.</p>
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

//       {/* ✅ Nested routes render here */}
//       <Outlet />
//     </div>
//   );
// }
import { Link } from "react-router-dom";

export default function WardenDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Warden Dashboard</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/warden/night-entries">
            🌙 Night Entry Approvals
          </Link>
        </li>

        <li style={{ marginBottom: "10px" }}>
          <Link to="/warden/complaints">
            🛠️ Complaints Management
          </Link>
        </li>

        <li style={{ marginBottom: "10px" }}>
          <Link to="/warden/mess">
            🍽️ Mess Bills
          </Link>
        </li>

        <li style={{ marginBottom: "10px" }}>
          <Link to="/warden/students">
            👩‍🎓 Student Records
          </Link>
        </li>
      </ul>
    </div>
  );
}