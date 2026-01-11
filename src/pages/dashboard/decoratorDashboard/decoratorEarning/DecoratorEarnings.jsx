import React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  FaMoneyBillWave,

  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";
import Loader from "../../../shared/loader/Loader";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useTheme } from "../../../../contexts/ThemeContext";

const DecoratorEarnings = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const axiosSecure=useAxiosSecure()

  const { data: earnings = {}, isLoading } = useQuery({
    queryKey: ["decorator-earnings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/decorator/earnings/${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  const {
    totalEarnings = 0,
    completedProjects = 0,
    ongoingProjects = 0,
    paymentHistory = [],
  } = earnings;

  return (
    <div className={`p-6 space-y-6 ${isDark ? 'bg-gray-900' : ''}`}>
      <div className="mb-6">
        <h2 className={`text-3xl font-bold text-primary ${
          isDark ? 'text-orange-400' : ''
        }`}>Earnings Summary</h2>
        <p className={`mt-1 ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Track your income and completed projects
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Earnings */}
        <div className={`rounded-lg shadow-lg p-6 border-l-4 border-green-500 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Total Earnings
              </p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                ৳{totalEarnings.toLocaleString()}
              </p>
            </div>
            <FaMoneyBillWave className="text-4xl text-green-500" />
          </div>
        </div>

        {/* Completed Projects */}
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
              }`}>
                Completed Projects
              </p>
              <p className="text-3xl font-bold text-primary mt-2">
                {completedProjects}
              </p>
            </div>
            <FaCheckCircle className="text-4xl text-primary" />
          </div>
        </div>

        {/* Ongoing Projects */}
        <div className={`rounded-lg shadow-lg p-6 border-l-4 border-blue-500 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Ongoing Projects
              </p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {ongoingProjects}
              </p>
            </div>
            <FaClock className="text-4xl text-blue-500" />
          </div>
        </div>
      </div>

      {/* Payment History Table */}
      <div className={`rounded-lg shadow-lg p-6 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`text-xl font-bold mb-4 text-primary ${
          isDark ? 'text-orange-400' : ''
        }`}>Payment History</h3>

        {paymentHistory.length === 0 ? (
          <div className="text-center py-8">
            <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>No payment history yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className={`border-b ${
                  isDark ? 'border-gray-600' : 'border-gray-200'
                }`} style={{ backgroundColor: "#af5f44" }}>
                  <th className="px-4 py-3 text-left text-white">Date</th>
                  <th className="px-4 py-3 text-left text-white">Service</th>
                  <th className="px-4 py-3 text-left text-white">Customer</th>
                  <th className="px-4 py-3 text-left text-white">Category</th>
                  <th className="px-4 py-3 text-center text-white">Status</th>
                  <th className="px-4 py-3 text-right text-white">Amount</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment, index) => (
                  <tr key={index} className={`border-b transition ${
                    isDark 
                      ? 'border-gray-600 hover:bg-gray-700' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}>
                    <td className={`px-4 py-3 text-sm ${
                      isDark ? 'text-gray-300' : 'text-gray-900'
                    }`}>
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={payment.serviceImage}
                          alt={payment.serviceName}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <span className={`font-medium ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {payment.serviceName}
                        </span>
                      </div>
                    </td>
                    <td className={`px-4 py-3 text-sm ${
                      isDark ? 'text-gray-300' : 'text-gray-900'
                    }`}>{payment.userName}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {payment.serviceCategory}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          payment.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : payment.status === "in_progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {payment.status?.replace(/_/g, " ").toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-primary">
                      ৳{payment.servicePrice?.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Monthly Breakdown  */}
      <div className={`rounded-lg shadow-lg p-6 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`text-xl font-bold mb-4 text-primary ${
          isDark ? 'text-orange-400' : ''
        }`}>This Month</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg ${
            isDark ? 'bg-green-900/20' : 'bg-green-50'
          }`}>
            <p className={`text-sm ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>Completed This Month</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {paymentHistory.filter((p) => p.status === "completed").length}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${
            isDark ? 'bg-blue-900/20' : 'bg-blue-50'
          }`}>
            <p className={`text-sm ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>Earnings This Month</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              ৳
              {paymentHistory
                .filter((p) => p.status === "completed")
                .reduce((sum, p) => sum + (p.servicePrice || 0), 0)
                .toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecoratorEarnings;
