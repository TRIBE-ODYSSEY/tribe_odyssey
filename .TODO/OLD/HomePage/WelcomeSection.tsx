import React from "react";
import { useInView } from "react-intersection-observer";
import HexagonalGrid from "@components/Common/home/HexagonalGrid";
import { IMAGES } from "@config/contracts/constants/images";

const WelcomeSection:React.FC= () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div className="relative py-4 md:py-8 max-w-screen-lg mx-auto">
      <HexagonalGrid />
      <div
        ref={ref}
        className={`flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 transition-opacity duration-700 ${
          inView ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Left Content */}
        <div className="flex flex-col items-center gap-6 py-6 w-full md:w-[470px]">
          <div
            className={`flex items-start justify-center gap-2.5 p-2.5 w-full transform transition-transform duration-700 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <h2 className="font-montserrat font-medium text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 text-2xl md:text-3xl leading-tight md:leading-[3.6rem] text-center">
              Welcome to
              <br />
              Tribe Odyssey
            </h2>
          </div>

          <p
            className={`font-montserrat text-[#ebebeb] text-base md:text-lg leading-8 text-center transform transition-transform duration-700 delay-200 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Welcome to the Tribe project. Home of the highly popular 0xApes and
            Tribe Odyssey NFT collection
          </p>

          <p
            className={`font-montserrat text-[#ebebebcc] text-base leading-6 text-center transform transition-transform duration-700 delay-400 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            The 0xApes and Tribe phenom has taken the digital collectibles space
            by storm inspiring a movement driven by the power of community, a
            community that has over 30,000 members and growing across all its
            social media platforms.
          </p>
        </div>

        {/* Right Content */}
        <div
          className={`flex items-center gap-4 flex-shrink-0 transform transition-transform duration-700 delay-300 ${
            inView ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          <img
            src={IMAGES.moltenThrone}
            alt="Molten Throne"
            className="w-[458px] h-[458px] object-contain rounded-xl transition-transform duration-300 ease-in-out hover:scale-105"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              const target = e.currentTarget;
              target.onerror = null;
              target.src = IMAGES.placeholder;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
