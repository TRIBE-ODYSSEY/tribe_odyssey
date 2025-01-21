import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface WalletState {
  address: string | null;
  chainId: number | null;
  isAuthenticated: boolean;
  lastLogin: Date | null;
  loginCount: number;
  error: string | null;
  loading: boolean;
  nonce: string | null;
}

interface WalletActions {
  setAuth: (address: string, chainId: number) => void;
  clearAuth: () => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  incrementLoginCount: () => void;
  setNonce: (nonce: string) => void;
  clearNonce: () => void;
}

type AuthState = WalletState & WalletActions;

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // State
      address: null,
      chainId: null,
      isAuthenticated: false,
      lastLogin: null,
      loginCount: 0,
      error: null,
      loading: false,
      nonce: null,

      // Actions
      setAuth: (address, chainId) => 
        set({ 
          address, 
          chainId, 
          isAuthenticated: true,
          lastLogin: new Date(),
          error: null,
          loading: false
        }),

      clearAuth: () => 
        set({ 
          address: null, 
          chainId: null, 
          isAuthenticated: false,
          error: null,
          nonce: null
        }),

      setError: (error) => set({ error, loading: false }),
      
      setLoading: (loading) => set({ loading }),
      
      incrementLoginCount: () => 
        set((state) => ({ 
          loginCount: state.loginCount + 1,
          lastLogin: new Date() 
        })),

      setNonce: (nonce) => set({ nonce }),
      
      clearNonce: () => set({ nonce: null })
    }),
    {
      name: 'wallet-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        address: state.address,
        chainId: state.chainId,
        isAuthenticated: state.isAuthenticated,
        lastLogin: state.lastLogin,
        loginCount: state.loginCount,
      }),
    }
  )
); 