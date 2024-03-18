import React from "react";
import { isLoggedIn } from "../utils/isLoggedIn";
import { Navigate } from "react-router-dom";

const AdminRoutes = ({ children }) => {
  const userType = isLoggedIn();
  return userType === "admin" ? { children } : <Navigate to="/login" />;
};

export default AdminRoutes;
