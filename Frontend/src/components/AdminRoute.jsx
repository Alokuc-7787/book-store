import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { isAdminUser } from "../utils/admin";

function AdminRoute({ children }) {
  const [authUser] = useAuth();
  const location = useLocation();

  if (!authUser) {
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  if (!isAdminUser(authUser)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;
