import { useEffect } from 'react';
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
    loginCount 
  } = useAuthStore();

  useEffect(() => {
    if (error) {
      console.error('Auth Error:', error);
    }
  }, [error]);

  return {
    isAuthenticated,
    address,
    chainId,
    error,
    loading,
    lastLogin,
    loginCount,
    login: authService.verify,
    logout: authService.logout,
    getStatus: authService.getAuthStatus
  };
}; 