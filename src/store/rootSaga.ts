import { all } from 'redux-saga/effects';
import productSaga from '../features/product/productSaga';
import { productSaga1 } from './Inventory/product/sagas';
import { SupplierSaga } from './Inventory/supplier/sagas';
import { customerSaga } from './Inventory/customer/sagas';

export default function* rootSaga() {
  yield all([
     productSaga(),
     productSaga1(),
    //supplierSaga(), // Assuming you have a supplierSaga
    SupplierSaga(), // Assuming you have a SupplierSaga1
    customerSaga(), // Add customer saga
    // Add other sagas here
  ]);
}