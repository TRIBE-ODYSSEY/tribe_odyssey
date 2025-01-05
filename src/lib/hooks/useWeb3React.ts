import { 
    useAccount, 
    useNetwork,
    useWalletClient,
    usePublicClient,
    type WalletClient,
    type PublicClient 
  } from 'wagmi/';
  import { 
    useModal as useConnectKitModal 
  } from 'connectkit';
  import { BrowserProvider, JsonRpcSigner } from 'ethers';
  
  // Convert WalletClient to Ethers v6 Signer
  async function walletClientToSigner(walletClient: WalletClient): Promise<JsonRpcSigner> {
    const { account, chain, transport } = walletClient;
    const network = {
      chainId: chain.id,
      name: chain.name,
      ensAddress: chain.contracts?.ensRegistry?.address
    };
    const provider = new BrowserProvider(transport, network);
    const signer = await provider.getSigner(account.address);
    return signer;
  }
  
  // Convert PublicClient to Ethers v6 Provider
  function publicClientToProvider(publicClient: PublicClient) {
    const { chain, transport } = publicClient;
    const network = {
      chainId: chain.id,
      name: chain.name,
      ensAddress: chain.contracts?.ensRegistry?.address
    };
    return new BrowserProvider(transport, network);
  }
  
  export function useWeb3React() {
    const { chain } = useNetwork();
    const { address, isConnected, isConnecting, connector } = useAccount();
    const { data: walletClient } = useWalletClient();
    const publicClient = usePublicClient();
  
    // Note: Since walletClientToSigner is now async, we return a promise
    const getSigner = async () => {
      if (!walletClient) return undefined;
      return await walletClientToSigner(walletClient);
    };
  
    const provider = publicClient ? publicClientToProvider(publicClient) : undefined;
  
    return {
      chainId: chain?.id,
      account: isConnected ? address : null,
      isConnected,
      isConnecting,
      chain,
      connector,
      getSigner, // Now returns a promise
      provider
    };
  }
  
  export function useWalletConnect() {
    const { open: openConnectModal, setOpen } = useConnectKitModal();
  
    return {
      openConnectModal: () => setOpen(true),
      openAccountModal: () => setOpen(true),
      openChainModal: () => setOpen(true)
    };
  }