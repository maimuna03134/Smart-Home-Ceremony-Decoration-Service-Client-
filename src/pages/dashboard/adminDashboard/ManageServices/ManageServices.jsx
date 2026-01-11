import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTheme } from "../../../../contexts/ThemeContext";
import Button from "../../../shared/button/Button";

import Swal from "sweetalert2";
import { imageUpload } from "../../../../utils"; 
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageServices = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isDark } = useTheme();
  const axiosSecure = useAxiosSecure();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    unit: "",
    category: "",
    description: "",
    image: "",
  });

  const {
    data: services = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-services"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services");
      return res.data;
    },
  });

  // Update service mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      await axiosSecure.patch(`/services/${id}`, data);
    },
    onSuccess: () => {
      refetch();
      setIsModalOpen(false);
      setEditingService(null);
      resetForm();
      Swal.fire({
        title: "Success!",
        text: "Service updated successfully",
        icon: "success",
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to update service",
        icon: "error",
      });
    },
  });

  // Delete service mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/services/${id}`
      );
    },
    onSuccess: () => {
      refetch();
      Swal.fire({
        title: "Deleted!",
        text: "Service deleted successfully",
        icon: "success",
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to delete service",
        icon: "error",
      });
    },
  });

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const openEditModal = (service) => {
    setFormData({
      name: service.name,
      price: service.price,
      unit: service.unit || "",
      category: service.category,
      description: service.description,
      image: service.image,
    });
    setEditingService(service);
    setImagePreview(service.image); 
    setImageFile(null);
    setIsModalOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      unit: "",
      category: "",
      description: "",
      image: "",
    });
    setImageFile(null);
    setImagePreview(null);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image; 
     
      if (imageFile) {
        Swal.fire({
          title: "Uploading...",
          text: "Please wait while we upload your image",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        imageUrl = await imageUpload(imageFile);
        Swal.close();
      }

      const serviceData = {
        ...formData,
        price: parseFloat(formData.price),
        image: imageUrl,
        createdByEmail: user.email,
      };

      if (editingService) {
        // Update existing service
        updateMutation.mutate({ id: editingService._id, data: serviceData });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to upload image. Please try again.",
        icon: "error",
      });
    }
  };

  // Handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#af5f44",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className={`text-3xl font-bold text-primary`}>
            Manage Services
          </h2>
          <p className={`mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Total services:{" "}
            <span className="font-semibold">{services.length}</span>
          </p>
        </div>
        <div className="w-auto">
          <Button
            label="Add New Service"
            onClick={() => navigate("/dashboard/add-service")}
            icon={FaPlus}
            small
          />
        </div>
      </div>

      {/* Services Table */}
      <div className={`overflow-x-auto rounded-lg shadow ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <table className={`table w-full manage-services-table ${
          isDark ? 'manage-services-table' : ''
        }`}>
          <thead>
            <tr className={`${isDark ? 'bg-gray-700' : 'bg-primary'} text-white`}>
              <th className="text-white">SL No</th>
              <th className="text-white">Service</th>
              <th className="text-white">Category</th>
              <th className="text-white">Price</th>
              <th className="text-white">Unit</th>
              <th className="text-white">Created By</th>
              <th className="text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr 
                key={service._id} 
                className={`
                  transition-colors duration-200 border-b
                  ${isDark ? 'border-gray-700' : 'border-gray-200'}
                `}
              >
                <th className={`${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                  {index + 1}
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={service.image} alt={service.name} />
                      </div>
                    </div>
                    <div>
                      <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {service.name}
                      </div>
                      <div className={`text-sm opacity-70 truncate max-w-xs ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {service.description?.slice(0, 20)}...
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`badge ${
                    isDark ? 'badge-outline text-gray-300' : 'badge-ghost'
                  }`}>
                    {service.category}
                  </span>
                </td>
                <td className="font-bold text-primary">
                  ৳ {service.price}
                </td>
                <td className={`${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                  {service.unit || "N/A"}
                </td>
                <td className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {service.createdByEmail || "Admin"}
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(service)}
                      className={`btn btn-square btn-sm ${
                        isDark 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600' 
                          : 'hover:btn-info'
                      }`}
                      title="Edit"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className={`btn btn-square btn-sm ${
                        isDark 
                          ? 'bg-red-600 hover:bg-red-700 text-white border-red-600' 
                          : 'hover:btn-error'
                      }`}
                      title="Delete"
                    >
                      <FaTrashCan />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className={`modal-box max-w-2xl ${
            isDark ? 'bg-gray-800 text-white' : 'bg-white'
          }`}>
            <h3 className="font-bold text-lg mb-4 text-primary">
              Edit Service
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Service Name */}
              <div className="form-control">
                <label className="label">
                  <span className={`label-text ${isDark ? 'text-gray-300' : ''}`}>
                    Service Name *
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Royal Wedding Decoration"
                  className={`input input-bordered ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : ''
                  }`}
                  required
                />
              </div>

              {/* Category */}
              <div className="form-control">
                <label className="label">
                  <span className={`label-text ${isDark ? 'text-gray-300' : ''}`}>
                    Category *
                  </span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`select select-bordered ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : ''
                  }`}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Corporate">Corporate</option>
                </select>
              </div>

              {/* Price and Unit */}
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${isDark ? 'text-gray-300' : ''}`}>
                      Price (BDT) *
                    </span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g., 50000"
                    className={`input input-bordered ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : ''
                    }`}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${isDark ? 'text-gray-300' : ''}`}>
                      Unit
                    </span>
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className={`select select-bordered ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : ''
                    }`}
                  >
                    <option value="">Select unit</option>
                    <option value="per event">per event</option>
                    <option value="per sq-ft">per sq-ft</option>
                    <option value="per floor">per floor</option>
                    <option value="per hour">per hour</option>
                    <option value="per day">per day</option>
                  </select>
                </div>
              </div>

              {/* Image Upload */}
              <div className="form-control">
                <label className="label">
                  <span className={`label-text ${isDark ? 'text-gray-300' : ''}`}>
                    Service Image *
                  </span>
                </label>

                {/* Image Preview */}
                {imagePreview && (
                  <div className="mb-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className={`w-full h-48 object-cover rounded-lg border-2 ${
                        isDark ? 'border-gray-600' : 'border-gray-300'
                      }`}
                    />
                  </div>
                )}

                {/* File Upload Button */}
                <div className={`file_upload px-5 py-3 relative border-4 border-dotted rounded-lg ${
                  isDark ? 'border-gray-600' : 'border-gray-300'
                }`}>
                  <div className="flex flex-col w-max mx-auto text-center">
                    <label className="cursor-pointer">
                      <input
                        className="hidden"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      <div className="text-white border border-gray-300 rounded font-semibold cursor-pointer p-2 px-4 hover:opacity-90 bg-primary">
                        {imageFile ? "Change Image" : "Upload New Image"}
                      </div>
                    </label>
                    {imageFile && (
                      <p className={`text-sm mt-2 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Selected: {imageFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label">
                  <span className={`label-text ${isDark ? 'text-gray-300' : ''}`}>
                    Description *
                  </span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the service..."
                  className={`textarea textarea-bordered h-24 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : ''
                  }`}
                  required
                />
              </div>

              {/* Actions */}
              <div className="modal-action gap-3">
                <Button
                  label="Cancel"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingService(null);
                    resetForm();
                  }}
                  outline
                  small
                />
                <Button
                  label={updateMutation.isPending ? "Updating..." : "Update Service"}
                  loading={updateMutation.isPending}
                  disabled={updateMutation.isPending}
                  small
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServices;
