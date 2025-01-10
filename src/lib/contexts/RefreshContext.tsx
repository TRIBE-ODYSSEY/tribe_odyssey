import { createContext, useEffect, useState } from 'react';

const FAST_INTERVAL = 10000; // 10 seconds
const SLOW_INTERVAL = 60000; // 60 seconds

interface RefreshContextValue {
  fast: number;
  slow: number;
}

export const RefreshContext = createContext<RefreshContextValue>({ fast: 0, slow: 0 });

export const RefreshContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [fast, setFast] = useState(0);
  const [slow, setSlow] = useState(0);

  useEffect(() => {
    const fastInterval = setInterval(async () => {
      setFast((prev) => prev + 1);
    }, FAST_INTERVAL);

    const slowInterval = setInterval(async () => {
      setSlow((prev) => prev + 1);
    }, SLOW_INTERVAL);

    return () => {
      clearInterval(fastInterval);
      clearInterval(slowInterval);
    };
  }, []);

  return (
    <RefreshContext.Provider
      value={{
        fast,
        slow,
      }}
    >
      {children}
    </RefreshContext.Provider>
  );
}; 