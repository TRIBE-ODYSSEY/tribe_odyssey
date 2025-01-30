import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import axios from "axios";

const useUserStaked = (trigger: number) => {
  const [userStaked, setUserStaked] = useState<any[]>([]);
  const { address: account } = useAccount();

  useEffect(() => {
    const fetchStaked = async () => {
      if (!account) return;
      
      try {
        const response = await axios.get("/staking/userStaked", { 
          params: { address: account } 
        });
        setUserStaked(response.data);
      } catch (error) {
        console.error("Error fetching staked tokens:", error);
        setUserStaked([]);
      }
    };

    fetchStaked();
  }, [account, trigger]);

  return { userStaked };
};

export default useUserStaked;
