import { alchemy } from '@src/lib/config/alchemy';
import { useAuthStore } from '../store/authStore';

export const authService = {
  async signIn(): Promise<void> {
    try {
      const provider = await alchemy.config.getProvider();
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const message = `Sign in to Tribe Odyssey\nNonce: ${Date.now()}`;
      const signature = await signer.signMessage(message);
      
      // Store auth data in your state management
      useAuthStore.getState().setAuth({
        address,
        signature,
        isAuthenticated: true
      });

      // Store in localStorage for persistence
      localStorage.setItem('auth_token', signature);
      localStorage.setItem('wallet_address', address);
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  },

  async signOut(): Promise<void> {
    try {
      // Clear auth state
      useAuthStore.getState().clearAuth();
      
      // Clear localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('wallet_address');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }
};
