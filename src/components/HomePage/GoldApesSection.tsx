import { IMAGES, ImageCategories } from '@assets/index';
import Card from '@src/components/common/card/Card';
import { useMemo, useState, useEffect } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { FaXTwitter } from 'react-icons/fa6';
import type { GoldApe } from '@assets/types';

const GoldApesSection = () => {
  const [displayCount, setDisplayCount] = useState(getInitialDisplayCount());
  const goldApes = useMemo<GoldApe[]>(
    () => IMAGES[ImageCategories.GOLD_APES],
    []
  );

  function getInitialDisplayCount() {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024 ? 5 : 6;
    }
    return 5; // Default for SSR
  }

  useEffect(() => {
    const handleResize = () => {
      setDisplayCount(window.innerWidth >= 1024 ? 5 : 6);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const displayIndices = useMemo(() => {
    const indices = [];
    for (let i = 0; i < displayCount; i++) {
      let index = (currentIndex + i) % goldApes.length;
      if (index < 0) index = goldApes.length + index;
      indices.push(index);
    }
    return indices;
  }, [currentIndex, goldApes.length, displayCount]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? goldApes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === goldApes.length - 1 ? 0 : prev + 1));
  };

  const getImageStyles = (position: number) => ({
    container: `transition-all duration-300 cursor-pointer ${
      position === Math.floor(displayIndices.length / 2)
        ? 'w-full sm:w-64 h-64 sm:h-64 md:w-80 md:h-80 z-10 sm:scale-110' 
        : position === Math.floor(displayIndices.length / 2) - 1 || position === Math.floor(displayIndices.length / 2) + 1
          ? 'hidden sm:block w-48 h-48 md:w-64 md:h-64 z-0 opacity-90 hover:opacity-100' 
          : 'hidden sm:block w-40 h-40 md:w-56 md:h-56 z-0 opacity-80 hover:opacity-100'
    }`,
    card: position === Math.floor(displayIndices.length / 2)
      ? 'rounded-3xl shadow-2xl ring-2 ring-[var(--color-button-primary)]/50' 
      : 'rounded-3xl shadow-2xl'
  });

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4 sm:mb-6">
            TRIBE19 CLUB
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[var(--color-text-muted)] max-w-3xl mx-auto">
            Unlock the prestige of joining the exclusive club for holders of all 19 existing species. 
            Enjoy unparalleled fame and lavish rewards!
          </p>
        </div>

        {/* Desktop Carousel */}
        <div className="relative hidden sm:block">
          <div className="flex justify-center items-center gap-4 md:gap-6">
            {displayIndices.map((index, i) => {
              const styles = getImageStyles(i);
              const ape = goldApes[index];
              return (
                <div
                  key={ape?.id}
                  className={styles.container}
                  onClick={() => setCurrentIndex(index)}
                >
                  <div className="flex flex-col items-center">
                    <Card
                      image={{
                        'data-src': ape?.image || '',
                        alt: ape?.alt || ''
                      }}
                      className={styles.card}
                    />
                    <div className={`mt-4 text-center transition-all duration-300 ${
                      i === Math.floor(displayIndices.length / 2) ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                        {ape?.name || ''}
                      </h3>
                      <a
                        href={ape?.twitter || ''}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[var(--color-text-muted)] 
                                 hover:text-[var(--color-text-primary)] transition-colors duration-200"
                      >
                        <FaXTwitter className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 
                     bg-[var(--color-overlay-dark)]/40 hover:bg-[var(--color-overlay-dark)]/60 
                     rounded-full text-[var(--color-text-primary)]/80 hover:text-[var(--color-text-primary)] 
                     transition-all duration-300"
            aria-label="Previous"
          >
            <IoChevronBackOutline className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 
                     bg-[var(--color-overlay-dark)]/40 hover:bg-[var(--color-overlay-dark)]/60 
                     rounded-full text-[var(--color-text-primary)]/80 hover:text-[var(--color-text-primary)] 
                     transition-all duration-300"
            aria-label="Next"
          >
            <IoChevronForwardOutline className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile View */}
        <div className="flex sm:hidden flex-col items-center">
          <Card
            image={{
              'data-src': goldApes[currentIndex]?.image || '',
              alt: goldApes[currentIndex]?.alt || '',
            }}
            className="w-full rounded-3xl shadow-2xl ring-2 ring-[var(--color-button-primary)]/50 mb-4"
          />
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              {goldApes[currentIndex]?.name || ''}
            </h3>
            <a
              href={goldApes[currentIndex]?.twitter || ''}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--color-text-muted)] 
                       hover:text-[var(--color-text-primary)] transition-colors duration-200"
            >
              <FaXTwitter className="w-5 h-5" />
            </a>
          </div>
          <div className="flex justify-center gap-3 w-full overflow-x-auto pb-4">
            {goldApes.map((ape, index) => (
              <div
                key={ape?.id}
                className={`w-14 h-14 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 
                          ${index === currentIndex 
                            ? 'ring-2 ring-[var(--color-button-primary)]/50' 
                            : 'opacity-70 hover:opacity-100'}`}
                onClick={() => setCurrentIndex(index)}
              >
                <img 
                  src={ape?.image || ''} 
                  alt={ape?.alt || ''}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoldApesSection;
