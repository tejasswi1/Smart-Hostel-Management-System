 import { Routes, Route } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
// // Pages
// import Login from "./pages/Login.jsx";

// // Student
// import StudentDashboard from "./pages/student/StudentDashboard.jsx";
 //import NightEntry from "./pages/student/NightEntry.jsx";
// import NightStatus from "./pages/student/NightStatus.jsx";
// import Complaints from "./pages/student/Complaints.jsx";
// import MessBills from "./pages/student/Messbills.jsx";

// // Guard
// import GuardDashboard from "./pages/GuardDashboard.jsx";

// // Warden
// import WardenDashboard from "./pages/warden/WardenDashboard.jsx";
// import AuditLogs from "./pages/warden/AuditLog.jsx";
// import Analytics from "./pages/warden/Analytics.jsx";
// import WardenComplaints from "./pages/warden/Complaints.jsx";

// // Route Protection
// import ProtectedRoutes from "./routes/ProtectedRoutes";
// import RoleRoute from "./routes/RoleRoute";

// // Unauthorized page
// function Unauthorized() {
//   return (
//     <div className="p-6 text-center">
//       <h2 className="text-2xl font-bold mb-4">🚫 Unauthorized</h2>
//       <p>You do not have permission to access this page.</p>
//     </div>
//   );
// }



export default function App() {
  return (
    <AppRoutes/>

      
/* //           <ProtectedRoute>
//             <RoleRoute allowedRoles={["student"]}>
//               <StudentDashboard />
//             </RoleRoute>
//           </ProtectedRoute>
//         }
//       >
//         <Route path="night-entry" element={<NightEntry />} />
//         <Route path="night-status" element={<NightStatus />} />
//         <Route path="complaints" element={<Complaints />} />
//         <Route path="mess" element={<MessBills />} />
//       </Route> */

//       {/* GUARD */}
//       <Route
//         path="/guard"
//         element={
//           <ProtectedRoute>
//             <RoleRoute allowedRoles={["guard"]}>
//               <GuardDashboard />
//             </RoleRoute>
//           </ProtectedRoute>
//         }
//       />

//       {/* WARDEN */}
//       <Route
//         path="/warden/*"
//         element={
//           <ProtectedRoute>
//             <RoleRoute allowedRoles={["warden"]}>
//               <WardenDashboard />
//             </RoleRoute>
//           </ProtectedRoute>
//         }
//       >
//         <Route path="audit-logs" element={<AuditLogs />} />
//         <Route path="analytics" element={<Analytics />} />
//         <Route path="complaints" element={<WardenComplaints />} />
//       </Route>

//       {/* Fallback */}
//       <Route path="*" element={<Login />} />
//     </Routes>
   );
 }
