import axiosInstance from './apiClient';
import { GatewayRequest } from '@/types/plans';
import { Command } from 'cmdk';
import { v4 as uuidv4 } from 'uuid';
// Define API functions
export const fetchProducts = async () => {
  const response = await axiosInstance.get('/products');
  return response.data;
};

// export const createBasicInfo = async (requestPayload : GatewayRequest) => {
// const response = await axiosInstance.post('/gateway/products/forward', requestPayload);
//   return response.data;
// };

export const createBasicInfo = async (basicInfo: any) => {

  const dataWithId = {
    ...basicInfo,
    Id: uuidv4(), 
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
    createdBy: '',
    updatedBy: '',
    Command: 'sa' 
  };

  const payload = {
    "targetService":"Inventory",
    "action":"products/amendbasicinfo",
    payload: dataWithId
  };

  const res = await fetch('http://localhost:5266/gateway/products/forward', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    redirect: "manual"
  });
  if (!res.ok) throw new Error('Failed to add product');
  return await res.json();
};

export const CreatePricing = async (pricing: any) => {

  const dataWithId = {
    ...pricing,
    Id: uuidv4(), 
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
    createdBy: '',
    updatedBy: '',    
  };

  const payload = {
    "targetService":"Inventory",
    "action":"products/amendProductPricing",
    payload: dataWithId
  };

  const res = await fetch('http://localhost:5266/gateway/products/forward', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    redirect: "manual"
  });
  if (!res.ok) throw new Error('Failed to add product');
  return await res.json();
};
