/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_APP_NAME: string
	readonly VITE_APP_URL: string
	readonly VITE_APP_DESCRIPTION: string
	readonly VITE_WALLET_CONNECT_PROJECT_ID: string
	readonly VITE_ALCHEMY_API_KEY: string
	readonly VITE_INFURA_API_KEY: string
	readonly VITE_STAKING_CONTRACT_MAINNET: string
	readonly VITE_STAKING_CONTRACT_GOERLI: string
	readonly VITE_TRIBE_CONTRACT_MAINNET: string
	readonly VITE_MULTICALL_CONTRACT_MAINNET: string
	readonly VITE_ENS_REGISTRAR_CONTRACT_MAINNET: string
	readonly VITE_OPENSEA_API_KEY: string
	readonly VITE_MORALIS_API_KEY: string
	readonly VITE_ENABLE_TESTNET: string
	readonly VITE_ENABLE_STAKING: string
	readonly VITE_ENABLE_ENS: string
	readonly VITE_DISCORD_URL: string
	readonly VITE_TWITTER_URL: string
	readonly VITE_INSTAGRAM_URL: string
	readonly VITE_GA_TRACKING_ID: string
  }
  
  interface ImportMeta {
	readonly env: ImportMetaEnv
  } 