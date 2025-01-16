import React from 'react';
import { Link } from 'react-router-dom';

export enum ErrorTypes {
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR', 
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED'
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
      default:
        return {
          title: 'Error',
          message: 'An unexpected error occurred.'
        };
    }
  };

  const { title, message } = getErrorContent();

  return (
    <div className="error-bg flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-lg mb-8">{message}</p>
      <Link 
        to="/" 
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NetworkErrors;
