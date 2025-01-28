import { useEffect, useState } from "react";
import { getTribeAddress } from "@src/utils/address";
import { getContract } from "viem";
import erc20ABI from "@src/lib/config/abi/erc20.json";
import { Address, zeroAddress } from "viem";
import { useAccount, usePublicClient } from "wagmi";

const useTokenApproval = (token: Address) => {
  const { address: account } = useAccount();
  const publicClient = usePublicClient();
  const nftContractAddress = getTribeAddress();
  const tokenContract = getContract({
    address: token,
    abi: erc20ABI,
    client: publicClient,
  });

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
