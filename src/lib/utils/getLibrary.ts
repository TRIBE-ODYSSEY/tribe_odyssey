import { ethers } from 'ethers'

export default function getLibrary(provider: any): ethers.BrowserProvider {
  const library = new ethers.BrowserProvider(provider)
  library.pollingInterval = 15000
  return library
}
