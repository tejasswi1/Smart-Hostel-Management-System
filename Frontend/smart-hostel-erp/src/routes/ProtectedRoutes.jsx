

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