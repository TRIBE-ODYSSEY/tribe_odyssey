import { MetaMaskInpageProvider } from "@metamask/providers";
import { CoinbaseWalletProvider } from "@coinbase/wallet-sdk";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { LedgerHQFrameProvider } from "@ledgerhq/iframe-provider";
import { WalletConnectProvider } from "@walletconnect/web3-provider";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider | CoinbaseWalletProvider | WalletConnectProvider;
    solana?: PhantomWalletAdapter;
    ledgerwallet?: LedgerHQFrameProvider;
    walletLinkExtension?: any;
    trustwallet?: any;
    binanceChainWallet?: any;
    tally?: any;
    brave?: {
      ethereum?: MetaMaskInpageProvider;
      solana?: PhantomWalletAdapter;
    };
    okxwallet?: MetaMaskInpageProvider;
    rainbow?: MetaMaskInpageProvider;
    providers?: Array<MetaMaskInpageProvider | CoinbaseWalletProvider | WalletConnectProvider>;
  }

  interface WindowProvider {
    isMetaMask?: boolean;
    isCoinbaseWallet?: boolean;
    isPhantom?: boolean;
    isLedger?: boolean;
    isTrust?: boolean;
    isBinance?: boolean;
    isOKX?: boolean;
    isRainbow?: boolean;
    isTally?: boolean;
    isBrave?: boolean;
  }
}

export {}; 