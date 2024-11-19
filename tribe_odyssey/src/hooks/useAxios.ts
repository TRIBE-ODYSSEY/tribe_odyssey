import { useEffect } from 'react';
import axios, { InternalAxiosRequestConfig } from 'axios';

export const useAxios = () => {
  useEffect(() => {
    if (!import.meta.env.VITE_API_URL) {
      console.warn('API_URL not configured');
    }

    axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      console.log('API Request:', config);
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axios.interceptors.response.use(
      (response) => {
        console.log('API Response:', response);
        return response;
      },
      (error) => {
        console.error('API Error:', error);
        if (error.response?.status === 401) {
          // Handle unauthorized
        }
        return Promise.reject(error);
      }
    );
  }, []);
}; 