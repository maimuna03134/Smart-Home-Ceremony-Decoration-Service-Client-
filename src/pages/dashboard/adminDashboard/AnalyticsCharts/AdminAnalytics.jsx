import React from "react";
import { useQuery } from "@tanstack/react-query";

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
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useTheme } from "../../../../contexts/ThemeContext";

const COLORS = [
  "#af5f44",
  "#e07b54",
  "#f0a878",
  "#ffd4b0",
  "#82ca9d",
  "#8884d8",
];

const AdminAnalytics = () => {
  const axiosSecure = useAxiosSecure()
  const { isDark } = useTheme();
  const { data: analytics = {}, isLoading } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/analytics`
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
    <div className={`p-6 space-y-6 ${isDark ? 'bg-gray-900' : ''}`}>
      {/* Header */}
      <div>
        <h2 className={`text-3xl font-bold ${
          isDark ? 'text-orange-400' : ''
        }`} style={{ color: isDark ? '#f59e0b' : "#af5f44" }}>
          Analytics & Revenue Monitoring
        </h2>
        <p className={`mt-1 ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Track your business performance and revenue
        </p>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div
          className={`rounded-lg shadow-lg p-6 border-l-4 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
          style={{ borderLeftColor: "#af5f44" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>Total Revenue</p>
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
        <div className={`rounded-lg shadow-lg p-6 border-l-4 border-green-500 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>Paid Revenue</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                ৳{paidRevenue.toLocaleString()}
              </p>
              <p className={`text-xs mt-1 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {paidBookings} bookings
              </p>
            </div>
            <FaChartLine className="text-4xl text-green-500" />
          </div>
        </div>

        {/* Pending Revenue */}
        <div className={`rounded-lg shadow-lg p-6 border-l-4 border-yellow-500 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Pending Revenue
              </p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">
                ৳{unpaidRevenue.toLocaleString()}
              </p>
              <p className={`text-xs mt-1 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {unpaidBookings} bookings
              </p>
            </div>
            <FaCalendarAlt className="text-4xl text-yellow-500" />
          </div>
        </div>

        {/* Total Bookings */}
        <div className={`rounded-lg shadow-lg p-6 border-l-4 border-blue-500 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Total Bookings
              </p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {totalBookings}
              </p>
              <p className={`text-xs mt-1 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>All time</p>
            </div>
            <FaServicestack className="text-4xl text-blue-500" />
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Demand Chart */}
        <div className={`rounded-lg shadow-lg p-6 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h3 className={`text-xl font-bold mb-4 ${
            isDark ? 'text-orange-400' : ''
          }`} style={{ color: isDark ? '#f59e0b' : "#af5f44" }}>
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
                tick={{ fill: isDark ? '#d1d5db' : '#374151' }}
              />
              <YAxis tick={{ fill: isDark ? '#d1d5db' : '#374151' }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDark ? '#374151' : '#ffffff',
                  border: isDark ? '1px solid #4b5563' : '1px solid #e5e7eb',
                  color: isDark ? '#f9fafb' : '#111827'
                }}
              />
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
        <div className={`rounded-lg shadow-lg p-6 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h3 className={`text-xl font-bold mb-4 ${
            isDark ? 'text-orange-400' : ''
          }`} style={{ color: isDark ? '#f59e0b' : "#af5f44" }}>
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
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDark ? '#374151' : '#ffffff',
                  border: isDark ? '1px solid #4b5563' : '1px solid #e5e7eb',
                  color: isDark ? '#f9fafb' : '#111827'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Revenue Trend */}
      <div className={`rounded-lg shadow-lg p-6 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`text-xl font-bold mb-4 ${
          isDark ? 'text-orange-400' : ''
        }`} style={{ color: isDark ? '#f59e0b' : "#af5f44" }}>
          Monthly Revenue Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: isDark ? '#d1d5db' : '#374151' }}
            />
            <YAxis tick={{ fill: isDark ? '#d1d5db' : '#374151' }} />
            <Tooltip 
              contentStyle={{
                backgroundColor: isDark ? '#374151' : '#ffffff',
                border: isDark ? '1px solid #4b5563' : '1px solid #e5e7eb',
                color: isDark ? '#f9fafb' : '#111827'
              }}
            />
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
      <div className={`rounded-lg shadow-lg p-6 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`text-xl font-bold mb-4 ${
          isDark ? 'text-orange-400' : ''
        }`} style={{ color: isDark ? '#f59e0b' : "#af5f44" }}>
          Service-wise Revenue Breakdown
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className={`border-b ${
                isDark ? 'border-gray-600' : 'border-gray-200'
              }`} style={{ backgroundColor: "#af5f44" }}>
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
                <tr key={index} className={`border-b transition ${
                  isDark 
                    ? 'border-gray-600 hover:bg-gray-700' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}>
                  <td className={`px-4 py-3 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>{service.serviceName}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-sm ${
                      isDark 
                        ? 'bg-gray-700 text-gray-300' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {service.category}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-center font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
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
