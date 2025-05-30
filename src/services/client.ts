import axiosInstance from './apiClient';

// Define API functions
export const fetchProducts = async () => {
  const response = await axiosInstance.get('/products');
  return response.data;
};