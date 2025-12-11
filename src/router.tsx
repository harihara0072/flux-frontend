// src/router.tsx (Updated)
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'; // NEW Import

// Import Pages and Flows
import MultiStepAuthFlow from './flows/auth/MultiStepAuthFlow';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

// REMOVE the definition of the old ProtectedRoute component here

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication Flow Routes */}
        <Route path="/register" element={<MultiStepAuthFlow />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Default Route: Check Auth status via the protected route */}
        <Route
          path="/"
          element={
            // Use ProtectedRoute to check status and redirect if needed
            <ProtectedRoute>
              <Navigate to="/dashboard" replace />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;