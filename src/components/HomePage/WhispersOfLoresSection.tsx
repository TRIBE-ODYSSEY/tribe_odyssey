import { IMAGES } from '@assets/index';
import { ImageCategories } from '@assets/types';
import React from 'react';
import Card from '../common/card/Card';

const WhispersOfLoresSection: React.FC = () => {
  const lores = [
    {
      id: 1,
      title: 'The Great Exodus',
      content: "In the wake of Earth's devastation...",
      image: IMAGES[ImageCategories.LORE].exodus,
    },
    {
      id: 2,
      title: 'Rise of the Golden Dynasty',
      content: 'From the ashes of the old world emerged the 24 Carat Apes...',
      image: IMAGES[ImageCategories.LORE].golden,
    },
    {
      id: 3,
      title: 'The Digital Revolution',
      content: 'As our civilization evolved...',
      image: IMAGES[ImageCategories.LORE].digital,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-6 sm:py-12">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-semibold text-[var(--color-text-primary)] mb-3">
          Whispers of Lore
        </h2>
        <p className="text-lg sm:text-xl text-[var(--color-text-muted)] w-full sm:w-2/3 mx-auto">
          Ancient tales that shape our future
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
        {lores.map((lore) => (
          <div
            key={lore.id}
            className="bg-[var(--color-overlay-dark)]/5 hover:bg-[var(--color-overlay-dark)]/10 
                     backdrop-blur-sm border border-[var(--color-text-primary)]/10 
                     hover:border-[var(--color-text-primary)]/20 rounded-lg overflow-hidden 
                     transform transition-all duration-300 cursor-pointer hover:-translate-y-2"
          >
            <div className="relative h-48 sm:h-60 overflow-hidden">
              <Card
                image={{ 'data-src': lore.image, alt: lore.title }}
                className="w-full h-full object-cover transition-transform duration-300 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-overlay-dark)] to-transparent"></div>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r 
                            from-transparent via-[var(--color-text-primary)]/20 to-transparent"></div>
            </div>
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 
                           bg-gradient-to-r from-[var(--color-button-primary)] to-[var(--color-button-hover)] 
                           bg-clip-text text-transparent">
                {lore.title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {lore.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhispersOfLoresSection;
