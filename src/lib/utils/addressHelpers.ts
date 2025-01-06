import { getAddress } from 'viem';

/**
 * Shortens an Ethereum address to a readable format
 * @param address - The full Ethereum address
 * @param chars - Number of characters to show at start and end (default: 4)
 * @returns Shortened address in format: 0x1234...5678
 */
export const shortenAddress = (address: string, chars: number = 4): string => {
  try {
    const parsed = getAddress(address);
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
  } catch {
    return address || '';
  }
};

/**
 * Shortens a Bitcoin address
 * @param address - The full Bitcoin address
 * @param chars - Number of characters to show at start and end (default: 6)
 * @returns Shortened BTC address
 */
export const shortenBtcAddress = (address: string, chars: number = 6): string => {
  if (!address) return '';
  return `${address.substring(0, chars)}...${address.substring(
    address.length - chars
  )}`;
};

/**
 * Checks if string is valid Ethereum address
 * @param address - Address to validate
 * @returns boolean indicating if address is valid
 */
export const isValidAddress = (address: string): boolean => {
  try {
    getAddress(address);
    return true;
  } catch {
    return false;
  }
};

/**
 * Checks if address is zero address
 * @param address - Address to check
 * @returns boolean indicating if address is zero address
 */
export const isZeroAddress = (address: string): boolean => {
  try {
    return getAddress(address) === '0x0000000000000000000000000000000000000000';
  } catch {
    return false;
  }
};

/**
 * Compares two addresses for equality
 * @param address1 - First address
 * @param address2 - Second address
 * @returns boolean indicating if addresses are equal
 */
export const areAddressesEqual = (
  address1: string,
  address2: string
): boolean => {
  try {
    return getAddress(address1) === getAddress(address2);
  } catch {
    return false;
  }
};

/**
 * Formats an address to checksum format
 * @param address - Address to format
 * @returns Checksum formatted address or empty string if invalid
 */
export const formatAddress = (address: string): string => {
  try {
    return getAddress(address);
  } catch {
    return '';
  }
};

/**
 * Checks if string might be an address
 * @param address - String to check
 * @returns boolean indicating if string matches address pattern
 */
export const isPossibleAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Gets address from ENS name using provider
 * @param ensName - ENS name to resolve
 * @param provider - Web3 provider
 * @returns Resolved address or null
 */
export const getAddressFromENS = async (
  ensName: string,
  provider: any
): Promise<string | null> => {
  try {
    const address = await provider.resolveName(ensName);
    return address;
  } catch {
    return null;
  }
};

export const getSubgraphEndpoint = () => {
  return process.env.VITE_APP_SUBGRAPH_URL;
};

export default {
  shortenAddress,
  shortenBtcAddress,
  isValidAddress,
  isZeroAddress,
  areAddressesEqual,
  formatAddress,
  isPossibleAddress,
  getAddressFromENS,
  getSubgraphEndpoint
};
