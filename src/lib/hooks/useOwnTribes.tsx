import { useEffect, useState } from "react";
import { useWeb3React } from "./useWeb3React";
import axios from "axios";

const useOwnTribes = (trigger: number) => {
  const [tribes, setTribes] = useState<any[]>([]);
  const [stakedTribes, setStakedTribes] = useState<any[]>([]);
  const { account } = useWeb3React();

  useEffect(() => {
    const fetchTribes = async () => {
      if (!account) return;

      try {
        // Using relative URL with Vite proxy
        const response = await axios.get("/item", {
          params: {
            owner: account.toLowerCase(),
            contract: "0x77f649385ca963859693c3d3299d36dfc7324eb9",
            limit: 1000,
          },
        });

        const items = (response?.data?.items || []).map((item: any) => ({
          ...item,
          id: `${item.contract}-${item.tokenId}`,
        }));

        setTribes(items.filter((item: any) => !item.is_staked));
        setStakedTribes(items.filter((item: any) => item.is_staked));
      } catch (error) {
        console.error('Error fetching tribes:', error);
        setTribes([]);
        setStakedTribes([]);
      }
    };

    fetchTribes();
  }, [account, trigger]);

  return {
    tribes,
    stakedTribes,
  };
};
  
export default useOwnTribes;
