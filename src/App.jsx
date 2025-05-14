import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Import pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Layout from './components/layouts/Layout';
import DashboardPage from './pages/DashboardPage';
import NarrativesPage from './pages/NarrativesPage';
import ActorsPage from './pages/ActorsPage';
import TimelinePage from './pages/TimelinePage';
import AlertsPage from './pages/AlertsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

/**
 * Main App component for Dexter platform
 */
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('dexterUser');
      setIsAuthenticated(!!user);
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
  // Protected route component
  const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    
    useEffect(() => {
      if (!isAuthenticated && !isLoading) {
        navigate('/login');
      }
    }, [isAuthenticated, isLoading, navigate]);
    
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      );
    }
    
    return isAuthenticated ? children : null;
  };
  
  // Login function
  const handleLogin = (email, password) => {
    // For demo purposes, accept any non-empty credentials
    if (email && password) {
      const userData = {
        id: 'user-123',
        name: 'Demo User',
        email: email,
        organization: 'Election Watch',
        role: 'RESEARCHER'
      };
      
      localStorage.setItem('dexterUser', JSON.stringify(userData));
      setIsAuthenticated(true);
      return { success: true };
    }
    
    return { success: false, message: 'Invalid email or password' };
  };
  
  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('dexterUser');
    setIsAuthenticated(false);
  };
  
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      
      {/* Protected routes */}
      <Route path="/app" element={
        <ProtectedRoute>
          <Layout onLogout={handleLogout} />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="narratives" element={<NarrativesPage />} />
        <Route path="actors" element={<ActorsPage />} />
        <Route path="timeline" element={<TimelinePage />} />
        <Route path="alerts" element={<AlertsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
