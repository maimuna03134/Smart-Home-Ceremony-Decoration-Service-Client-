import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X, Calendar, MapPin, DollarSign } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";

const BookingModal = ({ isOpen, closeModal, service }) => {
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

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/bookings`,
        bookingData
      );

      if (response.data.insertedId) {
        toast.success("Booking created successfully!");
        closeModal();
        navigate("/dashboard/my-bookings");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error.response?.data?.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  if (!service) return null;

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg bg-white p-6 shadow-2xl rounded-2xl transform transition-all">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <DialogTitle
                as="h3"
                className="text-2xl font-bold text-gray-900 flex items-center gap-2"
              >
                <Calendar className="w-6 h-6 text-purple-600" />
                Book Your Service
              </DialogTitle>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Service Info */}
            <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-4 mb-6 border border-purple-200">
              <div className="flex gap-3">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">{service.name}</h4>
                  <p className="text-sm text-gray-600">{service.category}</p>
                  <p className="text-lg font-bold text-purple-600 mt-1 flex items-center gap-1">
                    <DollarSign className="w-5 h-5" />৳ {service.price}
                  </p>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                Your Information
              </h4>
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900">
                    {user.displayName}
                  </p>
                  <p className="text-sm text-gray-600">{user.email}</p>
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

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={loading}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition disabled:opacity-50"
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
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default BookingModal;
