import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from "framer-motion";
import TopBar from '../../components/Dashboard/topBar/TopBar';
import Sidebar from '../../components/Dashboard/sidebar/Sidebar';

const DashBoardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
    const navigate = useNavigate();
    
    const handleLogOut = () => {
      logout()
        .then(() => {
          toast.success("Logged out successfully!");
           navigate("/auth/login");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    };

    return (
      <>
        <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-amber-50">
          <div className="flex h-screen">
            {/* Sidebar */}
            <AnimatePresence>
              {sidebarOpen && (
                <Sidebar
                  user={user}
                  onLogout={handleLogOut}
                  onClose={() => setSidebarOpen(false)}
                />
              )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Top Bar */}
              <TopBar
                sidebarOpen={sidebarOpen}
                toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
              />

              {/* Page Content */}
              <div className="p-6">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default DashBoardLayout;