import { useState } from "react";
import CardBidMain from "@components/Common/home/CardBidMain";
import { IMAGES } from "@config/contracts/constants/images";
import HexagonalGrid from "@components/Common/home/HexagonalGrid";

const TribeAllianceSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const allianceImages = [
    {
      image: IMAGES.alliance.verronHaynes,
      name: "Verron Haynes",
      title: "NFL Legend",
    },
    { image: IMAGES.alliance.celebrity2, name: "Celebrity 2", title: "Role 2" },
    { image: IMAGES.alliance.celebrity3, name: "Celebrity 3", title: "Role 3" },
  ];

  const handlePrevious = () => {
    setCurrentImage((prev) =>
      prev === 0 ? allianceImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImage((prev) =>
      prev === allianceImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="container mx-auto py-12 relative">
      <HexagonalGrid />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left Side - Image */}
        <div>
          <div className="opacity-0 translate-x-[-50px] animate-fade-in-left">
            <div className="relative">
              <CardBidMain
                image={allianceImages[currentImage].image}
                alt="Tribe Alliance"
                width="100%"
                height="500px"
              />

              {/* Navigation Buttons */}
              <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                <button
                  onClick={handlePrevious}
                  className="w-10 h-10 bg-black bg-opacity-50 backdrop-blur rounded-full hover:bg-opacity-70"
                >
                  <img
                    src="/images/special-button-core.svg"
                    alt="Previous"
                    className="w-6 h-6"
                  />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 bg-black bg-opacity-50 backdrop-blur rounded-full hover:bg-opacity-70 transform rotate-180"
                >
                  <img
                    src="/images/special-button-core.svg"
                    alt="Next"
                    className="w-6 h-6"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div>
          <div className="opacity-0 translate-x-50px animate-fade-in-right">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <img
                  src="/images/StarIcon.svg"
                  alt="Alliance Icon"
                  className="w-10 h-10"
                />
                <h2 className="text-2xl md:text-4xl font-medium bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  TRIBE ALLIANCE
                </h2>
              </div>

              <p className="text-base md:text-lg text-gray-200 leading-6 pl-0 md:pl-5">
                An exclusive collection of unique and individualized 1/1 digital
                pieces created for specific and verified celebrities. Part of
                the project's celebrity network initiative.
              </p>

              <div className="pl-0 md:pl-5">
                <button className="border border-white/10 rounded-full bg-radial from-white/8 to-transparent text-white px-4 py-1.5 mb-4 hover:border-white/20 hover:bg-radial from-white/12 to-white/2">
                  Learn more
                </button>
              </div>

              {/* Celebrity Info */}
              <div className="bg-white/3 border border-white/10 rounded-lg p-3">
                <h3 className="text-xl md:text-2xl font-medium mb-2">
                  {allianceImages[currentImage].name}
                </h3>
                <p className="text-sm text-gray-300 mb-2">
                  {allianceImages[currentImage].title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TribeAllianceSection;
