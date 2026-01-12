import React, { useState } from 'react';
import { Link } from 'react-router';
import { useTheme } from '../../contexts/ThemeContext';

const Logo = ({ isScrolled, isFooter = false }) => {
    const { isDark } = useTheme();
    const [imageError, setImageError] = useState(false);
    
    const handleImageError = () => {
        setImageError(true);
    };
    
    return (
      <Link to="/">
        <div className="flex items-center">
          {!imageError ? (
            /* Image logo */
            <img 
              src="/StyleDecorLogo.png" 
              alt="StyleDecor Logo" 
              className='w-10 h-10'
              onError={handleImageError}
            />
          ) : (
            /* Fallback CSS logo */
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#af5f44] to-[#8d4d36] flex items-center justify-center text-white font-bold text-lg shadow-lg">
              S
            </div>
          )}
          <span
            className={`ml-2 text-xl transition-all duration-300 logo-text
            ${isFooter
              ? "text-white font-bold"  // Always white in footer
              : isScrolled
                ? "text-[#af5f44] font-bold"   
                : isDark 
                  ? "text-white font-semibold" 
                  : "text-gray-800 font-semibold"
              }`}>
            StyleDecor
          </span>
        </div>
      </Link>
    );
};

export default Logo;