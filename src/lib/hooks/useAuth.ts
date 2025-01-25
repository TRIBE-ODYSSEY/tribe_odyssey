import { useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';

export function useAuth() {
  const { isAuthenticated, address } = useAuthStore();

  const signIn = useCallback(async () => {
    try {
      await authService.signIn();
      return true;
    } catch (error) {
      console.error('Sign in error:', error);
      return false;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await authService.signOut();
      return true;
    } catch (error) {
      console.error('Sign out error:', error);
      return false;
    }
  }, []);

  return {
    isAuthenticated,
    address,
    signIn,
    signOut,
  };
} 