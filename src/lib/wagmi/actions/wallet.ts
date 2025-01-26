import { useAlchemy } from '@src/lib/hooks/useAlchemy';
import type { Address, Hash } from 'viem';

export async function getBalance(address: Address): Promise<bigint> {
  try {
    const provider = await useAlchemy().getProvider();
    const balance = await provider.getBalance(address);
    return balance;
  } catch (error) {
    console.error('Balance fetch error:', error);
    throw error;
  }
}

export async function getChainId(): Promise<number> {
  try {
    const provider = await useAlchemy().getProvider();
    const network = await provider.getNetwork();
    return Number(network.chainId);
  } catch (error) {
    console.error('Chain ID fetch error:', error);
    throw error;
  }
}

// For transactions that require signing, we'll need to use Alchemy's Gasless Transactions
export async function sendTransaction(to: Address, value: bigint): Promise<Hash> {
  try {
    const signer = await useAlchemy().getSigner();
    const tx = await signer.sendTransaction({
      to,
      value: value,
    });
    const receipt = await tx.wait();
    return receipt?.hash as Hash;
  } catch (error) {
    console.error('Transaction error:', error);
    throw error;
  }
}

export async function signMessage(message: string): Promise<string> {
  try {
    const signer = await useAlchemy().getSigner();
    return await signer.signMessage(message);
  } catch (error) {
    console.error('Message signing error:', error);
    throw error;
  }
}