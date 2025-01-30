import axios from "axios";
import { logout, useAuthDispatch, useAuthState } from "@src/lib/context/AuthContext";

export function useAxios() {
  const { token } = useAuthState();
  const dispatch = useAuthDispatch();

  // Remove any existing interceptors
  const requestInterceptor = axios.interceptors.request.use((config) => {
    // Set base URL
    config.baseURL = import.meta.env.VITE_API_URL || 'https://localhost:5172';
    
    // Set headers
    if (token && 
        config.url && 
        !config.url.includes("https://api.thegraph.com") && 
        !config.url.includes("https://ipfs.io/")
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    
    // Set timeout
    config.timeout = 30000;

    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  const responseInterceptor = axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        logout(dispatch);
        console.log("Auth failed");
      }

      // Retry logic
      const config = error.config;
      if (!config || !config.retries) {
        return Promise.reject(error);
      }
      
      config.retries -= 1;
      if (config.retries === 0) {
        return Promise.reject(error);
      }

      // Retry after delay
      await new Promise(resolve => setTimeout(resolve, config.retryDelay));
      return axios(config);
    }
  );

  // Clean up interceptors when component unmounts
  return () => {
    axios.interceptors.request.eject(requestInterceptor);
    axios.interceptors.response.eject(responseInterceptor);
  };
}
