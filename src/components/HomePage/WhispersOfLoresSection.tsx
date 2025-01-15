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
      <section className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-semibold bg-gt-to-b from-white to-white/70 bg-clip-text text-transparent mb-3">
          Whispers of Lore
        </h2>
        <h1 className="text-2xl sm:text-4xl text-white/80 w-full sm:w-2/3 mx-auto px-4">
          The Whispers of Lores
        </h1>
      </section>

      <section className="flex flex-col md:flex-row gap-6 md:gap-4 px-4">
        {lores.map((lore) => (
          <div
            key={lore.id}
            className="flex-1 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg overflow-hidden transform transition-transform duration-300 cursor-pointer hover:-translate-y-2"
          >
            <section className="relative h-48 sm:h-60 overflow-hidden">
              <Card
                image={{ 'data-src': lore.image, alt: lore.title }}
                data-src={lore.image} 
                className="w-full h-full object-cover transition-transform duration-300 ease-out hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-white/20"></div>
            </section>
            <div className="p-4 sm:p-6">
              <h5 className="text-lg sm:text-xl font-semibold mb-2 bg-gradient-to-r from-red-600 to-pink-500 bg-clip-text text-transparent">
                {lore.title}
              </h5>
              <p className="text-sm text-white/80 leading-6">{lore.content}</p>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};

export default WhispersOfLoresSection;
