import React, { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X, Calendar, MapPin, Edit } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateBookingModal = ({ isOpen, closeModal, booking, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bookingDate: "",
    location: "",
  });

  useEffect(() => {
    if (booking) {
      setFormData({
        bookingDate: booking.bookingDate
          ? booking.bookingDate.split("T")[0]
          : "",
        location: booking.location || "",
      });
    }
  }, [booking]);

  if (!booking) return null;

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

    // Check if booking date is in the future
    const selectedDate = new Date(formData.bookingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      toast.error("Please select a future date");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/bookings/${booking._id}`,
        {
          bookingDate: formData.bookingDate,
          location: formData.location,
        }
      );

      if (response.data.modifiedCount > 0) {
        toast.success("Booking updated successfully!");
        closeModal();
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error("Update booking error:", error);
      toast.error(error.response?.data?.message || "Failed to update booking");
    } finally {
      setLoading(false);
    }
  };

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
                <Edit className="w-6 h-6 text-purple-600" />
                Update Booking
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
                  src={booking.serviceImage}
                  alt={booking.serviceName}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">
                    {booking.serviceName}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {booking.serviceCategory}
                  </p>
                  <p className="text-lg font-bold text-purple-600 mt-1">
                    ৳ {booking.servicePrice}
                  </p>
                </div>
              </div>
            </div>

            {/* Current Details */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                Current Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span>
                    {new Date(booking.bookingDate).toLocaleDateString("en-GB")}
                  </span>
                </div>
                <div className="flex items-start gap-2 text-gray-700">
                  <MapPin className="w-4 h-4 text-pink-600 mt-0.5" />
                  <span>{booking.location}</span>
                </div>
              </div>
            </div>

            {/* Update Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* New Booking Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  New Booking Date
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

              {/* New Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  New Location
                </label>
                <textarea
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter complete address"
                  rows="3"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
                />
              </div>

              {/* Note */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                <p className="text-sm text-yellow-800">
                  ⚠️ Note: You can only update unpaid bookings. Once payment is
                  made, please contact support for any changes.
                </p>
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
                  {loading ? "Updating..." : "Update Booking"}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateBookingModal;
