import { IMAGES } from '@assets/index';
import { ImageCategories } from '@assets/types';
import useLazyLoading from '@src/lib/hooks/useLazyLoading';
import { useState } from 'react';

const TribeAllianceSection: React.FC = () => {
  useLazyLoading();
  const [currentImage, setCurrentImage] = useState(0);

  const allianceImages = [
    {
      image: 'images/Vyron.jpg',
      name: 'Verron Haynes',
      title: 'Former NFL Running Back',
    },
    {
      image: 'images/Celebrity2.png',
      name: 'Celebrity 2',
      title: 'Title 2',
    },
    {
      image: 'images/Celebrity3.png',
      name: 'Celebrity 3',
      title: 'Title 3',
    },
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
    <section className=" container mx-auto  items-center flex flex-row portrait:flex-col s-start gap-8">
      {/* Left Side - Content */}
      <div className="flex flex-col gap-4 w-1/2">
        <div className="flex items-start gap-2">
          <img
            data-src={IMAGES[ImageCategories.ICONS].starIcon}
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

        <div>
          <h3>{allianceImages[currentImage].name}</h3>
          <p>{allianceImages[currentImage].title}</p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="relative w-1/2">
        <img
          data-src={allianceImages[currentImage].image}
          alt={allianceImages[currentImage].name}
          className=" h-full object-cover"
        />
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          <button
            onClick={handlePrevious}
            className="w-10 h-10 bg-black/50 backdrop-blur-lg hover:bg-black/70 transition-colors rounded-full flex items-center justify-center"
          >
            <img
              data-src={IMAGES[ImageCategories.ICONS].specialButtonCore}
              alt="Previous"
              className="w-6 h-6"
            />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 bg-black/50 backdrop-blur-lg hover:bg-black/70 transition-colors rounded-full flex items-center justify-center"
          >
            <img
              data-src={IMAGES[ImageCategories.ICONS].specialButtonCore2}
              alt="Next"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TribeAllianceSection;
