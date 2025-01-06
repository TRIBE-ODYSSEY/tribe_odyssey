import { useEffect, useState } from "react";
import { isZeroAddress } from "../utils/addressHelpers";
import { useTokenContract } from "./useContract";
import { useWeb3React } from "./useWeb3React";
const useTokenBalance = (token: string) => {
  const { account, getSigner } = useWeb3React();
  const tokenContract = useTokenContract(token) as any;

  const [balance, setBalance] = useState<bigint>(BigInt(0));

  useEffect(() => {
    const fetch = async () => {
      let tempBalance = BigInt(0);
      
      try {
        if (isZeroAddress(token) && getSigner && account) {
          const signer = await getSigner();
          if (signer) {
            tempBalance = await signer.provider.getBalance(account);
          }
        } else if (account && tokenContract) {
          tempBalance = await tokenContract.balanceOf(account);
        }
        
        setBalance(tempBalance);
      } catch (error) {
        console.error('Error fetching balance:', error);
        setBalance(BigInt(0));
      }
    };

    if (token && account) {
      fetch();
    }
  }, [token, account, getSigner, tokenContract]);

  return balance;
};

export default useTokenBalance;
