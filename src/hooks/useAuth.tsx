// src/hooks/useAuth.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. Define the shape of our context data
interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (access: string, refresh: string) => void;
  logout: () => void;
  // We'll add registration functions later
}

// 2. Create the actual context object
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. The Provider component that wraps our app
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Check localStorage on load for existing tokens
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('access_token'));
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refresh_token'));

  // Logic to determine if a user is considered logged in
  const isAuthenticated = !!accessToken;

  // Function to save tokens and update state upon successful login
  const login = (access: string, refresh: string) => {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    setAccessToken(access);
    setRefreshToken(refresh);
  };

  // Function to clear tokens and log out
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAccessToken(null);
    setRefreshToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. The custom hook for easy consumption
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};