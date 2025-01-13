import useLazyLoading from '@src/lib/hooks/useLazyLoading';
import React, { useState, useCallback } from 'react';
import Card from '../common/card/Card';
import { motion, AnimatePresence } from 'framer-motion';

interface Fighter {
  image: string;
  name: string;
  nft: string;
  record: string;
  weight: string;
}

const fighters: Fighter[] = [
  {
    image: '/images/helen-peralta.png',
    name: 'Helen Peralta',
    nft: '/images/helen-peralta-nft.png',
    record: 'Professional Record: 6-2',
    weight: 'Weight Class: Strawweight',
  },
  {
    image: '/images/Loud.png',
    name: 'Colton Loud',
    nft: '/images/10169.png',
    record: 'Professional Record: 8-0',
    weight: 'Weight Class: Lightweight',
  }
];

const TribeFightersSection: React.FC = () => {
  useLazyLoading();
  const [currentFighter, setCurrentFighter] = useState(0);

  const handlePrevious = useCallback(() => {
    setCurrentFighter((prev) => (prev === 0 ? fighters.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentFighter((prev) => (prev === fighters.length - 1 ? 0 : prev + 1));
  }, []);

  const navButtonClasses = "bg-black/40 p-3 rounded-full hover:bg-black/60 transition-all duration-300 backdrop-blur-sm";

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-16">
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-3 mb-6">
              <img 
                data-src="/images/StarIcon.svg" 
                alt="" 
                className="w-6 h-6"
                role="presentation"
              />
              <h2 className="text-2xl font-bold text-gray-100/80">THE TRIBE FIGHTERS</h2>
            </div>

            <motion.div
              key={currentFighter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <p className="text-lg text-gray-400/80 mb-12 max-w-2xl">
                An exclusive initiative representing the best up-and-coming
                international MMA fighters on both professional and amateur circuits.
              </p>

              <h3 className="text-4xl font-bold text-gray-100/80 mb-4">
                {fighters[currentFighter].name}
              </h3>

              <div className="space-y-2 mb-8">
                <p className="text-gray-300/80">{fighters[currentFighter].record}</p>
                <p className="text-gray-300/80">{fighters[currentFighter].weight}</p>
              </div>

              <div className="w-48">
                <Card
                  image={{
                    'data-src': fighters[currentFighter].nft,
                    alt: `${fighters[currentFighter].name} NFT`,
                  }}
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="relative aspect-square">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFighter}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Card
                    image={{
                      'data-src': fighters[currentFighter].image,
                      alt: fighters[currentFighter].name,
                    }}
                    className="rounded-3xl shadow-2xl w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
                <button 
                  onClick={handlePrevious} 
                  className={navButtonClasses}
                  aria-label="Previous fighter"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-8 h-8 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button 
                  onClick={handleNext} 
                  className={navButtonClasses}
                  aria-label="Next fighter"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-8 h-8 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TribeFightersSection;