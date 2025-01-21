import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const apiService = {
  get: async <T>(endpoint: string) => {
    try {
      const { data } = await axios.get<T>(`${API_BASE}${endpoint}`);
      return data;
    } catch (error) {
      throw new Error(`API GET Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  post: async <T>(endpoint: string, payload: any) => {
    try {
      const { data } = await axios.post<T>(`${API_BASE}${endpoint}`, payload);
      return data;
    } catch (error) {
      throw new Error(`API POST Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}; 