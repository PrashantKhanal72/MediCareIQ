import React from "react";
import { isLoggedIn } from "../utils/isLoggedIn";
import { Navigate } from "react-router-dom";

const PatientRoutes = ({ children }) => {
  const userType = isLoggedIn();
  return userType === "patient" ? { children } : <Navigate to="/login" />;
};

export default PatientRoutes;
