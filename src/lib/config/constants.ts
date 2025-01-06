import { zeroAddress } from 'viem'
import { mainnet, goerli } from 'wagmi/chains'

export const DefaultChainID = parseInt(
  process.env.VITE_APP_NETWORK_ID || "0",
  1
)

export const ChainList = {
  [mainnet.id]: mainnet.name,
  [goerli.id]: goerli.name
}
