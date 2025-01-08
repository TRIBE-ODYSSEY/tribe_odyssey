/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_APP_NETWORK_ID: string;
	readonly VITE_RPC_URL: string;
	readonly VITE_INFURA_API_KEY: string;
	readonly VITE_ALCHEMY_API_KEY: string;
	readonly VITE_OPENSEA_API_KEY: string;
	readonly VITE_ETHERSCAN_API_KEY: string;
	readonly VITE_TRIBE_CONTRACT: string;
	readonly VITE_STAKING_CONTRACT: string;
	readonly VITE_MULTICALL_CONTRACT: string;
	readonly VITE_TRIBE_CONTRACT_TESTNET: string;
	readonly VITE_STAKING_CONTRACT_TESTNET: string;
	readonly VITE_MULTICALL_CONTRACT_TESTNET: string;
	readonly VITE_API_URL: string;
	readonly VITE_SUBGRAPH_URL: string;
	readonly VITE_IPFS_GATEWAY: string;
	readonly VITE_AUTH_DOMAIN: string;
	readonly VITE_JWT_SECRET: string;
	readonly VITE_ENABLE_TESTNET: string;
	readonly VITE_ENABLE_STAKING: string;
	readonly VITE_ENABLE_MARKETPLACE: string;
	readonly VITE_GA_TRACKING_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
