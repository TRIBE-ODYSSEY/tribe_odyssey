// Export address utilities
export * from './addressUtils'

// Export helpers
export * from './helper'

// Export merkle utilities
export * from './merkle'

// Add commonly used viem utilities
export { 
  formatEther, 
  parseEther, 
  isAddress,
  keccak256,
  isAddressEqual,
  zeroAddress 
} from 'viem'
