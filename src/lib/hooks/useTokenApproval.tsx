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

  const tokenContract = publicClient ? getContract({
    address: token,
    abi: erc20ABI as any,
    client: publicClient,
  }) : null;

  const [approved, setApproved] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      if (!tokenContract || !account) return;
      
      try {
        const res = (await tokenContract?.read?.allowance?.([
          account,
          nftContractAddress
        ]) ?? BigInt(0)) as bigint;
        setApproved(res > BigInt(0));
      } catch (error) {
        console.error('Error checking allowance:', error);
        setApproved(false);
      }
    };

    if (token === zeroAddress) {
      setApproved(true);
    } else if (token && account) {
      fetch();
    }
  }, [token, account, tokenContract, nftContractAddress]);

  return approved;
};

export default useTokenApproval;
