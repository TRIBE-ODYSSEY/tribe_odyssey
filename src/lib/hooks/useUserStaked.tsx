import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

interface UserStakedData {
  stakedTokens: any[];
  totalStaked: number;
  rewards: bigint;
  lastUpdate: number;
}

const useUserStaked = () => {
  const [userStaked, setUserStaked] = useState<UserStakedData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();

  useEffect(() => {
    const fetchStakedTokens = async () => {
      if (!address) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/staking/userStaked?address=${address}`);
        if (!response.ok) throw new Error('Failed to fetch staked tokens');
        
        const data = await response.json();
        setUserStaked(data);
      } catch (err) {
        console.error('Error fetching staked tokens:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch staked tokens');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStakedTokens();
  }, [address]);

  return {
    data: userStaked,
    isLoading,
    error,
    refetch: () => {
      setUserStaked(null);
      setIsLoading(true);
    }
  };
};

export default useUserStaked;
