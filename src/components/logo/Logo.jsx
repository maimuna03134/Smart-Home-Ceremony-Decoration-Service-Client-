import React from 'react';
import logoImg from '../../assets/StyleDecorLogo.png'
import { Link } from 'react-router';
import { useTheme } from '../../contexts/ThemeContext';

const Logo = ({ isScrolled, isFooter = false }) => {
    const { isDark } = useTheme();
    
    return (
      <Link to="/">
        <div className="flex items-center ">
          <img src={logoImg} alt="" className='w-10 h-10'/>
          <span
            className={`text-xl transition-all duration-300 logo-text
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