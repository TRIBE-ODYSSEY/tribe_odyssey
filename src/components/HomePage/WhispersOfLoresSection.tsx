import { IMAGES } from '@assets/index';
import { ImageCategories } from '@assets/types';
import React from 'react';

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
    <div className="max-w-7xl mx-auto py-6 relative">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-semibold bg-gt-to-b from-white to-white/70 bg-clip-text text-transparent mb-3">
          Whispers of Lo
        </h2>
        <p className="text-base text-white/80 max-w-md mx-auto">
          Discover the rich tapestry of stories that shape our digital realm
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {lores.map((lore) => (
          <div
            key={lore.id}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg overflow-hidden transform transition-transform duration-300 cursor-pointer hover:-translate-y-2"
          >
            <div className="relative h-60 overflow-hidden">
              <img
                src={lore.image}
                alt={lore.title}
                className="w-full h-full object-cover transition-transform duration-300 ease-out hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-white/20"></div>
            </div>
            <div className="p-3">
              <h5 className="text-xl font-semibold mb-2 bg-gradient-to-r from-red-600 to-pink-500 bg-clip-text text-transparent">
                {lore.title}
              </h5>
              <p className="text-sm text-white/80 leading-6">{lore.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhispersOfLoresSection;
