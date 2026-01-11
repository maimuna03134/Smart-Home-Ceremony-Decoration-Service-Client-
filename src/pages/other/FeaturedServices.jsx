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

const FeaturedServices = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["featured-services"],
    queryFn: async () => {
      const result = await axios.get(
        `https://smart-home-and-ceremony-decoration.vercel.app/services`
      );

      return result.data.slice(0, 3);
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service._id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Link
                to={`/service/${service._id}`}
                className={`block rounded-2xl shadow-lg overflow-hidden 
                hover:shadow-2xl transition-all duration-300 h-60 ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                {/* Service Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 
                    transition-transform duration-500"
                  />

                  <div className="absolute top-4 right-4">
                    <span
                      className="bg-white/90 backdrop-blur-sm px-4 py-2 
                    rounded-full text-sm font-bold text-gray-800 shadow-lg"
                    >
                      {service.category}
                    </span>
                  </div>

                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 
                  to-transparent opacity-0 group-hover:opacity-100 transition-opacity 
                  duration-300 flex items-end justify-center pb-6"
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
                      className="w-10 h-10 bg-purple-100 rounded-full 
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
          ))}
        </motion.div>

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
