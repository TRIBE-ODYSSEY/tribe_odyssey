import axios from "axios";
import { useEffect, useState } from "react";
import { useWeb3React } from "./useWeb3React";

const useUserInfo = (trigger: number) => {
  const [info, setInfo] = useState<any>(null);
  const { account } = useWeb3React();

  useEffect(() => {
    const fetch = async () => {
      axios
        .get("/user", { params: { address: account, statistic: false } })
        .then((response) => {
          setInfo(response.data.user);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    if (account) fetch();
  }, [account, trigger]);

  return info;
};

export default useUserInfo;
