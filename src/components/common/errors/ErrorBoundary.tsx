import { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error details:', {
      error,
      errorInfo,
      location: window.location.href,
      timestamp: new Date().toISOString(),
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-4">
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
              Oops! Something went wrong
            </h1>
            <p className="text-[var(--color-text-muted)]">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <Link 
              to="/"
              className="inline-block px-6 py-2 bg-[var(--color-button-primary)] 
                       text-[var(--color-text-on-primary)] rounded-lg 
                       hover:bg-[var(--color-button-hover)] transition-colors duration-200"
            >
              Return Home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
