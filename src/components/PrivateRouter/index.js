import { Navigate } from 'react-router-dom';
import React from 'react';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken');

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;