import { combineReducers } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';

const rootReducer = combineReducers({
  product: productReducer,
  // Add other reducers here
});

export default rootReducer;