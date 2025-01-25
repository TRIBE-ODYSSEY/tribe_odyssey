import { alchemy } from '@src/lib/config/alchemy';
import type { Address, Hash } from 'viem';

export async function getBalance(address: Address): Promise<bigint> {
  const balance = await alchemy.core.getBalance(address);
  return BigInt(balance.toString());
}

export async function getChainId(): Promise<number> {
  const network = await alchemy.core.getNetwork();
  return network.chainId;
}

// For transactions that require signing, we'll need to use Alchemy's Gasless Transactions
export async function sendTransaction(to: Address, value: bigint): Promise<Hash> {
  const response = await alchemy.transact.sendTransaction({
    to,
    value: value.toString(),
  });
  return response.hash as Hash;
}