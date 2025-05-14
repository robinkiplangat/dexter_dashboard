import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const checkLoggedIn = async () => {
      const storedUser = localStorage.getItem('dexterUser');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Failed to parse stored user data:', error);
          localStorage.removeItem('dexterUser');
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      // In a real app, this would make an API call to verify credentials
      // Mocking a successful login for demo purposes
      if (email && password) {
        const userData = {
          id: 'user-123',
          name: 'Demo User',
          email: email,
          organization: 'Election Watch',
          role: 'RESEARCHER',
          regions: ['Lagos', 'Abuja'],
          isActive: true,
          lastLogin: new Date().toISOString()
        };
        
        setUser(userData);
        localStorage.setItem('dexterUser', JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, message: 'Invalid email or password' };
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, message: 'An error occurred during login' };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('dexterUser');
    window.location.href = '/login';
  };

  // Authentication check
  const isAuthenticated = () => {
    return !!user;
  };

  // Context value
  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};