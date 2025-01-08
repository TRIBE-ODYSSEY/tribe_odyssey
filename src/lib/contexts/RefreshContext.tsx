import { createContext, useEffect, useState, useContext } from 'react';

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
    const fastInterval = setInterval(() => {
      setFast((prev) => prev + 1);
    }, FAST_INTERVAL);

    const slowInterval = setInterval(() => {
      setSlow((prev) => prev + 1);
    }, SLOW_INTERVAL);

    return () => {
      clearInterval(fastInterval);
      clearInterval(slowInterval);
    };
  }, []);

  return (
    <RefreshContext.Provider value={{ fast, slow }}>
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefresh = () => {
  const context = useContext(RefreshContext);
  if (context === undefined) {
    throw new Error('useRefresh must be used within a RefreshContextProvider');
  }
  return context;
}; 