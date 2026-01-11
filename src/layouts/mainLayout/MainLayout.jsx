import React from 'react';
import Navbar from '../../pages/shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../pages/shared/Footer';
import { Toaster } from 'react-hot-toast';
import ScrollTop from '../../components/scroll/ScrollTop';
import { useTheme } from '../../contexts/ThemeContext';

const MainLayout = () => {
    const { isDark, theme } = useTheme();
    
    return (
      <div className={`min-h-screen transition-all duration-300 ${
        isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}>
        <Navbar />
        <main className={`min-h-screen ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}>
          <Outlet />
        </main>
        <ScrollTop />
        <Footer />
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: isDark ? '#1f2937' : '#363636',
              color: isDark ? '#f9fafb' : '#fff',
              border: isDark ? '1px solid #374151' : 'none',
            },
            success: {
              duration: 3000,
              style: {
                background: isDark ? '#065f46' : '#10b981',
              },
            },
            error: {
              duration: 5000,
              style: {
                background: isDark ? '#7f1d1d' : '#ef4444',
              },
            },
          }}
        />
      </div>
    );
};

export default MainLayout;