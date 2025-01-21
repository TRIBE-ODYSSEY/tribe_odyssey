import { useEffect, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';

export const useAuth = () => {
  const { 
    isAuthenticated, 
    address, 
    chainId, 
    error, 
    loading,
    lastLogin,
    loginCount,
    nonce,
    setNonce,
    clearNonce 
  } = useAuthStore();

  useEffect(() => {
    if (error) {
      console.error('Auth Error:', error);
    }
  }, [error]);

  const login = useCallback(async (message: { address: string, chainId: number }, signature: string) => {
    try {
      const success = await authService.verify(message, signature);
      if (success) {
        clearNonce();
      }
      return success;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }, [clearNonce]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      clearNonce();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [clearNonce]);

  const getNonce = useCallback(async () => {
    try {
      const newNonce = await authService.getNonce();
      setNonce(newNonce);
      return newNonce;
    } catch (error) {
      console.error('Failed to get nonce:', error);
      return null;
    }
  }, [setNonce]);

  return {
    // State
    isAuthenticated,
    address,
    chainId,
    error,
    loading,
    lastLogin,
    loginCount,
    nonce,

    // Actions
    login,
    logout,
    getNonce,
    getStatus: authService.getAuthStatus
  };
}; 