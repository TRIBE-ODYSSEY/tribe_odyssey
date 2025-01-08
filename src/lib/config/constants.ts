import { mainnet, goerli } from 'wagmi/chains'
import { BigNumberish } from 'ethers'

export const isZeroAddress = "0x0000000000000000000000000000000000000000"
export const isZeroAddressBigNumber = BigInt(0)

export const DefaultChainID = parseInt(
  process.env.VITE_APP_NETWORK_ID || "1",
  1
)

export const ChainList = {
  [mainnet.id]: mainnet.name,
  [goerli.id]: goerli.name
}
