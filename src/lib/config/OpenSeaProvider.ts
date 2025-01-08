//import { OpenSeaSDK } from '@opensea/sdk'
//import { ethers } from 'ethers'

//const INFURA_KEY = import.meta.env.VITE_INFURA_API_KEY
//const OPENSEA_KEY = import.meta.env.VITE_OPENSEA_API_KEY

//if (!INFURA_KEY || !OPENSEA_KEY) {
//  throw new Error('Missing required environment variables')
//}

//const provider = new ethers.providers.JsonRpcProvider(
//  `https://mainnet.infura.io/v3/${INFURA_KEY}`
//  )

//export const openseaSDK = new OpenSeaSDK(provider, {
//  chain: 'mainnet',
//  apiKey: OPENSEA_KEY
//})

//export default openseaSDK