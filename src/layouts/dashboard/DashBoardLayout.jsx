import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import Sidebar from "../../components/Dashboard/sidebar/Sidebar";


const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
 
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-lg shadow-lg text-gray-700 hover:bg-gray-100 transition"
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Desktop Sidebar - Always visible */}
      <div className="hidden lg:block lg:w-64 shrink-0">
        <div className="fixed top-0 left-0 h-full w-64">
          <Sidebar user={user} onLogout={handleLogout} onClose={closeSidebar} />
        </div>
      </div>

      {/* Mobile Sidebar with Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSidebar}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Mobile Sidebar */}
            <div className="lg:hidden fixed top-0 left-0 h-full w-64 z-50">
              <Sidebar
                user={user}
                onLogout={handleLogout}
                onClose={closeSidebar}
              />
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 lg:ml-0">
        <div className="p-4 lg:p-8 pt-20 lg:pt-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
