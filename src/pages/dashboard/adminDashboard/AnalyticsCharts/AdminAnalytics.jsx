import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  FaMoneyBillWave,
  FaChartLine,
  FaCalendarAlt,
  FaServicestack,
} from "react-icons/fa";
import Loader from "../../../shared/loader/Loader";

const COLORS = [
  "#af5f44",
  "#e07b54",
  "#f0a878",
  "#ffd4b0",
  "#82ca9d",
  "#8884d8",
];

const AdminAnalytics = () => {
  // Fetch analytics data
  const { data: analytics = {}, isLoading } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/analytics`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  const {
    totalRevenue = 0,
    paidRevenue = 0,
    unpaidRevenue = 0,
    totalBookings = 0,
    paidBookings = 0,
    unpaidBookings = 0,
    serviceDemand = [],
    categoryRevenue = [],
    monthlyRevenue = [],
  } = analytics;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold" style={{ color: "#af5f44" }}>
          Analytics & Revenue Monitoring
        </h2>
        <p className="text-gray-600 mt-1">
          Track your business performance and revenue
        </p>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div
          className="bg-white rounded-lg shadow-lg p-6 border-l-4"
          style={{ borderLeftColor: "#af5f44" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
              <p
                className="text-3xl font-bold mt-2"
                style={{ color: "#af5f44" }}
              >
                ৳{totalRevenue.toLocaleString()}
              </p>
            </div>
            <FaMoneyBillWave
              className="text-4xl"
              style={{ color: "#af5f44" }}
            />
          </div>
        </div>

        {/* Paid Revenue */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Paid Revenue</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                ৳{paidRevenue.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {paidBookings} bookings
              </p>
            </div>
            <FaChartLine className="text-4xl text-green-500" />
          </div>
        </div>

        {/* Pending Revenue */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Pending Revenue
              </p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">
                ৳{unpaidRevenue.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {unpaidBookings} bookings
              </p>
            </div>
            <FaCalendarAlt className="text-4xl text-yellow-500" />
          </div>
        </div>

        {/* Total Bookings */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Total Bookings
              </p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {totalBookings}
              </p>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </div>
            <FaServicestack className="text-4xl text-blue-500" />
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Demand Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4" style={{ color: "#af5f44" }}>
            Service Demand (Most Booked Services)
          </h3>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={serviceDemand}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="serviceName"
                angle={-40}
                textAnchor="end"
                height={175}
                interval={0}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="bookingCount"
                fill="#af5f44"
                name="Number of Bookings"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Revenue Distribution */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4" style={{ color: "#af5f44" }}>
            Revenue by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryRevenue}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="revenue"
              >
                {categoryRevenue.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Revenue Trend */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4" style={{ color: "#af5f44" }}>
          Monthly Revenue Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#af5f44"
              strokeWidth={2}
              name="Revenue (৳)"
            />
            <Line
              type="monotone"
              dataKey="bookings"
              stroke="#82ca9d"
              strokeWidth={2}
              name="Bookings"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Stats Table */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4" style={{ color: "#af5f44" }}>
          Service-wise Revenue Breakdown
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b" style={{ backgroundColor: "#af5f44" }}>
                <th className="px-4 py-3 text-left text-white">Service Name</th>
                <th className="px-4 py-3 text-left text-white">Category</th>
                <th className="px-4 py-3 text-center text-white">
                  Total Bookings
                </th>
                <th className="px-4 py-3 text-right text-white">
                  Total Revenue
                </th>
              </tr>
            </thead>
            <tbody>
              {serviceDemand.map((service, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{service.serviceName}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                      {service.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center font-semibold">
                    {service.bookingCount}
                  </td>
                  <td
                    className="px-4 py-3 text-right font-semibold"
                    style={{ color: "#af5f44" }}
                  >
                    ৳{service.totalRevenue?.toLocaleString() || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
