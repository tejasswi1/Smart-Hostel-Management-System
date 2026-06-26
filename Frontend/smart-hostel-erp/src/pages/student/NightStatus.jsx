// import { useEffect, useState } from "react";
// import { getMyNightEntries } from "../../api/night.api";

// export default function NightStatus() {
//   const [entries, setEntries] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const data = await getMyNightEntries();
//         setEntries(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetch();
//   }, []);

//   const getStatusLabel = (e) => {
//     if (e.approvedByWarden) return <span className="text-green-600 font-semibold">Approved</span>;
//     if (e.approvedByGuard) return <span className="text-yellow-600 font-semibold">Guard Approved</span>;
//     return <span className="text-red-500 font-semibold">Pending</span>;
//   };

//   if (loading) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">🌙 My Night Entry Status</h2>
//       {entries.length === 0 ? <p className="text-gray-500">No night entries found</p> :
//         <div className="overflow-x-auto">
//           <table className="w-full border border-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-2 border">Date</th>
//                 <th className="p-2 border">Time</th>
//                 <th className="p-2 border">Reason</th>
//                 <th className="p-2 border">Guard</th>
//                 <th className="p-2 border">Warden</th>
//                 <th className="p-2 border">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {entries.map(e => (
//                 <tr key={e._id} className="text-center">
//                   <td className="p-2 border">{e.date}</td>
//                   <td className="p-2 border">{e.time}</td>
//                   <td className="p-2 border">{e.reason}</td>
//                   <td className="p-2 border">{e.approvedByGuard ? "✅" : "❌"}</td>
//                   <td className="p-2 border">{e.approvedByWarden ? "✅" : "❌"}</td>
//                   <td className="p-2 border">{getStatusLabel(e)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       }
//     </div>
//   );
// }
