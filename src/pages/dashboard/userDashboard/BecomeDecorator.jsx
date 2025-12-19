


import axios from "axios";
import React from "react";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
const BecomeDecorator = () => {
    const {user}=useAuth()

    const handleRequest = async () => {
        try {
        await axios.post(
      `${import.meta.env.VITE_API_URL}/become-decorator/${user?.email}`
            );
            toast.success("Request sent, please wait for admin approval");
        } catch (err) {
            console.log(err)
            toast.error(err?.response?.data?.message)
    }
}
  const [service, setService] = useState({
    name: "",
    description: "",
    
  });

  const handleChange = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Decorator Data:", service);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaPlusCircle className="text-xl text-orange-500" /> Went to Decorator
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
                      name="name"
                      type="text"
            placeholder="Your Name"
           
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />

          

          <textarea
            name="description"
            placeholder="Service Description"
            value={service.description}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 h-28"
          />

          

                  <button
                      onClick={handleRequest}
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