import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../utils";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import Loader from "../../pages/shared/loader/Loader";
import ErrorPage from "../../pages/shared/errorPage/ErrorPage";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useDemoProtection from "../../hooks/useDemoProtection";
import { FaLock } from "react-icons/fa";

const AddServicesForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const { checkActionPermission, isDemoAccount } = useDemoProtection();

  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) => await axiosSecure.post("/services", payload),
    onSuccess: (data) => {
      toast.success("✅ Service added successfully!");
      mutationReset();
      navigate("/services");
    },
    onError: (error) => {
      console.log(error);
      toast.error("❌ Failed to add service. Please try again.");
    },
    retry: 3,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setValue("image", e.target.files);
    }
  };

  const onSubmit = async (data) => {
    // Demo protection check
    if (!checkActionPermission("add_service")) return;

    const { name, description, price, category, unit, image } = data;
    const imageFile = image[0];

    if (!imageFile) {
      toast.error("❌ Please select an image");
      return;
    }

    try {
      const loadingToast = toast.loading("Uploading image...");
      const imageUrl = await imageUpload(imageFile);
      toast.dismiss(loadingToast);

      const serviceData = {
        name,
        category,
        description,
        price: Number(price),
        unit,
        image: imageUrl,
        createdAt: new Date().toISOString(),
        decorator: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
      };

      await mutateAsync(serviceData);
      reset();
      setImagePreview(null);
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to upload image. Please try again.");
    }
  };

  if (isPending) return <Loader />;
  if (isError) return <ErrorPage />;

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl my-20 p-6 md:p-0">
      {/* Demo Account Warning */}
      {isDemoAccount && (
        <div className="alert alert-warning mb-6 max-w-4xl shadow-lg">
          <FaLock className="text-xl" />
          <div>
            <h3 className="font-bold">Demo Admin Account - Read Only</h3>
            <div className="text-sm">You can view everything but cannot add services.</div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Name *
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-orange-300 focus:outline-orange-500 rounded-md bg-white"
                name="name"
                id="name"
                type="text"
                placeholder="Service Name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Category *
              </label>
              <select
                className="w-full px-4 py-3 border border-orange-300 rounded-lg focus:outline-orange-500"
                {...register("category", { required: "Category is required" })}
              >
                <option value="">Select category</option>
                <option value="Wedding">Wedding</option>
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Seminar">Seminar</option>
                <option value="Birthday">Birthday</option>
                <option value="Meeting">Meeting</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Description *
              </label>
              <textarea
                rows="5"
                placeholder="Describe the service..."
                className="w-full px-4 py-3 border border-orange-300 rounded-lg focus:outline-orange-500 resize-none"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-6 flex flex-col">
            {/* Price & Unit */}
            <div className="flex justify-between gap-2">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  placeholder="Price"
                  className="w-full px-4 py-3 border border-orange-300 rounded-lg focus:outline-orange-500"
                  {...register("price", { required: "Price is required" })}
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
                )}
              </div>

              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">
                  Unit *
                </label>
                <select
                  className="w-full px-4 py-3 text-gray-800 border border-orange-300 focus:outline-orange-500 rounded-md bg-white"
                  {...register("unit", { required: "Unit is required" })}
                >
                  <option value="">Select unit</option>
                  <option value="per event">per event</option>
                  <option value="per sq-ft">per sq-ft</option>
                  <option value="per floor">per floor</option>
                  <option value="per hour">per hour</option>
                  <option value="per day">per day</option>
                </select>
                {errors.unit && (
                  <p className="text-red-500 text-xs mt-1">{errors.unit.message}</p>
                )}
              </div>
            </div>

            {/* Image Upload with Preview */}
            <div className="p-4 w-full m-auto rounded-lg grow">
              <label className="block text-gray-700 font-medium mb-2">
                Service Image *
              </label>

              {imagePreview && (
                <div className="mb-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border-2 border-orange-300"
                  />
                </div>
              )}

              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label className="cursor-pointer">
                    <input
                      className="hidden"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <div className="bg-primary text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:opacity-90">
                      {imagePreview ? "Change Image" : "Upload Image"}
                    </div>
                  </label>
                </div>
              </div>

              {errors.image && (
                <p className="text-xs text-red-500 mt-2">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isDemoAccount}
                className={`w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md ${isDemoAccount
                    ? "bg-gray-400 cursor-not-allowed opacity-60"
                    : "bg-primary hover:opacity-90 cursor-pointer"
                  }`}
              >
                {isDemoAccount ? "🔒 Demo Mode - Cannot Add" : "Save & Continue"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddServicesForm;