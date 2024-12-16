import useLazyLoading from '@src/lib/hooks/useLazyLoading';
import React from 'react';

interface CardProps {
  height?: string;
  width?: string;
  className?: string;
  image?: {
    'data-src': string;
    alt?: string;
  };
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  height,
  width,
  className,
  image,
  children,
}) => {
  useLazyLoading();
  return (
    <div
      className={`card  border-gray-300 border-4 h-96  w-72  rounded-lg overflow-hidden shadow-md ${className}`}
      style={{
        height,
        width,
      }}
    >
      {image && (
        <div className="card-image h-46 relative overflow-hidden">
          <img
            data-src={image['data-src']}
            alt={image.alt || 'No description available'}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="card-content p-4">{children}</div>
    </div>
  );
};

export default Card;
