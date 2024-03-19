import React from "react";
import { isLoggedIn } from "../utils/isLoggedIn";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hook";

const PatientRoutes = ({ children }) => {
  const dispatch = useAppDispatch()
  const userType = isLoggedIn(dispatch);
  return userType === "patient" ? { children } : <Navigate to="/login" />;
};

export default PatientRoutes;
