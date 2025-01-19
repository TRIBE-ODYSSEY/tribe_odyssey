import Card from '@src/components/common/card/Card';
import React, { useEffect, useState } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { usePublicClient } from '@src/lib/wagmi/hooks';

const HealthChecker: React.FC = () => {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const [isHealthy, setIsHealthy] = useState(false);

  const checkHealth = async () => {
    if (!publicClient) return false;
    try {
      const blockNumber = await publicClient.getBlockNumber();
      return blockNumber > 0n;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  };

  useEffect(() => {
    const runHealthCheck = async () => {
      const health = await checkHealth();
      setIsHealthy(health);
    };
    runHealthCheck();
  }, [publicClient]);

  const getChainName = (id: number) => {
    switch (id) {
      case 1:
        return 'Ethereum Mainnet';
      case 4:
        return 'Rinkeby';
      case 5:
        return 'Goerli';
      default:
        return 'Unknown Network';
    }
  };

  const cardProps = {
    className: 'bg-[var(--color-overlay-dark)]/5 backdrop-blur-sm border border-[var(--color-text-primary)]/10',
    image: {
      'data-src': '/images/health-check.png',
      alt: 'Health Check Status',
    },
    children: (
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">
          System Health Status
        </h2>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[var(--color-text-muted)]">Wallet Connection:</span>
            <span className={isConnected ? 'text-green-400' : 'text-red-400'}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--color-text-muted)]">Network:</span>
            <span className={chainId ? 'text-green-400' : 'text-red-400'}>
              {chainId ? getChainName(chainId) : 'Not Connected'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--color-text-muted)]">Chain ID:</span>
            <span className={chainId ? 'text-green-400' : 'text-red-400'}>
              {chainId || 'Unknown'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--color-text-muted)]">Node Health:</span>
            <span className={isHealthy ? 'text-green-400' : 'text-red-400'}>
              {isHealthy ? 'Healthy' : 'Unhealthy'}
            </span>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--color-tertiary)] to-[var(--color-background)] 
                    flex items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto">
        <Card {...cardProps} />
      </div>
    </div>
  );
};

export default HealthChecker;
