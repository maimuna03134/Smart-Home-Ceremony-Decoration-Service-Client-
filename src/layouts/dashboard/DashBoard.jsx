import React from "react";
import { FiHome } from "react-icons/fi";
import { LuProjector, LuSettings } from "react-icons/lu";
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import { Link, Outlet } from "react-router";
import { BsFillMenuButtonFill } from "react-icons/bs";
import { FaRegCreditCard } from "react-icons/fa6";
import { MdAdminPanelSettings, MdOutlineAssignmentInd } from "react-icons/md";

import { FaChartBar, FaMoneyBillWave, FaUserAlt, FaUsers, FaUserTag } from "react-icons/fa";
import useRole from "../../hooks/useRole";
import Loader from "../../pages/shared/loader/Loader";
import { AiTwotoneSchedule } from "react-icons/ai";
import { GrDocumentUpdate, GrServices } from "react-icons/gr";
import CustomerMenu from "../../components/Dashboard/menu/CustomerMenu";
import DecoratorMenu from "../../components/Dashboard/menu/DecoratorMenu";
import AdminMenu from "../../components/Dashboard/menu/AdminMenu";
import { useTheme } from "../../contexts/ThemeContext";
import ThemeToggle from "../../components/ThemeToggle";
import Logo from "../../components/logo/Logo";
import DashboardSmoothScroll from "../../components/scroll/DashboardSmoothScroll";

const DashBoard = () => {
  const [role, isRoleLoading] = useRole();
  const { isDark } = useTheme();
  
if(isRoleLoading) return <Loader/>

  return (
    <div className={`drawer lg:drawer-open min-h-screen ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className={`navbar w-full ${
          isDark ? 'bg-gray-800 border-b border-gray-700' : 'bg-base-300'
        }`}>
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className={`btn btn-square btn-ghost ${
              isDark ? 'text-white hover:bg-gray-700' : ''
            }`}
          >
            {/* Sidebar toggle icon */}
            <TbLayoutSidebarRightExpandFilled />
          </label>
          <div className={`px-4 flex-1 flex items-center gap-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            <Logo />
            <span className="text-lg font-semibold">Dashboard</span>
          </div>
          {/* Theme Toggle in Dashboard */}
          <div className="hidden md:block px-4">
            <ThemeToggle />
          </div>
        </nav>
        {/* Page content here */}
        <DashboardSmoothScroll>
          <div className={`min-h-screen ${
            isDark ? 'bg-gray-900' : 'bg-gray-50'
          }`}>
            <Outlet />
          </div>
        </DashboardSmoothScroll>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className={`flex min-h-full flex-col items-start is-drawer-close:w-14 is-drawer-open:w-64 ${
          isDark ? 'bg-gray-800 border-r border-gray-700' : 'bg-base-200'
        }`}>
          {/* Sidebar content here */}
          <div className="w-full h-full overflow-auto dashboard-sidebar-scroll">
            <ul className="menu w-full grow">
            {/* Theme Toggle for Mobile Sidebar */}
            <li className="block md:hidden">
              <div className={`flex items-center justify-between p-4 ${
                isDark ? 'bg-gray-700/50' : 'bg-gray-100'
              } rounded-lg mx-2 my-2`}>
                <span className={`font-medium text-sm ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Theme
                </span>
                <ThemeToggle />
              </div>
            </li>
            
            {/* List item */}
            <li>
              <Link
                to="/"
                className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                  isDark ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : ''
                }`}
                data-tip="Homepage"
              >
                {/* Home icon */}
                <FiHome />
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* ===== USER ===== */}
            {role === "user" && (
              <>
                <CustomerMenu/>
                
              </>
            )}

            {/* ===== DECORATOR ===== */}
            {role === "decorator" && (
              <>
                <DecoratorMenu/>
               
              </>
            )}

            {/* ===== ADMIN ===== */}
            {role === "admin" && (
              <>
               <AdminMenu/>
              </>
            )}

            <li>
              <button
                className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                  isDark ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : ''
                }`}
                data-tip="Settings"
              >
                <LuSettings />
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
