import { 
    useAccount, 
    useChainId,
    useWalletClient,
    usePublicClient,
} from 'wagmi';
import { 
    useModal as useConnectKitModal 
} from 'connectkit';
import { BrowserProvider, JsonRpcSigner } from 'ethers';
import { type PublicClient } from 'viem';
import { type WalletClient as ViemWalletClient } from 'viem';

// Convert WalletClient to Ethers v6 Signer
async function walletClientToSigner(walletClient: ViemWalletClient): Promise<JsonRpcSigner> {
    const { account, chain, transport } = walletClient;
    const network = {
        chainId: chain?.id,
        name: chain?.name,
        ensAddress: chain?.contracts?.ensRegistry?.address
    };
    const provider = new BrowserProvider(transport, network);
    const signer = await provider.getSigner(account?.address);
    return signer;
}

// Convert PublicClient to Ethers v6 Provider
function publicClientToProvider(publicClient: PublicClient) {
    const { chain, transport } = publicClient;
    const network = {
        chainId: chain?.id ?? 1, // Default to mainnet if chain is undefined
        name: chain?.name ?? 'mainnet',
        ensAddress: chain?.contracts?.ensRegistry?.address
    };
    return new BrowserProvider(transport, network);
}

export function useWeb3React() {
    const chainId = useChainId();
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
        chainId,
        account: isConnected ? address : null,
        isConnected,
        isConnecting,
        connector,
        getSigner, // Now returns a promise
        provider
    };
}

export function useWalletConnect() {
    const { setOpen } = useConnectKitModal();

    return {
        openConnectModal: () => setOpen(true),
        openAccountModal: () => setOpen(true),
        openChainModal: () => setOpen(true)
    };
}
export default useWeb3React;