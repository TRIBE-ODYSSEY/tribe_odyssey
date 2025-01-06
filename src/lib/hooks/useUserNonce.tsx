import axios from "axios";
import { useEffect, useState } from "react";
import { useWeb3React } from "./useWeb3React";

const useUserNonce = (trigger: number) => {
  const [nonce, setNonce] = useState(null);
  const { account } = useWeb3React();

  useEffect(() => {
    const fetch = async () => {
      axios
        .get("/user/nonce", { params: { address: account } })
        .then((response) => {
          setNonce(response.data.nonce);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    if (account) fetch();
  }, [account, trigger]);

  return {
    nonce,
  };
};

export default useUserNonce;
