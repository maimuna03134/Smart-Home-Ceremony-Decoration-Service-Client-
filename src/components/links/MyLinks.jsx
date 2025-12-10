import React from "react";
import { NavLink, useLocation } from "react-router";

const MyLinks = ({ to, children, className = "" }) => {
  const location = useLocation();

  const isActive = location.pathname === to;
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative px-4 py-2 font-medium text-gray-700 transition-all duration-200 group
         ${
           isActive
             ? "text-primary font-bold rounded-full"
             : "hover:text-amber-600"
         } ${className}`
      }
    >
      {children}
      <span
        className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-out
          ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
      />
    </NavLink>
  );
};

export default MyLinks;
