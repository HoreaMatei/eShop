import React from "react";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Allow access to login and register routes
    if (
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    ) {
      return <>{children}</>;
    }
    // Redirect all other unauthenticated users to login
    return <Navigate to="/auth/login" replace />;
  }

  // Handle redirects for authenticated users trying to access login/register
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/shop/home" replace />;
  }

  // Handle role-based access
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth-page" replace />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Default behavior: Render children if no redirection is required
  return <>{children}</>;
};

export default CheckAuth;
