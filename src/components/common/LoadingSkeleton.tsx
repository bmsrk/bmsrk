import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-[#f3f2f1]">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-[#edebe9] h-16 flex items-center px-4 gap-4">
        <div className="w-8 h-8 bg-gray-200 rounded-sm animate-pulse"></div>
        <div className="w-40 h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex-1"></div>
        <div className="w-32 h-8 bg-gray-200 rounded-sm animate-pulse"></div>
      </div>

      {/* Navigation Skeleton */}
      <div className="bg-white border-b border-[#edebe9] h-12 flex items-center px-4 gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white border border-[#edebe9] p-4 rounded-sm">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-gray-100 rounded w-full animate-pulse"></div>
                  <div className="h-3 bg-gray-100 rounded w-5/6 animate-pulse"></div>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-gray-100 rounded w-full animate-pulse"></div>
                  <div className="h-3 bg-gray-100 rounded w-5/6 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white border border-[#edebe9] p-4 rounded-sm">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                  <div className="h-3 bg-gray-100 rounded w-full animate-pulse"></div>
                  <div className="h-3 bg-gray-100 rounded w-full animate-pulse"></div>
                  <div className="h-3 bg-gray-100 rounded w-4/5 animate-pulse"></div>
                </div>
                <div className="mt-6 space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded-sm animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
