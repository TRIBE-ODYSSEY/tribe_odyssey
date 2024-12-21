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
  className,
  image,
  children,
  isSquare,
}) => {
  useLazyLoading();
  const size = isSquare || '';

  return (
    <div
      className={`card border-gray-300 border-4 rounded-lg overflow-hidden shadow-md ${className}`}
      style={{
        height: size || height,
        width: size || width,
      }}
    >
      {image && (
        <div
          className="card-image relative overflow-hidden"
          style={{ height: size, width: size }}
        >
          <img
            data-src={image['data-src']}
            alt={image.alt || 'No description available'}
            style={{
              objectFit: image.objectFit || 'cover',
              objectPosition: image.objectPosition || 'center',
              height: '100%',
              width: '100%',
            }}
            className="object-cover"
          />
        </div>
      )}
      <div className="card-content p-4">{children}</div>
    </div>
  );
};

export default Card;
