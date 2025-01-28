import { useEffect, useState } from "react";
import { useAccount, usePublicClient } from "wagmi";
import { zeroAddress } from "../config/constants";
import { getContract } from "viem";
import erc20ABI from "@src/lib/config/abi/erc20.json";
import { Address } from "viem";

const useTokenBalance = (token: Address) => {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const [balance, setBalance] = useState(BigInt(0));

  useEffect(() => {
    const fetch = async () => {
      if (!address) return;
      
      let tempBalance = BigInt(0);
      
      try {
        if (token === zeroAddress) {
          tempBalance = await publicClient?.getBalance({ address }) ?? BigInt(0);
        } else {
          const contract = getContract({
            address: token,
            abi: erc20ABI,
            client: publicClient,
          });
          
          tempBalance = await contract.read.balanceOf([address]);
        }
        
        setBalance(tempBalance);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetch();
  }, [token, address, publicClient]);

  return balance;
};

export default useTokenBalance;
