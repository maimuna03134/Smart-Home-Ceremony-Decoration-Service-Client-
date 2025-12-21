
import React, { useState } from "react";
import { FaPlusCircle, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BecomeDecorator = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    name: "",
    district: "",
    specialties: [],
  });

  const [customSpecialty, setCustomSpecialty] = useState("");

  const specialtyOptions = [
    "Wedding Decoration",
    "Birthday Party",
    "Corporate Events",
    "Anniversary",
    "Baby Shower",
    "Kids Events",
    "Theme Decoration",
    "Traditional Events",
    "Modern Decor",
    "Outdoor Events",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add specialty
  const addSpecialty = (specialty) => {
    if (!formData.specialties.includes(specialty)) {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, specialty],
      });
    }
  };

  // Remove specialty
  const removeSpecialty = (specialty) => {
    setFormData({
      ...formData,
      specialties: formData.specialties.filter((s) => s !== specialty),
    });
  };

  // Add custom specialty
  const addCustomSpecialty = () => {
    if (
      customSpecialty.trim() &&
      !formData.specialties.includes(customSpecialty.trim())
    ) {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, customSpecialty.trim()],
      });
      setCustomSpecialty("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.specialties.length === 0) {
      toast.error("Please select at least one specialty");
      return;
    }

    try {
      const res = await axiosSecure.post("/become-decorator", {
        name: formData.name,
        email: user?.email,
        district: formData.district.trim(),
        specialties: formData.specialties,
      });

      if (res.data.insertedId || res.data.message === "Already requested") {
        toast.success("Request sent successfully! Waiting for admin approval.");
        setFormData({
          name: user?.displayName || "",
          district: "",
          specialties: [],
        });
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Request failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaPlusCircle className="text-xl text-orange-500" /> Become a
          Decorator
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Your Name *
            </label>
            <input
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 
              focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* District Input */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Your District *
            </label>
            <input
              name="district"
              type="text"
              placeholder="Enter your district"
              value={formData.district}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 
              focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Specialties Section */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Your Specialties * (Select at least one)
            </label>

            {/* Selected Specialties */}
            {formData.specialties.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4 p-3 bg-orange-50 rounded-lg">
                {formData.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-4 py-2 
                    bg-orange-500 text-white rounded-full text-sm font-medium 
                    hover:bg-orange-600 transition cursor-pointer"
                    onClick={() => removeSpecialty(specialty)}
                  >
                    {specialty}
                    <FaTimes className="text-xs" />
                  </span>
                ))}
              </div>
            )}

            {/* Predefined Options */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Click to add specialties:
              </p>
              <div className="flex flex-wrap gap-2">
                {specialtyOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => addSpecialty(option)}
                    disabled={formData.specialties.includes(option)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      formData.specialties.includes(option)
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                    }`}
                  >
                    + {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Specialty Input */}
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Or add your own specialty:
              </p>
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Enter custom specialty"
                  value={customSpecialty}
                  onChange={(e) => setCustomSpecialty(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 
                  focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCustomSpecialty();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addCustomSpecialty}
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 
                  text-white font-semibold rounded-lg transition"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Info Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Once you submit this form, admin will
              review your request. After approval, you can start accepting
              decoration projects.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white 
            font-semibold py-3 rounded-xl transition-all transform 
            hover:scale-105 shadow-md"
          >
            Submit Decorator Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default BecomeDecorator;
