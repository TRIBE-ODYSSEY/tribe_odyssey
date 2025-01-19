import React from 'react';
import { HeroSectionProps } from './CouncilHero.types';

const HeroSection: React.FC<HeroSectionProps> = ({
  logoSrc,
  tribunusImageSrc,
  aragonLogoSrc,
  title,
  descriptions,
  ctaLink,
  ctaText
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-start gap-8 mb-16">
      <img 
        src={logoSrc}
        alt="Council Logo"
        className="w-24 h-24 rounded-full object-cover flex-shrink-0"
      />

      <div className="flex flex-col items-center lg:items-start flex-1 max-w-[535px]">
        <h1 className="font-montserrat text-4xl md:text-5xl text-[var(--color-text-primary)] 
                     text-center lg:text-left mb-6">
          {title}
        </h1>

        <div className="space-y-4 text-center lg:text-left mb-8">
          {descriptions.map((desc, index) => (
            <p key={index} className={`font-montserrat ${
              index === descriptions.length - 1 
                ? 'text-base' 
                : 'text-lg md:text-xl'
            } text-[var(--color-text-secondary)]`}>
              {desc}
            </p>
          ))}
        </div>

        <a 
          href={ctaLink}
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-primary inline-block px-8 py-3"
        >
          {ctaText}
        </a>

        <div className="flex flex-col items-center lg:items-start gap-2 mt-8">
          <span className="text-[var(--color-text-muted)] text-sm">Powered by</span>
          <img 
            src={aragonLogoSrc}
            alt="Aragon DAO"
            className="w-[143px] h-8 opacity-80 hover:opacity-100 transition-300"
          />
        </div>
      </div>

      <img 
        src={tribunusImageSrc}
        alt="Tribunus Plebis"
        className="hidden lg:block w-[467px] h-[592px] rounded-2xl 
                 shadow-lg shadow-black/25 object-cover"
      />
    </div>
  );
};

export default HeroSection;
