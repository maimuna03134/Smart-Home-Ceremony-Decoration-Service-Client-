import axios from "axios";
import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const BecomeDecorator = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    district: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/become-decorator`, {
        name: formData.name,
        email: user?.email,
        district: formData.district,
        description: formData.description, // optional, future use
      });

      toast.success("Request sent! Please wait for admin approval.");
      setFormData({ name: "", district: "", description: "" });
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Request failed");
    }
  };

  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaPlusCircle className="text-xl text-orange-500" /> Become a
          Decorator
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            name="district"
            type="text"
            placeholder="Your District"
            value={formData.district}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />

          <textarea
            name="description"
            placeholder="Service Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 h-28"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-xl"
          >
            Be a Decorator
          </button>
        </form>
      </div>
    </div>
  );
};

export default BecomeDecorator;
