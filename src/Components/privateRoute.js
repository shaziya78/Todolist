import React from "react";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ element }) => {
  const isLoggedIn = !!localStorage.getItem("token");

  if (!isLoggedIn) {
    return <Navigate to="/register" />;
  }

  return element;
};

export default PrivateRoute;
