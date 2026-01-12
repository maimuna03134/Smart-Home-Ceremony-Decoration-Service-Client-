import React, { useState } from "react";
import MyContainer from "../../components/container/MyContainer";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../shared/loader/Loader";
import toast from "react-hot-toast";
import BookingModal from "../../components/modal/BookingModal";
import useAuth from "../../hooks/useAuth";
import { Star, Users, AlertCircle, Clock, Shield, Award, CheckCircle, ArrowLeft } from "lucide-react";
import useDemoProtection from "../../hooks/useDemoProtection";
import { useTheme } from "../../contexts/ThemeContext";
import Button from "../shared/button/Button";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ServiceDetails = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const { id } = useParams();
  const { isDemoAccount } = useDemoProtection();
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);

  const { data: service = {}, isLoading } = useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      const result = await axios(
        `https://smart-home-and-ceremony-decoration.vercel.app/services/${id}`
      );
      return result.data;
    },
  });

  const { data: userBooking, refetch: refetchUserBooking } = useQuery({
    queryKey: ["userBooking", user?.email, id],
    enabled: !!user?.email && !!id,
    queryFn: async () => {
      const result = await axios.get(
        `https://smart-home-and-ceremony-decoration.vercel.app/bookings/check`,
        {
          params: {
            userEmail: user.email,
            serviceId: id,
          },
        }
      );
      return result.data;
    },
  });

  const handleBookNow = () => {
    if (isDemoAccount) {
      toast.error("Demo accounts cannot book services. Please register with your own account to book.", {
        duration: 5000,
        icon: "🔒",
      });
      return;
    }

    if (!user) {
      toast.error("Please login to book a service");
      navigate("/auth/login", { state: { from: `/services/${id}` } });
      return;
    }

    if (userBooking?.hasBooked) {
      toast.error("You have already booked this service!");
      return;
    }

    setShowBookingModal(true);
  };

  if (isLoading) return <Loader />;

  if (!service) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <AlertCircle className={`w-16 h-16 mx-auto mb-4 ${
            isDark ? 'text-gray-400' : 'text-gray-400'
          }`} />
          <h2 className={`text-2xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Service Not Found
          </h2>
          <Button
            label="Back to Services"
            onClick={() => navigate("/services")}
            small
          />
        </motion.div>
      </div>
    );
  }

  const { image, name, description, category, quantity, price, decorator } = service;
  const isBookingDisabled = userBooking?.hasBooked;

  const features = [
    { icon: "🌸", title: "Premium Floral Arrangements", description: "Fresh, high-quality flowers" },
    { icon: "💡", title: "Custom Lighting & Chandelier", description: "Professional lighting setup" },
    { icon: "🎭", title: "Themed Backdrop & Stage", description: "Custom designed backdrops" },
    { icon: "🎈", title: "Balloon Arch & Ceiling Decor", description: "Creative balloon arrangements" }
  ];

  const trustCards = [
    { icon: Shield, title: "100% Quality Guaranteed", description: "Premium materials & expert execution" },
    { icon: Award, title: "Professional Team", description: "Experienced designers & craftsmen" },
    { icon: Clock, title: "On-Time Delivery", description: "Completed within promised timeline" }
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <MyContainer className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <button
            onClick={() => navigate("/services")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
              isDark 
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Services</span>
          </button>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl  overflow-hidden"
        >
          {/* Top - Image Section */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full h-64 sm:h-80 lg:h-96 overflow-hidden"
            >
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Category Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-6 left-6"
            >
              <span className="inline-block px-4 py-2 bg-[#af5f44] text-white rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                {category}
              </span>
            </motion.div>
          </div>

          {/* Bottom - Service Details */}
          <div className="py-8 lg:py-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {/* Service Title */}
              <h1 className={`text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 leading-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {name}
              </h1>

              {/* Rating & Stats */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className={`text-lg font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    4.8
                  </span>
                  <span className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    (289 reviews)
                  </span>
                </div>
                <div className={`flex items-center gap-2 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <Users className="w-4 h-4" />
                  <span className="text-sm">145 bookings</span>
                </div>
              </div>

              {/* Description */}
              <p className={`text-lg leading-relaxed mb-8 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {description}
              </p>

              {/* Designer Info & Price Row */}
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Designer Info */}
                <div className={`flex items-center gap-4 p-4 rounded-xl ${
                  isDark ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <img
                    src={decorator?.image}
                    alt={decorator?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className={`font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      Designer: {decorator?.name}
                    </p>
                    <p className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Professional Decorator
                    </p>
                  </div>
                </div>

                {/* Price Section */}
                <div className="flex items-start md:items-center justify-start lg:justify-end">
                  <div className="text-start  lg:text-right">
                    <p className={`text-sm mb-2 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Starting from
                    </p>
                    <p className="text-4xl font-bold text-[#af5f44]">
                      ৳{price?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Service Details Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className={`p-4 rounded-xl border ${
                  isDark 
                    ? 'border-gray-600 bg-gray-700' 
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <p className={`text-sm mb-1 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>Duration</p>
                  <p className={`font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    7-10 days
                  </p>
                </div>
                <div className={`p-4 rounded-xl border ${
                  isDark 
                    ? 'border-gray-600 bg-gray-700' 
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <p className={`text-sm mb-1 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>Setup Time</p>
                  <p className={`font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    8-10 hours
                  </p>
                </div>
                <div className={`p-4 rounded-xl border ${
                  isDark 
                    ? 'border-gray-600 bg-gray-700' 
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <p className={`text-sm mb-1 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>Unit</p>
                  <p className={`font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {quantity} per event
                  </p>
                </div>
                <div className={`p-4 rounded-xl border ${
                  isDark 
                    ? 'border-gray-600 bg-gray-700' 
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <p className={`text-sm mb-1 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>Status</p>
                  <span className="inline-block px-3 py-1 bg-green-500 text-white font-semibold rounded-full text-sm">
                    Available
                  </span>
                </div>
              </div>

              {/* Warnings and Booking */}
              <div className="space-y-6">
                {/* Demo Account Warning */}
                {isDemoAccount && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`border-l-4 border-yellow-400 p-4 rounded-lg ${
                      isDark ? 'bg-yellow-900/20' : 'bg-yellow-50'
                    }`}
                  >
                    <p className={`font-semibold ${
                      isDark ? 'text-yellow-300' : 'text-yellow-800'
                    }`}>
                      ⚠️ You are using a demo account. Booking is disabled.
                    </p>
                  </motion.div>
                )}

                {/* Already Booked Warning */}
                {isBookingDisabled && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`border-l-4 border-blue-400 p-4 rounded-lg ${
                      isDark ? 'bg-blue-900/20' : 'bg-blue-50'
                    }`}
                  >
                    <p className={`text-sm ${
                      isDark ? 'text-blue-300' : 'text-blue-800'
                    }`}>
                      You have already booked this service. To book again, please delete your previous booking from{" "}
                      <span
                        onClick={() => navigate("/dashboard/my-bookings")}
                        className={`font-semibold underline cursor-pointer ${
                          isDark ? 'hover:text-blue-200' : 'hover:text-blue-900'
                        }`}
                      >
                        My Bookings
                      </span>
                      .
                    </p>
                  </motion.div>
                )}

                {/* Book Now Button */}
                <div className="w-full">
                  <Button
                    label={isBookingDisabled ? "Already Booked" : "Book Now"}
                    onClick={handleBookNow}
                    disabled={isBookingDisabled}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12"
        >
          <h3 className={`text-2xl lg:text-3xl font-bold mb-8 text-center ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            What's Included
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`p-6 rounded-2xl border hover:shadow-lg transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'border-gray-600 bg-gray-800 hover:bg-gray-700' 
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h4 className={`font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h4>
                <p className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
                <CheckCircle className="w-5 h-5 text-green-500 mt-3" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mt-16"
        >
          {trustCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className={`p-8 rounded-2xl shadow-xl text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-[#af5f44]/10 rounded-full flex items-center justify-center">
                  <Icon className="w-8 h-8 text-[#af5f44]" />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {card.title}
                </h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Booking Modal */}
        {showBookingModal && (
          <BookingModal
            service={service}
            onClose={() => {
              setShowBookingModal(false);
              refetchUserBooking();
            }}
          />
        )}
      </MyContainer>
    </div>
  );
};

export default ServiceDetails;