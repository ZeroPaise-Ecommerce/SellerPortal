import { combineReducers } from '@reduxjs/toolkit';
//import productReducer from '../features/product/productSlice';
import { productReducer } from './Inventory/product/reducer';
const rootReducer = combineReducers({
  product: productReducer,
  // Add other reducers here
});

export default rootReducer;