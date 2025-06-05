import { combineReducers } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import addProductReducer from '@/features/product/addProductSlice';

const rootReducer = combineReducers({
  product: productReducer,
  addProduct: addProductReducer,
  // Add other reducers here
});

export default rootReducer;