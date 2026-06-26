// import { Link, Outlet } from "react-router-dom"; // ✅ Outlet for nested routes
// import { useEffect, useState } from "react";
// import { getMyNightEntries } from "../../api/night.api";
// import LocationMap from "../../components/LocationMap";
// import Notifications from "../../components/Notifications";
// import React from "react";

// export default function StudentDashboard() {
//   const [latestEntry, setLatestEntry] = useState(null);

//   useEffect(() => {
//     const fetchLatest = async () => {
//       try {
//         const data = await getMyNightEntries();
//         if (data.length > 0) {
//           setLatestEntry(data[data.length - 1]); // latest entry
//         }
//       } catch (err) {
//         console.error("Failed to fetch night entries:", err);
//       }
//     };
//     fetchLatest();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {/* Notifications */}
//       <Notifications />

//       {/* Header */}
//       <h1 className="text-3xl font-bold mb-6">🎓 Student Dashboard</h1>

//       {/* Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
//         {/* Night Entry */}
//         <Link to="/student/night-entry">
//           <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
//             <h2 className="text-xl font-semibold mb-2">🌙 Night Entry</h2>
//             <p className="text-gray-600">
//               Submit night entry with location and photo proof.
//             </p>
//           </div>
//         </Link>

//         {/* Night Status */}
//         <Link to="/student/night-status">
//           <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
//             <h2 className="text-xl font-semibold mb-2">📊 Night Entry Status</h2>
//             <p className="text-gray-600">
//               Check approval status by guard and warden.
//             </p>
//           </div>
//         </Link>

//         {/* Complaints */}
//         <Link to="/student/complaints">
//           <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
//             <h2 className="text-xl font-semibold mb-2">🛠️ Complaints</h2>
//             <p className="text-gray-600">
//               Raise hostel complaints with photo proof.
//             </p>
//           </div>
//         </Link>

//         {/* Mess Bills */}
//         <Link to="/student/mess">
//           <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
//             <h2 className="text-xl font-semibold mb-2">💰 Mess Bills</h2>
//             <p className="text-gray-600">
//               View your mess bills and submit payment proofs.
//             </p>
//           </div>
//         </Link>

//         {/* Latest Night Entry Preview */}
//         {latestEntry?.location && (
//           <div className="col-span-1 md:col-span-2 bg-white p-4 rounded-lg shadow">
//             <h3 className="font-semibold mb-2">
//               Latest Night Entry Location
//             </h3>

//             {/* Map */}
//             {latestEntry.location.lat && latestEntry.location.long ? (
//               <LocationMap
//                 lat={latestEntry.location.lat}
//                 long={latestEntry.location.long}
//               />
//             ) : (
//               <p>No location data available.</p>
//             )}

//             {/* Photo proof */}
//             {latestEntry.photo && (
//               <img
//                 src={latestEntry.photo}
//                 alt="Proof"
//                 className="w-full h-40 object-cover rounded mt-2"
//               />
//             )}
//           </div>
//         )}

//         {/* Placeholder Cards */}
//         <div className="bg-white p-6 rounded-lg shadow opacity-60">
//           <h2 className="text-xl font-semibold mb-2">🚶 Class / Shop Entry</h2>
//           <p className="text-gray-600">
//             Go & Return tracking (coming soon).
//           </p>
//         </div>
//       </div>

//       {/* ✅ Nested routes will render here */}
//       <Outlet />
//     </div>
//   );
// }
import { useEffect } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function StudentDashboard() {
  const { user } = useAuth();

  useEffect(() => {
    // 🔐 Test protected API (auth + token check)
    api
      .get("/test/student")
      .then((res) => {
        console.log("STUDENT DASHBOARD API OK 👉", res.data);
      })
      .catch((err) => {
        console.log(
          "STUDENT DASHBOARD API ERROR 👉",
          err.response?.data || err.message
        );
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Dashboard</h2>

      <p>
        Logged in as: <b>{user?.role}</b>
      </p>

      <ul>
        <li>Night Entry</li>
        <li>Class / Daily Movement</li>
        <li>Mess Bill</li>
        <li>Complaints</li>
      </ul>

      <p style={{ marginTop: "20px", color: "green" }}>
        If this page loads and API logs show success, auth is working 🎉
      </p>
    </div>
  );
}