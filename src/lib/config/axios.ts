import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: 'https://tribeodyssey.net/api', // localhost:5172    
  timeout: 10000,
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  }
});

// Add request interceptor for auth token
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('authToken');
  
  if (
    token &&
    config.url &&
    !config.url.includes("https://api.thegraph.com") &&
    !config.url.includes("https://ipfs.io/")
  ) {
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - please try again');
    }
    if (!error.response) {
      throw new Error('Network error - please check your connection');
    }
    throw error;
  }
);

export default axiosInstance;