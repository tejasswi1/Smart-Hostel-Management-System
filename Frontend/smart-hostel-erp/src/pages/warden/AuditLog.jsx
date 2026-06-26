// import { useEffect, useState } from "react";
// import { getAuditLogs } from "../../api/audit.api";

// export default function AuditLogs() {
//   const [logs, setLogs] = useState([]);

//   useEffect(() => {
//     getAuditLogs().then(res => setLogs(res.data));
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">🧾 Audit Logs</h2>
//       {logs.length === 0 ? <p className="text-gray-500">No logs found</p> :
//         <div className="space-y-3">
//           {logs.map(log => (
//             <div key={log._id} className="border p-3 rounded bg-white">
//               <p className="font-semibold">{log.action}</p>
//               <p className="text-sm text-gray-600">By: {log.user?.name} ({log.user?.role})</p>
//               <p className="text-sm">{log.details}</p>
//               <p className="text-xs text-gray-400">{new Date(log.createdAt).toLocaleString()}</p>
//             </div>
//           ))}
//         </div>
//       }
//     </div>
//   );
// }
