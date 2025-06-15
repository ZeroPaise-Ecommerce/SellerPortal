import axios from "axios";
import apiInstance from "./apiClient";

// Define API functions
export const fetchProducts = async () => {
  const response = await apiInstance.get('/products');
  return response.data;
};

export const saveProductInfo = async (data) => {
  const response = await apiInstance.post("/product/info", data);
  return response.data;
};
export const saveProductVariant = async (data) => {
  const response = await apiInstance.post("/product/variant", data);
  return response.data;
};
export const savePriceAndTax = async (data) => {
  const response = await apiInstance.post("/product/price-tax", data);
  return response.data;
};
export const saveWarehouseInfo = async (data) => {
  const response = await apiInstance.post("/product/warehouse", data);
  return response.data;
};
export const saveChannelListing = async (data) => {
  const response = await apiInstance.post("/product/channel-listing", data);
  return response.data;
};
export const saveMedia = async (data) => {
  const response = await apiInstance.post("/product/media", data);
  return response.data;
};
export const saveSEOTags = async (data) => {
  const response = await apiInstance.post("/product/seo", data);
  return response.data;
};
export const saveAdditionSettings = async (data) => {
  const response = await apiInstance.post("/product/addition-settings", data);
  return response.data;
};

export default apiInstance;