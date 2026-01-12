import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdDashboard, MdMiscellaneousServices } from "react-icons/md";
import { FaEnvelope, FaInfoCircle, FaUser } from "react-icons/fa";
import { IoLogOut, IoLogIn } from "react-icons/io5";
import { GoHomeFill } from "react-icons/go";
import { GrUserAdmin } from "react-icons/gr";
import avatarImg from "../../assets/placeholder.jpg";
import useAuth from "../../hooks/useAuth";
import Logo from "../../components/logo/Logo";
import MyContainer from "../../components/container/MyContainer";
import MyLinks from "../../components/links/MyLinks";
import ThemeToggleAdvanced from "../../components/ThemeToggleAdvanced";
import { useTheme } from "../../contexts/ThemeContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { isDark } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);


  const { data: userRole } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const result = await axios.get(
        `https://smart-home-and-ceremony-decoration.vercel.app/user/role/${user.email}`
      );
      return result.data.role;
    },
    enabled: !!user?.email,
  });

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully!");
        setIsProfileOpen(false);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const navLinks = [
    { name: "Home", path: "/", icon: GoHomeFill },
    { name: "Services", path: "/services", icon: MdMiscellaneousServices },
    { name: "Pricing", path: "/pricing", icon: FaDollarSign },
    { name: "FAQ", path: "/faq", icon: FaQuestionCircle },
    { name: "About", path: "/about", icon: FaInfoCircle },
    { name: "Contact", path: "/contact", icon: FaEnvelope },
    { name: "Coverage", path: "/coverage", icon: FaMagnifyingGlassLocation },
  ];

  const navRoleBased = [
    ...navLinks,
    ...(userRole === "user" || userRole === "customer"
      ? [
          {
            name: "Be a Decorator",
            path: "/become-decorator",
            icon: GrUserAdmin,
          },
        ]
      : []),
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full py-0 min-h-0 z-50 transition-all duration-300
    ${isScrolled
            ? isDark 
              ? "glass-card-dark" 
              : "glass-card"
            : isDark
              ? ""
              : ""
          }`}
      >
        <MyContainer className={" px-4 sm:px-6 lg:px-8"}>
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo isScrolled={isScrolled} />

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navRoleBased.map((link) => (
                <MyLinks
                  key={link.path}
                  to={link.path}
                  isScrolled={isScrolled}
                >
                  {link.name}
                </MyLinks>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <div className="hidden sm:flex items-center">
                <ThemeToggleAdvanced 
                  size="sm" 
                  variant="toggle"
                />
              </div>

              {/* User Profile (Desktop Only) */}
              {user && (
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={`flex items-center space-x-2 p-1 pr-3 rounded-full transition-all duration-200
                      ${isDark 
                        ? 'border border-gray-600 hover:bg-gray-800 text-white' 
                        : 'border border-gray-200 hover:shadow-md hover:bg-gray-50 text-gray-900'
                      }`}
                  >
                    <AiOutlineMenu className="ml-2" style={{ color: isDark ? 'white' : 'black' }} />
                    {user.photoURL ? (
                      <img
                        src={user?.photoURL || avatarImg}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-primary font-semibold">
                        {user.name ? user.name[0].toUpperCase() : "U"}
                      </div>
                    )}
                  </button>

                  {/* Dropdown */}
                  {isProfileOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsProfileOpen(false)}
                      ></div>
                      <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg border py-2 z-50 ${
                        isDark 
                          ? 'bg-gray-800 border-gray-600' 
                          : 'bg-white border-gray-200'
                      }`}>
                        <div className={`px-4 py-3 border-b ${
                          isDark ? 'border-gray-600' : 'border-gray-200'
                        }`}>
                          <p className={`text-sm font-semibold ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {user?.displayName || "User"}
                          </p>
                          <p className={`text-xs truncate ${
                            isDark ? 'text-gray-300' : 'text-gray-500'
                          }`}>
                            {user?.email}
                          </p>
                        </div>

                        <Link
                          to="/dashboard/profile"
                          className={`flex items-center space-x-3 px-4 py-2.5 text-sm transition-colors ${
                            isDark 
                              ? 'text-white hover:bg-gray-700' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FaUser size={16} />
                          <span>Profile</span>
                        </Link>

                        <Link
                          to="/dashboard"
                          className={`flex items-center space-x-3 px-4 py-2.5 text-sm transition-colors ${
                            isDark 
                              ? 'text-white hover:bg-gray-700' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <MdDashboard size={16} />
                          <span>Dashboard</span>
                        </Link>

                        <button
                          onClick={handleLogOut}
                          className={`w-full flex items-center space-x-3 px-4 py-2.5 text-sm transition-colors ${
                            isDark 
                              ? 'text-red-400 hover:bg-red-900/20' 
                              : 'text-red-600 hover:bg-red-50'
                          }`}
                        >
                          <IoLogOut size={16} />
                          <span>Logout</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Mobile Only */}
              {!user && (
                <div className="hidden md:block">
                  <Link
                    to="/auth/login"
                    className="flex items-center  shared-style"
                  >
                    <IoLogIn size={18} />
                    <span>Login</span>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors duration-200
                  ${isDark ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-900'}
                `}
              >
                {isMobileMenuOpen ? (
                  <AiOutlineClose size={24} />
                ) : (
                  <AiOutlineMenu size={24} />
                )}
              </button>
            </div>
          </div>
        </MyContainer>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0  bg-opacity-25 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            <div className={`md:hidden border-t relative z-50 ${
              isDark 
                ? 'border-gray-700 bg-gray-900' 
                : 'border-gray-200 bg-white'
            }`}>
              <div className="px-4 py-3 space-y-1">
                {/* Theme Toggle for Mobile */}
                <div className="flex items-center justify-between px-4 py-3">
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Theme
                  </span>
                  <ThemeToggleAdvanced size="sm" variant="toggle" />
                </div>
                
                {navRoleBased.map((link) => {
                  const Icon = link.icon;
                  const isActive = window.location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                        isActive
                          ? isDark 
                            ? 'text-[#af5f44] bg-gray-800' 
                            : 'text-[#af5f44] bg-[#af5f44]/10'
                          : isDark 
                            ? 'text-white hover:bg-gray-800 hover:text-[#af5f44]' 
                            : 'text-gray-700 hover:bg-[#af5f44]/10 hover:text-[#af5f44]'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{link.name}</span>
                    </Link>
                  );
                })}

                {user ? (
                  <>
                    <Link
                      to="/dashboard/profile"
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                        isDark 
                          ? 'text-white hover:bg-gray-800 hover:text-[#af5f44]' 
                          : 'text-gray-700 hover:bg-[#af5f44]/10 hover:text-[#af5f44]'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaUser size={20} />
                      <span className="font-medium">Profile</span>
                    </Link>

                    <Link
                      to="/dashboard"
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                        isDark 
                          ? 'text-white hover:bg-gray-800 hover:text-[#af5f44]' 
                          : 'text-gray-700 hover:bg-[#af5f44]/10 hover:text-[#af5f44]'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <MdDashboard size={20} />
                      <span>Dashboard</span>
                    </Link>

                    <button
                      onClick={() => {
                        handleLogOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                        isDark 
                          ? 'text-red-400 hover:bg-red-900/20' 
                          : 'text-red-600 hover:bg-red-50'
                      }`}
                    >
                      <IoLogOut size={20} />
                      <span className="font-medium">Logout</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth/login"
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                      isDark 
                        ? 'text-white hover:bg-gray-800 hover:text-[#af5f44]' 
                        : 'text-gray-700 hover:bg-[#af5f44]/10 hover:text-[#af5f44]'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <IoLogIn size={20} />
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
