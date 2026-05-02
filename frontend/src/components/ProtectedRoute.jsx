import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();

  if (!token) {
    // Redirect to login if not authenticated, passing the current location
    return <Navigate 
      to="/login" 
      state={{ 
        from: location, 
        message: "You are not signed in. Please login first to continue." 
      }} 
      replace 
    />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to home if user role is not allowed
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
