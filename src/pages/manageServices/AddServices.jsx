// components/services/AddServices.jsx
import React from "react";
import { useForm } from "react-hook-form";
import {
  MdArrowBack,
  MdImage,
  MdAttachMoney,
  MdAccessTime,
} from "react-icons/md";
import { useLocation, useNavigate } from "react-router";
import MyContainer from "../../components/container/MyContainer";

const AddServices = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingService = location.state?.service || null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: editingService
      ? {
          service_name: editingService.service_name,
          service_category: editingService.service_category,
          cost: editingService.cost,
          unit: editingService.unit,
          duration: editingService.duration,
          image: editingService.image,
          availability: editingService.availability,
        }
      : {},
  });

  const onSubmit = (data) => {
    const serviceData = {
      ...data,
      cost: Number(data.cost),
      id: editingService?.id || Date.now(),
    };

    let existingServices = JSON.parse(localStorage.getItem("services") || "[]");

    if (editingService) {
      // Update existing
      existingServices = existingServices.map((s) =>
        s.id === editingService.id ? serviceData : s
      );
      alert("Service updated successfully!");
    } else {
      // Add new
      existingServices.push(serviceData);
      alert("Service added successfully!");
    }

    localStorage.setItem("services", JSON.stringify(existingServices));
    navigate("/manage-services");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-purple-50 py-12 px-4">
      <MyContainer>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-8 text-lg font-medium"
        >
          <MdArrowBack className="text-2xl" />
          Back to Manage Services
        </button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-center text-gray-800 mb-4">
            {editingService ? "Edit Service" : "Add New Service"}
          </h1>
          <p className="text-center text-xl text-gray-600 mb-12">
            Fill in the details below to {editingService ? "update" : "create"}{" "}
            your decoration service
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-3xl shadow-2xl p-10 space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Service Name */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Service Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Luxury Wedding Package"
                  {...register("service_name", {
                    required: "Service name is required",
                  })}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 outline-none text-lg"
                />
                {errors.service_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.service_name.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  {...register("service_category", {
                    required: "Please select a category",
                  })}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 outline-none text-lg"
                >
                  <option value="">Choose category...</option>
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday</option>
                  <option value="corporate">Corporate</option>
                  <option value="home">Home Decoration</option>
                  <option value="seminar">Seminar</option>
                  <option value="other">Other</option>
                </select>
                {errors.service_category && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.service_category.message}
                  </p>
                )}
              </div>

              {/* Cost */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  <MdAttachMoney className="inline mr-2" />
                  Cost (BDT)
                </label>
                <input
                  type="number"
                  placeholder="45000"
                  {...register("cost", {
                    required: "Cost is required",
                    min: 1,
                  })}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 outline-none text-lg"
                />
                {errors.cost && (
                  <p className="text-red-500 text-sm mt-1">
                    Valid cost is required
                  </p>
                )}
              </div>

              {/* Unit */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Unit
                </label>
                <input
                  type="text"
                  placeholder="per event / per day"
                  {...register("unit")}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 outline-none text-lg"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  <MdAccessTime className="inline mr-2" />
                  Duration
                </label>
                <input
                  type="text"
                  placeholder="8-10 hours"
                  {...register("duration")}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 outline-none text-lg"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  <MdImage className="inline mr-2" />
                  Image URL
                </label>
                <div className="relative">
                  <MdImage className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-2xl z-10" />
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    {...register("image")}
                    className="w-full pl-14 pr-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 outline-none text-lg"
                  />
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-4 py-6">
              <input
                type="checkbox"
                {...register("availability")}
                id="availability"
                className="w-6 h-6 text-purple-600 rounded focus:ring-purple-500"
              />
              <label
                htmlFor="availability"
                className="text-lg font-medium text-gray-700"
              >
                This service is currently available for booking
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-6 pt-8">
              <button
                type="button"
                onClick={() => navigate("/manage-services")}
                className="flex-1 py-5 border-2 border-gray-300 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-5 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-xl hover:from-purple-700 hover:to-pink-700 transition shadow-lg"
              >
                {editingService ? "Update Service" : "Add Service"}
              </button>
            </div>
          </form>
        </div>
      </MyContainer>
    </div>
  );
};

export default AddServices;
