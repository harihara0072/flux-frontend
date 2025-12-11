// src/App.tsx (Verify this wrapper)
import React from 'react';
import AppRouter from './router';
import { AuthProvider } from './hooks/useAuth';

const App: React.FC = () => {
  return (
    // min-h-screen ensures the div takes up full viewport height
    <AuthProvider>
      <div className="min-h-screen bg-gray-900 text-gray-200">
        <AppRouter />
      </div>
    </AuthProvider>
  );
};

export default App;