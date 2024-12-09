// src/components/LazyImage.tsx
import { IMAGES } from '@assets/index'; // Poprawny import ze `index.ts`
import { ImageCategories } from '@assets/types';
import React from 'react';
import { useInView } from 'react-intersection-observer';

interface LazyImageProps {
  src: string;
  hegiht?: string;
  width?: string;
  alt: string;
  placeholder?: string;
  classNameCSS?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholder = IMAGES[ImageCategories.PLACEHOLDER], // Poprawne użycie z `IMAGES`
  classNameCSS,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '50px',
  });

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null; // Zapobiega nieskończonej pętli
    e.currentTarget.src = placeholder;
  };

  return (
    <div ref={ref} className={classNameCSS}>
      {inView ? (
        <img
          src={src}
          height={458}
          width={458}
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
