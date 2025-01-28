import { useEffect, useState } from "react";
import { getTribeAddress } from "@src/utils/address";
import { getTokenContract } from "@src/lib/viem/contracts";

import { Address, zeroAddress } from "viem";
import { useAccount } from "wagmi";
const useTokenApproval = (token: Address) => {
  const { address: account } = useAccount();
  const nftContractAddress = getTribeAddress();
  const tokenContract = getTokenContract(token, provider);

  const [approved, setApproved] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const res = tokenContract
        ? await tokenContract.allowance(account, nftContractAddress)
        : BigInt(0);
      setApproved(!res.isZero());
    };

    if (token == zeroAddress) {
      setApproved(true);
    } else {
      if (token && account) {
        fetch();
      }
    }
  }, [token, account]);

  return approved;
};

export default useTokenApproval;
