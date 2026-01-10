import React, { useState, useRef } from "react";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

import Loader from "../../../shared/loader/Loader";
import Swal from "sweetalert2";
import { FaEye, FaBan, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useDemoProtection from "../../../../hooks/useDemoProtection";
import toast from "react-hot-toast";

const ManageBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const detailsModalRef = useRef();
  const { isDemoAccount, checkActionPermission } = useDemoProtection();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sorting state
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const [paymentFilter, setPaymentFilter] = useState("all");

  const {
    data: response = { bookings: [], total: 0, totalPages: 0 },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "bookings",
      user?.email,
      currentPage,
      sortBy,
      sortOrder,
      paymentFilter,
    ],
    queryFn: async () => {
      const result = await axiosSecure.get("/bookings", {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          sortBy,
          sortOrder,
          paymentStatus: paymentFilter !== "all" ? paymentFilter : undefined,
        },
      });
      return result.data;
    },
  });

  const bookings = response.bookings || [];
  const totalPages = response.totalPages || 1;

  // Handle sorting
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
    setCurrentPage(1);
  };

  // Get sort icon
  const getSortIcon = (field) => {
    if (sortBy !== field) return <FaSort className="inline ml-1" />;
    return sortOrder === "asc" ? (
      <FaSortUp className="inline ml-1" />
    ) : (
      <FaSortDown className="inline ml-1" />
    );
  };

  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePaymentFilterChange = (filter) => {
    setPaymentFilter(filter);
    setCurrentPage(1);
  };

  const goToPrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Open details modal
  const openDetailsModal = (booking) => {
    setSelectedBooking(booking);
    detailsModalRef.current.showModal();
  };

  // Handle cancel booking
  const handleCancelBooking = (booking) => {
    if (isDemoAccount && !checkActionPermission("cancel_booking")) {
      toast.error(
        "Demo Admin - You can view bookings but cannot cancel them."
      );
      return;
    }

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
        axiosSecure
          .patch(`/bookings/${booking._id}/cancel`)
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
          <span className="font-semibold">{response.total || 0}</span>
          {" | "}
          Page {currentPage} of {totalPages}
        </p>
      </div>

      <div className="mb-4 space-y-4">
        {/* Payment Filter */}
        <div className="bg-white p-4 rounded-lg shadow">
          <span className="font-medium text-gray-700 mr-4">
            Filter by Payment:
          </span>
          <div className="inline-flex gap-2">
            <button
              onClick={() => handlePaymentFilterChange("all")}
              className={`px-4 py-2 rounded-lg transition font-medium ${
                paymentFilter === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All ({response.total || 0})
            </button>
            <button
              onClick={() => handlePaymentFilterChange("Paid")}
              className={`px-4 py-2 rounded-lg transition font-medium ${
                paymentFilter === "Paid"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Paid
            </button>
            <button
              onClick={() => handlePaymentFilterChange("Unpaid")}
              className={`px-4 py-2 rounded-lg transition font-medium ${
                paymentFilter === "Unpaid"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Unpaid
            </button>
          </div>
        </div>

        {/* Sorting Controls */}
        <div className="mb-4 flex gap-4 items-center bg-white p-4 rounded-lg shadow">
          <span className="font-medium text-gray-700">Sort by:</span>
          <button
            onClick={() => handleSort("createdAt")}
            className={`px-4 py-2 rounded-lg transition ${
              sortBy === "createdAt"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Date {getSortIcon("createdAt")}
          </button>
          <button
            onClick={() => handleSort("status")}
            className={`px-4 py-2 rounded-lg transition ${
              sortBy === "status"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Status {getSortIcon("status")}
          </button>
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
              {bookings.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-10 text-center text-gray-500"
                  >
                    No bookings found
                  </td>
                </tr>
              ) : (
                bookings.map((booking, index) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="px-5 py-5 text-center border-b">
                      <p className="font-medium">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </p>
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
                      <div className="flex flex-col justify-center gap-2">
                        <button
                          onClick={() => openDetailsModal(booking)}
                          className="btn btn-sm btn-info"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                       
                          {booking.paymentStatus === "Paid" &&
                            booking.status !== "cancelled" &&
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

                          {booking.paymentStatus !== "Paid" && (
                            <span className="text-xs text-gray-500 italic">
                              Payment required
                            </span>
                          )}
                        </div>
                     
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center items-center gap-2">
            <button
              onClick={goToPrevious}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 
            disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>

            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                // Show first page, last page, current page, and pages around current
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-4 py-2 rounded-lg transition ${
                        currentPage === page
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return (
                    <span key={page} className="px-2">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            <button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 
            disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        )}

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
                      <p className="font-medium">
                        {selectedBooking.serviceName}
                      </p>
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
                  <h4 className="font-semibold text-md mb-2">
                    Booking Details
                  </h4>
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
    </div>
  );
};

export default ManageBookings;
