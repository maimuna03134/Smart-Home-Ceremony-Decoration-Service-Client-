import React from 'react';
import MyContainer from '../../../../components/container/MyContainer';
import { useNavigate } from 'react-router';
import useAuth from '../../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '../../../shared/loader/Loader';

const ManageBookings = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
      const { data: bookings = [], isLoading } = useQuery({
        queryKey: ["bookings", user?.email],
        queryFn: async () => {
          const result = await axios(
            `${import.meta.env.VITE_API_URL}/manage-booking/user/${
              user?.email
            }`
          );
          return result.data;
        },
      });

    if (isLoading) return <Loader />;
    
console.log(bookings)
    return (
      <div className="w-full overflow-x-auto">
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
                  <td className="px-5 py-5 text-center">
                    <p className="font-medium">{index + 1}</p>
                  </td>

                  {/* User Info */}
                  <td className="px-5 py-5">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <img
                        src={booking.userPhoto}
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
                  <td className="px-5 py-5">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <img
                        src={booking.serviceImage}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <p className="font-medium">{booking.serviceName}</p>
                      <p className="text-xs text-gray-500">
                        {booking.serviceCategory}
                      </p>
                    </div>
                  </td>

                  {/* Payment */}
                  <td className="px-5 py-5 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                ${
                  booking.paymentStatus === "paid"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-5 text-center">
                    <select
                      defaultValue={booking.status}
                      className="px-3 py-2 border rounded-md bg-white text-sm"
                    >
                      <option>Pending</option>
                      <option>Confirmed</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-5 text-center">
                    <div className="flex justify-center gap-2">
                      <button className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded-md">
                        Cancel
                      </button>
                      <button
                        onClick={() => navigate("/dashboard/my-bookings")}
                        className="px-3 py-2 bg-purple-600 text-white rounded-md text-sm"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default ManageBookings;