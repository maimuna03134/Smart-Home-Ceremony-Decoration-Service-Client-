import React, { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X, Calendar, MapPin, Edit } from "lucide-react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useTheme } from "../../contexts/ThemeContext";
import Button from "../../pages/shared/button/Button";

const UpdateBookingModal = ({ isOpen, closeModal, booking, onSuccess }) => {
  const axiosSecure = useAxiosSecure();
  const { isDark } = useTheme();
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

    const selectedDate = new Date(formData.bookingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      toast.error("Please select a future date");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosSecure.patch(`/bookings/${booking._id}`, {
        bookingDate: formData.bookingDate,
        location: formData.location,
      });

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
          <DialogPanel className={`update-booking-modal w-full max-w-lg p-6 shadow-2xl rounded-2xl transform transition-all ${
            isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <DialogTitle
                as="h3"
                className={`text-2xl font-bold flex items-center gap-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                <Edit className="w-6 h-6 text-primary" />
                Update Booking
              </DialogTitle>
              <button
                onClick={closeModal}
                className={`p-2 rounded-lg transition ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <X className={`w-5 h-5 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </button>
            </div>

            {/* Service Info */}
            <div className={`rounded-xl p-4 mb-6 border ${
              isDark 
                ? 'border-purple-600 bg-gray-700' 
                : 'border-purple-200 bg-linear-to-br'
            }`}>
              <div className="flex gap-3">
                <img
                  src={booking.serviceImage}
                  alt={booking.serviceName}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className={`font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {booking.serviceName}
                  </h4>
                  <p className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {booking.serviceCategory}
                  </p>
                  <p className="text-lg font-bold text-primary mt-1">
                    ৳ {booking.servicePrice}
                  </p>
                </div>
              </div>
            </div>

            {/* Current Details */}
            <div className={`rounded-xl p-4 mb-6 ${
              isDark ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <h4 className={`font-semibold mb-3 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Current Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className={`flex items-center gap-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>
                    {new Date(booking.bookingDate).toLocaleDateString("en-GB")}
                  </span>
                </div>
                <div className={`flex items-start gap-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <MapPin className="w-4 h-4 text-orange-600 mt-0.5" />
                  <span>{booking.location}</span>
                </div>
              </div>
            </div>

            {/* Update Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* New Booking Date */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
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
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300'
                  }`}
                />
              </div>

              {/* New Location */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
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
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'border-gray-300'
                  }`}
                />
              </div>

              {/* Note */}
              <div className={`border rounded-xl p-3 ${
                isDark 
                  ? 'bg-yellow-900/20 border-yellow-600' 
                  : 'bg-yellow-50 border-yellow-200'
              }`}>
                <p className={`text-sm ${
                  isDark ? 'text-yellow-300' : 'text-yellow-800'
                }`}>
                  ⚠️ Note: You can only update unpaid bookings. Once payment is
                  made, please contact support for any changes.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  label="Cancel"
                  onClick={closeModal}
                  disabled={loading}
                  outline
                  small
                />
                <Button
                  label={loading ? "Updating..." : "Update Booking"}
                  loading={loading}
                  disabled={loading}
                  small
                />
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateBookingModal;
