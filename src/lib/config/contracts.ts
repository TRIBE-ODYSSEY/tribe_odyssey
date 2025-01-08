import { stakingContractAddress, tribeContractAddress } from '@src/generated'

export const getContractAddressForChain = (chainId: number) => {
  return chainId === 1 ? stakingContractAddress : stakingContractAddress[5] // mainnet or goerli
}