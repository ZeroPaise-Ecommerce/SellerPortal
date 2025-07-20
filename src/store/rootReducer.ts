import { combineReducers } from '@reduxjs/toolkit';
import { productReducer } from './Inventory/product/reducer';
import { supplierReducer } from './Inventory/supplier/reducer';
import { PurchaseOrderReducer } from './Inventory/purchase/reducer';
import { expenseReducer } from './Inventory/purchase/reducer';
import { customerReducer } from './Inventory/customer/reducer';

const rootReducer = combineReducers({
  product: productReducer,
  supplier: supplierReducer,
  purchase: PurchaseOrderReducer,
  expense: expenseReducer,
  customer: customerReducer,
  // Add other reducers here
});

export default rootReducer;