// import { useEffect, useState } from "react";
// import { getWardenAnalytics } from "../../api/analytics.api";

// export default function Analytics() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     getWardenAnalytics().then(res => setData(res.data));
//   }, []);

//   if (!data) return <p className="p-6">Loading analytics...</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">📊 Hostel Analytics</h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {Object.entries({
//           "Total Students": data.totalStudents,
//           "Total Night Entries": data.totalNightEntries,
//           "Pending Night Approvals": data.pendingNightEntries,
//           "Total Complaints": data.totalComplaints,
//           "Pending Complaints": data.pendingComplaints,
//           "Paid Mess Bills": data.paidBills,
//           "Unpaid Mess Bills": data.unpaidBills
//         }).map(([title, value]) => (
//           <div key={title} className="bg-white p-4 rounded shadow">
//             <p className="text-gray-500 text-sm">{title}</p>
//             <p className="text-2xl font-bold">{value}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
