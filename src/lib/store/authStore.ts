import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createJSONStorage } from 'zustand/middleware';

interface AuthState {
  address: string | null;
  chainId: number | null;
  isAuthenticated: boolean;
  lastLogin: Date | null;
  loginCount: number;
  error: string | null;
  loading: boolean;
  
  // Actions
  setAuth: (address: string, chainId: number) => void;
  clearAuth: () => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  incrementLoginCount: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      address: null,
      chainId: null,
      isAuthenticated: false,
      lastLogin: null,
      loginCount: 0,
      error: null,
      loading: false,

      setAuth: (address, chainId) => 
        set({ 
          address, 
          chainId, 
          isAuthenticated: true,
          lastLogin: new Date(),
          error: null
        }),

      clearAuth: () => 
        set({ 
          address: null, 
          chainId: null, 
          isAuthenticated: false,
          error: null
        }),

      setError: (error) => set({ error }),
      setLoading: (loading) => set({ loading }),
      
      incrementLoginCount: () => 
        set((state) => ({ loginCount: state.loginCount + 1 })),
    }),
    {
      name: 'auth-storage',
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