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
      className={`relative overflow-hidden rounded-[20px] 
                bg-[var(--color-overlay-dark)]/15 backdrop-blur-[20px]
                border-2 border-[var(--color-text-primary)]/[0.15]
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
          {/* Drop shadow effect */}
          <div className="absolute inset-0 shadow-[inset_0px_2px_20px_rgba(0,0,0,0.1)]" />
          
          {/* Background blur effect */}
          <div className="absolute inset-0 backdrop-blur-[10px] opacity-0 
                       group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Gradient overlay for images */}
          <div className="absolute inset-0 bg-gradient-to-t 
                       from-[var(--color-overlay-dark)]/100 to-transparent/0 
                       opacity-0 transition-opacity duration-300 
                       group-hover:opacity-100" />
        </div>
      )}
      {children && (
        <div className={`${image ? 'p-5' : ''} text-[var(--color-text-on-dark)]`}>
          {children}
        </div>
      )}
    </section>
  );
};

export default Card;
