import { useAccount, useBalance, useReadContract } from 'wagmi'
import { erc20Abi } from '@src/generated'

const useTokenBalance = (tokenAddress: string) => {
  const { address } = useAccount()
  
  const { data: nativeBalance } = useBalance({
    address,
  })
  
  const { data: tokenBalance } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
  })

  return tokenAddress === zeroAddress ? 
    (nativeBalance?.value ?? BigInt(0)) : 
    (tokenBalance ?? BigInt(0))
}

export default useTokenBalance;
