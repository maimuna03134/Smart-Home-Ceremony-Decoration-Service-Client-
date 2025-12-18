// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
import React from 'react';
import { FaCalendarCheck, FaChartLine, FaDollarSign, FaPaintBrush, FaTools, FaUsers } from 'react-icons/fa';

const AdminDashboard = () => {
    // const { data: stats, isLoading } = useQuery({
    //   queryKey: ["admin-stats"],
    //   queryFn: async () => {
    //     const res = await axios.get(
    //       `${import.meta.env.VITE_API_URL}/admin/stats`
    //     );
    //     return res.data;
    //   },
    // });

    // if (isLoading) {
    //   return (
    //     <div className="flex justify-center items-center min-h-screen">
    //       <span className="loading loading-spinner loading-lg"></span>
    //     </div>
    //   );
    // }
    const statsCards = [
      {
        title: "Total Revenue",
        // value: `৳ ${stats?.totalRevenue?.toLocaleString() || 0}`,
        icon: <FaDollarSign className="w-8 h-8" />,
        bgColor: "bg-green-500",
        textColor: "text-green-500",
      },
      {
        title: "Total Bookings",
        // value: stats?.totalBookings || 0,
        // subtitle: `${stats?.paidBookings || 0} paid`,
        icon: <FaCalendarCheck className="w-8 h-8" />,
        bgColor: "bg-blue-500",
        textColor: "text-blue-500",
      },
      {
        title: "Total Services",
        // value: stats?.totalServices || 0,
        icon: <FaTools className="w-8 h-8" />,
        bgColor: "bg-purple-500",
        textColor: "text-purple-500",
      },
      {
        title: "Total Users",
        // value: stats?.totalUsers || 0,
        icon: <FaUsers className="w-8 h-8" />,
        bgColor: "bg-orange-500",
        textColor: "text-orange-500",
      },
      {
        title: "Total Decorators",
        // value: stats?.totalDecorators || 0,
        icon: <FaPaintBrush className="w-8 h-8" />,
        bgColor: "bg-pink-500",
        textColor: "text-pink-500",
      },
      {
        title: "This Month Revenue",
        // value: `৳ ${stats?.thisMonthRevenue?.toLocaleString() || 0}`,
        icon: <FaChartLine className="w-8 h-8" />,
        bgColor: "bg-indigo-500",
        textColor: "text-indigo-500",
      },
    ];
    return (
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ color: "#af5f44" }}>
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here's an overview of your business
          </p>
        </div>

        {/* Statistics Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-gray-600 text-sm font-medium mb-2">
                    {card.title}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {card.value}
                  </h3>
                  {card.subtitle && (
                    <p className="text-sm text-gray-500">{card.subtitle}</p>
                  )}
                </div>
                <div
                  className={`${card.bgColor} bg-opacity-10 p-4 rounded-full`}
                >
                  <div className={card.textColor}>{card.icon}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pending Bookings Alert */}
        {/* {stats?.pendingBookings > 0 && (
          <div className="alert alert-warning shadow-lg mb-6">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>
                <strong>{stats.pendingBookings}</strong> bookings are pending
                assignment. Please review and assign decorators.
              </span>
            </div>
            <div className="flex-none">
              <button
                onClick={() => (window.location.href = "/dashboard/bookings")}
                className="btn btn-sm"
                style={{ backgroundColor: "#af5f44", color: "white" }}
              >
                View Bookings
              </button>
            </div>
          </div>
        )} */}

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: "#af5f44" }}>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() =>
                (window.location.href = "/dashboard/manage-services")
              }
              className="btn btn-outline hover:btn-primary"
            >
              <FaTools className="mr-2" />
              Manage Services
            </button>
            <button
              onClick={() =>
                (window.location.href = "/dashboard/manage-bookings")
              }
              className="btn btn-outline hover:btn-primary"
            >
              <FaCalendarCheck className="mr-2" />
              Manage Bookings
            </button>
            <button
              onClick={() => (window.location.href = "/dashboard/users")}
              className="btn btn-outline hover:btn-primary"
            >
              <FaUsers className="mr-2" />
              Manage Users
            </button>
            <button
              onClick={() => (window.location.href = "/dashboard/analytics")}
              className="btn btn-outline hover:btn-primary"
            >
              <FaChartLine className="mr-2" />
              View Analytics
            </button>
          </div>
        </div>
      </div>
    );
};

export default AdminDashboard;