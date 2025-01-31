import { useState, useEffect } from 'react';

interface ErrorState {
  hasError: boolean;
  message: string;
  type: 'network' | 'general' | null;
}

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    message: '',
    type: null
  });

  useEffect(() => {
    const handleError = (error: Error) => {
      console.error('Global error:', error);
      
      // Handle network errors specifically
      if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
        setErrorState({
          hasError: true,
          message: 'Network connection error. Please check your internet connection.',
          type: 'network'
        });
        return;
      }

      setErrorState({
        hasError: true,
        message: error.message || 'An unexpected error occurred',
        type: 'general'
      });
    };

    const errorListener = (event: ErrorEvent) => handleError(event.error);
    const rejectionListener = (event: PromiseRejectionEvent) => handleError(event.reason);

    window.addEventListener('error', errorListener);
    window.addEventListener('unhandledrejection', rejectionListener);

    return () => {
      window.removeEventListener('error', errorListener);
      window.removeEventListener('unhandledrejection', rejectionListener);
    };
  }, []);

  if (errorState.hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
            {errorState.type === 'network' ? 'Network Error' : 'Something went wrong'}
          </h1>
          <p className="text-[var(--color-text-secondary)] mb-4">
            {errorState.message}
          </p>
          <button
            onClick={() => {
              setErrorState({ hasError: false, message: '', type: null });
              window.location.reload();
            }}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
