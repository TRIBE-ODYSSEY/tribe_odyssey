import useLazyLoading from '@src/lib/hooks/useLazyLoading';
import React from 'react';

interface CardProps {
  height?: string;
  width?: string;
  className?: string;
  image?: {
    objectFit?: React.CSSProperties['objectFit'];
    objectPosition?: React.CSSProperties['objectPosition'];
    'data-src': string;
    alt?: string;
  };
  children?: React.ReactNode;
  isSquare?: string;
}

const Card: React.FC<CardProps> = ({
  height,
  width,
  className = '',
  image,
  children,
  isSquare,
}) => {
  useLazyLoading();
  const size = isSquare || '';

  return (
    <section
      className={`relative overflow-hidden rounded-lg 
                bg-[var(--color-overlay-dark)] backdrop-blur-sm 
                border border-[var(--color-text-primary)]/5
                transition-all duration-300 ${className}`}
      style={{
        height: size || height || 'auto',
        width: size || width || 'auto',
      }}
    >
      {image && (
        <div
          className="relative overflow-hidden"
          style={{ 
            height: size || height || '100%',
            width: size || width || '100%'
          }}
        >
          <img
            data-src={image['data-src']}
            alt={image.alt || 'No description available'}
            className={`w-full h-full transition-transform duration-300 
                     ${image.objectFit ? '' : 'object-cover'}`}
            style={{
              objectFit: image.objectFit || 'cover',
              objectPosition: image.objectPosition || 'center',
            }}
            loading="lazy"
          />
          {/* Gradient overlay for images */}
          <div className="absolute inset-0 bg-gradient-to-t 
                        from-[var(--color-overlay-dark)] to-transparent 
                        opacity-0 transition-opacity duration-300 
                        group-hover:opacity-100" />
        </div>
      )}
      {children && (
        <div className={`${image ? 'p-4 sm:p-6' : ''} text-[var(--color-text-on-dark)]`}>
          {children}
        </div>
      )}
    </section>
  );
};

export default Card;
