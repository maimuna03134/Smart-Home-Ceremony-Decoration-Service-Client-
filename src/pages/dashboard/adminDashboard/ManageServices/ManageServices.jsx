import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import useAuth from '../../../../hooks/useAuth';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageServices = () => {
  const navigate = useNavigate();
   const { user } = useAuth();
  

   // Modal states
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [editingService, setEditingService] = useState(null);

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
       const res = await axios.get(`${import.meta.env.VITE_API_URL}/services`);
       return res.data;
     },
   });

   // Update service mutation
   const updateMutation = useMutation({
     mutationFn: async ({ id, data }) => {
       await axios.put(
         `${import.meta.env.VITE_API_URL}/services/${id}`,
         data
       );
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
       await axios.delete(
         `${import.meta.env.VITE_API_URL}/services/${id}`
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

   // Open create modal
 

   // Open edit modal
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
   };

   // Handle form submit
   const handleSubmit = (e) => {
     e.preventDefault();

     const serviceData = {
       ...formData,
       price: parseFloat(formData.price),
       createdByEmail: user.email, 
     };

     if (editingService) {
       // Update existing service
       updateMutation.mutate({ id: editingService._id, data: serviceData });
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
            <h2 className="text-3xl font-bold" style={{ color: "#af5f44" }}>
              Manage Services
            </h2>
            <p className="text-gray-600 mt-1">
              Total services:{" "}
              <span className="font-semibold">
                120
                {/* {services.length} */}
              </span>
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard/add-service")}
            className="btn text-white"
            style={{ backgroundColor: "#af5f44" }}
          >
            <FaPlus className="mr-2" />
            Add New Service
          </button>
        </div>

        {/* Services Table */}

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table table-zebra">
            <thead>
              <tr style={{ backgroundColor: "#af5f44", color: "white" }}>
                <th>#</th>
                <th>Service</th>
                <th>Category</th>
                <th>Price</th>
                <th>Unit</th>
                <th>Created By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={service._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={service.image} alt={service.name} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{service.name}</div>
                        <div className="text-sm opacity-50 truncate max-w-xs">
                          {service.description?.slice(0, 50)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-ghost">
                      {service.category}
                    </span>
                  </td>
                  <td className="font-bold" style={{ color: "#af5f44" }}>
                    ৳ {service.price}
                  </td>
                  <td>{service.unit || "N/A"}</td>
                  <td className="text-sm">
                    {service.createdByEmail || "Admin"}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(service)}
                        className="btn btn-square btn-sm hover:btn-info"
                        title="Edit"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="btn btn-square btn-sm hover:btn-error"
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

        {/* Create/Edit Modal */}
        {isModalOpen && (
          <div className="modal modal-open">
            <div className="modal-box max-w-2xl">
              <h3
                className="font-bold text-lg mb-4"
                style={{ color: "#af5f44" }}
              >
                {editingService ? "Edit Service" : "Create New Service"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Service Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Service Name *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Royal Wedding Decoration"
                    className="input input-bordered"
                    required
                  />
                </div>

                {/* Category */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Category *</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="select select-bordered"
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
                      <span className="label-text">Price (BDT) *</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="e.g., 50000"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Unit</span>
                    </label>
                    <select
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      className="select select-bordered"
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

                {/* Image URL */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Image URL *</span>
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="input input-bordered"
                    required
                  />
                </div>

                {/* Description */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description *</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the service..."
                    className="textarea textarea-bordered h-24"
                    required
                  />
                </div>

                {/* Actions */}
                <div className="modal-action">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingService(null);
                      resetForm();
                    }}
                    className="btn"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn text-white"
                    style={{ backgroundColor: "#af5f44" }}
                    
                  >
                    {editingService ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
};

export default ManageServices;


