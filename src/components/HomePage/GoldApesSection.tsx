import { IMAGES } from '@assets/index';
import Card from '@src/components/common/card/Card';
import { useMemo, useState } from 'react';

const GoldApesSection = () => {
  const goldApes = useMemo(
    () => [
      { id: 1, image: IMAGES.goldApes[0], alt: 'Gold Ape 1' },
      { id: 2, image: IMAGES.goldApes[1], alt: 'Gold Ape 2' },
      { id: 3, image: IMAGES.goldApes[2], alt: 'Gold Ape 3' },
      { id: 4, image: IMAGES.goldApes[3], alt: 'Gold Ape 4' },
      { id: 5, image: IMAGES.goldApes[4], alt: 'Gold Ape 5' },
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
    const indices = [];
    for (let i = -2; i <= 2; i++) {
      let index = currentIndex + i;
      if (index < 0) index = goldApes.length + index;
      if (index >= goldApes.length) index = index - goldApes.length;
      indices.push(index);
    }
    return indices;
  };

  const displayIndices = getDisplayImages();

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100/80 mb-6">
            24 Carats Apes
          </h2>
          <p className="text-lg md:text-xl text-gray-400/80 max-w-3xl mx-auto">
            They sit now perched upon decaying thrones, their exquisite 24 Carat fur shines vibrantly still like royal armour piercing the
            shadows of the world that once was. Unwavering in their belief they are Gods amongst apes. Their thirst to rule is relentless.
          </p>
        </div>

        {/* Apes Display */}
        <div className="relative">
          <div className="flex justify-center items-center gap-4 md:gap-6">
            {displayIndices.map((index, i) => (
              <div
                key={goldApes[index].id}
                className={`transition-all duration-300 ${
                  i === 2 
                    ? 'w-64 h-64 md:w-80 md:h-80 z-10 scale-110' 
                    : i === 1 || i === 3 
                    ? 'w-48 h-48 md:w-64 md:h-64 z-0 opacity-90' 
                    : 'w-40 h-40 md:w-56 md:h-56 z-0 opacity-80'
                }`}
              >
                <Card
                  image={{
                    'data-src': goldApes[index].image,
                    alt: goldApes[index].alt,
                  }}
                  className={`rounded-3xl shadow-2xl ${
                    i === 2 ? 'ring-2 ring-yellow-400/50' : ''
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
            <button 
              onClick={handlePrevious}
              className="bg-black/40 p-3 rounded-full hover:bg-black/60 transition-all duration-300 backdrop-blur-sm"
            >
              <img 
                src="/images/special-button-core.svg" 
                alt="Previous" 
                className="w-8 h-8 rotate-180"
              />
            </button>
            <button 
              onClick={handleNext}
              className="bg-black/40 p-3 rounded-full hover:bg-black/60 transition-all duration-300 backdrop-blur-sm"
            >
              <img 
                src="/images/special-button-core.svg" 
                alt="Next" 
                className="w-8 h-8"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoldApesSection;
