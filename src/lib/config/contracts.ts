import { getContract } from 'viem'
import { stakingAbi } from '@src/generated'

export const getStakingContract = (chainId: number) => {
  return chainId === 1 ? 
    '0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F' : 
    '0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB'
}