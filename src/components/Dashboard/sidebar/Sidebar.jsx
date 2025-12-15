import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router";
import {
  LuLayoutDashboard,
  LuPackage,
  LuCalendar,
  LuDollarSign,
  LuUsers,
  LuLogOut,
  LuPalette,
} from "react-icons/lu";
import { IoBarChart } from "react-icons/io5";

const Sidebar = ({ user, onLogout, onClose }) => {
  // Navigation items based on user role
  const getNavItems = () => {
    if (user?.role === "admin") {
      return [
        { path: "/dashboard", label: "Dashboard", icon: <LuLayoutDashboard /> },
        {
          path: "/dashboard/services",
          label: "Manage Services",
          icon: <LuPackage />,
        },
        {
          path: "/dashboard/bookings",
          label: "All Bookings",
          icon: <LuCalendar />,
        },
        {
          path: "/dashboard/decorators",
          label: "Decorators",
          icon: <LuUsers />,
        },
        {
          path: "/dashboard/analytics",
          label: "Analytics",
          icon: <IoBarChart />,
        },
        {
          path: "/dashboard/revenue",
          label: "Revenue",
          icon: <LuDollarSign />,
        },
      ];
    } else if (user?.role === "decorator") {
      return [
        { path: "/dashboard", label: "Dashboard", icon: <LuLayoutDashboard /> },
        {
          path: "/dashboard/my-projects",
          label: "My Projects",
          icon: <LuPalette />,
        },
        {
          path: "/dashboard/schedule",
          label: "Schedule",
          icon: <LuCalendar />,
        },
        {
          path: "/dashboard/earnings",
          label: "Earnings",
          icon: <LuDollarSign />,
        },
      ];
    } else {
      return [
        { path: "/dashboard", label: "Dashboard", icon: <LuLayoutDashboard /> },
        {
          path: "/dashboard/my-bookings",
          label: "My Bookings",
          icon: <LuCalendar />,
        },
        { path: "/dashboard/profile", label: "My Profile", icon: <LuUsers /> },
        {
          path: "/dashboard/payments",
          label: "Payment History",
          icon: <LuDollarSign />,
        },
      ];
    }
  };

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      className="w-64 bg-white shadow-xl flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          StyleDecor
        </h1>
        <p className="text-xs text-gray-500 mt-1 capitalize">
          {user?.role || "user"} Dashboard
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {getNavItems().map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {React.cloneElement(item.icon, { className: "w-5 h-5" })}
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={
              user?.photoURL ||
              `https://ui-avatars.com/api/?name=${user?.displayName}&background=8B5CF6&color=fff`
            }
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">
              {user?.displayName}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LuLogOut className="w-4 h-4" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
