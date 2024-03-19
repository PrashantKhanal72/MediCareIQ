import React from "react";
import { isLoggedIn } from "../utils/isLoggedIn";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hook";

const DoctorRoutes = ({ children }) => {
  const dispatch = useAppDispatch()
  const userType = isLoggedIn(dispatch);
  return userType === "doctor" ? { children } : <Navigate to="/login" />;
};

export default DoctorRoutes;
