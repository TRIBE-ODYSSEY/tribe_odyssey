import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  address: string | null;
  signature: string | null;
  isAuthenticated: boolean;
  lastLogin: Date | null;
  loginCount: number;
  error: string | null;
  loading: boolean;
  nonce: string | null;
  setAuth: (auth: { address: string; signature: string; isAuthenticated: boolean }) => void;
  clearAuth: () => void;
}

interface WalletActions {
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  incrementLoginCount: () => void;
  setNonce: (nonce: string) => void;
  clearNonce: () => void;
}

type AuthStateWithActions = AuthState & WalletActions;

export const useAuthStore = create<AuthStateWithActions>()(
  persist(
    (set) => ({
      // State
      address: null,
      signature: null,
      isAuthenticated: false,
      lastLogin: null,
      loginCount: 0,
      error: null,
      loading: false,
      nonce: null,

      // Actions
      setAuth: (auth: { address: string; signature: string; isAuthenticated: boolean }) => set({
        address: auth.address,
        signature: auth.signature,
        isAuthenticated: auth.isAuthenticated
      }),

      clearAuth: () => set({
        address: null,
        signature: null,
        isAuthenticated: false
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
        signature: state.signature,
        isAuthenticated: state.isAuthenticated,
        lastLogin: state.lastLogin,
        loginCount: state.loginCount,
      }),
    }
  )
); 