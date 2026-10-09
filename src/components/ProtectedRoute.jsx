import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('streamx_user');
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
