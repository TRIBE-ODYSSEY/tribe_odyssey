import { Address } from 'viem'

interface ContractAddresses {
  tribe: Address
  staking: Address
  multicall: Address
}

export const CONTRACT_ADDRESSES: Record<number, ContractAddresses> = {
  1: {
    tribe: '0x77F649385cA963859693C3d3299D36dfC7324EB9' as Address,
    staking: '0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F' as Address,
    multicall: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441' as Address,
  },
  5: {
    tribe: '0x13a0BD6EB5124AC16fE5fA2851a5C49Dc1E8BEcF' as Address,
    staking: '0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB' as Address,
    multicall: '0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821' as Address,
  },
}