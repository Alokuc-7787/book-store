import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function ProtectedRoute({ children }) {
  const [authUser] = useAuth();
  const location = useLocation();

  if (!authUser) {
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
