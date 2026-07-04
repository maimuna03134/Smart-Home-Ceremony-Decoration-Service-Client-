import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const ServiceCardSkeleton = () => {
  const { isDark } = useTheme();

  return (
    <div className={`col-span-1 shadow-xl rounded-xl max-w-md mx-auto p-3 animate-pulse ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="flex flex-col gap-2 w-full">
        {/* Image Skeleton */}
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <div className={`h-full w-full ${
            isDark ? 'bg-gray-700' : 'bg-gray-300'
          }`}></div>
          
          {/* Category Badge Skeleton */}
          <div className="absolute top-3 right-3">
            <div className={`w-16 h-6 rounded-full ${
              isDark ? 'bg-gray-600' : 'bg-gray-400'
            }`}></div>
          </div>
        </div>

        <div className="p-3 pt-3">
          {/* Service Name Skeleton */}
          <div className={`h-6 w-3/4 rounded mb-2 ${
            isDark ? 'bg-gray-700' : 'bg-gray-300'
          }`}></div>

          {/* Description Skeleton */}
          <div className={`h-4 w-full rounded mb-1 ${
            isDark ? 'bg-gray-700' : 'bg-gray-300'
          }`}></div>
          <div className={`h-4 w-2/3 rounded mb-3 ${
            isDark ? 'bg-gray-700' : 'bg-gray-300'
          }`}></div>

          <div className="flex items-center justify-between gap-6 mt-2">
            {/* Unit Skeleton */}
            <div className={`h-5 w-16 rounded ${
              isDark ? 'bg-gray-700' : 'bg-gray-300'
            }`}></div>
            
            {/* Price Skeleton */}
            <div className={`h-5 w-20 rounded ${
              isDark ? 'bg-gray-700' : 'bg-gray-300'
            }`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCardSkeleton;