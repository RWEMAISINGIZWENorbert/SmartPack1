import React, { useState } from 'react';
import SideBar from './SideBar';
import Layout from './Layout';

// Import all your dashboard views
import Dashboard from './Dashboard';
import Department from './Department';
import Employees from './Employees';
import Salary from './Salary';
import Reports from './Reports';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const currentPath = location.pathname.split('/').pop() || 'dashboard';
  const activeView = currentPath === 'dashboard' ? 'dashboard' : currentPath;

   const handleViewChange = (viewId) => {
    // 4. NAVIGATE to the new URL path
    const targetPath = viewId === 'dashboard' ? '/dashboard' : `/dashboard/${viewId}`;
    navigate(targetPath);
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    logout(); // 2. Redirect to landing on logout
  };


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      
      {/* Signature Background Accent Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* A. LEFT SIDEBAR (Fixed Width) */}
      <aside className={`
      fixed lg:static inset-y-0 left-0 z-50 w-72 h-full bg-background
      transform transition-transform duration-300 ease-in-out
      ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'} 
      lg:translate-x-0 flex-shrink-0
    `}>
      <SideBar 
        activeView={activeView} 
        onViewChange={handleViewChange} 
        onLogout={handleLogout}
        onClose={() => setIsSidebarOpen(false)} // Pass close function to Sidebar
      />
    </aside>

    {/* 3. Mobile Backdrop Overlay */}
    {isSidebarOpen && (
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
        onClick={() => setIsSidebarOpen(false)}
      />
    )}

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Layout onOpenSidebar={() => setIsSidebarOpen(true)}>
          {/* 3. Render sub-pages based on the URL path */}
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="employees" element={<Employees />} />
            <Route path="department" element={<Department />} />
            <Route path="salary" element={<Salary />} />
            <Route path="reports" element={<Reports />} />
          </Routes>
        </Layout>
      </div>

    </div>
  );
};

export default DashboardLayout;
