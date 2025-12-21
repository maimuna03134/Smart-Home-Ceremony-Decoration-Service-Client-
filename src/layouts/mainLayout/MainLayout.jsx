import React from 'react';
import Navbar from '../../pages/shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../pages/shared/Footer';
import { Toaster } from 'react-hot-toast';
import ScrollTop from '../../components/scroll/ScrollTop';

const MainLayout = () => {
    return (
      <div>
        <Navbar />
        <Outlet />
        <ScrollTop />
        <Footer />
        <Toaster />
      </div>
    );
};

export default MainLayout;