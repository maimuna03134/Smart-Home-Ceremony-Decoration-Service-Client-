import React from 'react';
import Navbar from '../../pages/shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../pages/shared/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer/>
        </div>
    );
};

export default MainLayout;