import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!sessionStorage.getItem('authToken'); // Adjust as needed for your auth method

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;