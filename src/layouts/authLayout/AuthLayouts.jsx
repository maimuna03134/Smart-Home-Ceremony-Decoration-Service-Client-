import React from 'react';
import { Outlet } from 'react-router';
import { useTheme } from '../../contexts/ThemeContext';

const AuthLayouts = () => {
    const { isDark } = useTheme();
    
    return (
      <div className={`min-h-screen transition-all duration-300 ${
        isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}>
        <Outlet />
      </div>
    );
};

export default AuthLayouts;