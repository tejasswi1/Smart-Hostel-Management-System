// import { Link, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// export default function NavigationBar() {
//   const navigate = useNavigate();
//   const { user, logout } = useContext(AuthContext);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
//       {/* App Name */}
//       <h1 className="text-xl font-bold text-blue-600">Smart Hostel ERP</h1>

//       {/* Links based on role */}
//       <div className="flex gap-6 text-gray-700 font-medium">
//         {user?.role === "student" && (
//           <>
//             <Link to="/student" className="hover:text-blue-600">Dashboard</Link>
//             <Link to="/student/night-entry" className="hover:text-blue-600">Night Entry</Link>
//             <Link to="/student/night-status" className="hover:text-blue-600">Night Status</Link>
//             <Link to="/student/complaints" className="hover:text-blue-600">Complaints</Link>
//             <Link to="/student/mess" className="hover:text-blue-600">Mess Bill</Link>
//           </>
//         )}

//         {user?.role === "guard" && (
//           <Link to="/guard" className="hover:text-blue-600">Guard Dashboard</Link>
//         )}

//         {user?.role === "warden" && (
//           <>
//             <Link to="/warden" className="hover:text-blue-600">Warden Dashboard</Link>
//             <Link to="/warden/analytics" className="hover:text-blue-600">Analytics</Link>
//             <Link to="/warden/audit-logs" className="hover:text-blue-600">Audit Logs</Link>
//             <Link to="/warden/complaints" className="hover:text-blue-600">Complaints</Link>
//           </>
//         )}
//       </div>

//       {/* Logout */}
//       {user && (
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
//         >
//           Logout
//         </button>
//       )}
//     </nav>
//   );
// }
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      {/* ================= STUDENT ================= */}
      {user.role === "student" && (
        <>
          <Link to="/student">Dashboard</Link> |{" "}
          <Link to="/student/night-entry">Night Entry</Link> |{" "}
          <Link to="/student/my-entries">My Entries</Link> |{" "}
          <Link to="/student/class-goto">Class Goto</Link> |{" "}
          <Link to="/student/mess">Mess Bill</Link> |{" "}
          <Link to="/student/complaints">Complaints</Link>
        </>
      )}

      {/* ================= WARDEN ================= */}
      {user.role === "warden" && (
        <>
          <Link to="/warden">Dashboard</Link> |{" "}
          <Link to="/warden/night-entries">Night Entries</Link> |{" "}
          <Link to="/warden/class-goto">Class Goto</Link> |{" "}
          <Link to="/warden/complaints">Complaints</Link> |{" "}
          <Link to="/warden/mess">Mess</Link> |{" "}
          <Link to="/warden/students">Students</Link>
        </>
      )}

      {/* ================= GUARD ================= */}
      {user.role === "guard" && (
        <>
          <Link to="/guard">Dashboard</Link> |{" "}
          <Link to="/guard/night-entries">Night Entries</Link> |{" "}
          <Link to="/guard/class-goto">Class Goto</Link> |{" "}
        </>
      )}

      <span style={{ float: "right" }}>
        <button onClick={handleLogout}>Logout</button>
      </span>
    </nav>
  );
}