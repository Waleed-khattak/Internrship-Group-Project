import React from "react";
import { Navigate } from "react-router-dom";
import { getAuth } from "../utils/auth";

const ProtectedRoute = ({ children, role }) => {
  const auth = getAuth();

  // If not logged in → redirect to login
  if (!auth || !auth.token) {
    return <Navigate to="/login" />;
  }

  // If logged in but role mismatch → redirect to login
  if (role && auth.user.role !== role) {
    return <Navigate to="/login" />;
  }

  // ✅ Allowed → show page
  return children;
};

export default ProtectedRoute;
