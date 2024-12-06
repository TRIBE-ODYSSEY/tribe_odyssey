import { config } from '@config/wagmiClient';
import React from 'react';

const HealtChecker: React.FC = () => {
  const checkHealth = config && config.chains && config.chains.length > 0;

  return (
    <div>
      {checkHealth ? (
        <div className="text-green-400">
          <p>Connected to Wagmi!</p>
        </div>
      ) : (
        <div className="text-red-400">
          <p>Connecting to Wagmi...</p>
        </div>
      )}
    </div>
  );
};

export default HealtChecker;
