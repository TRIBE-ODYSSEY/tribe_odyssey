export const CONTRACT_ADDRESSES = {
  STAKING: {
    1: '0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F',
    5: '0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB'
  },
  TRIBE: {
    1: '0x77F649385cA963859693C3d3299D36dfC7324EB9'
  }
} as const

export const getStakingAddress = (chainId: number): `0x${string}` => {
  return CONTRACT_ADDRESSES.STAKING[chainId as keyof typeof CONTRACT_ADDRESSES.STAKING] as `0x${string}`
}