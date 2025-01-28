import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { zeroAddress } from "../config/constants";
import { getContract } from "@src/lib/viem/contracts";

const useTokenBalance = (token: Address) => {
  const { address } = useAccount();
  const tokenContract = getContract(token, tokenABI, address );

  const [balance, setBalance] = useState(BigInt(0));

  useEffect(() => {
    const fetch = async () => {
      let tempBalance = BigInt(0);
      if (token === zeroAddress && signer && address) {
        tempBalance = await signer.getBalance(address);
      } else if (address && tokenContract) {
      }

      setBalance(tempBalance);
    };

    if (token && address) {
      fetch();
    }
  }, [token, address]);

  return balance;
};

export default useTokenBalance;
