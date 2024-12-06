import { useState, useMemo } from "react";
import CardBidMain from "@components/Common/home/CardBidMain";
import { IMAGES } from "@config/contracts/constants/images";

const GoldApesSection = () => {
  const goldApes = useMemo(
    () => [
      { id: 1, image: IMAGES.goldApes[0], alt: "Gold Ape 1" },
      { id: 2, image: IMAGES.goldApes[1], alt: "Gold Ape 2" },
      { id: 3, image: IMAGES.goldApes[2], alt: "Gold Ape 3" },
      { id: 4, image: IMAGES.goldApes[3], alt: "Gold Ape 4" },
      { id: 5, image: IMAGES.goldApes[4], alt: "Gold Ape 5" },
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(2);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? goldApes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === goldApes.length - 1 ? 0 : prev + 1));
  };

  const getDisplayImages = () => {
    const prev = currentIndex === 0 ? goldApes.length - 1 : currentIndex - 1;
    const next = currentIndex === goldApes.length - 1 ? 0 : currentIndex + 1;
    return { prev, current: currentIndex, next };
  };

  const { prev, current, next } = getDisplayImages();

  return (
    <div className="container mx-auto py-6 md:py-8 max-w-7xl">
      {/* Title Section */}
      <div className="text-center mb-6 max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-medium font-montserrat bg-gradient-to-b from-yellow-400 to-yellow-300 bg-clip-text text-transparent mb-2">
          24 Carats Apes
        </h2>
        <p className="text-base md:text-lg text-gray-200 leading-6 max-w-xl mx-auto">
          Their exquisite 24 Carat fur shines vibrantly like royal armour piercing the shadows.
        </p>
      </div>

      {/* Apes Display */}
      <div className="relative mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-3xl mx-auto relative z-10">
          <div className="flex justify-center">
            <div className="opacity-70 transform transition-opacity transition-transform duration-600">
              <CardBidMain
                image={goldApes[prev].image}
                alt={goldApes[prev].alt}
                height="200px"
                width="200px"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="opacity-100 transform transition-opacity transition-transform duration-600">
              <CardBidMain
                image={goldApes[current].image}
                alt={goldApes[current].alt}
                height="300px"
                width="300px"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="opacity-70 transform transition-opacity transition-transform duration-600">
              <CardBidMain
                image={goldApes[next].image}
                alt={goldApes[next].alt}
                height="200px"
                width="200px"
              />
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button onClick={handlePrevious} className="relative w-10 h-10">
            <span className="absolute inset-0 rounded-full border border-transparent bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></span>
            <img
              src="/images/special-button-core.svg"
              alt="Previous"
              className="w-10 h-10 relative z-10"
            />
          </button>

          <button onClick={handleNext} className="relative w-10 h-10 transform rotate-180">
            <span className="absolute inset-0 rounded-full border border-transparent bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></span>
            <img
              src="/images/special-button-core.svg"
              alt="Next"
              className="w-10 h-10 relative z-10"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoldApesSection;
