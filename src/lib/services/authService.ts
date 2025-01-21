import axios from 'axios';
import { generateNonce, SiweMessage } from 'siwe';
import { useAuthStore } from '../store/authStore';

const API_BASE = import.meta.env.VITE_API_URL || 'http://tribeodyssey.net/api';

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export const authService = {
  getNonce: async () => {
    try {
      const nonce = generateNonce();
      localStorage.setItem('siwe_nonce', nonce);
      return nonce;
    } catch (error) {
      throw new AuthenticationError('Failed to generate nonce');
    }
  },

  verify: async (message: string, signature: string) => {
    const store = useAuthStore.getState();
    store.setLoading(true);
    
    try {
      const siweMessage = new SiweMessage(message);
      const nonce = localStorage.getItem('siwe_nonce') || undefined;
      
      const fields = await siweMessage.verify({ 
        signature,
        nonce 
      });

      if (fields.success) {
        localStorage.removeItem('siwe_nonce');
        store.setAuth(fields.data.address, fields.data.chainId);
        store.incrementLoginCount();
        return true;
      }
      
      throw new AuthenticationError('Verification failed');
    } catch (error) {
      store.setError(error instanceof Error ? error.message : 'Unknown error');
      return false;
    } finally {
      store.setLoading(false);
    }
  },

  logout: async () => {
    const store = useAuthStore.getState();
    store.setLoading(true);
    
    try {
      store.clearAuth();
      localStorage.removeItem('siwe_nonce');
    } catch (error) {
      store.setError('Logout failed');
    } finally {
      store.setLoading(false);
    }
  },

  getAuthStatus: () => {
    const { isAuthenticated, address, chainId, lastLogin, loginCount } = useAuthStore.getState();
    return {
      isAuthenticated,
      address,
      chainId,
      lastLogin,
      loginCount
    };
  }
}; 