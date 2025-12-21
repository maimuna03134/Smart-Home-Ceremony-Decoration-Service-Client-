import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../shared/loader/Loader";
import Card from "./Card";
import MyContainer from "../../components/container/MyContainer";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch categories for filter
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/services/categories/all`
      );
      console.log('categories from apis:',result.data )
      return result.data;
    },
  });

  // Fetch services with filters
  const {
    data: services = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "services",
      debouncedSearch,
      selectedCategory,
      minPrice,
      maxPrice,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (debouncedSearch) params.append("search", debouncedSearch);
      if (selectedCategory !== "all")
        params.append("category", selectedCategory);
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);

      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/services?${params.toString()}`
      );
      return result.data;
    },
  });

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setMinPrice("");
    setMaxPrice("");
  };

  // Apply price filter
  const handleApplyPriceFilter = () => {
    refetch();
  };

  if (isLoading) return <Loader />;

  return (
    <MyContainer className={"px-4 sm:px-6 lg:px-8 py-8"}>
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Our Decoration Services
        </h1>
        <p className="text-gray-600">
          Find the perfect decoration service for your special occasion
        </p>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Services
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by service name..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                                focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 
                                    text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Type
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                            focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Button */}
          <div className="flex items-end">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleResetFilters();
              }}
              className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 
                            text-gray-700 rounded-lg transition font-medium"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Budget Range
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min Price"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                                focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max Price"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                                focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <button
                onClick={handleApplyPriceFilter}
                className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 
                                text-white rounded-lg transition font-medium"
              >
                Apply Price Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(debouncedSearch ||
        selectedCategory !== "all" ||
        minPrice ||
        maxPrice) && (
        <div className="mb-6 flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-gray-600">
            Active Filters:
          </span>

          {debouncedSearch && (
            <span
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full 
                        text-sm flex items-center gap-2"
            >
              Search: "{debouncedSearch}"
              <button
                onClick={() => setSearchTerm("")}
                className="hover:text-blue-900"
              >
                ✕
              </button>
            </span>
          )}

          {selectedCategory !== "all" && (
            <span
              className="px-3 py-1 bg-green-100 text-green-800 rounded-full 
                        text-sm flex items-center gap-2"
            >
              Category: {selectedCategory}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleResetFilters();
                }}
                className="hover:text-green-900"
              >
                ✕
              </button>
            </span>
          )}

          {(minPrice || maxPrice) && (
            <span
              className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full 
                        text-sm flex items-center gap-2"
            >
              Price: ৳ {minPrice || "0"} - ৳ {maxPrice || "∞"}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setMinPrice("");
                  setMaxPrice("");
                }}
                className="hover:text-purple-900"
              >
                ✕
              </button>
            </span>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Found{" "}
          <span className="font-semibold text-gray-800">{services.length}</span>{" "}
          services
        </p>
      </div>

      {/* Services Grid */}
      {services.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            No Services Found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your filters or search terms
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleResetFilters();
            }}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white 
                        rounded-lg transition"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service._id} service={service} />
          ))}
        </div>
      )}
    </MyContainer>
  );
};

export default Services;
