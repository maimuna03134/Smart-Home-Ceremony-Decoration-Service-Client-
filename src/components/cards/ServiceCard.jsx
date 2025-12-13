import React from 'react';
import { Link } from 'react-router';


const ServiceCard = () => {
    return (
      <Link
        to={`/service/`}
        className="col-span-1 cursor-pointer group shadow-xl  rounded-xl max-w-md mx-auto"
      >
        <div className="flex flex-col gap-2 w-full">
          {/* Image */}
          <div
            className="
              aspect-square
              w-full 
              relative 
              overflow-hidden 
              rounded-xl
            "
          >
            <img
              src="https://www.bing.com/th/id/OIP.-R0RrcfyXBRrtMmIxgSXywHaE8?w=253&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
              alt="4BHK Modern Interior"
              className="
                object-cover 
                h-full 
                w-full 
                group-hover:scale-110 
                transition
              "
            />
            <div
              className="
              absolute
              top-3
              right-3
            "
            ></div>
          </div>
          <div className="p-6  pt-5">
            {/* service name */}
            <h2 className="text-2xl font-bold text-gray-900 leading-tight">
              4BHK Modern Style Interior Design in Noida With Foyer
            </h2>

            {/* category */}
            <p className="text-lg text-primary font-medium mt-2">
              Supernova Spira
            </p>

            {/* Details Grid */}
            <div className="grid grid-cols-3 gap-6 mt-6 text-center text-gray-700">
              {/* description */}
              <div>
                <p className="text-sm text-gray-500">Scope</p>
                <p className="text-base font-medium mt-1">
                  Living Room, Dining Room, Foyer, ...
                </p>
              </div>
              {/* unit */}
              <div>
                <p className="text-sm text-gray-500">BHK</p>
                <p className="text-base font-semibold mt-1">4-BHK</p>
              </div>
              {/* pricing */}
              <div>
                <p className="text-sm text-gray-500">Pricing</p>
                <p className="text-base font-semibold mt-1">30+</p>
              </div>
            </div>

            {/* CTA Button */}
            {/* <div className="mt-8 ">
              <button className="w-full shared-style">Get This Design</button>
            </div> */}
          </div>
        </div>
      </Link>
    );
};

export default ServiceCard;