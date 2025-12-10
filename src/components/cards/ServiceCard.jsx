import React from 'react';


const ServiceCard = () => {
    return (
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg overflow-hidden font-sans">
        {/* Image */}
        <div className="relative">
          <img
            src="https://www.bing.com/th/id/OIP.-R0RrcfyXBRrtMmIxgSXywHaE8?w=253&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
            alt="4BHK Modern Interior"
            className="w-full h-96 object-cover"
          />
          {/* Optional: Add a subtle overlay if needed */}
        </div>

        {/* Content */}
        <div className="p-6 pt-5">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 leading-tight">
            4BHK Modern Style Interior Design in Noida With Foyer
          </h2>

          {/* Project Name */}
          <p className="text-lg text-rose-600 font-medium mt-2">
            Supernova Spira
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-3 gap-6 mt-6 text-gray-700">
            <div>
              <p className="text-sm text-gray-500">Scope</p>
              <p className="text-base font-medium mt-1">
                Living Room, Dining Room, Foyer, ...
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">BHK</p>
              <p className="text-base font-semibold mt-1">4-BHK</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Pricing</p>
              <p className="text-base font-semibold mt-1">30+</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-8 ">
            <button className="w-full text-center flex justify-center shared-style">
              Get This Design
            </button>
          </div>
        </div>
      </div>
    );
};

export default ServiceCard;