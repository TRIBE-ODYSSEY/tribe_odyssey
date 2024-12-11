import { IMAGES } from '@assets/index';
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
    const prev = currentIndex === 0 ? goldApes.length - 1 : currentIndex - 1;
    const next = currentIndex === goldApes.length - 1 ? 0 : currentIndex + 1;
    return { prev, current: currentIndex, next };
  };

  const { prev, current, next } = getDisplayImages();

  return (
    <div>
      {/* Title Section */}
      <div>
        <h2>24 Carats Apes</h2>
        <p>
          Their exquisite 24 Carat fur shines vibrantly like royal armour
          piercing the shadows.
        </p>
      </div>

      {/* Apes Display */}
      <div>
        <div>
          <div>
            <img
              src={goldApes[prev].image}
              alt={goldApes[prev].alt}
              height="200px"
              width="200px"
            />
          </div>

          <div>
            <img
              src={goldApes[current].image}
              alt={goldApes[current].alt}
              height="300px"
              width="300px"
            />
          </div>

          <div>
            <img
              src={goldApes[next].image}
              alt={goldApes[next].alt}
              height="200px"
              width="200px"
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div>
          <button onClick={handlePrevious}>
            <img src="/images/special-button-core.svg" alt="Previous" />
          </button>

          <button onClick={handleNext}>
            <img src="/images/special-button-core.svg" alt="Next" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoldApesSection;
