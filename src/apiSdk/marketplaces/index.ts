import axios from 'axios';
import queryString from 'query-string';
import { MarketplaceInterface, MarketplaceGetQueryInterface } from 'interfaces/marketplace';
import { GetQueryInterface } from '../../interfaces';

export const getMarketplaces = async (query?: MarketplaceGetQueryInterface) => {
  const response = await axios.get(`/api/marketplaces${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMarketplace = async (marketplace: MarketplaceInterface) => {
  const response = await axios.post('/api/marketplaces', marketplace);
  return response.data;
};

export const updateMarketplaceById = async (id: string, marketplace: MarketplaceInterface) => {
  const response = await axios.put(`/api/marketplaces/${id}`, marketplace);
  return response.data;
};

export const getMarketplaceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/marketplaces/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMarketplaceById = async (id: string) => {
  const response = await axios.delete(`/api/marketplaces/${id}`);
  return response.data;
};
