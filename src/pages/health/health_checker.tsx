import React, { useEffect, useState } from 'react';
import Card from '@src/components/common/card/Card';
import PageTitle from '@src/components/common/PageTitle';
import PageLayout from '@src/components/common/layout/PageLayout';
import { useAccount, useChainId, usePublicClient } from 'wagmi';
import { getStakingAddress, getTribeAddress, getMulticallAddress } from '@src/utils/address';

interface HealthStatus {
  isConnected: boolean;
  chainId: number | null;
  isHealthy: boolean;
  contractsAvailable: {
    staking: boolean;
    tribe: boolean;
    multiCall: boolean;
  };
  nodeLatency: number | null;
}

const HealthChecker: React.FC = () => {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const publicClient = usePublicClient();
  
  const [health, setHealth] = useState<HealthStatus>({
    isConnected: false,
    chainId: null,
    isHealthy: false,
    contractsAvailable: {
      staking: false,
      tribe: false,
      multiCall: false,
    },
    nodeLatency: null,
  });

  const checkHealth = async () => {
    try {
      const startTime = Date.now();
      const blockNumber = await publicClient?.getBlockNumber();
      const latency = Date.now() - startTime;

      // Check contract availability
      const contractsAvailable = {
        staking: false,
        tribe: false,
        multiCall: false,
      };

      if (publicClient) {
        try {
          const stakingAddress = getStakingAddress();
          const tribeAddress = getTribeAddress();
          const multicallAddress = getMulticallAddress();

          const [stakingCode, tribeCode, multicallCode] = await Promise.all([
            publicClient.getBytecode({ address: stakingAddress as `0x${string}` }),
            publicClient.getBytecode({ address: tribeAddress as `0x${string}` }),
            publicClient.getBytecode({ address: multicallAddress as `0x${string}` }),
          ]);

          contractsAvailable.staking = stakingCode !== undefined && stakingCode !== '0x';
          contractsAvailable.tribe = tribeCode !== undefined && tribeCode !== '0x';
          contractsAvailable.multiCall = multicallCode !== undefined && multicallCode !== '0x';
        } catch (error) {
          console.error('Contract check failed:', error);
        }
      }

      setHealth({
        isConnected,
        chainId: chainId ?? null,
        isHealthy: Boolean(blockNumber),
        contractsAvailable,
        nodeLatency: latency,
      });
    } catch (error) {
      console.error('Health check failed:', error);
      setHealth(prev => ({ ...prev, isHealthy: false }));
    }
  };

  useEffect(() => {
    if (isConnected && publicClient) {
      checkHealth();
    }
  }, [isConnected, chainId, publicClient]);

  const getChainName = (id: number) => {
    switch (id) {
      case 1: return 'Ethereum Mainnet';
      case 11155111: return 'Sepolia';
      case 5: return 'Goerli';
      default: return 'Unknown Network';
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <PageTitle>System Health</PageTitle>
        
        <div className="max-w-2xl mx-auto mt-8">
          <Card className="bg-[var(--color-overlay-dark)]/5 backdrop-blur-sm 
                         border border-[var(--color-text-primary)]/10">
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
                  Connection Status
                </h2>
                
                <div className="grid gap-4">
                  <StatusRow 
                    label="Wallet Connection" 
                    status={isConnected} 
                    value={isConnected ? 'Connected' : 'Disconnected'} 
                  />
                  <StatusRow 
                    label="Network" 
                    status={!!health.chainId} 
                    value={health.chainId ? getChainName(health.chainId) : 'Not Connected'} 
                  />
                  <StatusRow 
                    label="Chain ID" 
                    status={!!health.chainId} 
                    value={health.chainId?.toString() || 'Unknown'} 
                  />
                  <StatusRow 
                    label="Node Health" 
                    status={health.isHealthy} 
                    value={health.isHealthy ? 'Healthy' : 'Unhealthy'} 
                  />
                  <StatusRow 
                    label="Node Latency" 
                    status={!!health.nodeLatency} 
                    value={health.nodeLatency ? `${health.nodeLatency}ms` : 'Unknown'} 
                  />
                  {address && (
                    <StatusRow 
                      label="Connected Address" 
                      status={true} 
                      value={`${address.slice(0, 6)}...${address.slice(-4)}`} 
                    />
                  )}
                </div>

                <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mt-8 mb-6">
                  Contract Status
                </h2>
                
                <div className="grid gap-4">
                  <StatusRow 
                    label="Staking Contract" 
                    status={health.contractsAvailable.staking} 
                    value={health.contractsAvailable.staking ? 'Available' : 'Unavailable'} 
                  />
                  <StatusRow 
                    label="Tribe Contract" 
                    status={health.contractsAvailable.tribe} 
                    value={health.contractsAvailable.tribe ? 'Available' : 'Unavailable'} 
                  />
                  <StatusRow 
                    label="MultiCall Contract" 
                    status={health.contractsAvailable.multiCall} 
                    value={health.contractsAvailable.multiCall ? 'Available' : 'Unavailable'} 
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

interface StatusRowProps {
  label: string;
  status: boolean;
  value: string;
}

const StatusRow: React.FC<StatusRowProps> = ({ label, status, value }) => (
  <div className="flex justify-between items-center p-3 rounded-lg bg-[var(--color-overlay-dark)]/10">
    <span className="text-[var(--color-text-muted)]">{label}:</span>
    <span className={status ? 'text-green-400' : 'text-red-400'}>
      {value}
    </span>
  </div>
);

export default HealthChecker;
