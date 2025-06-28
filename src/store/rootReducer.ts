import { combineReducers } from '@reduxjs/toolkit';
//import productReducer from '../features/product/productSlice';
import { productReducer } from './Inventory/product/reducer';
import { supplierReducer } from './Inventory/supplier/reducer';
const rootReducer = combineReducers({
  product: productReducer,
  supplier: supplierReducer, // Assuming you have a supplierReducer
  // Add other reducers here
});

export default rootReducer;