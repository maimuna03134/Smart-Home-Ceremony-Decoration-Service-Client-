import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../../shared/loader/Loader";
import Swal from "sweetalert2";
import { FaEye, FaBan } from "react-icons/fa";

const ManageBookings = () => {
  // const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const detailsModalRef = useRef();

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/bookings`
      );
      return result.data;
    },
  });

  // Open details modal
  const openDetailsModal = (booking) => {
    setSelectedBooking(booking);
    detailsModalRef.current.showModal();
  };

  // Handle cancel booking
  const handleCancelBooking = (booking) => {
    Swal.fire({
      title: "Cancel this booking?",
      text: "This action will cancel the booking",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            `${import.meta.env.VITE_API_URL}/bookings/${booking._id}/cancel`
          )
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                icon: "success",
                title: "Cancelled!",
                text: "Booking has been cancelled.",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            console.error("Error cancelling booking:", error);
            Swal.fire({
              icon: "error",
              title: "Failed!",
              text: "Could not cancel booking. Please try again.",
            });
          });
      }
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="w-full overflow-x-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-primary">Manage Bookings</h2>
        <p className="text-gray-600 mt-1">
          Total bookings:{" "}
          <span className="font-semibold">{bookings.length}</span>
        </p>
      </div>

      <div className="min-w-[1100px] shadow rounded-lg overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              {[
                "Sl No",
                "User Info",
                "Service",
                "Payment Status",
                "Booking Status",
                "Actions",
              ].map((head) => (
                <th
                  key={head}
                  className="px-5 py-3 bg-white border-b border-gray-200 
            text-gray-800 text-center text-sm uppercase font-semibold"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id} className="hover:bg-gray-50">
                {/* Sl */}
                <td className="px-5 py-5 text-center border-b">
                  <p className="font-medium">{index + 1}</p>
                </td>

                {/* User Info */}
                <td className="px-5 py-5 border-b">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <img
                      src={booking.userPhoto}
                      alt={booking.userName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{booking.userName}</p>
                      <p className="text-xs text-gray-500">
                        {booking.userEmail}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Service */}
                <td className="px-5 py-5 border-b">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <img
                      src={booking.serviceImage}
                      alt={booking.serviceName}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <p className="font-medium">{booking.serviceName}</p>
                    <p className="text-xs text-gray-500">
                      {booking.serviceCategory}
                    </p>
                  </div>
                </td>

                {/* Payment */}
                <td className="px-5 py-5 text-center border-b">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.paymentStatus?.toLowerCase() === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {booking.paymentStatus}
                  </span>
                </td>

                {/* Status */}
                <td className="px-5 py-5 text-center border-b">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : booking.status === "cancelled" ||
                          booking.status === "cancelled_by_admin"
                        ? "bg-red-100 text-red-800"
                        : booking.status === "decorator_assigned"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {booking.status?.replace(/_/g, " ") || "Pending"}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 py-5 text-center border-b">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => openDetailsModal(booking)}
                      className="btn btn-sm btn-info"
                      title="View Details"
                    >
                      <FaEye />
                    </button>

                    {/* Only show cancel button if not already cancelled/completed */}
                    {booking.status !== "cancelled" &&
                      booking.status !== "cancelled_by_admin" &&
                      booking.status !== "completed" && (
                        <button
                          onClick={() => handleCancelBooking(booking)}
                          className="btn btn-sm btn-error"
                          title="Cancel Booking"
                        >
                          <FaBan />
                        </button>
                      )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      <dialog ref={detailsModalRef} className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-4 text-primary">
            Booking Details
          </h3>

          {selectedBooking && (
            <div className="space-y-4">
              {/* User Information */}
              <div className="border-b pb-4">
                <h4 className="font-semibold text-md mb-2">
                  Customer Information
                </h4>
                <div className="flex items-center gap-3">
                  <img
                    src={selectedBooking.userPhoto}
                    alt={selectedBooking.userName}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{selectedBooking.userName}</p>
                    <p className="text-sm text-gray-600">
                      {selectedBooking.userEmail}
                    </p>
                  </div>
                </div>
              </div>

              {/* Service Information */}
              <div className="border-b pb-4">
                <h4 className="font-semibold text-md mb-2">
                  Service Information
                </h4>
                <div className="flex items-center gap-3">
                  <img
                    src={selectedBooking.serviceImage}
                    alt={selectedBooking.serviceName}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium">{selectedBooking.serviceName}</p>
                    <p className="text-sm text-gray-600">
                      Category: {selectedBooking.serviceCategory}
                    </p>
                    <p className="text-sm text-gray-600">
                      Price: ৳{selectedBooking.servicePrice}
                    </p>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="border-b pb-4">
                <h4 className="font-semibold text-md mb-2">Booking Details</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p>
                    <span className="font-medium">Booking ID:</span>{" "}
                    {selectedBooking._id}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(selectedBooking.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Location:</span>{" "}
                    {selectedBooking.location || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Payment Status:</span>
                    <span
                      className={`ml-2 px-2 py-1 rounded text-xs ${
                        selectedBooking.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedBooking.paymentStatus}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Booking Status:</span>
                    <span className="ml-2 px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                      {selectedBooking.status?.replace(/_/g, " ")}
                    </span>
                  </p>
                </div>
              </div>

              {/* Decorator Information (if assigned) */}
              {selectedBooking.decoratorName && (
                <div className="border-b pb-4">
                  <h4 className="font-semibold text-md mb-2">
                    Assigned Decorator
                  </h4>
                  <div className="text-sm">
                    <p>
                      <span className="font-medium">Name:</span>{" "}
                      {selectedBooking.decoratorName}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      {selectedBooking.decoratorEmail}
                    </p>
                  </div>
                </div>
              )}

              {/* Additional Info */}
              {selectedBooking.notes && (
                <div>
                  <h4 className="font-semibold text-md mb-2">Notes</h4>
                  <p className="text-sm text-gray-600">
                    {selectedBooking.notes}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="modal-action">
            <button
              onClick={() => detailsModalRef.current.close()}
              className="btn"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageBookings;
