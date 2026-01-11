import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FiEdit } from "react-icons/fi";
import { FaTrashCan, FaSort, FaSortUp, FaSortDown } from "react-icons/fa6";
import useAuth from "../../../../hooks/useAuth";
import UpdateBookingModal from "../../../../components/modal/UpdateBookingModal";
import { useNavigate } from "react-router";
import axios from "axios";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useTheme } from "../../../../contexts/ThemeContext";

const MyBookings = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [sortBy, setSortBy] = useState("bookingDate");
  const [sortOrder, setSortOrder] = useState("desc");

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-booking/user/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const sortedBookings = [...bookings].sort((a, b) => {
    let aValue, bValue;

    if (sortBy === "bookingDate" || sortBy === "createdAt") {
      aValue = new Date(a[sortBy]);
      bValue = new Date(b[sortBy]);
    } else if (sortBy === "status") {
      aValue = a.status || "Pending";
      bValue = b.status || "Pending";
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return <FaSort className="inline ml-1" />;
    return sortOrder === "asc" ? (
      <FaSortUp className="inline ml-1" />
    ) : (
      <FaSortDown className="inline ml-1" />
    );
  };

  const handlePayment = async (booking) => {
    if (
      !booking.servicePrice ||
      !booking.serviceImage ||
      !booking.userEmail ||
      !booking.serviceName
    ) {
      return Swal.fire({
        icon: "error",
        title: "Incomplete booking info",
        text: "Booking data is missing required fields. Please contact admin.",
      });
    }
    const paymentInfo = {
      bookingId: booking._id,
      serviceName: booking.serviceName,
      serviceCategory: booking.serviceCategory || "No category",
      serviceImage: booking.serviceImage,
      servicePrice: booking.servicePrice,
      customer: {
        email: booking.userEmail,
        name: booking.userName || "Customer",
      },
    };

    const res = await axios.post(
      `https://smart-home-and-ceremony-decoration.vercel.app/create-checkout-session`,
      paymentInfo
    );

    window.location.assign(res.data.url);
  };

  const handleBookingDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/bookings/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your booking has been cancelled.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleUpdate = (booking) => {
    setSelectedBooking(booking);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedBooking(null);
  };

  const handleUpdateSuccess = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className={`p-6 min-h-screen ${isDark ? 'bg-gray-900' : ''}`}>
      <div className="mb-8">
        <h2 className={`text-3xl font-bold ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>My Bookings</h2>
        <p className={`mt-2 ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Total bookings:{" "}
          <span className="font-bold text-primary">{bookings.length}</span>
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className={`rounded-lg shadow-lg p-16 text-center ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="text-7xl mb-6">📅</div>
          <h3 className={`text-2xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            No Bookings Yet
          </h3>
          <p className={`mb-8 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Start booking our amazing decoration services!
          </p>
          <a href="/services" className="btn btn-primary btn-lg">
            Browse Services
          </a>
        </div>
      ) : (
        <>
          {/* Sorting Controls */}
          <div className={`mb-4 flex gap-4 items-center p-4 rounded-lg shadow ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <span className={`font-medium ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>Sort by:</span>
            <button
              onClick={() => handleSort("bookingDate")}
              className={`px-4 py-2 rounded-lg transition ${
                sortBy === "bookingDate"
                  ? "bg-purple-500 text-white"
                  : isDark
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Date {getSortIcon("bookingDate")}
            </button>
            <button
              onClick={() => handleSort("status")}
              className={`px-4 py-2 rounded-lg transition ${
                sortBy === "status"
                  ? "bg-purple-500 text-white"
                  : isDark
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Status {getSortIcon("status")}
            </button>
          </div>

          <div className={`overflow-x-auto rounded-lg shadow-lg ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <table className="table table-zebra w-full">
              {/* Head */}
              <thead className={`${
                isDark ? 'bg-gray-700' : 'bg-linear-to-r from-primary to-orange-600'
              } text-white`}>
                <tr>
                  <th className="text-white">SL No</th>
                  <th className="text-white">Service</th>
                  <th className="text-white">Booking Date</th>
                  <th className="text-white">Location</th>
                  <th className="text-white">Price</th>
                  <th className="text-white">Payment</th>
                  <th className="text-white">Status</th>
                  <th className="text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedBookings.map((booking, index) => (
                  <tr
                    key={booking._id}
                    className={`transition ${
                      isDark 
                        ? index % 2 === 0 
                          ? 'bg-gray-800' 
                          : 'bg-gray-900'
                        : ''
                    }`}
                  >
                    <th className={isDark ? 'text-gray-300' : ''}>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="mask mask-squircle w-10 h-10">
                            <img
                              src={booking.serviceImage}
                              alt={booking.serviceName}
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <div className={`font-bold ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {booking.serviceName}
                          </div>
                          <div className={`text-sm ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {booking.serviceCategory}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className={isDark ? 'text-gray-300' : ''}>
                      {new Date(booking.bookingDate).toLocaleDateString(
                        "en-GB"
                      )}
                    </td>
                    <td>
                      <div
                        className={`max-w-xs truncate ${
                          isDark ? 'text-gray-300' : ''
                        }`}
                        title={booking.location}
                      >
                        {booking.location}
                      </div>
                    </td>
                    <td className="font-bold text-primary">
                      ৳ {booking.servicePrice?.toLocaleString()}
                    </td>
                    <td>
                      {booking.paymentStatus === "Paid" && (
                        <span className="badge badge-success text-white font-semibold">
                          Paid
                        </span>
                      )}

                      {booking.paymentStatus !== "Paid" && (
                        <div className="flex flex-col gap-1 items-center">
                          <button
                            onClick={() => handlePayment(booking)}
                            disabled={
                              booking.status === "cancelled" ||
                              booking.status === "Cancelled" ||
                              booking.status === "cancelled_by_admin"
                            }
                            className={`btn btn-sm btn-primary w-full ${
                              booking.status === "cancelled" ||
                              booking.status === "Cancelled" ||
                              booking.status === "cancelled_by_admin"
                                ? "opacity-90 text-gray-500 rounded cursor-not-allowed"
                                : ""
                            }`}
                          >
                            Pay
                          </button>
                        </div>
                      )}
                    </td>
                    <td>
                      <span
                        className={`badge py-6 text-center ${
                          booking.status === "Completed" ||
                          booking.status === "completed"
                            ? "badge-success"
                            : booking.status === "In Progress"
                            ? "badge-info"
                            : booking.status === "Cancelled" ||
                              booking.status === "cancelled" ||
                              booking.status === "cancelled_by_admin"
                            ? "badge-error"
                            : "badge-warning"
                        }`}
                      >
                        {booking.status?.replace(/_/g, " ") || "Pending"}
                      </span>
                    </td>

                    <td>
                      <div className="flex gap-3 items-center">
                        {booking.paymentStatus !== "Paid" &&
                          booking.status !== "Cancelled" &&
                          booking.status !== "cancelled" &&
                          booking.status !== "cancelled_by_admin" && (
                            <>
                              <button
                                onClick={() => handleUpdate(booking)}
                                className="btn btn-square btn-sm hover:bg-green-500 hover:text-white transition"
                                title="Update Booking"
                              >
                                <FiEdit className="w-5 h-5" />
                              </button>

                              <button
                                onClick={() => handleBookingDelete(booking._id)}
                                className="btn btn-square btn-sm hover:bg-red-500 hover:text-white transition"
                                title="Cancel Booking"
                              >
                                <FaTrashCan className="w-5 h-5" />
                              </button>
                            </>
                          )}

                        {booking.paymentStatus === "Paid" &&
                          booking.status !== "cancelled_by_admin" && (
                            <span className="text-green-600 font-medium text-sm px-3 py-1 bg-green-50 rounded-full">
                              ✓ Payment Complete. No actions available now.
                            </span>
                          )}

                        {booking.status === "cancelled_by_admin" &&
                          booking.status === "cancelled_by_admin" && (
                            <span className="text-xs text-gray-600 italic">
                              ⚠️ Service unavailable
                            </span>
                          )}

                        {(booking.status === "Cancelled" ||
                          booking.status === "cancelled") && (
                          <span className="text-gray-500 font-medium text-sm px-3 py-1 bg-gray-100 rounded-full">
                            Booking Cancelled
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate("/services")}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${
            isDark 
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}
        >
          ← Back
        </button>
      </div>

      <UpdateBookingModal
        isOpen={isUpdateModalOpen}
        closeModal={closeUpdateModal}
        booking={selectedBooking}
        onSuccess={handleUpdateSuccess}
      />
    </div>
  );
};

export default MyBookings;
