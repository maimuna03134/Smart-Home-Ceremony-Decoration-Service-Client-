import React from "react";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

import Loader from "../../../shared/loader/Loader";
import MyContainer from "../../../../components/container/MyContainer";
import { Calendar, CreditCard, DollarSign } from "lucide-react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useTheme } from "../../../../contexts/ThemeContext";

const PaymentHistory = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/payments/user/${user.email}`);
      return result.data;
    },
    enabled: !!user?.email,
  });

  const totalSpent = payments.reduce((sum, payment) => sum + payment.price, 0);
  console.log(totalSpent);

  if (isLoading) return <Loader />;

  return (
    <div className={`min-h-screen p-6 ${isDark ? 'bg-gray-900' : ''}`}>
      <MyContainer>
        {/* Header with Stats */}
        <div className={`rounded-2xl shadow-xl p-6 mb-6 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className={`text-3xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Payment History
              </h1>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                View all your payment transactions
              </p>
            </div>
            <div className={`rounded-xl p-4 border ${
              isDark 
                ? 'border-purple-600 bg-gray-700' 
                : 'border-purple-200 bg-white'
            }`}>
              <p className={`text-sm mb-1 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>Total Spent</p>
              <p className="text-3xl font-bold text-primary">
                ৳ {totalSpent.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className={`rounded-xl shadow-lg p-6 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <CreditCard className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <p className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>Total Payments</p>
                <p className={`text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {payments.length}
                </p>
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-lg p-6 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>This Month</p>
                <p className={`text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {
                    payments.filter((p) => {
                      const paymentDate = new Date(p.paymentDate);
                      const now = new Date();
                      return (
                        paymentDate.getMonth() === now.getMonth() &&
                        paymentDate.getFullYear() === now.getFullYear()
                      );
                    }).length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-lg p-6 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>Average Payment</p>
                <p className={`text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  ৳{" "}
                  {payments.length > 0
                    ? Math.round(totalSpent / payments.length).toLocaleString()
                    : 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Table */}
        {payments.length === 0 ? (
          <div className={`rounded-2xl shadow-xl p-12 text-center ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="text-6xl mb-4">💳</div>
            <h3 className={`text-2xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              No Payment History
            </h3>
            <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              Your payment transactions will appear here
            </p>
          </div>
        ) : (
          <div className={`rounded-2xl shadow-xl overflow-hidden ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-linear-to-r from-primary to-orange-600 text-white">
                  <tr>
                    <th className="text-left py-2 px-6 font-semibold">SL No</th>
                    <th className="text-left py-2 px-6 font-semibold">
                      Service Name
                    </th>
                    <th className="text-left py-2 px-6 font-semibold">
                      Amount
                    </th>
                    <th className="text-left py-2 px-6 font-semibold">
                      Transaction ID
                    </th>
                    <th className="text-left py-2 px-6 font-semibold">
                      Payment Date
                    </th>
                    <th className="text-left py-2 px-6 font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${
                  isDark ? 'divide-gray-600' : 'divide-gray-200'
                }`}>
                  {payments.map((payment, index) => (
                    <tr
                      key={payment._id}
                      className={`transition ${
                        index % 2 === 0 
                          ? isDark ? 'bg-gray-700' : 'bg-gray-50'
                          : isDark ? 'bg-gray-800' : 'bg-white'
                      } hover:${isDark ? 'bg-gray-600' : 'bg-gray-100'}`}
                    >
                      <td className={`py-4 px-6 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>{index + 1}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className={`font-semibold ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                              {payment.serviceName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-base font-bold text-primary">
                          ৳ {payment.price.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <code className={`text-xs px-2 py-1 rounded font-mono ${
                          isDark 
                            ? 'bg-gray-600 text-gray-200' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {payment.transactionId?.slice(0, 20)}...
                        </code>
                      </td>
                      <td className={`py-4 px-6 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <div className="flex items-center gap-2">
                          <Calendar className={`w-4 h-4 ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                          }`} />
                          {new Date(payment.paymentDate).toLocaleDateString(
                            "en-GB"
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          {payment.status === "pending"
                            ? "Completed"
                            : payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4 p-4">
              {payments.map((payment, index) => (
                <div
                  key={payment._id}
                  className={`border rounded-xl p-4 shadow-sm ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                      #{index + 1}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      {payment.status === "pending"
                        ? "Completed"
                        : payment.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    {payment.image && (
                      <img
                        src={payment.image}
                        alt={payment.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <h3 className={`font-bold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {payment.serviceName}
                      </h3>
                      <p className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {payment.category}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between items-center">
                      <span className={`text-sm ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>Amount:</span>
                      <span className="text-lg font-bold text-primary">
                        ৳ {payment.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className={`text-sm ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>Date:</span>
                      <span className={`text-sm ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {new Date(payment.paymentDate).toLocaleDateString(
                          "en-GB"
                        )}
                      </span>
                    </div>
                  </div>

                  <div className={`rounded-lg p-3 ${
                    isDark ? 'bg-gray-600' : 'bg-gray-50'
                  }`}>
                    <p className={`text-xs mb-1 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>Transaction ID</p>
                    <code className={`text-xs font-mono break-all ${
                      isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      {payment.transactionId}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </MyContainer>
    </div>
  );
};

export default PaymentHistory;
