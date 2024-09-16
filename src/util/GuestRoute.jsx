import React from "react";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ component: Component, ...rest }) => {
  const userInfo = localStorage.getItem("user-info");
  const isAuthenticated = userInfo !== null;

  return !isAuthenticated ? <Component {...rest} /> : <Navigate to="/dashboard" />;
};

export default GuestRoute;
