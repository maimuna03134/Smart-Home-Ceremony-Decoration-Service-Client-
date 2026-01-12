import React from "react";
import { NavLink, useLocation } from "react-router";
import { useTheme } from "../../contexts/ThemeContext";

const MyLinks = ({ to, children, className = "", isScrolled }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const { isDark } = useTheme();

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative px-4 py-2 transition-all duration-200 group
        ${isScrolled
          ? isDark
            ? isActive 
              ? "text-[#af5f44] font-bold" 
              : "text-gray-300 font-semibold hover:text-[#af5f44]"
            : isActive 
              ? "text-[#af5f44] font-bold" 
              : "text-gray-600 font-semibold hover:text-[#af5f44]"
          : isDark
            ? isActive 
              ? "text-[#af5f44] font-bold" 
              : "text-white font-bold hover:text-[#af5f44]"
            : isActive 
              ? "text-[#af5f44] font-bold" 
              : "text-gray-800 font-bold hover:text-[#af5f44]"
        }
        ${className}`
      }
    >
      {children}

      <span
        className={`absolute bottom-0 left-0 h-0.5 bg-[#af5f44] transition-all duration-300
          ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
      />
    </NavLink>
  );
};

export default MyLinks;