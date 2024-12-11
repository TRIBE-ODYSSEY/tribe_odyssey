import { IMAGES } from '@assets/index';
import { ImageCategories } from '@assets/types';
import { useState } from 'react';

const TribeAllianceSection: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const allianceImages = IMAGES[ImageCategories.ALLIANCE_IMAGES];

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
    <div className="max-w-screen-lg mx-auto py-6 md:py-12 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left Side - Image */}
        <div className="relative">
          <img
            src={allianceImages[currentImage].image}
            alt={allianceImages[currentImage].name}
            className="w-full h-full object-cover"
          />
          {/* Navigation Buttons */}
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            <button
              onClick={handlePrevious}
              className="w-10 h-10 bg-black/50 backdrop-blur-lg hover:bg-black/70 transition-colors rounded-full flex items-center justify-center"
            >
              <img
                src={IMAGES[ImageCategories.ICONS].specialButtonCore}
                alt="Previous"
                className="w-6 h-6"
              />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 bg-black/50 backdrop-blur-lg hover:bg-black/70 transition-colors rounded-full flex items-center justify-center"
            >
              <img
                src={IMAGES[ImageCategories.ICONS].specialButtonCore}
                alt="Next"
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img
              src={IMAGES[ImageCategories.ICONS].starIcon}
              alt="Alliance Icon"
              className="w-10 h-10"
            />
            <h2 className="text-2xl md:text-3xl font-medium font-montserrat bg-gradient-to-b from-white to-white/70 text-transparent bg-clip-text text-center">
              TRIBE ALLIANCE
            </h2>
          </div>

          <div>
            <button>Learn more</button>
          </div>

          {/* Celebrity Info */}
          <div>
            <h3>{allianceImages[currentImage].name}</h3>
            <p>{allianceImages[currentImage].title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TribeAllianceSection;
