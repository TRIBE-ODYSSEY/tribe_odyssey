import useLazyLoading from '@src/lib/hooks/useLazyLoading';
import React, { useState } from 'react';
import Card from '../common/card/Card';

interface Fighter {
  image: string;
  name: string;
  nft: string;
  record: string;
  weight: string;
}

const TribeFightersSection: React.FC = () => {
  useLazyLoading();
  const [currentFighter, setCurrentFighter] = useState(0);

  const fighters: Fighter[] = [
    {
      image: 'images/Loud.png',
      name: 'Colton Loud',
      nft: 'images/fighter-nft-1.png',
      record: 'Professional Record: 8-0',
      weight: 'Weight Class: Lightweight',
    },
  ];

  const handlePrevious = () => {
    setCurrentFighter((prev) => (prev === 0 ? fighters.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentFighter((prev) => (prev === fighters.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="container mx-auto px-4 flex flex-row items-start gap-8">
      <div className="w-1/2">
        <Card
          image={{
            'data-src': fighters[currentFighter].image,
            alt: 'Fighter',
          }}
        />
        <div className="mt-4 flex gap-2">
          <button onClick={handlePrevious}>
            <img data-src="images/special-button-core.svg" alt="Previous" />
          </button>
          <button onClick={handleNext}>
            <img data-src="images/special-button-core.svg" alt="Next" />
          </button>
        </div>
      </div>
      <div className="w-1/2">
        <div className="flex items-center gap-2 mb-2">
          <img data-src="/images/StarIcon.svg" alt="Fighter Icon" />
          <h2>THE TRIBE FIGHTERS</h2>
        </div>
        <p className="mb-4">
          An exclusive initiative representing the best up-and-coming
          international MMA fighters on both professional and amateur circuits.
        </p>
        <div>
          <h3>{fighters[currentFighter].name}</h3>
          <div className="mt-2 flex items-start gap-4">
            <Card
              image={{
                'data-src': fighters[currentFighter].nft,
                alt: 'Fighter NFT',
              }}
            />
            <div>
              <p>{fighters[currentFighter].record}</p>
              <p>{fighters[currentFighter].weight}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TribeFightersSection;
