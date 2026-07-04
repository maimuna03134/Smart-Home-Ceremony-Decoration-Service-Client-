import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const FeaturedServiceSkeleton = () => {
  const { isDark } = useTheme();

  return (
    <div className={`rounded-xl shadow-lg overflow-hidden h-full animate-pulse ${
      isDark ? 'bg-gray-800/90' : 'bg-white/90'
    }`}>
      {/* Service Image Skeleton */}
      <div className="relative h-40 overflow-hidden">
        <div className={`w-full h-full ${
          isDark ? 'bg-gray-700' : 'bg-gray-300'
        }`}></div>

        {/* Category Badge Skeleton */}
        <div className="absolute top-2 right-2 z-20">
          <div className={`w-16 h-6 rounded-full ${
            isDark ? 'bg-gray-600' : 'bg-gray-400'
          }`}></div>
        </div>
      </div>

      {/* Service Info Skeleton */}
      <div className="p-4">
        {/* Title Skeleton */}
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

        <div className={`flex items-center justify-between pt-3 border-t ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          {/* Unit Skeleton */}
          <div>
            <div className={`h-4 w-12 rounded mb-1 ${
              isDark ? 'bg-gray-700' : 'bg-gray-300'
            }`}></div>
          </div>

          {/* Price Skeleton */}
          <div>
            <div className={`h-6 w-16 rounded ${
              isDark ? 'bg-gray-700' : 'bg-gray-300'
            }`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedServiceSkeleton;