import { combineReducers } from '@reduxjs/toolkit';
import { productReducer } from './Inventory/product/reducer';
import { supplierReducer } from './Inventory/supplier/reducer';
import { PurchaseOrderReducer } from './Inventory/purchase/reducer';
import { expenseReducer } from './Inventory/purchase/reducer';
import { customerReducer } from './Inventory/customer/reducer';
import { salesOrderReducer } from './Inventory/salesOrder/reducer';
import { purchaseReturnReducer } from './Inventory/purchaseReturn/reducer';

const rootReducer = combineReducers({
  product: productReducer,
  supplier: supplierReducer, // Assuming you have a supplierReducer
  customer: customerReducer, // Add customer reducer
  salesOrder: salesOrderReducer, // Add sales order reducer
  purchase: PurchaseOrderReducer,
  expense: expenseReducer,
  purchaseReturn: purchaseReturnReducer, // <-- Added purchaseReturn reducer
  // Add other reducers here
});

export default rootReducer;