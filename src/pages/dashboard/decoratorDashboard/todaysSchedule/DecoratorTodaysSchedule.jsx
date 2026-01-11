import React from "react";
import { useQuery } from "@tanstack/react-query";


import { FaClock, FaMapMarkerAlt,  FaEnvelope } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";
import Loader from "../../../shared/loader/Loader";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useTheme } from "../../../../contexts/ThemeContext";

const DecoratorTodaysSchedule = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const axiosSecure=useAxiosSecure()

  const { data: schedule = [], isLoading } = useQuery({
    queryKey: ["decorator-schedule", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/decorator/todays-schedule/${
          user?.email
        }`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={`p-6 ${isDark ? 'bg-gray-900' : ''}`}>
      <div className="mb-6">
        <h2 className={`text-3xl font-bold text-primary ${
          isDark ? 'text-orange-400' : ''
        }`}>Today's Schedule</h2>
        <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{today}</p>
        <p className={`text-sm mt-1 ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Projects scheduled:{" "}
          <span className="font-semibold">{schedule.length}</span>
        </p>
      </div>

      {schedule.length === 0 ? (
        <div className={`text-center py-12 rounded-lg shadow ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <FaClock className={`text-6xl mx-auto mb-4 ${
            isDark ? 'text-gray-600' : 'text-gray-300'
          }`} />
          <p className={`text-lg ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            No projects scheduled for today
          </p>
          <p className={`text-sm mt-2 ${
            isDark ? 'text-gray-500' : 'text-gray-400'
          }`}>Enjoy your day off!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {schedule.map((item, index) => (
            <div
              key={item._id}
              className={`rounded-lg shadow-lg p-6 border-l-4 ${
                isDark ? 'bg-gray-800' : 'bg-white'
              }`}
              style={{ borderLeftColor: "#af5f44" }}
            >
              <div className="flex items-start justify-between">
                {/* Left Side */}
                <div className="flex-1 space-y-3">
                  {/* Project Number */}
                  <div className="flex items-center gap-3">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                      #{index + 1}
                    </span>
                    <h3 className={`font-bold text-xl ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>{item.serviceName}</h3>
                  </div>

                  {/* Category */}
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                    {item.serviceCategory}
                  </span>

                  {/* Customer Details */}
                  <div className="space-y-2">
                    <p className={`font-semibold ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Customer Details:
                    </p>
                    <div className={`flex items-center gap-2 text-sm ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <FaEnvelope className="text-primary" />
                      <span>{item.userEmail}</span>
                    </div>
                    <div className={`flex items-center gap-2 text-sm ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <FaMapMarkerAlt className="text-primary" />
                      <span>{item.location || "Location not specified"}</span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="pt-2">
                    <span
                      className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                        item.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : item.status === "in_progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.status?.replace(/_/g, " ").toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Right Side - Image */}
                <div className="ml-6">
                  <img
                    src={item.serviceImage}
                    alt={item.serviceName}
                    className="w-32 h-32 rounded-lg object-cover shadow"
                  />
                  <p className="text-center mt-2 font-bold text-primary">
                    ৳{item.servicePrice?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DecoratorTodaysSchedule;
