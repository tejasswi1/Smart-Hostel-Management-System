// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext.jsx";

// export default function RoleRoute({ children, allowedRoles }) {
//   const { user, loading } = useContext(AuthContext);

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (!user) return <Navigate to="/login" replace />;
//   if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" replace />;

//   return children;
// }
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RoleRoute({ allowedRoles, children }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;

  return children;
}