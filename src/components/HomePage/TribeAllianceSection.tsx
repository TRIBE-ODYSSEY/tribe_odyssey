import { IMAGES } from '@assets/index';
import { ImageCategories } from '@assets/types';
import useLazyLoading from '@src/lib/hooks/useLazyLoading';
import { useState } from 'react';
import Card from '../common/card/Card';

const TribeAllianceSection: React.FC = () => {
  useLazyLoading();
  const [currentImage, setCurrentImage] = useState(0);

  const allianceImages = [
    {
      image: '/images/Vyron.jpg',
      name: 'Verron Haynes',
      title: 'Former NFL Running Back',
      nft: '/images/fireape.avif'
    },
    {
      image: '/images/Braxton-Miller.jpg',
      name: 'Braxton Miller',
      title: 'Former NFL Running Back',
      nft: '/images/texas-ape.png'
    }
  ];

  const handlePrevious = () => setCurrentImage((prev) => 
    prev === 0 ? allianceImages.length - 1 : prev - 1
  );

  const handleNext = () => setCurrentImage((prev) => 
    prev === allianceImages.length - 1 ? 0 : prev + 1
  );

  const navButtonClasses = "bg-black/40 p-3 rounded-full hover:bg-black/60 transition-all duration-300 backdrop-blur-sm";

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-16">
          {/* Left Side - Main Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-square">
              <Card
                image={{
                  'data-src': allianceImages[currentImage].image,
                  alt: allianceImages[currentImage].name,
                }}
                className="rounded-3xl shadow-2xl w-full h-full object-cover"
              />
              
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
                <button onClick={handlePrevious} className={navButtonClasses}>
                  <img 
                    data-src="/images/special-button-core.svg" 
                    alt="Previous" 
                    className="w-8 h-8 rotate-180"
                  />
                </button>
                <button onClick={handleNext} className={navButtonClasses}>
                  <img 
                    data-src="/images/special-button-core.svg" 
                    alt="Next" 
                    className="w-8 h-8"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-3 mb-6">
              <img 
                data-src={IMAGES[ImageCategories.ICONS].starIcon}
                alt="" 
                className="w-6 h-6"
                role="presentation"
              />
              <h2 className="text-2xl font-bold text-gray-100/80">TRIBE ALLIANCE</h2>
            </div>

            <p className="text-lg text-gray-400/80 mb-6 max-w-2xl">
              An exclusive collection of unique and individualised 1/1 digital pieces created
              for specific and verified celebrities. Tribe Alliance is a separate but related
              collection to Tribe Odyssey and is part of the project's celebrity network
              initiative.
            </p>

            <a 
              href="https://opensea.io/collection/tribe-alliance"
              className="inline-block mb-12 px-6 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                         hover:from-blue-500/20 hover:to-purple-500/20 
                         border border-blue-500/30 hover:border-blue-400 
                         rounded-full text-blue-400 hover:text-blue-300 
                         transition-all duration-300 backdrop-blur-sm"
            >
              Learn more
            </a>

            <h3 className="text-4xl font-bold text-gray-100/80 mb-8">
              {allianceImages[currentImage].name}
            </h3>

            <div className="w-48">
              <Card
                image={{
                  'data-src': allianceImages[currentImage].nft,
                  alt: `${allianceImages[currentImage].name} NFT`,
                }}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TribeAllianceSection;