// pages/ManageServices.jsx

import React, { useState, useEffect, useMemo } from "react";
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdSearch,
  MdAttachMoney,
  MdAccessTime,
  MdCheckCircle,
  MdFilterList,
} from "react-icons/md";
import { useNavigate } from "react-router";
import MyContainer from "../../components/container/MyContainer";

const initialServices = [
  {
    id: 1,
    service_name: "Premium Wedding Decoration",
    service_category: "wedding",
    cost: 85000,
    unit: "per event",
    duration: "10-12 hours",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600",
    availability: true,
  },
  {
    id: 2,
    service_name: "Kids Birthday Bash",
    service_category: "birthday",
    cost: 18000,
    unit: "per event",
    duration: "4-6 hours",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600",
    availability: true,
  },
  {
    id: 3,
    service_name: "Corporate Annual Meet",
    service_category: "corporate",
    cost: 120000,
    unit: "per day",
    duration: "Full day",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600",
    availability: true,
  },
  {
    id: 4,
    service_name: "Home Interior Makeover",
    service_category: "home",
    cost: 35000,
    unit: "per project",
    duration: "2-3 days",
    image: "https://images.unsplash.com/photo-1618221195710-dd9247ed550?w=600",
    availability: false,
  },
  {
    id: 5,
    service_name: "Seminar Stage Setup",
    service_category: "seminar",
    cost: 45000,
    unit: "per event",
    duration: "6-8 hours",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600",
    availability: true,
  },
];

const categories = [
  "all",
  "wedding",
  "birthday",
  "corporate",
  "home",
  "seminar",
];

const ManageServices = () => {
  const navigate = useNavigate();

  // Load services from localStorage
  const [services] = useState(() => {
    const saved = localStorage.getItem("services");
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [showFilters, setShowFilters] = useState(false);

  // Save to localStorage when services change (in AddServices page)
  useEffect(() => {
    localStorage.setItem("services", JSON.stringify(services));
  }, [services]);

  // Filtered services using useMemo for performance
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      // Search by name
      const matchesSearch = service.service_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Filter by category
      const matchesCategory =
        selectedCategory === "all" ||
        service.service_category === selectedCategory;

      // Filter by price range
      const cost = service.cost;
      const minPrice = priceRange.min === "" ? 0 : Number(priceRange.min);
      const maxPrice =
        priceRange.max === "" ? Infinity : Number(priceRange.max);

      const matchesPrice = cost >= minPrice && cost <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [services, searchQuery, selectedCategory, priceRange]);

  const handleEdit = (service) => {
    navigate("/add-service", { state: { service } });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this service permanently?")) {
      const updatedServices = services.filter((s) => s.id !== id);
      localStorage.setItem("services", JSON.stringify(updatedServices));
      alert("Service deleted!");
      // Trigger re-render by updating parent or using context/global state if needed
      window.location.reload(); // Simple way for demo
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setPriceRange({ min: "", max: "" });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-purple-50 py-12 px-4">
      <MyContainer>
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Manage Services
          </h1>
          <p className="text-xl text-gray-600">
            View, search, filter, and manage all decoration services
          </p>
        </div>

        {/* Search + Filters + Add Button */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-10">
          <div className="flex flex-col lg:flex-row gap-6 items-end">
            {/* Search */}
            <div className="flex-1 relative">
              <MdSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-2xl" />
              <input
                type="text"
                placeholder="Search by service name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-purple-500 outline-none"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-3 px-6 py-4 bg-gray-100 hover:bg-gray-200 rounded-2xl transition"
            >
              <MdFilterList className="text-2xl" />
              Filters {showFilters ? "▲" : "▼"}
            </button>

            {/* Add Button */}
            <button
              onClick={() => navigate("/add-service")}
              className="flex items-center gap-3 px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl hover:from-purple-700 hover:to-pink-700 transition shadow-lg"
            >
              <MdAdd className="text-3xl" />
              Add New Service
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-8 pt-8 border-t-2 border-gray-200 grid md:grid-cols-3 gap-6 animate-fadeIn">
              {/* Category Filter */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 outline-none text-lg"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "all"
                        ? "All Categories"
                        : cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  <MdAttachMoney className="inline mr-1" />
                  Price Range (BDT)
                </label>
                <div className="flex gap-4">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, min: e.target.value })
                    }
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, max: e.target.value })
                    }
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 outline-none"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full py-4 bg-red-100 text-red-700 font-bold rounded-2xl hover:bg-red-200 transition"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 text-right">
          <p className="text-lg text-gray-600">
            Showing{" "}
            <span className="font-bold text-purple-600">
              {filteredServices.length}
            </span>{" "}
            of <span className="font-bold">{services.length}</span> services
          </p>
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow">
            <p className="text-3xl text-gray-400">
              No services match your filters
            </p>
            <button
              onClick={clearFilters}
              className="mt-6 px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.service_name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/600x400?text=No+Image")
                    }
                  />
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-1">
                    {service.service_name}
                  </h3>

                  <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
                    {service.service_category.charAt(0).toUpperCase() +
                      service.service_category.slice(1)}
                  </span>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <MdAttachMoney className="text-2xl text-green-600" />
                      <span className="text-xl font-bold">
                        ৳{service.cost.toLocaleString()}
                      </span>
                      <span className="text-gray-600 text-sm">
                        / {service.unit}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MdAccessTime className="text-2xl text-blue-600" />
                      <span className="text-gray-700">{service.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={`flex items-center gap-2 font-semibold ${
                        service.availability ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      <MdCheckCircle className="text-2xl" />
                      {service.availability ? "Available" : "Unavailable"}
                    </span>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(service)}
                        className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition"
                        title="Edit"
                      >
                        <MdEdit className="text-xl" />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition"
                        title="Delete"
                      >
                        <MdDelete className="text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </MyContainer>
    </div>
  );
};

export default ManageServices;
