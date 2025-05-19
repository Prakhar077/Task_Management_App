import React from 'react';
import useAuth from '../hooks/useAuth';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {user?.username}! You are logged in as <strong>{user?.role}</strong>.</p>
    </div>
  );
};

export default Dashboard;
