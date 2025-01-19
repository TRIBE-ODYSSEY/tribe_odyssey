import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-[var(--color-background)]">
    <div className="animate-spin rounded-full h-12 w-12 
                  border-t-2 border-b-2 border-[var(--color-button-primary)]
                  shadow-lg"></div>
  </div>
);

export default LoadingSpinner; 