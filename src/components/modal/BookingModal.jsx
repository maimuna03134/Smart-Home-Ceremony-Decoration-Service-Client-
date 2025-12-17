import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import { X, Calendar, MapPin, DollarSign } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";

const BookingModal = ({ service, onClose }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bookingDate: "",
    location: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.bookingDate || !formData.location) {
      toast.error("Please fill all fields");
      return;
    }

    const selectedDate = new Date(formData.bookingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      toast.error("Please select a future date");
      return;
    }

    setLoading(true);

    try {
      // console.log("User email:", user.email);
      // console.log("Service ID:", service._id);
      const bookingData = {
        serviceId: service._id,
        serviceName: service.name,
        serviceImage: service.image,
        servicePrice: service.price,
        serviceCategory: service.category,
        userName: user.displayName,
        userEmail: user.email,
        userPhoto: user.photoURL,
        bookingDate: formData.bookingDate,
        location: formData.location,
        status: "Pending",
        paymentStatus: "Unpaid",
        createdAt: new Date().toISOString(),
      };
      // console.log(bookingData)

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/bookings`,
        bookingData
      );
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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-linear-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">Book Your Service</h2>
                <p className="text-purple-100">{service.service_name}</p>
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
          <div className="p-6">
            {/* Service Info */}
            <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-4 mb-6 border border-purple-200">
              <div className="flex gap-4">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {service.category}
                  </p>
                  <div className="flex items-center gap-2 text-purple-600 font-bold text-lg">
                    <DollarSign className="w-5 h-5" />৳ {service.price}
                  </div>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                Your Information
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900">
                      {user.displayName}
                    </p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Booking Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
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
