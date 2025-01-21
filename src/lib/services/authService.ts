import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export const authService = {
  getNonce: async () => {
    try {
      const { data: nonce } = await axios.get(`${API_BASE}/auth/nonce`);
      localStorage.setItem('auth_nonce', nonce);
      return nonce;
    } catch (error) {
      throw new AuthenticationError('Failed to generate nonce');
    }
  },

  verify: async (message: { address: string, chainId: number }, signature: string) => {
    const store = useAuthStore.getState();
    store.setLoading(true);
    
    try {
      const nonce = localStorage.getItem('auth_nonce') || undefined;
      
      const { data } = await axios.post(`${API_BASE}/auth/verify`, {
        address: message.address,
        chainId: message.chainId,
        signature,
        nonce
      });

      if (data.success) {
        localStorage.removeItem('auth_nonce');
        store.setAuth(data.address, data.chainId);
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
      await axios.post(`${API_BASE}/auth/logout`);
      store.clearAuth();
      localStorage.removeItem('auth_nonce');
    } catch (error) {
      store.setError('Logout failed');
    } finally {
      store.setLoading(false);
    }
  },

  getAuthStatus: async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/auth/status`);
      return {
        isAuthenticated: data.isAuthenticated,
        address: data.address,
        chainId: data.chainId,
        lastLogin: data.lastLogin,
        loginCount: data.loginCount
      };
    } catch (error) {
      return {
        isAuthenticated: false,
        address: null,
        chainId: null,
        lastLogin: null,
        loginCount: 0
      };
    }
  }
}; 