import useLazyLoading from '@hooks/useLazyLoading';
import React, { useState } from 'react';
import Card from '../common/card/Card';

const sideImages = [
  { src: '/images/monkey.jpg', alt: 'Main Tribe Odyssey NFT' },
  { src: 'images/tribunus.png', alt: 'Tribunus NFT' },
  { src: 'images/ChipRed.png', alt: 'Chip Red NFT' },
  { src: 'images/Zues.jpg', alt: 'Zeus NFT' },
];

// Main Image Component
const MainImage = ({ selectedImage }: { selectedImage: typeof sideImages[0] | undefined }) => (
  <div className="relative w-[85%] lg:w-[80%]">
    <Card
      image={{
        'data-src': selectedImage?.src || '',
        alt: selectedImage?.alt || '',
      }}
      className="rounded-3xl shadow-2xl w-full aspect-square overflow-hidden 
               hover:scale-[1.02] transition-transform duration-500
               border border-[var(--color-text-primary)]/10 
               hover:border-[var(--color-text-primary)]/20"
    />
  </div>
);

// Side Images Component
const SideImages = ({ 
  sideImagesToShow, 
  handleImageClick 
}: { 
  sideImagesToShow: typeof sideImages,
  handleImageClick: (image: typeof sideImages[0]) => void 
}) => (
  <>
    {/* Desktop Side Images - Vertical Stack */}
    <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 
                  flex-col gap-4 z-10">
      {sideImagesToShow.map((image) => (
        <div 
          key={image.alt}
          className="w-24 xl:w-28 2xl:w-32 cursor-pointer transform 
                   hover:scale-105 transition-all duration-300"
          onClick={() => handleImageClick(image)}
        >
          <Card
            image={{
              'data-src': image.src,
              alt: image.alt,
            }}
            className="rounded-2xl shadow-lg aspect-square overflow-hidden
                     border border-[var(--color-text-primary)]/10 
                     hover:border-[var(--color-text-primary)]/20"
          />
        </div>
      ))}
    </div>

    {/* Mobile Side Images - Horizontal Row */}
    <div className="flex lg:hidden justify-center gap-4 mt-6">
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
            className="rounded-2xl shadow-lg aspect-square overflow-hidden 
                     hover:scale-105 transition-transform duration-300
                     border border-[var(--color-text-primary)]/10 
                     hover:border-[var(--color-text-primary)]/20"
          />
        </div>
      ))}
    </div>
  </>
);

// Content Section Component
const ContentSection = () => (
  <div className="w-full lg:w-[45%] flex flex-col justify-center lg:pl-4">
    <div className="relative rounded-3xl p-8 sm:p-10 overflow-hidden backdrop-blur-sm">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-tr 
                    from-[var(--color-button-primary)]/20 
                    via-[var(--color-overlay-dark)]/40 
                    to-[var(--color-button-primary)]/10" />
      <div className="absolute inset-0 bg-[var(--color-button-primary)]/5" />
      
      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-[var(--color-text-primary)] mb-6 sm:mb-8">
          Tribe Odyssey
        </h2>
        <div className="space-y-4 sm:space-y-6">
          <p className="text-lg sm:text-xl text-[var(--color-text-secondary)]">
            A collection of 9400 unique and badass ape NFT characters on the Ethereum Blockchain and 450 Ordinals within inscriptions range from 399473 to 1036891.
          </p>
          <p className="text-base sm:text-lg text-[var(--color-text-muted)]">
            The collection's lore is based in an alternate dimension. Within this dimension exists a futuristic world, a harsh and barren wasteland ruled by a tech-advanced ape civilisation.
          </p>
          <a 
            href="https://opensea.io/collection/tribe-odyssey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-gradient-to-r 
                     from-[var(--color-button-primary)] to-[var(--color-button-hover)]
                     hover:from-[var(--color-button-primary)]/90 hover:to-[var(--color-button-hover)]/90 
                     rounded-full text-[var(--color-text-on-primary)] font-medium
                     transition-all duration-300 shadow-lg
                     hover:shadow-[var(--color-button-primary)]/25 hover:-translate-y-0.5"
          >
            View on OpenSea
          </a>
        </div>
      </div>
    </div>
  </div>
);

// Main Component
const TribeOdysseySection: React.FC = () => {
  useLazyLoading();
  const [selectedImage, setSelectedImage] = useState(sideImages[0]);
  const handleImageClick = (image: typeof sideImages[0]) => {
    setSelectedImage(image);
  };
  const sideImagesToShow = sideImages.filter(img => img.src !== selectedImage?.src);

  return (
    <section className="container mx-auto px-4 py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="w-full lg:w-[50%] xl:w-[55%] relative">
            <div className="flex justify-center lg:justify-start">
              <MainImage selectedImage={selectedImage || sideImages[0]} />
            </div>
            
            <SideImages 
              sideImagesToShow={sideImagesToShow} 
              handleImageClick={handleImageClick} 
            />
          </div>
          <ContentSection />
        </div>
      </div>
    </section>
  );
};

export default TribeOdysseySection;