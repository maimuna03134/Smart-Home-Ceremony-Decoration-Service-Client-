import { useState, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useDemoProtection from "../../../hooks/useDemoProtection";
import { FaLock, FaUserTie } from "react-icons/fa";
import { useTheme } from "../../../contexts/ThemeContext";

const AssignDecorator = () => {
  const axiosSecure = useAxiosSecure();
  const { isDark } = useTheme();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedDecorator, setSelectedDecorator] = useState(null);
  const [isAssigning, setIsAssigning] = useState(false);
  const decoratorModalRef = useRef();
  const queryClient = useQueryClient();
  const { checkActionPermission, isDemoAccount } = useDemoProtection();

  const { data: bookings = [], refetch: bookingsRefetch } = useQuery({
    queryKey: ["bookings", "paid"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/booking-decorator?paymentStatus=Paid&status=awaiting_decorator`
      );
      return res.data;
    },
  });

  const { data: availableDecorators = [] } = useQuery({
    queryKey: ["decorators", "available"],
    enabled: !!selectedBooking,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/decorators?status=approved&workStatus=available`
      );
      return res.data;
    },
  });

  const openAssignDecoratorModal = (booking) => {
    setSelectedBooking(booking);
    setSelectedDecorator(null);
    decoratorModalRef.current.showModal();
  };

  const handleAssignDecorator = async () => {
    // Demo protection check
    if (!checkActionPermission("assign_decorator")) return;

    if (!selectedDecorator) {
      Swal.fire({
        icon: "warning",
        title: "Please select a decorator",
        text: "You must choose a decorator before confirming.",
      });
      return;
    }

    setIsAssigning(true);

    const decorator = selectedDecorator;
    const decoratorAssignInfo = {
      decoratorId: decorator._id,
      decoratorEmail: decorator.email,
      decoratorName: decorator.name,
      bookingId: selectedBooking._id,
    };

    try {
      const res = await axiosSecure.patch(
        `/booking/${selectedBooking._id}`,
        decoratorAssignInfo
      );

      if (res.data.modifiedCount > 0 || res.data.success || res.status === 200) {
        // Update cache
        queryClient.setQueryData(["bookings", "paid"], (oldData) => {
          return oldData?.filter((booking) => booking._id !== selectedBooking._id) || [];
        });

        decoratorModalRef.current?.close();
        setSelectedBooking(null);
        setSelectedDecorator(null);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "✅ Decorator assigned successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        bookingsRefetch();
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error("Error assigning decorator:", error);
      queryClient.invalidateQueries(["bookings", "paid"]);

      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: error.response?.data?.message || "Failed to assign decorator. Please try again.",
      });
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <div className={`p-6 ${isDark ? 'bg-gray-900' : ''}`}>
      <div className="mb-6">
        <h2 className={`text-3xl font-bold text-primary ${
          isDark ? 'text-orange-400' : ''
        }`}>Assign Decorator to Bookings</h2>
        <p className={`mt-1 ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Total pending assignments: <span className="font-semibold">{bookings.length}</span>
        </p>
      </div>

      {/* Demo Account Warning */}
      {isDemoAccount && (
        <div className="alert alert-warning mb-6 shadow-lg">
          <FaLock className="text-xl" />
          <div>
            <h3 className="font-bold">Demo Admin Account - Read Only</h3>
            <div className="text-sm">
              You can view all pending bookings but cannot assign decorators.
            </div>
          </div>
        </div>
      )}

      {bookings.length === 0 ? (
        <div className={`rounded-lg shadow-lg p-16 text-center ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="text-7xl mb-6">📋</div>
          <h3 className={`text-2xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            No Pending Assignments
          </h3>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            All paid bookings have been assigned to decorators.
          </p>
        </div>
      ) : (
        <div className={`overflow-x-auto rounded-lg shadow-lg ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-linear-to-r from-primary to-orange-600 text-white">
                <th className="px-4 py-3 border text-left">Booking ID</th>
                <th className="px-4 py-3 border text-left">Customer</th>
                <th className="px-4 py-3 border text-left">Service</th>
                <th className="px-4 py-3 border text-left">Date</th>
                <th className="px-4 py-3 border text-left">Location</th>
                <th className="px-4 py-3 border text-center">Payment</th>
                <th className="px-4 py-3 border text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id} className={`transition ${
                  index % 2 === 0 
                    ? isDark ? 'bg-gray-700' : 'bg-gray-50'
                    : isDark ? 'bg-gray-800' : 'bg-white'
                } hover:${isDark ? 'bg-gray-600' : 'bg-gray-100'}`}>
                  <td className={`px-4 py-3 border ${
                    isDark ? 'border-gray-600' : 'border-gray-200'
                  }`}>
                    <span className={`text-xs font-mono ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {booking._id.slice(-8)}
                    </span>
                  </td>
                  <td className={`px-4 py-3 border ${
                    isDark ? 'border-gray-600' : 'border-gray-200'
                  }`}>
                    <div>
                      <p className={`font-semibold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>{booking.userName}</p>
                      <p className={`text-sm ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>{booking.userEmail}</p>
                    </div>
                  </td>
                  <td className={`px-4 py-3 border ${
                    isDark ? 'border-gray-600' : 'border-gray-200'
                  }`}>
                    <div>
                      <p className={`font-medium ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>{booking.serviceName}</p>
                      <p className={`text-xs ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>{booking.serviceCategory}</p>
                    </div>
                  </td>
                  <td className={`px-4 py-3 border ${
                    isDark ? 'border-gray-600 text-gray-300' : 'border-gray-200 text-gray-900'
                  }`}>
                    <span className="text-sm">{booking.bookingDate}</span>
                  </td>
                  <td className={`px-4 py-3 border ${
                    isDark ? 'border-gray-600 text-gray-300' : 'border-gray-200 text-gray-900'
                  }`}>
                    <span className="text-sm" title={booking.location}>
                      {booking.location?.length > 30
                        ? `${booking.location.substring(0, 30)}...`
                        : booking.location}
                    </span>
                  </td>
                  <td className={`px-4 py-3 border text-center ${
                    isDark ? 'border-gray-600' : 'border-gray-200'
                  }`}>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      {booking.paymentStatus}
                    </span>
                  </td>
                  <td className={`px-4 py-3 border text-center ${
                    isDark ? 'border-gray-600' : 'border-gray-200'
                  }`}>
                    <button
                      onClick={() => openAssignDecoratorModal(booking)}
                      disabled={isDemoAccount}
                      className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 mx-auto ${isDemoAccount
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                    >
                      <FaUserTie />
                      {isDemoAccount ? "🔒 Demo Mode" : "Assign Decorator"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Assign Decorator Modal */}
      <dialog ref={decoratorModalRef} className="modal">
        <div className={`modal-box max-w-2xl ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="mb-4">
            <h3 className={`font-bold text-xl text-primary ${
              isDark ? 'text-orange-400' : ''
            }`}>Assign Decorator</h3>
            <p className={`text-sm ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Select a decorator for this booking
            </p>
          </div>

          {selectedBooking && (
            <div className={`p-4 rounded-lg mb-4 space-y-2 ${
              isDark ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className="flex justify-between">
                <span className={`font-semibold ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>Service:</span>
                <span className={isDark ? 'text-white' : 'text-gray-900'}>{selectedBooking.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className={`font-semibold ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>Customer:</span>
                <span className={isDark ? 'text-white' : 'text-gray-900'}>{selectedBooking.userName}</span>
              </div>
              <div className="flex justify-between">
                <span className={`font-semibold ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>Location:</span>
                <span className={isDark ? 'text-white' : 'text-gray-900'}>{selectedBooking.location}</span>
              </div>
              <div className="flex justify-between">
                <span className={`font-semibold ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>Date:</span>
                <span className={isDark ? 'text-white' : 'text-gray-900'}>{selectedBooking.bookingDate}</span>
              </div>
            </div>
          )}

          <div className="mb-4">
            <label className={`block font-semibold mb-2 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Select Decorator
            </label>
            {availableDecorators.length === 0 ? (
              <div className={`border-l-4 border-yellow-400 p-4 rounded ${
                isDark ? 'bg-yellow-900/20' : 'bg-yellow-50'
              }`}>
                <p className={`font-medium ${
                  isDark ? 'text-yellow-300' : 'text-yellow-800'
                }`}>
                  ⚠️ No available decorators at the moment
                </p>
                <p className={`text-sm mt-1 ${
                  isDark ? 'text-yellow-400' : 'text-yellow-700'
                }`}>
                  All decorators are currently assigned to other projects.
                </p>
              </div>
            ) : (
              <select
                className={`select select-bordered w-full ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : ''
                }`}
                value={selectedDecorator?._id || ""}
                onChange={(e) => {
                  const decorator = availableDecorators.find(
                    (d) => d._id === e.target.value
                  );
                  setSelectedDecorator(decorator);
                }}
              >
                <option value="" disabled>
                  Choose a decorator
                </option>
                {availableDecorators.map((decorator) => (
                  <option key={decorator._id} value={decorator._id}>
                    {decorator.name} - {decorator.district}
                    {decorator.specialties && decorator.specialties.length > 0
                      ? ` (${decorator.specialties.join(", ")})`
                      : ""}{" "}
                    | ⭐ {decorator.rating?.toFixed(1) || "N/A"}
                  </option>
                ))}
              </select>
            )}

            {selectedDecorator && (
              <div className={`mt-3 p-3 rounded-lg ${
                isDark ? 'bg-blue-900/20' : 'bg-blue-50'
              }`}>
                <p className={`text-sm ${
                  isDark ? 'text-blue-300' : 'text-blue-900'
                }`}>
                  <span className="font-semibold">Selected:</span> {selectedDecorator.name}
                </p>
                <p className={`text-xs mt-1 ${
                  isDark ? 'text-blue-400' : 'text-blue-700'
                }`}>
                  Rating: ⭐ {selectedDecorator.rating?.toFixed(1)} |
                  Completed: {selectedDecorator.completedProjects || 0} projects
                </p>
              </div>
            )}
          </div>

          {/* Demo Warning in Modal */}
          {isDemoAccount && (
            <div className="alert alert-warning mb-4">
              <FaLock />
              <span className="text-sm">
                Demo account cannot assign decorators. Please register for full access.
              </span>
            </div>
          )}

          <div className="modal-action">
            <button
              onClick={handleAssignDecorator}
              disabled={!selectedDecorator || isAssigning || isDemoAccount}
              className={`btn ${isDemoAccount
                  ? "btn-disabled"
                  : !selectedDecorator || isAssigning
                    ? "btn-disabled"
                    : "btn-primary"
                }`}
            >
              {isAssigning ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Assigning...
                </>
              ) : isDemoAccount ? (
                "🔒 Demo Mode"
              ) : (
                "Assign Decorator"
              )}
            </button>
            <button
              onClick={() => {
                decoratorModalRef.current.close();
                setSelectedBooking(null);
                setSelectedDecorator(null);
              }}
              className="btn"
              disabled={isAssigning}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignDecorator;