// src/components/LazyImage.tsx
import { IMAGES } from '@assets/index'; // Poprawny import ze `index.ts`
import React from 'react';
import { useInView } from 'react-intersection-observer';

interface LazyImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  fallbackSrc = IMAGES.placeholder,
  className,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '50px',
  });

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null; // Zapobiega nieskończonej pętli
    e.currentTarget.src = fallbackSrc;
  };

  return (
    <div ref={ref} className={className}>
      {inView ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-auto rounded-xl transition-transform duration-300 ease-in-out hover:scale-105"
          onError={handleError}
        />
      ) : (
        <div className="w-full h-[458px] bg-gray-300 animate-pulse rounded-xl"></div>
      )}
    </div>
  );
};

export default LazyImage;
