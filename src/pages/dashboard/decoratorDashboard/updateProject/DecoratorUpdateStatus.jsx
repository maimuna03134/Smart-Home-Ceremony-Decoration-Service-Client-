import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaCheckCircle, FaSpinner, FaClock } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";
import Loader from "../../../shared/loader/Loader";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useTheme } from "../../../../contexts/ThemeContext";
import Button from "../../../shared/button/Button";

const DecoratorUpdateStatus = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const axiosSecure = useAxiosSecure();

  const {
    data: projects = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["decorator-active-projects", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/decorator/assigned-projects/${
          user?.email
        }`
      );

      return res.data.filter(
        (p) => p.status !== "completed" && p.status !== "cancelled_by_admin"
      );
    },
  });

  const handleStatusUpdate = (projectId, currentStatus) => {

    const statusProgression = {
      decorator_assigned: "in_progress",
      awaiting_decorator: "in_progress",
      in_progress: "completed",
    };

    const nextStatus = statusProgression[currentStatus];

    if (!nextStatus) {
      Swal.fire({
        icon: "info",
        title: "No further action",
        text: "This project is already completed or cancelled",
      });
      return;
    }

    const statusLabels = {
      in_progress: "In Progress",
      completed: "Completed",
    };

    Swal.fire({
      title: `Update to ${statusLabels[nextStatus]}?`,
      text: `Change project status to ${statusLabels[nextStatus]}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#af5f44",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(
            `/decorator/update-status/${projectId}`,
            { status: nextStatus }
          )
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                icon: "success",
                title: "Status Updated!",
                text: `Project status changed to ${statusLabels[nextStatus]}`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            console.error("Error updating status:", error);
            Swal.fire({
              icon: "error",
              title: "Failed!",
              text: "Could not update project status",
            });
          });
      }
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div className={`p-6 ${isDark ? 'bg-gray-900' : ''}`}>
      <div className="mb-6">
        <h2 className={`text-3xl font-bold text-primary ${
          isDark ? 'text-orange-400' : ''
        }`}>
          Update Project Status
        </h2>
        <p className={`mt-1 ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Active Projects:{" "}
          <span className="font-semibold">{projects.length}</span>
        </p>
      </div>

      {projects.length === 0 ? (
        <div className={`text-center py-12 rounded-lg shadow ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <FaCheckCircle className={`text-6xl mx-auto mb-4 ${
            isDark ? 'text-green-400' : 'text-green-300'
          }`} />
          <p className={`text-lg ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>All projects are completed!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project._id}
              className={`rounded-lg shadow-lg p-6 border-l-4 border-primary ${
                isDark ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                {/* Project Info */}
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={project.serviceImage}
                    alt={project.serviceName}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>{project.serviceName}</h3>
                    <p className={`text-sm ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Customer: {project.userName}
                    </p>
                    <p className={`text-sm ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Location: {project.location || "N/A"}
                    </p>
                    <p className="text-sm font-semibold text-primary mt-1">
                      ৳{project.servicePrice?.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Status & Action */}
                <div className="flex items-center gap-4">
                  {/* Current Status */}
                  <div className="text-center">
                    <p className={`text-xs mb-1 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>Current Status</p>
                    <span
                      className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 ${
                        project.status === "in_progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {project.status === "in_progress" ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaClock />
                      )}
                      {project.status?.replace(/_/g, " ").toUpperCase()}
                    </span>
                  </div>

                  {/* Update Button */}
                  <div className="w-48">
                    <Button
                      label={project.status === "in_progress"
                        ? "Mark as Completed"
                        : "Start Project"}
                      onClick={() =>
                        handleStatusUpdate(project._id, project.status)
                      }
                      small
                    />
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-semibold ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Progress
                  </span>
                  <span className="text-xs font-semibold text-primary">
                    {project.status === "completed"
                      ? "100%"
                      : project.status === "in_progress"
                      ? "50%"
                      : "0%"}
                  </span>
                </div>
                <div className={`w-full rounded-full h-2 ${
                  isDark ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{
                      width:
                        project.status === "completed"
                          ? "100%"
                          : project.status === "in_progress"
                          ? "50%"
                          : "0%",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DecoratorUpdateStatus;
