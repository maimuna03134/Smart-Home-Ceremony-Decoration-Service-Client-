import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import MyContainer from './container/MyContainer';
import Button from '../pages/shared/button/Button';
import { ArrowRight } from 'lucide-react';

const BeforeAfterSection = () => {
  const { isDark } = useTheme();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "50+", label: "Expert Decorators" },
    { number: "24/7", label: "Customer Support" }
  ];

  return (
    <section className={`py-20 transition-all duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <MyContainer className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            DECORATION <span className="text-[#af5f44]">TRANSFORMATION</span>
          </h2>
          <p className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-2 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Experience the dramatic difference our expert decoration services can make.
          </p>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            From ordinary spaces to extraordinary celebrations - see the transformation unfold.
          </p>
        </div>

        {/* Before/After Image Slider */}
        <div
          className={`relative w-full h-75 sm:h-100 lg:h-125 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl cursor-col-resize select-none ${
            isDark ? 'shadow-black/50' : 'shadow-gray-900/20'
          }`}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          {/* AFTER Image (Background) */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80"
              alt="After decoration - Modern elegant interior"
              className="w-full h-full object-cover"
            />
            {/* AFTER Label */}
            <div className="absolute bottom-3 sm:bottom-6 right-3 sm:right-6 bg-[#af5f44] text-white px-3 sm:px-6 py-1 sm:py-2 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg">
              After
            </div>
          </div>

          {/* BEFORE Image (Overlay with clip-path) */}
          <div
            className="absolute inset-0 transition-all duration-100"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img
              src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80"
              alt="Before decoration - Basic room setup"
              className="w-full h-full object-cover"
            />
            {/* BEFORE Label */}
            <div className={`absolute bottom-3 sm:bottom-6 left-3 sm:left-6 px-3 sm:px-6 py-1 sm:py-2 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg ${
              isDark ? 'bg-gray-800 text-white' : 'bg-gray-700 text-white'
            }`}>
              Before
            </div>
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Slider Button */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-2xl flex items-center justify-center ${
              isDark ? 'bg-gray-800 border-2 border-gray-600' : 'bg-white border-2 border-gray-200'
            }`}>
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#af5f44] absolute left-1" />
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#af5f44] absolute right-1" />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 shadow-black/20' 
                  : 'bg-white hover:bg-gray-50 shadow-gray-900/10'
              }`}
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#af5f44] mb-2">
                {stat.number}
              </div>
              <div className={`text-sm sm:text-base font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8 sm:mt-12">
          <p className={`mb-6 text-base sm:text-lg ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Ready to transform your space?
          </p>
          <div className="inline-block">
            <Button
              label="Start Your Transformation"
              icon={ArrowRight}
              onClick={() => window.location.href = '/services'}
            />
          </div>
        </div>
      </MyContainer>
    </section>
  );
};

export default BeforeAfterSection;