// // import { useEffect, useState } from "react";
// // import { getNotifications, markAsRead } from "../api/notification.api";

// // export default function Notifications() {
// //   const [list, setList] = useState([]);

// //   useEffect(() => {
// //     const fetchNotifications = async () => {
// //       try {
// //         const data = await getNotifications();
// //         setList(Array.isArray(data) ? data : []);
// //       } catch (err) {
// //         console.error("Failed to fetch notifications:", err);
// //         setList([]);
// //       }
// //     };

//     fetchNotifications();
//   }, []);

//   const handleRead = async (id) => {
//     try {
//       await markAsRead(id);
//       setList((prev) =>
//         prev.map((n) => (n._id === id ? { ...n, read: true } : n))
//       );
//     } catch (err) {
//       console.error("Failed to mark as read:", err);
//     }
//   };

//   if (!list.length) {
//     return (
//       <div className="bg-white p-4 rounded shadow mb-4 max-w-xl mx-auto">
//         <h3 className="font-bold mb-2">🔔 Notifications</h3>
//         <p className="text-gray-500">No notifications</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white p-4 rounded shadow mb-4 max-w-xl mx-auto">
//       <h3 className="font-bold mb-2">🔔 Notifications</h3>
//       <div className="space-y-2">
//         {list.map((n) => (
//           <div
//             key={n._id}
//             className={`p-2 border rounded ${
//               n.read ? "bg-gray-100" : "bg-blue-50"
//             } flex justify-between items-center`}
//           >
//             <p className="text-sm">{n.message}</p>
//             {!n.read && (
//               <button
//                 onClick={() => handleRead(n._id)}
//                 className="text-xs text-blue-600 hover:underline"
//               >
//                 Mark as read
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
