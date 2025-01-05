import axios from "axios";
import { useEffect, useState } from "react";
import useRefresh from "@src/libs/hooks/useRefresh";
import { getSubgraphEndpoint } from "@src/libs/utils/addressHelpers";
import { useWeb3React } from "@src/libs/hooks/useWeb3React";

const useOwnTribes = (trigger: number) => {
  const [tribes, setTribes] = useState([]);
  const [stakedTribes, setStakedTribes] = useState([]);
  const { slowRefresh } = useRefresh();
  const { account } = useWeb3React();

  useEffect(() => {
    const fetch = async () => {
      axios
        .get("/item", {
          params: {
            owner: account?.toLowerCase(),
            //contract: "0x77f649385ca963859693c3d3299d36dfc7324eb9",
            limit: 1000,
          },
        })
        .then((response) => {
          const items = (response?.data?.items || []).map((item) => ({
            ...item,
            id: `${item.contract}-${item.tokenId}`,
          }));
          setTribes(items.filter((item) => !item.is_staked));
          setStakedTribes(items.filter((item) => item.is_staked));
        })
        .catch((error) => {
          console.error(error);
        });
    };

    if (account) {
      fetch();
    }
  }, [slowRefresh, account, trigger]);

  return {
    tribes,
    stakedTribes,
  };
};

export default useOwnTribes;
