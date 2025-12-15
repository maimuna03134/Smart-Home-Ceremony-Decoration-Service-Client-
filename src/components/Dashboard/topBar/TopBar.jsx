import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import {
  LuLayoutDashboard,
  LuPackage,
  LuCalendar,
  LuDollarSign,
  LuUsers,
  LuLogOut,
  LuPalette,
  LuX,
  LuBell,
  LuMenu,
} from "react-icons/lu";
import { IoBarChart } from "react-icons/io5";

const TopBar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { user } = useAuth();
    const [activePage] = useState("overview");
      const getNavItems = () => {
        if (user?.role === "admin") {
         return [
            { path: '/dashboard', label: 'Dashboard', icon: <LuLayoutDashboard /> },
            { path: '/dashboard/services', label: 'Manage Services', icon: <LuPackage /> },
            { path: '/dashboard/bookings', label: 'All Bookings', icon: <LuCalendar /> },
            { path: '/dashboard/decorators', label: 'Decorators', icon: <LuUsers /> },
            { path: '/dashboard/analytics', label: 'Analytics', icon: <IoBarChart /> },
            { path: '/dashboard/revenue', label: 'Revenue', icon: <LuDollarSign /> }
          ];
        } else if (user?.role === 'decorator') {
          return [
            { path: '/dashboard', label: 'Dashboard', icon: <LuLayoutDashboard /> },
            { path: '/dashboard/my-projects', label: 'My Projects', icon: <LuPalette /> },
            { path: '/dashboard/schedule', label: 'Schedule', icon: <LuCalendar /> },
            { path: '/dashboard/earnings', label: 'Earnings', icon: <LuDollarSign /> }
          ];
        } else {
          return [
            { path: '/dashboard', label: 'Dashboard', icon: <LuLayoutDashboard /> },
            { path: '/dashboard/my-bookings', label: 'My Bookings', icon: <LuCalendar /> },
            { path: '/dashboard/profile', label: 'My Profile', icon: <LuUsers /> },
            { path: '/dashboard/payments', label: 'Payment History', icon: <LuDollarSign /> }
          ];
        }
      };
    return (
        <div>
              {/* Top Bar */}
          <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  {sidebarOpen ? <LuX className="w-5 h-5" /> : <LuMenu className="w-5 h-5" />}
                </button>
                <h2 className="text-xl font-bold text-gray-900">
                  {getNavItems().find(item => item.id === activePage)?.label || 'Dashboard'}
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                  <LuBell className="w-5 h-5 text-gray-700" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
                </div>
            </div>
    
        </div>
    );
};

export default TopBar;