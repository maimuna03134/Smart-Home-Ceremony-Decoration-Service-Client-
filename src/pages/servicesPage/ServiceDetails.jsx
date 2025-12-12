import React from "react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

import {
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiCheckCircle,
  FiStar,
  FiUsers,
  FiCalendar,
  FiShield,
  FiX,
} from "react-icons/fi";
import { BiCheckCircle } from "react-icons/bi";
import { MdPeople, MdSchedule } from "react-icons/md";
import MyContainer from "../../components/container/MyContainer";

const ServiceDetails = () => {
  // Mock data - replace with your own if needed
  const service = {
    service_name: "4BHK Modern Style Interior Design in Noida With Foyer",
    service_category: "Interior Design",
    description:
      "Transform your 4BHK into a luxurious modern home with premium materials, smart space planning, and elegant aesthetics. Includes living room, dining, foyer, and all bedrooms with customized wardrobes and lighting.",
    cost: 3500000,
    duration: "15-18 days",
    availability: true,
    unit: "Full Home (4BHK)",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800",
    features: [
      "Premium Italian Marble Flooring",
      "Modular Kitchen with Island",
      "False Ceiling with Cove Lighting",
      "Custom Wardrobes in All Rooms",
      "Smart Home Automation Ready",
      "Premium Sanitary & CP Fittings",
      "Textured Walls & Designer Paints",
      "Balcony Garden Setup",
    ],
    createdByEmail: "design@supernova.in",
  };

  const infoSections = [
    {
      id: "cost",
      icon: <FiDollarSign className="w-5 h-5" />,
      label: "Pricing",
      value: `৳${service.cost.toLocaleString()}`,
      details: {
        title: "Cost Breakdown",
        items: [
          {
            label: "Design Consultation",
            value: `৳${(service.cost * 0.1).toLocaleString()}`,
          },
          {
            label: "Materials & Furnishing",
            value: `৳${(service.cost * 0.6).toLocaleString()}`,
          },
          {
            label: "Labor & Installation",
            value: `৳${(service.cost * 0.2).toLocaleString()}`,
          },
          {
            label: "Project Management",
            value: `৳${(service.cost * 0.1).toLocaleString()}`,
          },
        ],
        total: service.cost,
      },
    },
    {
      id: "duration",
      icon: <FiClock className="w-5 h-5" />,
      label: "Duration",
      value: service.duration,
      details: {
        title: "Project Timeline",
        items: [
          { label: "Consultation & Planning", value: "2-3 days" },
          { label: "Material Procurement", value: "5-7 days" },
          { label: "Execution & Setup", value: "6-8 days" },
          { label: "Final Touches", value: "2 days" },
        ],
      },
    },
    {
      id: "availability",
      icon: <FiCheckCircle className="w-5 h-5" />,
      label: "Availability",
      value: "Available",
      details: {
        title: "Service Status",
        items: [
          { label: "Current Status", value: "Available" },
          { label: "Next Available", value: "Immediate" },
          { label: "Booking Lead Time", value: "3-5 days" },
          { label: "Active Projects", value: "12 ongoing" },
        ],
      },
    },
    {
      id: "unit",
      icon: <FiMapPin className="w-5 h-5" />,
      label: "Service Unit",
      value: service.unit,
      details: {
        title: "Coverage Details",
        items: [
          { label: "Scope", value: service.unit },
          { label: "Service Category", value: service.service_category },
          { label: "Customization", value: "Available" },
          { label: "Additional Services", value: "On Request" },
        ],
      },
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-amber-50 py-12 px-4">
      <MyContainer>
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Content */}
            <div className="p-8 md:p-12 flex flex-col justify-between">
              <div>
                <span className="inline-block px-4 py-2 bg-purple-100 text-primary rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
                  {service.service_category} Service
                </span>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {service.service_name}
                </h1>

                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-1">
                    <FiStar className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <span className="text-lg font-semibold text-gray-900">
                      4.8
                    </span>
                    <span className="text-gray-500 text-sm ml-1">
                      (289 reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiUsers className="w-5 h-5" />
                    <span className="text-sm">145 bookings</span>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {infoSections.map((section) => (
                    <div
                      key={section.id}
                      className="bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-transparent hover:border-primary/55 transition-all duration-300 cursor-pointer hover:shadow-lg"
                    >
                      <div className="flex items-center gap-2 text-primary mb-2">
                        {section.icon}
                        <span className="text-xs font-medium uppercase tracking-wider">
                          {section.label}
                        </span>
                      </div>
                      <p className="text-gray-900 font-bold text-lg">
                        {section.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Created By */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                      S
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">
                        Service Created By
                      </p>
                      <p className="font-semibold text-gray-900">
                        {service.createdByEmail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 shared-style shadow-lg hover:shadow-xl"
                >
                  Get This Design
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-4 border border-amber-800 text-amber-800 rounded-xl font-semibold hover:bg-purple-50"
                >
                  <FiCalendar className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative h-full min-h-[600px]">
              <img
                src={service.image}
                alt={service.service_name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-white font-bold text-xl mb-4">
                  Features Included
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.3 }}
                      className="flex items-start gap-2 bg-white/10 backdrop-blur-md rounded-lg p-3"
                    >
                      <BiCheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                      <span className="text-white text-sm font-medium">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <FiShield className="w-6 h-6 text-amber-700" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Quality Assured</h3>
            <p className="text-gray-600 text-sm">
              Premium materials and expert craftsmanship guaranteed
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
              <MdPeople className="w-6 h-6 text-amber-800" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Expert Team</h3>
            <p className="text-gray-600 text-sm">
              Experienced designers and skilled craftsmen
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
              <MdSchedule className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Timely Delivery</h3>
            <p className="text-gray-600 text-sm">
              Project completed within promised timeline
            </p>
          </motion.div>
        </div>
      </MyContainer>
    </div>
  );
};

export default ServiceDetails;
