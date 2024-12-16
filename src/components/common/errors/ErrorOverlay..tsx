// src/components/ErrorOverlay.tsx
import React from 'react';

interface ErrorOverlayProps {
  code: number;
  onRetry: () => void;
}

const errorDetails: { [key: number]: { message: string; background: string } } =
  {
    400: {
      message: 'Niepoprawne żądanie.',
      background: '/images/errors/400.jpg',
    },
    401: {
      message: 'Brak uprawnień.',
      background: '/images/errors/401.jpg',
    },
    403: {
      message: 'Zakaz dostępu.',
      background: '/images/errors/403.jpg',
    },
    404: {
      message: 'Brak zasobu.',
      background: '/images/errors/404.jpg',
    },
    429: {
      message: 'Limit żądań przekroczony.',
      background: '/images/errors/429.jpg',
    },
    500: {
      message: 'Błąd serwera.',
      background: '/images/errors/500.jpg',
    },
  };

const ErrorOverlay: React.FC<ErrorOverlayProps> = ({ code, onRetry }) => {
  const { message, background } = errorDetails[code] || {
    message: 'Nieznany błąd.',
    background: '/images/errors/default.jpg',
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-black bg-opacity-60 p-6 rounded-lg shadow-lg text-center text-white">
        <h2 className="text-3xl font-bold mb-4">{code}</h2>
        <p className="text-xl mb-6">{message}</p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          onClick={onRetry}
        >
          Spróbuj ponownie
        </button>
      </div>
    </div>
  );
};

export default ErrorOverlay;
