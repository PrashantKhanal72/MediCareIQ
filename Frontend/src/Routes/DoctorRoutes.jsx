import React from "react";
import { isLoggedIn } from "../utils/isLoggedIn";
import { Navigate } from "react-router-dom";

const DoctorRoutes = ({ children }) => {
  const userType = isLoggedIn();
  return userType === "doctor" ? { children } : <Navigate to="/login" />;
};

export default DoctorRoutes;
