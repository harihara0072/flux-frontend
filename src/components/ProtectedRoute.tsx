// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// This is a standard function component and will follow the rules of hooks
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // CRITICAL: Hook call is inside a functional component
  const { isAuthenticated } = useAuth();

  // The logic is unchanged
  if (!isAuthenticated) {
    // Redirect unauthenticated users
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;