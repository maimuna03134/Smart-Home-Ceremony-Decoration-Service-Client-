import React, { useState } from "react";
import MyContainer from "../../components/container/MyContainer";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../shared/loader/Loader";
import toast from "react-hot-toast";
import BookingModal from "../../components/modal/BookingModal";
import useAuth from "../../hooks/useAuth";
import { Star, Users } from "lucide-react";

const ServiceDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);

  const { data: service = {}, isLoading } = useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/services/${id}`
      );
      return result.data;
    },
  });

  const { data: userBooking, refetch: refetchUserBooking } = useQuery({
    queryKey: ["userBooking", user?.email, id],
    enabled: !!user?.email && !!id,
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/bookings/check`,
        {
          params: {
            userEmail: user.email,
            serviceId: id,
          },
        }
      );
      return result.data;
    },
  });

  const handleBookNow = () => {
    if (!user) {
      toast.error("Please login to book a service");
      navigate("/auth/login", { state: { from: `/services/${id}` } });
      return;
    }

    if (userBooking?.hasBooked) {
      toast.error("You have already booked this service!");
      return;
    }

    setShowBookingModal(true);
  };

  if (isLoading) return <Loader />;

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Service Not Found
          </h2>
          <button
            onClick={() => navigate("/services")}
            className="btn btn-primary mt-4"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  const { image, name, description, category, quantity, price, decorator } = service;

  const isBookingDisabled = userBooking?.hasBooked;


  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-indigo-100 py-12 px-4">
        <MyContainer>
          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden  lg:p-12 px-6 md:px-4 py-6 md:py-4">
            <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-6 md:gap-12">
              {/* Left Side - Image */}
              <div className="flex flex-col gap-6 flex-1">
                <div>
                  <div className="w-full overflow-hidden rounded-xl">
                    <img
                      className="object-cover hover:scale-110 
                transition w-full md:h-[600px]"
                      src={image}
                      alt="Service"
                    />
                  </div>
                </div>
              </div>

              {/* Right Side - Service Details */}
              <div className="md:gap-10 flex-1 ">
                {/* Category Badge */}
                <span className="inline-block px-5 py-2 bg-linear-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                  {category}
                </span>

                {/* Service Title */}
                <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2 leading-tight">
                  {name}
                </h1>

                <p className="text-lg text-gray-500 mb-6">
                  Category: {category}
                </p>

                {/* Rating & Stats */}
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <span className="text-lg font-semibold text-gray-900">
                      4.8
                    </span>
                    <span className="text-gray-500 text-sm ml-1">
                      (289 reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-5 h-5" />
                    <span className="text-sm">145 bookings</span>
                  </div>
                </div>

                {/* Description */}
                <div className="text-lg font-light text-neutral-500">
                  {description}
                </div>

                {/* Designer Info */}
                <div className="text-xl font-semibold flex flex-row items-center gap-2 my-6">
                  <div>Designer: {decorator?.name}</div>
                  <img
                    className="rounded-full"
                    height="30"
                    width="30"
                    alt="Avatar"
                    referrerPolicy="no-referrer"
                    src={decorator?.image}
                  />
                </div>

                {/* Duration & Availability */}
                <div className="my-6">
                  <p className="gap-4 font-light text-neutral-500">
                    Duration:{" "}
                    <span className="font-semibold text-gray-900">
                      7-10 days
                    </span>
                  </p>
                  <p className="gap-4 font-light text-neutral-500 mt-2">
                    Status:{" "}
                    <span className="px-4 py-1 bg-green-500 text-white font-semibold rounded-full text-sm">
                      Available
                    </span>
                  </p>
                </div>

                {/* Price & Book Button */}
                <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center my-6">
                  <p className="font-bold text-3xl text-gray-500">
                    Price: <span className="text-purple-600">৳ {price}</span>
                  </p>
                  <div>
                    <button
                      onClick={handleBookNow}
                      disabled={isBookingDisabled}
                      className={`px-8 py-3 text-lg font-bold rounded-xl shadow-lg transition-all duration-300 ${
                        isBookingDisabled
                          ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                          : "bg-linear-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl transform hover:-translate-y-1"
                      }`}
                    >
                      {isBookingDisabled ? "Already Booked" : "Book Now"}
                    </button>
                  </div>
                </div>

                {isBookingDisabled && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                      You have already booked this service. To book again,
                      please delete your previous booking from 
                      <span
                        onClick={() => navigate("/dashboard/my-bookings")}
                        className="font-semibold underline cursor-pointer hover:text-yellow-900 ml-1"
                      >
                        My Bookings
                      </span>
                      .
                    </p>
                  </div>
                )}

                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-4 my-6">
                  <div className="bg-linear-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200">
                    <p className="text-sm text-gray-600 mb-1">Unit</p>
                    <p className="font-semibold text-gray-900">
                      {quantity} per event
                    </p>
                  </div>
                  <div className="bg-linear-to-br from-pink-50 to-rose-50 rounded-xl p-4 border border-pink-200">
                    <p className="text-sm text-gray-600 mb-1">Setup Time</p>
                    <p className="font-semibold text-gray-900">8-10 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                What's Included
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                  <span className="text-2xl text-green-500">✅</span>
                  <span className="text-gray-800 font-medium">
                    Premium Floral Arrangements
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                  <span className="text-2xl text-green-500">✅</span>
                  <span className="text-gray-800 font-medium">
                    Custom Lighting & Chandelier
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                  <span className="text-2xl text-green-500">✅</span>
                  <span className="text-gray-800 font-medium">
                    Themed Backdrop & Stage
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                  <span className="text-2xl text-green-500">✅</span>
                  <span className="text-gray-800 font-medium">
                    Balloon Arch & Ceiling Decor
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white rounded-2xl p-8 shadow-xl text-center hover:shadow-2xl transition-shadow">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-2xl font-bold mb-3">
                100% Quality Guaranteed
              </h3>
              <p className="text-gray-600">
                Premium materials & expert execution
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl text-center hover:shadow-2xl transition-shadow">
              <div className="text-5xl mb-4">👨‍🎨</div>
              <h3 className="text-2xl font-bold mb-3">Professional Team</h3>
              <p className="text-gray-600">Experienced designers & craftsmen</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl text-center hover:shadow-2xl transition-shadow">
              <div className="text-5xl mb-4">⏰</div>
              <h3 className="text-2xl font-bold mb-3">On-Time Delivery</h3>
              <p className="text-gray-600">
                Completed within promised timeline
              </p>
            </div>
          </div>

          {/* Booking Modal */}
          {showBookingModal && (
            <BookingModal
              service={service}
              onClose={() => {
                setShowBookingModal(false);
                refetchUserBooking();
              }}
            />
          )}
        </MyContainer>
      </div>
    </>
  );
};

export default ServiceDetails;
