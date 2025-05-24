import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';

const Layout = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar component - responsive */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleSidebar={toggleSidebar} onLogout={onLogout} />
        
        <main className={`flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 ${location.pathname.includes('/reports') ? 'lg:pl-8' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;