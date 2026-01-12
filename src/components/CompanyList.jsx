import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import MyContainer from './container/MyContainer';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
// Import required modules
import { Autoplay } from 'swiper/modules';

// Import brand logos
import amazonLogo from '../assets/brands/amazon.png';
import amazonVectorLogo from '../assets/brands/amazon_vector.png';
import casioLogo from '../assets/brands/casio.png';
import moonstarLogo from '../assets/brands/moonstar.png';
import randstadLogo from '../assets/brands/randstad.png';
import starLogo from '../assets/brands/star.png';
import startPeopleLogo from '../assets/brands/start_people.png';

const CompanyList = () => {
  const { isDark } = useTheme();

  // Brand logos from assets
  const brands = [
    { id: 1, logo: amazonLogo, alt: "Amazon" },
    { id: 2, logo: amazonVectorLogo, alt: "Amazon Vector" },
    { id: 3, logo: casioLogo, alt: "Casio" },
    { id: 4, logo: moonstarLogo, alt: "Moonstar" },
    { id: 5, logo: randstadLogo, alt: "Randstad" },
    { id: 6, logo: starLogo, alt: "Star" },
    { id: 7, logo: startPeopleLogo, alt: "Start People" },
    // Duplicate for smooth infinite scroll
    { id: 8, logo: amazonLogo, alt: "Amazon" },
    { id: 9, logo: casioLogo, alt: "Casio" },
    { id: 10, logo: moonstarLogo, alt: "Moonstar" }
  ];

  return (
    <section className={`py-16 transition-all duration-300 ${
      isDark ? 'bg-gray-800' : 'bg-gray-100'
    }`}>
      <MyContainer className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            TRUSTED BY <span className="text-[#af5f44]">LEADING BRANDS</span>
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Join hundreds of satisfied clients who trust us with their decoration needs
          </p>
        </div>

        {/* Brand Logos Swiper */}
        <div className="relative">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView="auto"
            centeredSlides={false}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={3000}
            freeMode={true}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 35,
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 40,
              },
            }}
            className="company-swiper"
          >
            {brands.map((brand) => (
              <SwiperSlide key={brand.id} className="w-auto!">
                <div className={`group flex items-center justify-center p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600' 
                    : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md'
                }`}>
                  {/* Brand Logo */}
                  <div className="w-20 h-10 flex items-center justify-center">
                    <img
                      src={brand.logo}
                      alt={brand.alt}
                      className="max-w-full max-h-full object-contain filter transition-all duration-300 group-hover:scale-110"
                      style={{
                        filter: isDark ? 'brightness(0.8) contrast(1.2)' : 'none'
                      }}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#af5f44] mb-1">100+</div>
            <div className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Partner Companies
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#af5f44] mb-1">5K+</div>
            <div className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Events Decorated
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#af5f44] mb-1">50+</div>
            <div className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Cities Covered
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#af5f44] mb-1">99%</div>
            <div className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Client Retention
            </div>
          </div>
        </div>
      </MyContainer>
    </section>
  );
};

export default CompanyList;