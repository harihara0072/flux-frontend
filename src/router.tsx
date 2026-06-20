// src/router.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Auth flow (unchanged for now — will be revisited in a later milestone)
import MultiStepAuthFlow from './flows/auth/MultiStepAuthFlow';
import LoginPage from './pages/LoginPage';

// New dashboard homepage
import DashboardHomePage from './pages/DashboardHomePage';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Homepage: dashboard UI, not gated behind auth yet (UI-only milestone) */}
        <Route path="/" element={<DashboardHomePage />} />

        {/* Auth Flow Routes — kept for the next milestone */}
        <Route path="/register" element={<MultiStepAuthFlow />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
