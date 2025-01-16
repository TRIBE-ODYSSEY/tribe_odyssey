/// <reference types="vite/client" />
/// <reference types="@wagmi/core" />
/// <reference types="viem" />

interface ImportMetaEnv {
	// App Configuration
	readonly VITE_APP_NAME: string
	readonly VITE_APP_URL: string
	readonly VITE_APP_DESCRIPTION: string
	readonly VITE_API_URL: string
	
	// Web3 Configuration
	readonly VITE_WALLET_CONNECT_PROJECT_ID: string
	readonly VITE_ALCHEMY_API_KEY: string
	readonly VITE_INFURA_API_KEY: string
	readonly VITE_RPC_URL: string
	
	// Contract Addresses
	readonly VITE_STAKING_CONTRACT_MAINNET: `0x${string}`
	readonly VITE_STAKING_CONTRACT_GOERLI: `0x${string}`
	readonly VITE_TRIBE_CONTRACT_MAINNET: `0x${string}`
	readonly VITE_MULTICALL_CONTRACT_MAINNET: `0x${string}`
	readonly VITE_ENS_REGISTRAR_CONTRACT_MAINNET: `0x${string}`
	
	// API Keys
	readonly VITE_OPENSEA_API_KEY: string
	readonly VITE_MORALIS_API_KEY: string
	
	// Feature Flags
	readonly VITE_ENABLE_TESTNET: 'true' | 'false'
	readonly VITE_ENABLE_STAKING: 'true' | 'false'
	readonly VITE_ENABLE_ENS: 'true' | 'false'
	
	// Social Links
	readonly VITE_DISCORD_URL: string
	readonly VITE_TWITTER_URL: string
	readonly VITE_INSTAGRAM_URL: string
	
	// Analytics
	readonly VITE_GA_TRACKING_ID: string
	
	// Random Picker Configuration
	readonly VITE_RANDOM_PICKER_BASE_URL: string
	readonly VITE_RANDOM_PICKER_USERNAME: string
	readonly VITE_RANDOM_PICKER_PASSWORD: string

	// Maintenance Mode
	readonly VITE_MAINTENANCE_MODE: 'true' | 'false'
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

// Ensure proper typing for contract addresses
type Address = `0x${string}`