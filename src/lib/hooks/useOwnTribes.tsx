import { useEffect, useState } from "react";
import { useWeb3React } from "./useWeb3React";
import axiosInstance from '@src/lib/config/axios';
import axios from "axios";

interface TribeItem {
  contract: string;
  tokenId: string;
  is_staked: boolean;
  id: string;
}

const useOwnTribes = (trigger: number) => {
  const [tribes, setTribes] = useState<TribeItem[]>([]);
  const [stakedTribes, setStakedTribes] = useState<TribeItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { account } = useWeb3React();

  useEffect(() => {
    const fetchTribes = async () => {
      if (!account) return;
      setIsLoading(true);

      try {
        const response = await axiosInstance.get("/item", {
          params: {
            owner: account.toLowerCase(),
            contract: "0x77f649385ca963859693c3d3299d36dfc7324eb9",
            limit: 1000,
          }
        });

        if (response?.data?.items) {
          const items = response.data.items.map((item: TribeItem) => ({
            ...item,
            id: `${item.contract}-${item.tokenId}`,
          }));

          setTribes(items.filter((item: TribeItem) => !item.is_staked));
          setStakedTribes(items.filter((item: TribeItem) => item.is_staked));
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.code === 'ECONNABORTED') {
            console.error('Request timeout:', error);
            throw new Error('Request timed out. Please try again.');
          }
          if (error.response) {
            console.error('Server error:', error.response.status);
            throw new Error(`Server error: ${error.response.status}`);
          }
          if (error.request) {
            console.error('Network error:', error);
            throw new Error('Network error. Please check your connection.');
          }
        }
        console.error('Error fetching tribes:', error);
        setTribes([]);
        setStakedTribes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTribes();
  }, [account, trigger]);

  return {
    tribes,
    stakedTribes,
    isLoading
  };
};

export default useOwnTribes;
