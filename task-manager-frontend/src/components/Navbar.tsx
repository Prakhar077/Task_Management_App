import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <div>
        <Link to="/dashboard" className="mr-4 hover:underline">
          Dashboard
        </Link>
        <Link to="/tasks" className="mr-4 hover:underline">
          Tasks
        </Link>
        {user?.role === 'admin' && (
          <Link to="/users" className="hover:underline">
            Users
          </Link>
        )}
      </div>
      <div>
        {user && (
          <>
            <span className="mr-4">Hello, {user.username}</span>
            <button onClick={logout} className="bg-red-600 px-2 py-1 rounded hover:bg-red-700">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
