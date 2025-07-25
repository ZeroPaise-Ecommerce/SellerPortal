import { all } from 'redux-saga/effects';
import productSaga from '../features/product/productSaga';
import { productSaga1 } from './Inventory/product/sagas';
import { SupplierSaga } from './Inventory/supplier/sagas';
import { customerSaga } from './Inventory/customer/sagas';
import { PurchaseSage } from './Inventory/purchase/sagas';
import { salesOrderSaga } from './Inventory/salesOrder/sagas';

export default function* rootSaga() {
  yield all([
     productSaga(),
     productSaga1(),
    //supplierSaga(), // Assuming you have a supplierSaga
    SupplierSaga(), // Assuming you have a SupplierSaga1
    customerSaga(), // Add customer saga
    PurchaseSage(), // Purchase order saga
    salesOrderSaga(), // Sales order saga
    // Add other sagas here
  ]);
}