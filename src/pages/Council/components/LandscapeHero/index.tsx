import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LandscapeHeroProps } from './LandscapeHero.types';

const LandscapeHero: React.FC<LandscapeHeroProps> = ({
  imageSrc,
  title,
  subtitle,
  description,
  overlayType = 'gradient',
  parallaxSpeed = 0.5
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, parallaxSpeed * 100]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div 
        ref={containerRef} 
        className="relative h-auto overflow-hidden rounded-2xl max-w-[1200px] mx-auto"
      >
        <motion.div 
          className="relative w-full"
          style={{ y }}
        >
          <img
            src={imageSrc}
            alt=""
            className="w-full h-auto object-cover"
            draggable="false"
          />
          
          {/* Dynamic Overlay */}
          <div className={`absolute inset-0 ${
            overlayType === 'gradient' 
              ? 'bg-gradient-to-b from-black/40 via-transparent to-black/40'
              : overlayType === 'pattern'
              ? 'bg-[url("/patterns/noise.svg")] opacity-30'
              : 'backdrop-filter backdrop-blur-sm bg-black/20'
          }`} />
        </motion.div>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isVisible ? 1 : 0, 
            y: isVisible ? 0 : 20 
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 z-10 flex flex-col justify-center items-center px-4"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-[var(--color-button-primary)] font-montserrat text-lg mb-4 tracking-wider uppercase">
              {subtitle}
            </h3>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)] mb-6 font-montserrat">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandscapeHero;
