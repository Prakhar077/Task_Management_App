import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decoded = jwtDecode(storedToken) as User;
      setUser(decoded);
      setToken(storedToken);
    }
  }, []);

  const login = (token: string) => {
    const decoded = jwtDecode(token) as User;
    setUser(decoded);
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
