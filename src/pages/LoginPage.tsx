import React from 'react';

const LoginPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Login Page Placeholder</h1>
        <p className="mt-2 text-emerald-400">Your login form will go here.</p>
        <p className="mt-4">Go to <a href="/register" className="text-blue-400 hover:text-blue-300">Register</a></p>
      </div>
    </div>
  );
};

export default LoginPage;
