import React from 'react';
import MyContainer from '../../components/container/MyContainer';
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Quote, Star } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
// Import required modules
import { Pagination, Autoplay } from 'swiper/modules';

const TestimonialsSection = () => {
    const { isDark } = useTheme();
    
    const testimonials = [
      {
        name: "Ayesha Rahman",
        role: "Bride",
        image:
          "https://ui-avatars.com/api/?name=Ayesha+Rahman&background=8B5CF6&color=fff&size=100",
        text: "StyleDecor made our wedding absolutely magical! The attention to detail and professionalism was outstanding. Every corner was beautifully decorated.",
        rating: 5,
      },
      {
        name: "Kamal Hossain",
        role: "CEO, Tech Corp",
        image:
          "https://ui-avatars.com/api/?name=Kamal+Hossain&background=EC4899&color=fff&size=100",
        text: "They transformed our office space beautifully. Highly recommend their corporate decoration services! The team was professional and creative.",
        rating: 5,
      },
      {
        name: "Fatima Begum",
        role: "Homeowner",
        image:
          "https://ui-avatars.com/api/?name=Fatima+Begum&background=F59E0B&color=fff&size=100",
        text: "My home interior decoration exceeded all expectations. Professional, creative, and on-time delivery! I couldn't be happier with the results.",
        rating: 4,
      },
      {
        name: "Ahmed Khan",
        role: "Event Organizer",
        image:
          "https://ui-avatars.com/api/?name=Ahmed+Khan&background=10B981&color=fff&size=100",
        text: "Outstanding service for our corporate event! The decoration was elegant and perfectly matched our brand theme. Highly professional team.",
        rating: 5,
      },
      {
        name: "Rashida Sultana",
        role: "Birthday Celebrant",
        image:
          "https://ui-avatars.com/api/?name=Rashida+Sultana&background=F97316&color=fff&size=100",
        text: "My daughter's birthday party was a dream come true! The decorations were colorful, creative, and brought so much joy to all the children.",
        rating: 4,
      },
      {
        name: "Mohammad Ali",
        role: "Restaurant Owner",
        image:
          "https://ui-avatars.com/api/?name=Mohammad+Ali&background=6366F1&color=fff&size=100",
        text: "They helped us redesign our restaurant interior. The ambiance is now perfect for our customers. Great attention to detail and timely execution.",
        rating: 5,
      },
    ];
    return (
      <div>
        <section className="py-20">
          <MyContainer className={"px-4 sm:px-6 lg:px-8"}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                What Our Clients Say
              </h2>
              <p className={`text-xl max-w-2xl mx-auto ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Real stories from real customers who loved our services
              </p>
            </motion.div>

            {/* Swiper Testimonials */}
            <div className="relative">
              <Swiper
                modules={[ Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop={true}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1280: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                }}
                className="testimonials-swiper"
              >
                {testimonials.map((testimonial, index) => (
                  <SwiperSlide key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className={`testimonial-card flex flex-col gap-4 max-w-md w-full p-5 rounded-md shadow-md hover:scale-105 hover:duration-150 duration-150 ${
                        isDark 
                          ? 'bg-neutral-900 text-white' 
                          : 'bg-white text-gray-900'
                      }`}
                    >
                      {/* Header with Name and Avatar */}
                      <div className="flex flex-row justify-between w-full items-center">
                        <div className="flex items-center gap-3">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h4 className={`font-semibold text-sm ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                              {testimonial.name}
                            </h4>
                            <p className={`text-xs ${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                        <Quote className={`w-6 h-6 ${
                          isDark ? 'text-gray-600' : 'text-gray-400'
                        }`} />
                      </div>

                      {/* Star Rating */}
                      <div className="flex flex-row justify-between w-full items-center">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              className={`h-4 w-4 ${
                                i < testimonial.rating ? 'text-yellow-400' : 'text-yellow-200'
                              }`}
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.916 1.603-.916 1.902 0l1.286 3.953a1.5 1.5 0 001.421 1.033h4.171c.949 0 1.341 1.154.577 1.715l-3.38 2.458a1.5 1.5 0 00-.54 1.659l1.286 3.953c.3.916-.757 1.67-1.539 1.145l-3.38-2.458a1.5 1.5 0 00-1.76 0l-3.38 2.458c-.782.525-1.838-.229-1.539-1.145l1.286-3.953a1.5 1.5 0 00-.54-1.659l-3.38-2.458c-.764-.561-.372-1.715.577-1.715h4.171a1.5 1.5 0 001.421-1.033l1.286-3.953z"></path>
                            </svg>
                          ))}
                        </div>
                        <span className={`text-xs ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {testimonial.rating}/5
                        </span>
                      </div>

                      {/* Testimonial Text */}
                      <div className={`rounded-md w-full p-4 ${
                        isDark ? 'bg-neutral-800' : 'bg-gray-50'
                      }`}>
                        <p className={`text-sm leading-relaxed ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          "{testimonial.text}"
                        </p>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </MyContainer>
        </section>
      </div>
    );
};

export default TestimonialsSection;