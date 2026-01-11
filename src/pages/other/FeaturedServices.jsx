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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16">
      <MyContainer className={"px-4 sm:px-6 lg:px-8"}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Our Popular Services
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Transform your special moments with our premium decoration packages
          </p>
        </motion.div>

        {/* Carousel with Blur Effects */}
        <div className="relative">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            grabCursor={true}
            centeredSlides={true}
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
            loop={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
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
                        <span
                          className="bg-white/90 backdrop-blur-sm px-4 py-2 
                        rounded-full text-sm font-bold text-gray-800 shadow-lg"
                        >
                          {service.category}
                        </span>
                      </div>

                      <div
                        className="absolute inset-0 bg-linear-to-t from-black/60 
                      to-transparent opacity-0 group-hover:opacity-100 transition-opacity 
                      duration-300 flex items-end justify-center pb-6 z-20"
                      >
                        <span className="text-white font-semibold text-lg">
                          View Details →
                        </span>
                      </div>
                    </div>

                    {/* Service Info */}
                    <div className="p-6">
                      {/* Service Name */}
                      <h3
                        className={`text-xl font-bold mb-2 
                      group-hover:text-primary transition-colors line-clamp-2 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                      >
                        {service.name}
                      </h3>

                      {/* Description */}
                      {service.description && (
                        <p className={`text-sm mb-4 line-clamp-2 ${
                          isDark ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {service.description}
                        </p>
                      )}

                      {/* Price & Unit */}
                      <div
                        className={`flex items-center justify-between pt-4 
                      border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
                      >
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

                        <div
                          className="w-8 h-8 bg-purple-100 rounded-full 
                        flex items-center justify-center group-hover:bg-primary 
                        transition-colors"
                        >
                          <svg
                            className="w-5 h-5 text-primary group-hover:text-white 
                            transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
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
          className="text-center mt-12"
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
