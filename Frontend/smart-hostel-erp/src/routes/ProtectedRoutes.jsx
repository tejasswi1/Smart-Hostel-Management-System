// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext.jsx";

// export default function ProtectedRoute({ children }) {
//   const { user, loading } = useContext(AuthContext);

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (!user) return <Navigate to="/login" replace />;

//   return children;
// }


import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoutes() {
  const { user, loading } = useAuth();

  if (loading) return null; // wait till auth loads

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}