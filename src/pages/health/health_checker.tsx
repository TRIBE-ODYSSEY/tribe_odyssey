import { config } from '@config/wagmi';
import Card from '@src/components/common/card/Card'; // Importuj komponent Card
import React from 'react';

const HealthChecker: React.FC = () => {
  const checkHealth = config && config.chains && config.chains.length > 0;

  const cardProps = {
    className: 'custom-card-class',
    image: {
      'data-src': 'images/11968.png',
      alt: 'Card Image',
    },
    children: <p>Card Content</p>,
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen">
      {checkHealth ? (
        <div className="text-center text-green-400">
          <p>Connected to Wagmi!</p>
        </div>
      ) : (
        <div className="text-center text-red-400">
          <p>Connecting to Wagmi...</p>
        </div>
      )}
      <Card {...cardProps} /> {/* Użyj komponentu Card */}
    </div>
  );
};

export default HealthChecker;
