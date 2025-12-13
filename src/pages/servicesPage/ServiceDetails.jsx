import React from "react";
import MyContainer from "../../components/container/MyContainer";

const ServiceDetails = () => {
  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-indigo-100 py-12 px-4">
        <MyContainer>
          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden  lg:p-12">
            <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12">
              {/* Left Side - Image */}
              <div className="flex flex-col gap-6 flex-1">
                <div>
                  <div className="w-full overflow-hidden rounded-xl">
                    <img
                      className="object-cover hover:scale-110 
                transition w-full h-[600px]"
                      src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=90"
                      alt="Service"
                    />
                  </div>
                </div>
              </div>

              {/* Right Side - Service Details */}
              <div className="md:gap-10 flex-1">
                {/* Category Badge */}
                <span className="inline-block px-5 py-2 bg-linear-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                  Wedding
                </span>

                {/* Service Title */}
                <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2 leading-tight">
                  Luxury Royal Wedding Setup
                </h1>

                <p className="text-lg text-gray-500 mb-6">
                  Category: Wedding Decoration
                </p>

                {/* Description */}
                <div className="text-lg font-light text-neutral-500">
                  Transform your special day into a magical experience with our
                  premium decoration service. We use high-quality materials,
                  creative designs, and professional execution to make your
                  event unforgettable.
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-8 text-gray-600 my-6">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⭐</span>
                    <span className="text-xl font-bold">4.9</span>
                    <span className="text-sm">(342 reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">👥</span>
                    <span className="text-lg font-medium">128+ Bookings</span>
                  </div>
                </div>

                {/* Designer Info */}
                <div className="text-xl font-semibold flex flex-row items-center gap-2 my-6">
                  <div>Designer: Sarah Wilson</div>
                  <img
                    className="rounded-full"
                    height="30"
                    width="30"
                    alt="Designer"
                    src="https://ui-avatars.com/api/?name=Sarah+Wilson&background=8B5CF6&color=fff"
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
                <div className="flex justify-between items-center my-6">
                  <p className="font-bold text-3xl text-gray-500">
                    Price: <span className="text-purple-600">৳800,000</span>
                  </p>
                  <div>
                    <button className="px-8 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                      Book Now
                    </button>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-4 my-6">
                  <div className="bg-linear-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200">
                    <p className="text-sm text-gray-600 mb-1">Unit</p>
                    <p className="font-semibold text-gray-900">per event</p>
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
        </MyContainer>
      </div>
    </>
  );
};

export default ServiceDetails;
