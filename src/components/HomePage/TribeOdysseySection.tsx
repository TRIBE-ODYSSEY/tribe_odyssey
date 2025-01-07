import useLazyLoading from '@hooks/useLazyLoading';
import React, { useState } from 'react';
import Card from '../common/card/Card';

const sideImages = [
  { src: '/images/monkey.jpg', alt: 'Main Tribe Odyssey NFT' },
  { src: 'images/tribunus.png', alt: 'Tribunus NFT' },
  { src: 'images/ChipRed.png', alt: 'Chip Red NFT' },
  { src: 'images/Zues.jpg', alt: 'Zeus NFT' },
];

const TribeOdysseySection: React.FC = () => {
  useLazyLoading();
  const [selectedImage, setSelectedImage] = useState(sideImages[0]);

  const handleImageClick = (image: typeof sideImages[0]) => {
    setSelectedImage(image);
  };

  const sideImagesToShow = sideImages.filter(img => img.src !== selectedImage.src);

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 xl:gap-16">
          <div className="w-full lg:w-[55%] relative">
            {/* Mobile Side Images */}
            <div className="flex lg:hidden justify-center gap-4 mb-6">
              {sideImagesToShow.map((image) => (
                <div 
                  key={image.alt}
                  className="w-24 sm:w-28 cursor-pointer"
                  onClick={() => handleImageClick(image)}
                >
                  <Card
                    image={{
                      'data-src': image.src,
                      alt: image.alt,
                    }}
                    className="rounded-2xl shadow-lg aspect-square overflow-hidden hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>

            {/* Main Image Container */}
            <div className="relative max-w-2xl mx-auto lg:mx-0">
              <Card
                image={{
                  'data-src': selectedImage.src,
                  alt: selectedImage.alt,
                }}
                className="rounded-3xl shadow-2xl w-full aspect-square overflow-hidden hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            
            {/* Desktop Side Images */}
            <div className="hidden lg:flex absolute -right-16 xl:-right-24 top-1/2 -translate-y-1/2 flex-col gap-4">
              {sideImagesToShow.map((image) => (
                <div 
                  key={image.alt}
                  className="w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 cursor-pointer transform hover:scale-105 transition-all duration-300"
                  onClick={() => handleImageClick(image)}
                >
                  <Card
                    image={{
                      'data-src': image.src,
                      alt: image.alt,
                    }}
                    className="rounded-2xl shadow-lg aspect-square overflow-hidden"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[40%] flex flex-col justify-center lg:pl-12">
            <div className="relative rounded-3xl p-6 sm:p-8 overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF0008]/20 via-black/40 to-[#FF0008]/10" />
              <div className="absolute inset-0 bg-[#FF0008]/5" />
              <div className="relative z-10">
                <h2 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-white/90 mb-6 sm:mb-8">
                  Tribe Odyssey
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-lg sm:text-xl text-white/80">
                    A collection of 9400 badass and entirely original ape NFT characters that
                    live on the Ethereum Blockchain.
                  </p>
                  <p className="text-base sm:text-lg text-white/70">
                    The collection's lore is based in an alternate dimension. Within this
                    dimension exists a futuristic world, a harsh and barren ruled by a tech
                    advanced ape civilisation.
                  </p>
                  <a 
                    href="https://opensea.io/collection/tribe-odyssey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 bg-gradient-to-r from-red-600 to-pink-500
                             hover:from-red-500 hover:to-pink-400 
                             rounded-full text-white font-medium
                             transition-all duration-300 shadow-lg
                             hover:shadow-red-500/25 hover:-translate-y-0.5"
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