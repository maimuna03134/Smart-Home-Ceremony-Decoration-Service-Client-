import React from "react";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

import Loader from "../../../shared/loader/Loader";
import MyContainer from "../../../../components/container/MyContainer";
import { Calendar, CreditCard, DollarSign } from "lucide-react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/payments/user/${user.email}`
      );
      return result.data;
    },
    enabled: !!user?.email,
  });

  const totalSpent = payments.reduce((sum, payment) => sum + payment.price, 0);
  console.log(totalSpent);

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-indigo-50 p-6">
      <MyContainer>
        {/* Header with Stats */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Payment History
              </h1>
              <p className="text-gray-600">
                View all your payment transactions
              </p>
            </div>
            <div className="bg-linear-to-br from-purple-100 to-pink-100 rounded-xl p-4 border border-purple-200">
              <p className="text-sm text-gray-600 mb-1">Total Spent</p>
              <p className="text-3xl font-bold text-purple-600">
                ৳ {totalSpent.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <CreditCard className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Payments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {payments.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
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

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Payment</p>
                <p className="text-2xl font-bold text-gray-900">
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
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-6xl mb-4">💳</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Payment History
            </h3>
            <p className="text-gray-600">
              Your payment transactions will appear here
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-linear-to-r from-purple-600 to-pink-600 text-white">
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
                <tbody className="divide-y divide-gray-200">
                  {payments.map((payment, index) => (
                    <tr
                      key={payment._id}
                      className="hover:bg-purple-50 transition"
                    >
                      <td className="py-4 px-6 text-gray-700">{index + 1}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          
                          <div>
                            <p className="font-semibold text-gray-900">
                              {payment.serviceName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-base font-bold text-purple-600">
                          ৳ {payment.price.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-gray-700">
                          {payment.transactionId?.slice(0, 20)}...
                        </code>
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
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
                  className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
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
                      <h3 className="font-bold text-gray-900">
                        {payment.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {payment.category}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Amount:</span>
                      <span className="text-lg font-bold text-purple-600">
                        ৳ {payment.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Date:</span>
                      <span className="text-sm text-gray-900">
                        {new Date(payment.paymentDate).toLocaleDateString(
                          "en-GB"
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Transaction ID</p>
                    <code className="text-xs font-mono text-gray-700 break-all">
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
