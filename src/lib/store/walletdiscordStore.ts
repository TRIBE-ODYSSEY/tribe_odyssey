import { create } from 'zustand';

interface WalletDiscordButtonState {
    isConnected: boolean;
  setIsConnected: (connected: boolean) => void;
}
export const useWalletDiscordButtonStore = create<WalletDiscordButtonState>((set) => ({
    isConnected: false, 
    setIsConnected : (connected: boolean) => set({isConnected: connected})
  }));