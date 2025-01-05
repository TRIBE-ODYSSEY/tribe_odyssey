import axios from "axios";
import { useEffect, useState } from "react";
import { useWeb3React } from "@src/lib/hooks/useWeb3React";

const useUserStaked = (trigger: number) => {
  const [userStaked, setUserStaked] = useState<any>(null);
  const { account } = useWeb3React();

  useEffect(() => {
    const fetch = async () => {
      axios
        .get("/staking/userStaked", { params: { address: account } })
        .then((response) => {
          setUserStaked(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    if (account) fetch();
  }, [account, trigger]);

  return {
    userStaked,
  };
};

export default useUserStaked;
