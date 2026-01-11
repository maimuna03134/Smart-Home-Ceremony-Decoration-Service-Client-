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
import useDemoProtection from "../../hooks/useDemoProtection";
import { useTheme } from "../../contexts/ThemeContext";

const ServiceDetails = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const { id } = useParams();
  const { isDemoAccount } = useDemoProtection();
  console.log(id);
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);

  const { data: service = {}, isLoading } = useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      const result = await axios(
        `https://smart-home-and-ceremony-decoration.vercel.app/services/${id}`
      );
      return result.data;
    },
  });

  const { data: userBooking, refetch: refetchUserBooking } = useQuery({
    queryKey: ["userBooking", user?.email, id],
    enabled: !!user?.email && !!id,
    queryFn: async () => {
      const result = await axios.get(
        `https://smart-home-and-ceremony-decoration.vercel.app/bookings/check`,
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
    if (isDemoAccount) {
      toast.error("Demo accounts cannot book services. Please register with your own account to book.", {
        duration: 5000,
        icon: "🔒",
      });
      return;
    }

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

  const { image, name, description, category, quantity, price, decorator } =
    service;

  const isBookingDisabled = userBooking?.hasBooked;

  return (
    <>
      <div className={`min-h-screen py-12 px-4 ${
        isDark ? 'bg-gray-900' : ''
      }`}>
        <MyContainer>
          {/* Main Card */}
          <div className={`rounded-3xl shadow-2xl overflow-hidden lg:p-12 px-6 md:px-4 py-6 md:py-4 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
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
                <span className="inline-block px-5 py-2  text-primary rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                  {category}
                </span>

                {/* Service Title */}
                <h1 className={`text-4xl lg:text-5xl font-extrabold mb-2 leading-tight ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {name}
                </h1>

                <p className={`text-lg mb-6 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Category: {category}
                </p>

                {/* Rating & Stats */}
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <span className={`text-lg font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      4.8
                    </span>
                    <span className={`text-sm ml-1 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      (289 reviews)
                    </span>
                  </div>
                  <div className={`flex items-center gap-2 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Users className="w-5 h-5" />
                    <span className="text-sm">145 bookings</span>
                  </div>
                </div>

                {/* Description */}
                <div className={`text-lg font-light ${
                  isDark ? 'text-gray-300' : 'text-neutral-500'
                }`}>
                  {description}
                </div>

                {/* Designer Info */}
                <div className={`text-xl font-semibold flex flex-row items-center gap-2 my-6 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
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
                  <p className={`gap-4 font-light ${
                    isDark ? 'text-gray-300' : 'text-neutral-500'
                  }`}>
                    Duration:{" "}
                    <span className={`font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      7-10 days
                    </span>
                  </p>
                  <p className={`gap-4 font-light mt-2 ${
                    isDark ? 'text-gray-300' : 'text-neutral-500'
                  }`}>
                    Status:{" "}
                    <span className="px-4 py-1 bg-green-500 text-white font-semibold rounded-full text-sm">
                      Available
                    </span>
                  </p>
                </div>

                {/* Price & Book Button */}
                <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center my-6">
                  <p className={`font-bold text-3xl ${
                    isDark ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Price: <span className="text-primary">৳ {price}</span>
                  </p>
                  <div>
                    {isDemoAccount && (
                      <div className={`border-l-4 border-yellow-400 p-4 rounded-lg mb-4 ${
                        isDark ? 'bg-yellow-900/20' : 'bg-yellow-50'
                      }`}>
                        <p className={`font-semibold ${
                          isDark ? 'text-yellow-300' : 'text-yellow-800'
                        }`}>
                          ⚠️ You are using a demo account. Booking is disabled.
                        </p>
                      </div>
                    )}

                    <button
                      onClick={handleBookNow}
                      disabled={isBookingDisabled}
                      className={`px-8 py-3 text-lg font-bold rounded-xl shadow-lg transition-all duration-300 ${isBookingDisabled
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "bg-linear-to-r from-primary to-orange-600 text-white hover:shadow-xl transform hover:-translate-y-1"
                        }`}
                    >
                      {isBookingDisabled ? "Already Booked" : "Book Now"}
                    </button>
                  </div>
                </div>

                {isBookingDisabled && (
                  <div className={`border-l-4 border-yellow-400 p-4 rounded-lg ${
                    isDark ? 'bg-yellow-900/20' : 'bg-yellow-50'
                  }`}>
                    <p className={`text-sm ${
                      isDark ? 'text-yellow-300' : 'text-yellow-800'
                    }`}>
                      You have already booked this service. To book again,
                      please delete your previous booking from
                      <span
                        onClick={() => navigate("/dashboard/my-bookings")}
                        className={`font-semibold underline cursor-pointer ml-1 ${
                          isDark ? 'hover:text-yellow-200' : 'hover:text-yellow-900'
                        }`}
                      >
                        My Bookings
                      </span>
                      .
                    </p>
                  </div>
                )}

                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-4 my-6">
                  <div className={`rounded-xl p-4 border ${
                    isDark 
                      ? 'border-purple-600 bg-gray-700' 
                      : 'border-purple-200 bg-white'
                  }`}>
                    <p className={`text-sm mb-1 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>Unit</p>
                    <p className={`font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {quantity} per event
                    </p>
                  </div>
                  <div className={`rounded-xl p-4 border ${
                    isDark 
                      ? 'border-pink-600 bg-gray-700' 
                      : 'border-pink-200 bg-white'
                  }`}>
                    <p className={`text-sm mb-1 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>Setup Time</p>
                    <p className={`font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>8-10 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="mt-12">
              <h3 className={`text-2xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                What's Included
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`flex items-center gap-3 rounded-xl p-4 border ${
                  isDark 
                    ? 'border-purple-600 bg-gray-700' 
                    : 'border-purple-200 bg-white'
                }`}>
                  <span className="text-2xl text-green-500">✅</span>
                  <span className={`font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-800'
                  }`}>
                    Premium Floral Arrangements
                  </span>
                </div>
                <div className={`flex items-center gap-3 rounded-xl p-4 border ${
                  isDark 
                    ? 'border-purple-600 bg-gray-700' 
                    : 'border-purple-200 bg-white'
                }`}>
                  <span className="text-2xl text-green-500">✅</span>
                  <span className={`font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-800'
                  }`}>
                    Custom Lighting & Chandelier
                  </span>
                </div>
                <div className={`flex items-center gap-3 rounded-xl p-4 border ${
                  isDark 
                    ? 'border-purple-600 bg-gray-700' 
                    : 'border-purple-200 bg-white'
                }`}>
                  <span className="text-2xl text-green-500">✅</span>
                  <span className={`font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-800'
                  }`}>
                    Themed Backdrop & Stage
                  </span>
                </div>
                <div className={`flex items-center gap-350 rounded-xl p-4 border ${
                  isDark 
                    ? 'border-purple-600 bg-gray-700' 
                    : 'border-purple-200 bg-white'
                }`}>
                  <span className="text-2xl text-green-500">✅</span>
                  <span className={`font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-800'
                  }`}>
                    Balloon Arch & Ceiling Decor
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className={`rounded-2xl p-8 shadow-xl text-center hover:shadow-2xl transition-shadow ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className={`text-2xl font-bold mb-3 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                100% Quality Guaranteed
              </h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                Premium materials & expert execution
              </p>
            </div>
            <div className={`rounded-2xl p-8 shadow-xl text-center hover:shadow-2xl transition-shadow ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="text-5xl mb-4">👨‍🎨</div>
              <h3 className={`text-2xl font-bold mb-3 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Professional Team</h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Experienced designers & craftsmen</p>
            </div>
            <div className={`rounded-2xl p-8 shadow-xl text-center hover:shadow-2xl transition-shadow ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="text-5xl mb-4">⏰</div>
              <h3 className={`text-2xl font-bold mb-3 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>On-Time Delivery</h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
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
