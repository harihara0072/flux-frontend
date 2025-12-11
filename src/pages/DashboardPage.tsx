import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';

const DashboardPage: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-emerald-400">DASHBOARD</h1>
        <p className="mt-2 text-gray-200">Welcome! This route is protected.</p>
        <Button onClick={logout} className="mt-6" variant="danger">
            Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardPage;