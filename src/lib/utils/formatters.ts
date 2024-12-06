import { formatEther } from 'viem';

export const formatBalance = (value: bigint | undefined): string => {
  if (!value) return '0';
  return formatEther(value);
};

export const shortenAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};