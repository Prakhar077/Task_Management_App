import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Users from './pages/Users';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
          </Route>

          <Route element={<PrivateRoute roles={['admin']} />}>
            <Route path="/users" element={<Users />} />
          </Route>

          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;