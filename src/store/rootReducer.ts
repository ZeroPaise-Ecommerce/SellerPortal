import { combineReducers } from '@reduxjs/toolkit';
//import productReducer from '../features/product/productSlice';
import { productReducer } from './Inventory/product/reducer';
import { supplierReducer } from './Inventory/supplier/reducer';
import { customerReducer } from './Inventory/customer/reducer';

const rootReducer = combineReducers({
  product: productReducer,
  supplier: supplierReducer, // Assuming you have a supplierReducer
  customer: customerReducer, // Add customer reducer
  // Add other reducers here
});

export default rootReducer;