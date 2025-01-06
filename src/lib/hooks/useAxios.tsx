import { useEffect } from 'react';
import axios, { AxiosInstance } from 'axios';
import { useAuth } from '../contexts/AuthContext';

interface AxiosConfig {
  baseURL?: string;
  timeout?: number;
}

export function useAxios(config?: AxiosConfig): AxiosInstance {
  const { token, logout } = useAuth();
  
  const instance = axios.create({
    baseURL: config?.baseURL || `${process.env.REACT_APP_BASE_URL}/api/`,
    timeout: config?.timeout || 300000,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  useEffect(() => {
    // Request interceptor
    const requestInterceptor = instance.interceptors.request.use(
      (config) => {
        // Add auth token if exists and URL is not external
        if (
          token &&
          config.url &&
          !config.url.includes("https://api.thegraph.com") &&
          !config.url.includes("https://ipfs.io/")
        ) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    const responseInterceptor = instance.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle authentication errors
        if (error.response?.status === 401 || error.response?.status === 403) {
          logout();
          console.log("Authentication failed");
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [token, logout, instance]);

  return instance;
}

// Example usage:
// const api = useAxios();
// await api.get('/endpoint');
