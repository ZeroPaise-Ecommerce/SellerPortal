import { combineReducers } from '@reduxjs/toolkit';
//import productReducer from '../features/product/productSlice';
import { productReducer } from './Inventory/product/reducer';
import { supplierReducer } from './Inventory/supplier/reducer';
import { PurchaseOrderReducer } from './Inventory/purchase/reducer';
import { expenseReducer } from './Inventory/purchase/reducer';
const rootReducer = combineReducers({
  product: productReducer,
  supplier: supplierReducer,
  purchase: PurchaseOrderReducer,
  expense: expenseReducer
  // Add other reducers here
});

export default rootReducer;