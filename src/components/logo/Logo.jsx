import React from 'react';
import logoImg from '../../assets/StyleDecorLogo.png'
import { Link } from 'react-router';
const Logo = () => {
    return (
      <Link to="/">
        <div className="flex items-center ">
          <img src={logoImg} alt="" className='w-10 h-10'/>
          <span className="text-xl font-bold text-primary ">
            StyleDecor
          </span>
        </div>
      </Link>
    );
};

export default Logo;