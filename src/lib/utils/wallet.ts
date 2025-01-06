// Set of helper functions to facilitate wallet setup

import { type Chain, type WalletClient } from 'viem'
import { bsc } from 'viem/chains'
import getNodeUrl from "@src/lib/utils/getRcpUrl";

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (walletClient?: WalletClient) => {
  if (!walletClient) {
    console.error("Can't setup the BSC network without a wallet client")
    return false
  }

  try {
    await walletClient.addChain({
      chain: {
        id: bsc.id,
        name: 'Binance Smart Chain Mainnet',
        network: 'bsc',
        nativeCurrency: {
          name: 'BNB',
          symbol: 'bnb',
          decimals: 18,
        },
        rpcUrls: {
          default: { http: getNodeUrl() },
          public: { http: getNodeUrl() },
        },
        blockExplorers: {
          default: { name: 'BscScan', url: 'https://bscscan.com' },
        },
      } as Chain,
    })
    return true
  } catch (error) {
    console.error('Failed to setup the network in Metamask:', error)
    return false
  }
}

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
  walletClient: WalletClient,
  tokenAddress: string,
  tokenSymbol: string,
  tokenDecimals: number,
  tokenImage: string
): Promise<boolean> => {
  try {
    const wasAdded = await walletClient.watchAsset({
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: tokenImage,
      },
    })
    return wasAdded
  } catch (error) {
    console.error('Error adding token to wallet:', error)
    return false
  }
}
