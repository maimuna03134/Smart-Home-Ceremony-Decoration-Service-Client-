import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import Loader from "../shared/loader/Loader";
import MyContainer from "../../components/container/MyContainer";
import { useTheme } from "../../contexts/ThemeContext";
import Button from "../shared/button/Button";
import { ArrowRight } from "lucide-react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// Import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const FeaturedServices = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["featured-services"],
    queryFn: async () => {
      const result = await axios.get(
        `https://smart-home-and-ceremony-decoration.vercel.app/services`
      );

      return result.data.slice(0, 6); // Get more services for carousel
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="">
      <MyContainer className={"px-2 sm:px-4 lg:px-8"}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 px-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Our Projects
          </h2>
          <p className={`text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Transform your special moments with our premium decoration packages
          </p>
        </motion.div>

        {/* Mobile Grid Layout (No Swiper) */}
        <div className="block md:hidden">
          <div className="grid grid-cols-1 gap-6">
            {services.slice(0, 4).map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group h-full"
              >
                <Link
                  to={`/service/${service._id}`}
                  className={`block rounded-xl shadow-lg overflow-hidden 
                  hover:shadow-2xl transition-all duration-300 h-full ${
                    isDark ? 'bg-gray-800/90' : 'bg-white/90'
                  }`}
                >
                  {/* Service Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute top-2 right-2 z-20">
                      <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-gray-800 shadow-lg">
                        {service.category}
                      </span>
                    </div>
                  </div>

                  {/* Service Info */}
                  <div className="p-4">
                    <h3 className={`text-lg font-bold mb-2 line-clamp-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {service.name}
                    </h3>

                    {service.description && (
                      <p className={`text-xs mb-3 line-clamp-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {service.description}
                      </p>
                    )}

                    <div className={`flex items-center justify-between pt-3 border-t ${
                      isDark ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      <div>
                        <p className={`text-xs uppercase ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {service.unit}
                        </p>
                        <p className="text-xl font-bold text-primary">
                          ৳{service.price.toLocaleString()}
                        </p>
                      </div>

                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop/Tablet Swiper (768px and up) */}
        <div className="hidden md:block relative">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            grabCursor={true}
            centeredSlides={services.length > 3}
            slidesPerView="auto"
            spaceBetween={30}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet services-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active services-bullet-active',
            }}
            navigation={{
              nextEl: '.services-swiper-button-next',
              prevEl: '.services-swiper-button-prev',
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={services.length > 3}
            breakpoints={{
              768: {
                slidesPerView: Math.min(2, services.length),
                spaceBetween: 25,
                centeredSlides: services.length > 2,
              },
              1024: {
                slidesPerView: Math.min(3, services.length),
                spaceBetween: 30,
                centeredSlides: services.length > 3,
              },
            }}
            className="services-carousel"
          >
            {services.map((service, index) => (
              <SwiperSlide key={service._id} className="services-slide">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group h-full"
                >
                  <Link
                    to={`/service/${service._id}`}
                    className={`block rounded-2xl shadow-lg overflow-hidden 
                    hover:shadow-2xl transition-all duration-300 h-full backdrop-blur-sm ${
                      isDark ? 'bg-gray-800/90' : 'bg-white/90'
                    }`}
                  >
                    {/* Service Image with Blur Background */}
                    <div className="relative h-48 overflow-hidden">
                      {/* Blurred Background */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110"
                        style={{ backgroundImage: `url(${service.image})` }}
                      ></div>
                      
                      {/* Main Image */}
                      <img
                        src={service.image}
                        alt={service.name}
                        className="relative z-10 w-full h-full object-cover group-hover:scale-110 
                        transition-transform duration-500"
                      />

                      <div className="absolute top-4 right-4 z-20">
                        <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-gray-800 shadow-lg">
                          {service.category}
                        </span>
                      </div>

                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 z-20">
                        <span className="text-white font-semibold text-lg">
                          View Details →
                        </span>
                      </div>
                    </div>

                    {/* Service Info */}
                    <div className="p-6">
                      <h3 className={`text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {service.name}
                      </h3>

                      {service.description && (
                        <p className={`text-sm mb-4 line-clamp-2 ${
                          isDark ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {service.description}
                        </p>
                      )}

                      <div className={`flex items-center justify-between pt-4 border-t ${
                        isDark ? 'border-gray-700' : 'border-gray-200'
                      }`}>
                        <div>
                          <p className={`text-xs uppercase ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {service.unit}
                          </p>
                          <p className="text-2xl font-bold text-primary">
                            ৳{service.price.toLocaleString()}
                          </p>
                        </div>

                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                          <svg className="w-5 h-5 text-primary group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons - Only for Desktop */}
          <div className="services-swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 cursor-pointer">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div className="services-swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 cursor-pointer">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l12 7-12 7" />
            </svg>
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-8 sm:mt-12"
        >
          <div className="inline-block">
            <Button
              label="View All Services"
              onClick={() => navigate("/services")}
              icon={ArrowRight}
            />
          </div>
        </motion.div>
      </MyContainer>
    </section>
  );
};

export default FeaturedServices;