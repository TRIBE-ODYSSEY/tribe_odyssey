import Card from '@src/components/common/card/Card';
import React, { useEffect, useState } from 'react';
import { useAlchemyContext } from '@src/lib/context/AlchemyContext';
import { alchemyService } from '@src/lib/config/alchemy';

const HealthChecker: React.FC = () => {
  const { isConnected, address } = useAlchemyContext();
  const [isHealthy, setIsHealthy] = useState(false);
  const [chainId, setChainId] = useState<number | null>(null);
  const [gasPrice, setGasPrice] = useState<bigint | null>(null);
  const [blockNumber, setBlockNumber] = useState<number | null>(null);

  const checkHealth = async () => {
    try {
      const provider = await alchemyService.provider.getProvider();
      const network = await provider.getNetwork();
      setChainId(Number(network.chainId));

      // Check if we can fetch basic blockchain data
      const [latestBlock, currentGasPrice] = await Promise.all([
        alchemyService.blockchain.getLatestBlock(),
        alchemyService.blockchain.getGasPrice()
      ]);

      setBlockNumber(Number(latestBlock.number));
      setGasPrice(BigInt(currentGasPrice.toString()));
      setIsHealthy(true);
      return true;
    } catch (error) {
      console.error('Health check failed:', error);
      setIsHealthy(false);
      return false;
    }
  };

  useEffect(() => {
    const runHealthCheck = async () => {
      await checkHealth();
    };

    if (isConnected) {
      runHealthCheck();}
  }, [isConnected]);

  const getChainName = (id: number) => {
    switch (id) {
      case 1:
        return 'Ethereum Mainnet';
      case 11155111:
        return 'Sepolia';
      case 5:
        return 'Goerli';
      default:
        return 'Unknown Network';
    }
  };

  const formatGasPrice = (price: bigint | null) => {
    if (!price) return 'Unknown';
    return `${alchemyService.utils.formatUnits(price, 'gwei')} Gwei`;
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
          <div className="flex justify-between items-center">
            <span className="text-[var(--color-text-muted)]">Latest Block:</span>
            <span className={blockNumber ? 'text-green-400' : 'text-red-400'}>
              {blockNumber || 'Unknown'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--color-text-muted)]">Gas Price:</span>
            <span className={gasPrice ? 'text-green-400' : 'text-red-400'}>
              {formatGasPrice(gasPrice)}
            </span>
          </div>
          {address && (
            <div className="flex justify-between items-center">
              <span className="text-[var(--color-text-muted)]">Connected Address:</span>
              <span className="text-green-400 text-sm">
                {`${address.slice(0, 6)}...${address.slice(-4)}`}
              </span>
            </div>
          )}
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
