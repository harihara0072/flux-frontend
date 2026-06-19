// src/App.tsx (UPDATED for Aesthetic Enhancement)
import React from 'react';
import AppRouter from './router';
import { AuthProvider } from './hooks/useAuth';
import Logo from './components/ui/Logo'; // NEW IMPORT

// Assume you have a simple logo/icon representing 'Flux' or 'F'
// For this code, we will use text for simplicity, but you would replace this with an actual SVG/image.
// We'll use a custom utility class for this effect.

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-light-bg text-dark-text font-sans relative overflow-hidden">

        {/* 💥 AESTHETIC ENHANCEMENT: Fixed, Subtle Branding Logo 💥 */}
        <div
          className="fixed bottom-0 right-0 p-8 select-none
                     opacity-5 transform translate-x-1/4 translate-y-1/4
                     lg:p-16 pointer-events-none z-0"
        >
          {/* Use the Logo component, sized massively */}
          <Logo width="600" height="225" />
        </div>

        {/* Router content (Auth Flow, Dashboard, etc.) remains z-index 10 or higher */}
        <div className="relative z-10">
          <AppRouter />
        </div>
      </div>
    </AuthProvider>
  );
};

export default App;