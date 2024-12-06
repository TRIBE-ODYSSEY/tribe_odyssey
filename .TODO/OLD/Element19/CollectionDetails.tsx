import React from "react";

const CollectionDetails: React.FC = () => {
  return (
    <div className="w-full p-4 bg-white bg-opacity-20 rounded-lg border border-white border-opacity-10 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="transition-opacity duration-600 opacity-100 transform translate-y-0">
          <h2 className="text-2xl text-white font-semibold mb-2">
            About Element19
          </h2>
          <p className="text-white text-opacity-70 leading-6">
            Element19 is a curated collection of digital art and collectibles,
            featuring unique pieces from established and emerging artists in
            the Web3 space.
          </p>
        </div>
        <div className="transition-opacity duration-600 delay-200 opacity-100 transform translate-y-0">
          <div className="flex gap-4 flex-wrap">
            {[
              { label: "Artists", value: "50+" },
              { label: "Total Items", value: "1,000+" },
              { label: "Collectors", value: "500+" },
              { label: "Trading Volume", value: "100+ ETH" },
            ].map((stat, index) => (
              <div key={index} className="min-w-[120px]">
                <h5 className="text-red-600 font-semibold mb-1">
                  {stat.value}
                </h5>
                <p className="text-white text-opacity-60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionDetails;
