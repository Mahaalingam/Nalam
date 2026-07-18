// src/components/ProtectedRoute.jsx
//
// Wraps any route that requires login. If nobody's logged in, redirect to /login.
// Optionally restricts by role (e.g. only "doctor" can see Doctor Dashboard).

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRole }) {
  const { currentUser } = useAuth();

  // Case 1: Nobody is logged in at all
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Case 2: Someone is logged in, but this route is role-restricted
  // (e.g. a patient trying to visit /doctor-dashboard)
  if (allowedRole && currentUser.role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  // Case 3: Logged in and authorized — render the actual page
  return children;
}

export default ProtectedRoute;