import { useState } from "react";

import CardBidMain from "@components/Common/home/CardBidMain";
import HexagonalGrid from "../Common/home/HexagonalGrid";
import { IMAGES } from "@config/contracts/constants/images";

interface Fighter {
  image: string;
  name: string;
  nft: string;
  record: string;
  weight: string;
}

const TribeFightersSection = () => {
  const [currentFighter, setCurrentFighter] = useState(0);

  const fighters: Fighter[] = [
    {
      image: IMAGES.fighters.coltonLoud,
      name: "Colton Loud",
      nft: IMAGES.fighters.coltonLoudNFT,
      record: "Professional Record: 8-0",
      weight: "Weight Class: Lightweight",
    },
  ];

  const handlePrevious = () => {
    setCurrentFighter((prev) => (prev === 0 ? fighters.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentFighter((prev) => (prev === fighters.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-screen-lg mx-auto py-6 md:py-12 relative">
      <HexagonalGrid />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left Side - Content */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img src="/images/StarIcon.svg" alt="Fighter Icon" className="w-10 h-10" />
            <h2 className="text-2xl md:text-3xl font-medium font-montserrat bg-gradient-to-b from-white to-white/70 text-transparent bg-clip-text text-center">
              THE TRIBE FIGHTERS
            </h2>
          </div>

          <p className="text-base md:text-lg text-gray-200 leading-6 pl-0 md:pl-5">
            An exclusive initiative representing the best up-and-coming international MMA fighters on both professional and amateur circuits.
          </p>

          {/* Fighter Info Card */}
          <div className="bg-white/3 rounded-lg p-4 border border-white/10 mt-4">
            <h3 className="text-xl md:text-2xl font-medium font-montserrat mb-3">
              {fighters[currentFighter].name}
            </h3>

            <div className="flex gap-3 mb-3">
              <CardBidMain
                image={fighters[currentFighter].nft}
                alt="Fighter NFT"
                width="120px"
                height="120px"
              />
              <div className="flex flex-col gap-1">
                <p className="text-gray-200">{fighters[currentFighter].record}</p>
                <p className="text-gray-200">{fighters[currentFighter].weight}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="relative">
          <CardBidMain
            image={fighters[currentFighter].image}
            alt="Tribe Fighters"
            width="100%"
            height="500px"
          />

          {/* Navigation Buttons */}
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            <button
              onClick={handlePrevious}
              className="w-10 h-10 bg-black/50 backdrop-blur-lg hover:bg-black/70 transition-colors rounded-full flex items-center justify-center"
            >
              <img src="/images/special-button-core.svg" alt="Previous" className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 bg-black/50 backdrop-blur-lg hover:bg-black/70 transition-colors rounded-full flex items-center justify-center transform rotate-180"
            >
              <img src="/images/special-button-core.svg" alt="Next" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TribeFightersSection;
