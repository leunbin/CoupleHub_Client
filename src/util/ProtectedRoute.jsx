import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const userInfo = localStorage.getItem("user-info");
  const isAuthenticated = userInfo !== null;

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
