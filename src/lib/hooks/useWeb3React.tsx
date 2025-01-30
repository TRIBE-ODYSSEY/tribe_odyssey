import { useAccount, useChainId } from "wagmi";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import { useEthersSigner, useEthersProvider } from "@src/lib/viem/clients";
export function useWeb3React() {
  const { address, connector, isConnected, isConnecting } = useAccount();
  const chainId = useChainId();
  const signer = useEthersSigner({ chainId });
  const provider = useEthersProvider({ chainId });

  return {
    account: isConnected ? address : null, // TODO: migrate using `isConnected` instead of account to check wallet auth
    isConnected,
    isConnecting,
    connector,
    signer,
    provider,
  };
}

export function useWalletConnect() {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();

  return {
    openConnectModal,
    openAccountModal,
    openChainModal,
  };
}
