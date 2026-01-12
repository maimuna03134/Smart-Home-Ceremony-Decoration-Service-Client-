import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

const DashboardSmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis for dashboard
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      wrapper: containerRef.current,
    });

    // Animation frame function
    function raf(time) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Make Lenis instance globally accessible for dashboard
    window.dashboardLenis = lenisRef.current;

    // Cleanup
    return () => {
      lenisRef.current?.destroy();
      window.dashboardLenis = null;
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="dashboard-scroll-container h-full overflow-auto"
      style={{ height: 'calc(100vh - 64px)' }} // Subtract navbar height
    >
      <div className="dashboard-scroll-content">
        {children}
      </div>
    </div>
  );
};

export default DashboardSmoothScroll;