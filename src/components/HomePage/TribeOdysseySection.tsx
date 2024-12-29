import useLazyLoading from '@hooks/useLazyLoading';
import React from 'react';
import Card from '../common/card/Card';

const sideImages = [
  'images/tribunus.png',
  'images/ChipRed.png',
  'images/Zues.jpg',
];

const TribeOdysseySection: React.FC = () => {
  useLazyLoading();

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 xl:gap-16">
          <div className="w-full lg:w-[55%] relative">
            <div className="relative max-w-2xl mx-auto lg:mx-0">
              <Card
                image={{
                  'data-src': '/images/monkey.jpg',
                  alt: 'Tribe Odyssey Main NFT',
                }}
                className="rounded-3xl shadow-2xl w-full aspect-square object-cover"
              />
            </div>
            
            <div className="absolute top-0 -right-24 h-full flex flex-col justify-center gap-4">
              {sideImages.map((image, index) => (
                <div 
                  key={index}
                  className="w-20 sm:w-24 md:w-32 lg:w-36 xl:w-44"
                >
                  <Card
                    image={{
                      'data-src': image,
                      alt: `Side NFT ${index + 1}`,
                    }}
                    className="rounded-2xl shadow-lg w-full aspect-square object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[40%] flex flex-col justify-center lg:pl-12">
            <div className="relative rounded-3xl p-6 sm:p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF0008]/20 via-black/40 to-[#FF0008]/10" />
              <div className="absolute inset-0 bg-[#FF0008]/5 backdrop-blur-sm" />
              <div className="relative z-10">
                <h2 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-gray-100/90 mb-6 sm:mb-8">
                  Tribe Odyssey
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-lg sm:text-xl text-gray-400/90">
                    A collection of 9400 badass and entirely original ape NFT characters that
                    live on the Ethereum Blockchain.
                  </p>
                  <p className="text-base sm:text-lg text-gray-400/80">
                    The collection's lore is based in an alternate dimension. Within this
                    dimension exists a futuristic world, a harsh and barren ruled by a tech
                    advanced ape civilisation.
                  </p>
                  <a 
                    href="https://opensea.io/collection/tribe-odyssey"
                    className="inline-block mb-12 px-6 py-2 bg-gradient-to-r from-red-600 to-pink-500
                         hover:from-blue-500/20 hover:to-purple-500/20 
                         border border-blue-500/30 hover:border-blue-400 
                         rounded-full text-blue-400 hover:text-blue-300 
                         transition-all duration-300 backdrop-blur-sm"
            >
              View on OpenSea
            </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TribeOdysseySection;
