import React from "react";

const UpcomingDropHero: React.FC = () => {
  return (
    <div
      className="flex flex-col items-center justify-center p-16 md:p-24 min-h-screen bg-gradient-to-b from-[#14121b] to-[#000000]"
    >
      <div
        className="relative flex flex-col items-center justify-center md:flex-row md:items-center md:justify-between p-6 md:p-12 bg-[rgba(255,255,255,0.02)] rounded-3xl border border-[rgba(255,255,255,0.1)] overflow-hidden"
      >
        <div className="md:w-6/12">
          <div
            className="max-w-md mx-auto animate-fadeInScale transition-opacity duration-600 delay-100"
          >
            <p
              className="text-[#ff0008] font-semibold text-xs uppercase mb-2"
            >
              UPCOMING DROP
            </p>
            <h1
              className="text-white font-bold text-5xl md:text-7xl mb-4 leading-tight"
            >
              The Molten: Council #1
            </h1>
            <p
              className="text-gray-200 text-base md:text-lg mb-6 max-w-lg"
            >
              The First Molten Council Enter the Wastelands, An alternative
              dimension where all Legends have been identified by their RELICS,
              and where King Molten now rule over the Wastelands with an iron
              fist. "It is in the dance of conflict and chaos that I find not
              fear, but a challenge." One King makes a different: A warrior who
              was once the greatest of all Legends. A King known as a Torch
              Bearer - Ape of None.
            </p>
            <div className="flex gap-3 mb-6">
              <div>
                <p className="text-gray-400 text-sm mb-1">Release Date</p>
                <p className="text-white text-lg">March 15, 2024</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Price</p>
                <p className="text-white text-lg">0.1 ETH</p>
              </div>
            </div>
            <button
              className="bg-[#ff0008] text-white py-2 px-4 rounded-full hover:bg-[#cc0006] transition-colors duration-300"
            >
              Get Notified
            </button>
          </div>
        </div>
        <div className="md:w-6/12">
          <div
            className="relative w-full max-w-md mx-auto animate-fadeInScale transition-opacity duration-600 delay-300"
          >
            <div
              className="relative w-full h-full aspect-square rounded-3xl border border-[rgba(255,255,255,0.1)] overflow-hidden"
            >
              <img
                src="/images/shaman1.jpeg"
                alt="The Molten: Council #1"
                className="w-full h-full object-contain transform scale-102"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingDropHero;