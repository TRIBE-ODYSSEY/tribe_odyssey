import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const useUserStaked = () => {
  const [userStaked, setUserStaked] = useState<any>(null);
  const { address } = useAccount();

  useEffect(() => {
    const fetch = async () => {
      axios
        .get("/staking/userStaked", { params: { address } })
        .then((response) => {
          setUserStaked(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    if (address) fetch();
  }, [address]);

  return {
    userStaked,
  };
};

export default useUserStaked;
