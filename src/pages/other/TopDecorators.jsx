import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaStar, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router";
import Loader from "../shared/loader/Loader";
import MyContainer from "../../components/container/MyContainer";

const TopDecorators = () => {
  const { data: decorators = [], isLoading } = useQuery({
    queryKey: ["top-decorators"],
    queryFn: async () => {
      const result = await axios.get(
        `https://smart-home-and-ceremony-decoration.vercel.app/decorators/top?limit=6`
      );
      return result.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (decorators.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-linear-to-b from-white to-purple-50">
      <MyContainer className={"px-4 sm:px-6 lg:px-8"}>
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Top Decorators
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our highly-rated professional decorators ready to bring your
            vision to life
          </p>
        </div>

        {/* Decorators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {decorators.map((decorator) => (
            <div
              key={decorator._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl 
              transition-all duration-300 overflow-hidden group"
            >
              <div
                className="relative h-48 bg-linear-to-br from-primary to-orange-400 
              flex items-center justify-center"
              >
                {decorator.photo ? (
                  <img
                    src={decorator.photo}
                    alt={decorator.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-7xl text-white font-bold">
                    {decorator.name?.charAt(0).toUpperCase()}
                  </div>
                )}

                <div
                  className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 
                flex items-center gap-1 shadow-lg"
                >
                  <FaStar className="text-yellow-500" />
                  <span className="font-bold text-gray-800">
                    {decorator.rating || "5.0"}
                  </span>
                </div>

                <div
                  className="absolute top-4 left-4 bg-green-500 text-white 
                rounded-full px-3 py-1 flex items-center gap-1 shadow-lg text-sm"
                >
                  <FaCheckCircle />
                  <span className="font-semibold">Verified</span>
                </div>
              </div>

              {/* Decorator Info */}
              <div className="p-6">
                {/* Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {decorator.name}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <FaMapMarkerAlt className="text-red-500" />
                  <span className="text-sm">{decorator.district}</span>
                </div>

                {/* Specialties */}
                {decorator.specialties && decorator.specialties.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                      Specialties
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {decorator.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-700 
                          rounded-full text-xs font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center justify-between mb-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">
                      {decorator.completedProjects || 0}
                    </p>
                    <p className="text-xs text-gray-500">Projects</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {decorator.rating || "5.0"}
                    </p>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {decorator.reviews || 0}
                    </p>
                    <p className="text-xs text-gray-500">Reviews</p>
                  </div>
                </div>

                {decorator.bio && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {decorator.bio}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </MyContainer>
    </section>
  );
};

export default TopDecorators;
