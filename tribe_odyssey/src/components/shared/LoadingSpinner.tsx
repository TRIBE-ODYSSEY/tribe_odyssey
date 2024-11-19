import React from 'react';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ fullScreen = true }) => {
  return (
    <div className={`loading-spinner ${fullScreen ? 'fullscreen' : ''}`}>
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner; 