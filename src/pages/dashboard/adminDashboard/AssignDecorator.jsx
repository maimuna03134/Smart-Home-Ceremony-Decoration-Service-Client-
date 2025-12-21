import { useState, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AssignDecorator = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedDecorator, setSelectedDecorator] = useState(null);
  const [isAssigning, setIsAssigning] = useState(false);
  const decoratorModalRef = useRef();
  const queryClient = useQueryClient();

  // Fetch paid bookings awaiting decorator assignment
  const { data: bookings = [], refetch: bookingsRefetch } = useQuery({
    queryKey: ["bookings", "paid"],
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/booking-decorator?paymentStatus=Paid&status=awaiting_decorator`
      );
      return res.data;
    },
  });

  // Fetch available decorators based on selected booking's location
  const { data: availableDecorators = [] } = useQuery({
    queryKey: ["decorators", "available"],
    enabled: !!selectedBooking,
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/decorators?status=approved&workStatus=available`
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
        
        queryClient.setQueryData(["bookings", "paid"], (oldData) => {
          return oldData?.filter((booking) => booking._id !== selectedBooking._id) || [];
        });

   
        decoratorModalRef.current?.close();

        setSelectedBooking(null);
        setSelectedDecorator(null);

   
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Decorator assigned successfully!",
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
        title: "Oops...",
        text: error.response?.data?.message || "Failed to assign decorator. Please try again.",
      });
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Assign Decorator to Bookings</h2>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No paid bookings awaiting decorator assignment
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Booking ID</th>
                <th className="px-4 py-2 border">Customer</th>
                <th className="px-4 py-2 border">Service</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Location</th>
                <th className="px-4 py-2 border">Payment Status</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="px-4 py-2 border">
                    {booking.bookingId || booking._id}
                  </td>
                  <td className="px-4 py-2 border">
                    <div>
                      <p className="font-semibold">{booking.userName}</p>
                      <p className="text-sm text-gray-600">
                        {booking.userEmail}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-2 border">{booking.serviceName}</td>
                  <td className="px-4 py-2 border">{booking.bookingDate}</td>
                  <td className="px-4 py-2 border">{booking.location}</td>
                  <td className="px-4 py-2 border">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                      {booking.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => openAssignDecoratorModal(booking)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Assign Decorator
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
        <div className="modal-box max-w-2xl">
          <div className="mb-4">
            <h3 className="font-bold text-lg">Assign Decorator</h3>
          </div>

          {selectedBooking && (
            <div className="mb-4 space-y-2">
              <p>
                <span className="font-semibold">Service:</span>{" "}
                {selectedBooking.serviceName}
              </p>
              <p>
                <span className="font-semibold">Customer:</span>{" "}
                {selectedBooking.userName}
              </p>
              <p>
                <span className="font-semibold">Location:</span>{" "}
                {selectedBooking.location}
              </p>
            </div>
          )}

          <div className="mb-4">
            <label className="block font-semibold mb-2">Select Decorator</label>
            {availableDecorators.length === 0 ? (
              <p className="text-gray-500">No available decorators</p>
            ) : (
              <select
                className="select select-bordered w-full"
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
                    {decorator.name} - {decorator.specialty} (Rating:{" "}
                    {decorator.rating || "N/A"})
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="modal-action">
            <button
              onClick={handleAssignDecorator}
              disabled={!selectedDecorator || isAssigning}
              className="btn btn-primary"
            >
              {isAssigning ? "Assigning..." : "Assign"}
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