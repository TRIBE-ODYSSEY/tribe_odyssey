import React from "react";

const CollectionSkeleton: React.FC = () => (
  <div className="w-full h-full">
    <div className="w-full h-58 bg-gray-900 animate-pulse"></div>
    <div className="pt-2">
      <div className="w-3/5 h-6 bg-gray-900 mt-2"></div>
      <div className="w-2/5 h-5 bg-gray-900 mt-1"></div>
      <div className="flex justify-between mt-2">
        <div className="w-3/10 h-5 bg-gray-900"></div>
        <div className="w-3/10 h-5 bg-gray-900"></div>
      </div>
    </div>
  </div>
);

export default CollectionSkeleton;
