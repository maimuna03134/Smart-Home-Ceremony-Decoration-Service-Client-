import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../utils";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import Loader from "../../pages/shared/loader/Loader";
import ErrorPage from "../../pages/shared/errorPage/ErrorPage";
import { useNavigate } from "react-router";

const AddServicesForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    unit: "",
    category: "",
    description: "",
    image: "",
  });

  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      await axios.post(`${import.meta.env.VITE_API_URL}/services`, payload),
    onSuccess: (data) => {
      console.log(data);
     
      toast.success("Plant Added successfully");
      mutationReset();
      
      navigate("/services");
    },
    onError: (error) => {
      console.log(error);
    },
    onMutate: (payload) => {
      console.log("I will post this data--->", payload);
    },
    onSettled: (data, error) => {
      // console.log("I am from onSettled--->", data);
      if (error) console.log(error);
    },
    retry: 3,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  //   console.log(errors);

  const onSubmit = async (data) => {
    const { name, description, quantity, price, category, image } = data;
    const imageFile = image[0];

    try {
      const imageUrl = await imageUpload(imageFile);

      const serviceData = {
        name,
        category,
        description,
        price: Number(price),
        quantity: Number(quantity),
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
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isPending) return <Loader />;
  if (isError) return <ErrorPage />;

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-orange-300 focus:outline-orange-500 rounded-md bg-white"
                name="name"
                id="name"
                type="text"
                placeholder="Plant Name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            {/* Category */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Category *
              </label>
              <select
                class="w-full px-4 py-3 border border-orange-300 rounded-lg focus:outline-orange-500"
                {...register("category", { required: "Category is required" })}
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
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.category.message}
                </p>
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
                class="w-full px-4 py-3 border border-orange-300 rounded-lg focus:outline-orange-500 resize-none"
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
            {/* Price & Quantity */}
            <div className="flex justify-between gap-2">
              {/* Price */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  placeholder="Price"
                  class="w-full px-4 py-3 border  border-orange-300 rounded-lg focus:outline-orange-500"
                  {...register("price", { required: "Price is required" })}
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Quantity */}

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Unit *
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className=" w-full px-4 py-3 text-gray-800 border border-orange-300 focus:outline-orange-500 rounded-md bg-white"
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
            {/* Image */}
            <div className=" p-4  w-full  m-auto rounded-lg grow">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      accept="image/*"
                      hidden
                      {...register("image", {
                        required: "Image is required",
                      })}
                    />
                    {errors.image && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.image.message}
                      </p>
                    )}
                    <div className="bg-primary text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-primary">
                      Upload
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full cursor-pointer p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-primary "
            >
              Save & Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddServicesForm;
