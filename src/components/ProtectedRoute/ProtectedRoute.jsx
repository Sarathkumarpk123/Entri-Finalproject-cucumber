// components/ProtectedRoute/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, token }) => {
  // If no token, redirect to the login page
  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
