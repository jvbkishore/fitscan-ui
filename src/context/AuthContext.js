// src/context/AuthContext.js
import { createContext, useState, useEffect,useContext  } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('fitscan_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Failed to parse user from localStorage', err);
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
     if (!userData || !userData.user || !userData.token) {
      console.error('Invalid user data for login', userData);
      return;
    }
    setUser(userData);
    try {
      localStorage.setItem('fitscan_user', JSON.stringify(userData.user));
      localStorage.setItem('accessToken', userData.token);
    } catch (err) {
      console.error('Failed to save user to localStorage', err);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('fitscan_user');
      localStorage.removeItem('accessToken');
    } catch (err) {
      console.error('Failed to remove user from localStorage', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );


};
