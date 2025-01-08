/// <reference types="vite/client" />
/// <reference types="@wagmi/core" />
/// <reference types="ethers" />

interface ImportMetaEnv {
	readonly VITE_APP_API_URL: string;
	readonly VITE_APP_NETWORK_ID: string;
	readonly VITE_APP_CHAIN_ID: string;
	readonly VITE_APP_CHAIN_NAME: string;
	readonly VITE_APP_CHAIN_RPC_URL: string;
	readonly VITE_WALLET_CONNECT_PROJECT_ID: string;
	readonly VITE_ALCHEMY_ID: string;
	readonly VITE_ENABLE_TESTNETS: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}