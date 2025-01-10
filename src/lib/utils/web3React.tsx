import * as React from "react";
import {
  usePublicClient,
  useWalletClient,
} from "wagmi";
import { type HttpTransport } from "viem";
import { 
  createWalletClient, 
  custom, 
  type Chain,
  type WalletClient as ViemWalletClient,
  type PublicClient as ViemPublicClient,
} from 'viem'

export function publicClientToProvider(publicClient: ViemPublicClient) {
  const { chain, transport } = publicClient;
  
  if (transport.type === "fallback") {
    const providers = (transport.transports as ReturnType<HttpTransport>[]).map(
      ({ value }) => {
        if (!value?.url) return null;
        return createWalletClient({
          chain: chain as Chain,
          transport: custom(value.url as any)
        });
      }
    ).filter(Boolean);
    return providers[0]; // Return first provider as default
  }
  
  return createWalletClient({
    chain: chain as Chain,
    transport: custom(transport.url as any)
  });
}

/** Hook to convert a viem Public Client to a Provider. */
export function useProvider({ chainId }: { chainId?: number } = {}) {
  const publicClient = usePublicClient({ chainId });
  return React.useMemo(
    () => publicClientToProvider(publicClient as ViemPublicClient),
    [publicClient]
  );
}

export function walletClientToSigner(walletClient: ViemWalletClient) {
  const { account, chain, transport } = walletClient;
  
  return createWalletClient({
    account,
    chain: chain as Chain,
    transport: custom(transport)
  });
}

/** Hook to convert a viem Wallet Client to a Signer. */
export function useSigner({ chainId }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId });
  return React.useMemo(
    () => (walletClient ? walletClientToSigner(walletClient) : undefined),
    [walletClient]
  );
}
