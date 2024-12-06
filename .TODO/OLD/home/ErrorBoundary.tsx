import React, { useState, ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}

const ErrorBoundary: React.FC<Props> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      setHasError(true);
      setErrorMessage(error.message);
      console.error("Error details:", {
        error: error.message,
        location: window.location.href,
        timestamp: new Date().toISOString(),
      });
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (hasError) {
    return (
      <div className="p-5 text-center text-white bg-gradient-to-b from-transparent to-black">
        <h1 className="text-2xl font-bold">Sorry.. there was an error</h1>
        <p className="mt-2">{errorMessage}</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
