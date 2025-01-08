import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const useUserInfo = (trigger: number) => {
  const [info, setInfo] = useState<any>(null);
  const { address } = useAccount();

  useEffect(() => {
    const fetch = async () => {
      axios
        .get("/user", { params: { address: address, statistic: false } })
        .then((response) => {
          setInfo(response.data.user);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    if (address) fetch();
  }, [address, trigger]);

  return info;
};

export default useUserInfo;
