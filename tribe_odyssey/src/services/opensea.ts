import axios from 'axios';

const OPENSEA_API_KEY = '8336237a82ed4a9099032881f172e8be';

const openSeaApi = axios.create({
  baseURL: 'https://api.opensea.io/api/v2',
  headers: {
    'X-API-KEY': OPENSEA_API_KEY
  }
});

export interface OpenSeaStats {
  total: {
    volume: number;
    sales: number;
    average_price: number;
    num_owners: number;
    market_cap: number;
    floor_price: number;
    floor_price_symbol: string;
  };
  intervals: Array<{
    interval: string;
    volume: number;
    volume_diff: number;
    volume_change: number;
    sales: number;
    sales_diff: number;
    average_price: number;
  }>;
}

export const getCollectionStats = async (collectionSlug: string): Promise<OpenSeaStats> => {
  try {
    const response = await openSeaApi.get(`/collections/${collectionSlug}/stats`);
    return response.data;
  } catch (error) {
    console.error('OpenSea API Error:', error);
    throw error;
  }
};

export default {
  getCollectionStats
}; 