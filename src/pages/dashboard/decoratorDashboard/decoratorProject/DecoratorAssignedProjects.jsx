import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";
import Loader from "../../../shared/loader/Loader";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useTheme } from "../../../../contexts/ThemeContext";

const DecoratorAssignedProjects = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const axiosSecure=useAxiosSecure()

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["decorator-projects", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/decorator/assigned-projects/${
          user?.email
        }`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className={`p-6 ${isDark ? 'bg-gray-900' : ''}`}>
      <div className="mb-6">
        <h2 className={`text-3xl font-bold text-primary ${
          isDark ? 'text-orange-400' : ''
        }`}>
          My Assigned Projects
        </h2>
        <p className={`mt-1 ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Total Projects:{" "}
          <span className="font-semibold">{projects.length}</span>
        </p>
      </div>

      {projects.length === 0 ? (
        <div className={`text-center py-12 rounded-lg shadow ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <p className={`text-lg ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>No projects assigned yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className={`rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
                isDark ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              {/* Service Image */}
              <img
                src={project.serviceImage}
                alt={project.serviceName}
                className="w-full h-48 object-cover"
              />

              {/* Project Details */}
              <div className="p-5 space-y-3">
                <h3 className={`font-bold text-lg text-primary ${
                  isDark ? 'text-orange-400' : ''
                }`}>
                  {project.serviceName}
                </h3>

                {/* Category Badge */}
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                  {project.serviceCategory}
                </span>

                {/* Customer Info */}
                <div className={`flex items-center gap-2 text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <FaUser className="text-primary" />
                  <div>
                    <p className={`font-medium ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>{project.userName}</p>
                    <p className="text-xs">{project.userEmail}</p>
                  </div>
                </div>

                {/* Location */}
                <div className={`flex items-center gap-2 text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <FaMapMarkerAlt className="text-primary" />
                  <span>{project.location || "Location not specified"}</span>
                </div>

                {/* Date */}
                <div className={`flex items-center gap-2 text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <FaCalendarAlt className="text-primary" />
                  <span>
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Status */}
                <div className={`pt-3 border-t ${
                  isDark ? 'border-gray-600' : 'border-gray-200'
                }`}>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : project.status === "in_progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {project.status?.replace(/_/g, " ").toUpperCase()}
                  </span>
                </div>

                {/* Price */}
                <div className="pt-2">
                  <p className="text-lg font-bold text-primary">
                    ৳{project.servicePrice?.toLocaleString()}
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

export default DecoratorAssignedProjects;
