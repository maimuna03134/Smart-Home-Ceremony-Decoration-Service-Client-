import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import Loader from "../shared/loader/Loader";
import MyContainer from "../../components/container/MyContainer";

const FeaturedServices = () => {
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["featured-services"],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/services`
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
    <section className="py-16 bg-white">
      <MyContainer className={"px-4 sm:px-6 lg:px-8"}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Popular Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                className="block bg-white rounded-2xl shadow-lg overflow-hidden 
                hover:shadow-2xl transition-all duration-300 h-60"
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
                    className="absolute inset-0 bg-linear-to-t from-black/60 
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
                    className="text-xl font-bold text-gray-900 mb-2 
                  group-hover:text-primary transition-colors line-clamp-2"
                  >
                    {service.name}
                  </h3>

                  {/* Description */}
                  {service.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {service.description}
                    </p>
                  )}

                  {/* Price & Unit */}
                  <div
                    className="flex items-center justify-between pt-4 
                  border-t border-gray-200"
                  >
                    <div>
                      <p className="text-xs text-gray-500 uppercase">
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
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-4 
            bg-linear-to-r from-primary to-orange-600 text-white 
            rounded-full font-semibold text-lg hover:from-purple-700 
            hover:to-pink-700 transition-all duration-300 
            transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View All Services
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </motion.div>
      </MyContainer>
    </section>
  );
};

export default FeaturedServices;
