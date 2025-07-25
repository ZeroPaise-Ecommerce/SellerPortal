import axiosInstance from './apiClient';
import { GatewayRequest } from '@/types/plans';
import { Command } from 'cmdk';
import { v4 as uuidv4 } from 'uuid';

// Define API functions

// Common GET method
export const fetchData = async (controller: string, baseUrl: string) => {
  const url = `${baseUrl}/${controller}`;
  const response = await axiosInstance.get(url);
  console.log(`Fetch ${controller}:`, response.data);
  return response.data;
};

export const GetDataFromService = async (targetService: string, targetController: string, actionParameter: string, queryParams?: Record<string, string>) => {
  const action = `${targetController}/${actionParameter}`; 

  const queryParamString = queryParams
    ? Object.entries(queryParams).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&")
    : "";

  const fullUrl = `http://localhost:5266/gateway/products/forwardGet?targetService=${targetService}&action=${encodeURIComponent(action)}${
    queryParamString ? `&${queryParamString}` : ""
  }`;
  //const fullUrl = `http://localhost:5266/gateway/products/forwardGet?targetService=${targetService}&action=${encodeURIComponent(action)}`;

  const res = await fetch(fullUrl, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) throw new Error('Failed to fetch data');
  return await res.json();
};

export const CreateActions = async (payLoad: any, targetController: string, actionParameter: string, targetService : string) => {
  // const dataWithId = {
  //   ...payLoad,
  //   createdDate: new Date().toISOString(),
  //   updatedDate: new Date().toISOString(),
  //   createdBy: '',
  //   updatedBy: '',
  // };
  // const dtoPayload = {'dto': payLoad}
  const payload = {
    "targetService": targetService,
    "action":`${targetController}/${actionParameter}`,
     payload: payLoad
     
  };

  const res = await fetch(`http://localhost:5266/gateway/products/forward`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    redirect: "manual"
  });

  if (!res.ok) throw new Error('Failed to add product');
  return await res.json();
};


// export const CreateActions = async (payLoad: any, actionParameter: any) => {

//   const dataWithId = {
//     ...payLoad,
//     createdDate: new Date().toISOString(),
//     updatedDate: new Date().toISOString(),
//     createdBy: '',
//     updatedBy: '',    
//   };

//   const payload = {
//     "targetService":"Inventory",
//     "action":`products/${actionParameter}`,
//     payload: dataWithId
//   };

//   const res = await fetch('http://localhost:5266/gateway/products/forward', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload),
//     redirect: "manual"
//   });
//   if (!res.ok) throw new Error('Failed to add product');
//   return await res.json();
// };


export const CreateVariant = async (variant: any) => {

  // const dataWithId = {
  //   ...variant,
  //   Id: uuidv4(), 
  //   createdDate: new Date().toISOString(),
  //   updatedDate: new Date().toISOString(),
  //   createdBy: '',
  //   updatedBy: '',    
  // };

  const payload = {
    "targetService":"Inventory",
    "action":"products/amendProductVariant",
    payload: variant
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


