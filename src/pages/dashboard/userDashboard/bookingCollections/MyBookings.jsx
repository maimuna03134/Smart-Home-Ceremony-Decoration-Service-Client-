import React, { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../../shared/loader/Loader";
import {
  Calendar,
  MapPin,
  Trash2,
  CreditCard,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import MyContainer from "../../../../components/container/MyContainer";
import { LuTrash2 } from "react-icons/lu";
import PaymentModal from "../../../../components/modal/PaymentModal";

const MyBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["booking", user?.email],
    queryFn: async () => {
      // const token = localStorage.getItem("access-token");
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/bookings/user/${user.email}`
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
      );
      return result.data;
    },
    enabled: !!user?.email,
  });

  // Delete booking mutation
  const deleteMutation = useMutation({
    mutationFn: async (bookingId) => {
      //   const token = localStorage.getItem("access-token");
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/bookings/${bookingId}`
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
    },
    onSuccess: () => {
      toast.success("Booking cancelled successfully!");
      queryClient.invalidateQueries(["booking", user?.email]);
      setDeletingId(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to cancel booking");
      setDeletingId(null);
    },
  });

  const openPaymentModal = (booking) => {
    setSelectedBooking(booking);
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedBooking(null);
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      setDeletingId(bookingId);
      deleteMutation.mutate(bookingId);
    }
  };

  //   const handlePayment = (booking) => {
  //     navigate(`/dashboard/payment-success/${booking._id}`, {
  //       state: { booking },
  //     });
  //   };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-indigo-50 p-6">
      <MyContainer>
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">
            Manage all your decoration service bookings
          </p>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Bookings Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start booking amazing decoration services!
            </p>
            <button
              onClick={() => navigate("/services")}
              className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
            >
              Browse Services
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-linear-to-r from-purple-600 to-pink-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Service
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Date & Location
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Payment
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="hover:bg-purple-50 transition"
                    >
                      {/* Service Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={booking.serviceImage}
                            alt={booking.serviceName}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">
                              {booking.serviceName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {booking.serviceCategory}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Date & Location */}
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Calendar className="w-4 h-4 text-purple-600" />
                            {new Date(booking.bookingDate).toLocaleDateString(
                              "en-GB"
                            )}
                          </div>
                          <div className="flex items-start gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 text-pink-600 mt-0.5 shrink-0" />
                            <span className="line-clamp-2">
                              {booking.location}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4">
                        <span className="text-lg font-bold text-purple-600">
                          ৳ {booking.servicePrice}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : booking.status === "In Progress"
                              ? "bg-blue-100 text-blue-700"
                              : booking.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {booking.status || "Pending"}
                        </span>
                      </td>

                      {/* Payment Status */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {booking.paymentStatus === "Paid" ? (
                            <>
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                              <span className="text-sm font-semibold text-green-600">
                                Paid
                              </span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-5 h-5 text-red-500" />
                              <span className="text-sm font-semibold text-red-600">
                                Unpaid
                              </span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {booking.paymentStatus === "Unpaid" &&
                            booking.status !== "Cancelled" && (
                              <button
                                onClick={() => openPaymentModal(booking)}
                                className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
                                title="Pay Now"
                              >
                                <CreditCard className="w-5 h-5" />
                              </button>
                            )}
                          {booking.status !== "Cancelled" &&
                            booking.paymentStatus === "Unpaid" && (
                              <button
                                onClick={() => handleCancelBooking(booking._id)}
                                disabled={deletingId === booking._id}
                                className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition disabled:opacity-50"
                                title="Cancel Booking"
                              >
                                <LuTrash2 className="w-5 h-5" />
                              </button>
                            )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-6">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white rounded-2xl shadow-xl p-6"
                >
                  <div className="flex gap-4 mb-5">
                    <img
                      src={booking.serviceImage}
                      alt={booking.serviceName}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">
                        {booking.serviceName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {booking.serviceCategory}
                      </p>
                      <p className="text-2xl font-bold text-purple-600 mt-2">
                        ৳ {booking.servicePrice?.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      <span>
                        {new Date(booking.bookingDate).toLocaleDateString(
                          "en-GB"
                        )}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-pink-600 mt-0.5" />
                      <span className="text-gray-600">{booking.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        booking.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : booking.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {booking.status || "Pending"}
                    </span>

                    {booking.paymentStatus === "Paid" ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                        <span className="font-bold text-green-600">Paid</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <XCircle className="w-6 h-6 text-red-500" />
                        <span className="font-bold text-red-600">Unpaid</span>
                      </div>
                    )}
                  </div>

                  {/* Buttons  */}
                  <div className="grid grid-cols-2 gap-3">
                    {booking.paymentStatus === "Unpaid" &&
                      booking.status !== "Cancelled" && (
                        <button
                          onClick={() => openPaymentModal(booking)}
                          className="flex items-center justify-center gap-2 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition"
                        >
                          <CreditCard className="w-6 h-6" />
                          Pay Now
                        </button>
                      )}

                    {booking.status !== "Cancelled" &&
                      booking.paymentStatus === "Unpaid" && (
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          disabled={deletingId === booking._id}
                          className="flex items-center justify-center gap-2 py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition disabled:opacity-50"
                        >
                          <Trash2 className="w-6 h-6" />
                          Cancel
                        </button>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/services")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-semibold transition"
          >
            ← Back
          </button>
        </div>
      </MyContainer>
      <PaymentModal
        isOpen={isPaymentModalOpen}
        closeModal={closePaymentModal}
        booking={selectedBooking}
      />
    </div>
  );
};

export default MyBookings;
