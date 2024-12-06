import React from "react";

const CollectionStats: React.FC = () => {
  return (
    <div className="w-full mb-6 p-3 bg-[rgba(255,255,255,0.02)] rounded-[16px] border border-[rgba(255,255,255,0.1)]">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Volume", value: "1,250.5 ETH" },
          { label: "Floor Price", value: "1.5 ETH" },
          { label: "Items", value: "9,400" },
          { label: "Owners", value: "3,200" },
        ].map((stat, index) => (
          <div className="text-center" key={index}>
            <h4 className="text-white font-semibold text-[1.5rem] md:text-[2rem] mb-1">
              {stat.value}
            </h4>
            <p className="text-[rgba(255,255,255,0.6)] text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionStats;
