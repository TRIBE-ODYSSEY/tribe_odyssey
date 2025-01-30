import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import axios from "axios";
import { useAxios } from "./useAxios";

interface UserStakedData {
  staked_count: number;
  daily_points: number;
  points: number;
}

const useUserStaked = (trigger: number) => {
  useAxios(); // Initialize axios interceptors
  const [data, setData] = useState<UserStakedData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { address: account } = useAccount();

  const refetch = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/staking/userStaked", { 
        params: { address: account } 
      });
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [account, trigger]);

  return { data, isLoading, error, refetch };
};

export default useUserStaked;
