import React from 'react';
import logoImg from '../../assets/StyleDecorLogo.png'
import { Link } from 'react-router';
const Logo = ({ isScrolled }) => {
    return (
      <Link to="/">
        <div className="flex items-center ">
          <img src={logoImg} alt="" className='w-10 h-10'/>
          <span
            className={`text-xl transition-all duration-300
            ${isScrolled
              ? "text-primary font-bold"   
              : "text-gray-800 font-semibold " 
              }`}>
            StyleDecor
          </span>
        </div>
      </Link>
    );
};

export default Logo;