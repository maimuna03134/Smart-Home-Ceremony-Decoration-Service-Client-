import React from "react";
import { NavLink } from "react-router";

const MyLinks = ({ to, children, className = "" }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? ` hover:bg-green-100 hover:text-green-700 rounded-full text-gray-500  font-semibold transition ${className}`
          : `text-gray-500 hover:text-gray-700 font-semibold rounded-md transition ${className}`
      }
    >
      {children}
    </NavLink>
  );
};

export default MyLinks;
