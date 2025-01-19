import React from 'react';
import { Link } from 'react-router-dom';

export enum ErrorTypes {
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR', 
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  SERVER_ERROR = 'SERVER_ERROR',
  WALLET_NOT_CONNECTED = 'WALLET_NOT_CONNECTED'
}

interface NetworkErrorsProps {
  type?: ErrorTypes;
}

const NetworkErrors: React.FC<NetworkErrorsProps> = ({ type = ErrorTypes.NOT_FOUND }) => {
  const getErrorContent = () => {
    switch (type) {
      case ErrorTypes.NOT_FOUND:
        return {
          title: '404 - Page Not Found',
          message: 'Sorry, the page you are looking for does not exist.'
        };
      case ErrorTypes.INTERNAL_SERVER_ERROR:
        return {
          title: '500 - Internal Server Error',
          message: 'Something went wrong on our end. Please try again later.'
        };
      case ErrorTypes.NETWORK_ERROR:
        return {
          title: 'Network Error',
          message: 'Unable to connect to the server. Please check your internet connection.'
        };
      case ErrorTypes.UNAUTHORIZED:
        return {
          title: '401 - Unauthorized',
          message: 'You do not have permission to access this page.'
        };
      case ErrorTypes.WALLET_NOT_CONNECTED:
        return {
          title: 'Wallet Not Connected',
          message: 'Please connect your wallet to access this feature.'
        };
      default:
        return {
          title: 'Error',
          message: 'An unexpected error occurred.'
        };
    }
  };

  const { title, message } = getErrorContent();

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 
                    bg-[var(--color-overlay-dark)]/5 backdrop-blur-sm 
                    rounded-xl border border-[var(--color-text-primary)]/10 p-8">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
          {title}
        </h1>
        <p className="text-lg text-[var(--color-text-muted)]">
          {message}
        </p>
        <Link 
          to="/" 
          className="inline-block px-6 py-3 bg-[var(--color-button-primary)] 
                   text-[var(--color-text-on-primary)] rounded-lg 
                   hover:bg-[var(--color-button-hover)] transition-colors duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NetworkErrors;
