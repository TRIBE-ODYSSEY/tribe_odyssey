import erc721ABI from './erc721.json'
import stakingABI from './staking.json'
import tribeABI from './tribe.json'
import multicallABI from './multicall.json'

export const ABI = {
  erc721: erc721ABI,
  staking: stakingABI,
  tribe: tribeABI,
  multicall: multicallABI
} as const