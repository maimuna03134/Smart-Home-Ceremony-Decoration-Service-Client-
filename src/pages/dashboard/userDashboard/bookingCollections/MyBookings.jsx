import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import { FiEdit } from "react-icons/fi";
import {  FaTrashCan } from "react-icons/fa6";
import useAuth from "../../../../hooks/useAuth";

import UpdateBookingModal from "../../../../components/modal/UpdateBookingModal";
import { useNavigate } from "react-router";
import axios from "axios";

const MyBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-bookings", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-booking/user/${user?.email}`
      );
      
      return res.data;
    },
    enabled: !!user?.email,
  });

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
      `${import.meta.env.VITE_API_URL}/create-checkout-session`,
      paymentInfo
    );

    console.log(res.data.url);
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
        axios
          .delete(`${import.meta.env.VITE_API_URL}/bookings/${id}`)
          .then((res) => {
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
    <div className="p-6 bg-base-100 min-h-screen">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">My Bookings</h2>
        <p className="text-gray-600 mt-2">
          Total bookings:{" "}
          <span className="font-bold text-purple-600">{bookings.length}</span>
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-16 text-center">
          <div className="text-7xl mb-6">📅</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            No Bookings Yet
          </h3>
          <p className="text-gray-600 mb-8">
            Start booking our amazing decoration services!
          </p>
          <a href="/services" className="btn btn-primary btn-lg">
            Browse Services
          </a>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="table table-zebra w-full">
            {/* Head */}
            <thead className="bg-linear-to-r from-purple-600 to-pink-600 text-white">
              <tr>
                <th>SL No</th>
                <th>Service</th>
                <th>Booking Date</th>
                <th>Location</th>
                <th>Price</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id} className="hover:bg-purple-50 transition">
                  <th>{index + 1}</th>
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
                        <div className="font-bold text-gray-900">
                          {booking.serviceName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.serviceCategory}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {new Date(booking.bookingDate).toLocaleDateString("en-GB")}
                  </td>
                  <td>
                    <div className="max-w-xs truncate" title={booking.location}>
                      {booking.location}
                    </div>
                  </td>
                  <td className="font-bold text-purple-600">
                    ৳ {booking.servicePrice?.toLocaleString()}
                  </td>
                  <td>
                    {booking.paymentStatus === "Paid" ? (
                      <span className="badge badge-success text-white font-semibold">
                        Paid
                      </span>
                    ) : (
                      <button
                        onClick={() => handlePayment(booking)}
                        className="btn btn-sm btn-primary"
                      >
                        Pay
                      </button>
                    )}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        booking.status === "Completed"
                          ? "badge-success"
                          : booking.status === "In Progress"
                          ? "badge-info"
                          : booking.status === "Cancelled"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {booking.status || "Pending"}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-3">
                      {/* Update (only if unpaid and not cancelled) */}
                      {booking.paymentStatus !== "Paid" &&
                        booking.status !== "Cancelled" && (
                          <button
                            onClick={() => handleUpdate(booking)}
                            className="btn btn-square btn-sm hover:bg-green-500 hover:text-white transition"
                            title="Update Booking"
                          >
                            <FiEdit className="w-5 h-5" />
                          </button>
                        )}

                      {/* Delete (only if unpaid and not cancelled) */}
                      {booking.paymentStatus !== "Paid" &&
                        booking.status !== "Cancelled" && (
                          <button
                            onClick={() => handleBookingDelete(booking._id)}
                            className="btn btn-square btn-sm hover:bg-red-500 hover:text-white transition"
                            title="Cancel Booking"
                          >
                            <FaTrashCan className="w-5 h-5" />
                          </button>
                        )}

                      {booking.paymentStatus === "Paid" && (
                        <span className="text-green-600 font-medium text-sm">
                          No actions available
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
