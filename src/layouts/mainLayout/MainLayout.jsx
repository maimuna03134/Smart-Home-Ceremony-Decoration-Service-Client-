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
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
          }}
        />
      </div>
    );
};

export default MainLayout;