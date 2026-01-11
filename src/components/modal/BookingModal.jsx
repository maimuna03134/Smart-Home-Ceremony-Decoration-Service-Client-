import React, { useState, useEffect } from "react";
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import { X, Calendar, MapPin, DollarSign } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useTheme } from "../../contexts/ThemeContext";

const BookingModal = ({ service, onClose }) => {
  const { user, loading: authLoading } = useAuth();
  const { isDark } = useTheme();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bookingDate: "",
    location: "",
  });

  // Check if user is logged in
  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Please login to book a service");
      onClose();
      navigate("/auth/login");
    }
  }, [user, authLoading, navigate, onClose]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Double check user is still logged in
    if (!user) {
      toast.error("Please login to book a service");
      onClose();
      navigate("/auth/login");
      return;
    }

    if (!formData.bookingDate || !formData.location) {
      toast.error("Please fill all fields");
      setLoading(false);
      return;
    }

    const selectedDate = new Date(formData.bookingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      toast.error("Please select a future date");
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      console.log("User email:", user.email);
      console.log("Service ID:", service._id);

      const bookingData = {
        serviceId: service._id,
        serviceName: service.name,
        serviceImage: service.image,
        servicePrice: service.price,
        serviceCategory: service.category,
        serviceUnit: service.unit,
        userName: user.displayName || "Unknown",
        userEmail: user.email,
        userPhoto: user.photoURL || "",
        bookingDate: formData.bookingDate,
        location: formData.location,
        status: "Pending",
        paymentStatus: "Unpaid",
        createdAt: new Date().toISOString(),
        decorator: {
          name: user?.displayName || "Unknown",
          email: user?.email || "",
          image: user?.photoURL || "",
        },
      };

      console.log(bookingData);

      const response = await axiosSecure.post(`/bookings`, bookingData);
      console.log(response.data);

      if (response.data.insertedId) {
        toast.success("Booking created successfully!");
        onClose();
        navigate("/dashboard/my-bookings");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error.response?.data?.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  // Don't render modal if user is not logged in
  if (!user) {
    return null;
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`booking-modal rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${
            isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}
        >
          {/* Header */}
          <div className="sticky top-0 bg-linear-to-r from-primary to-orange-600 text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">Book Your Service</h2>
                <p className="text-orange-100">{service.name}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className={`p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            {/* Service Info */}
            <div className={`rounded-xl p-4 mb-6 border ${
              isDark 
                ? 'border-orange-600 bg-gray-700' 
                : 'border-orange-200 bg-orange-50'
            }`}>
              <div className="flex gap-4">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className={`text-xl font-bold mb-1 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {service.name}
                  </h3>
                  <p className={`text-sm mb-2 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {service.category}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-bold text-lg">
                    <DollarSign className="w-5 h-5" />৳ {service.price}
                  </div>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className={`rounded-xl p-4 mb-6 ${
              isDark ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <h4 className={`font-semibold mb-3 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Your Information
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {user?.photoURL && (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  {!user?.photoURL && (
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {user?.displayName?.charAt(0) || "U"}
                    </div>
                  )}
                  <div>
                    <p className={`font-medium ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {user?.displayName || "Unknown User"}
                    </p>
                    <p className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Booking Date */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Booking Date
                </label>
                <input
                  type="date"
                  name="bookingDate"
                  value={formData.bookingDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300'
                  }`}
                />
              </div>

              {/* Location */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Service Location
                </label>
                <textarea
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter complete address where service is needed"
                  rows="3"
                  required
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'border-gray-300'
                  }`}
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className={`flex-1 px-6 py-3 border-2 rounded-xl font-semibold transition ${
                    isDark 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-linear-to-r from-primary to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;
