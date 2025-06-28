import { all } from 'redux-saga/effects';
import productSaga from '../features/product/productSaga';
import { productSaga1 } from './Inventory/product/sagas';
import { SupplierSaga } from './Inventory/supplier/sagas';

export default function* rootSaga() {
  yield all([
     productSaga(),
     productSaga1(),
    //supplierSaga(), // Assuming you have a supplierSaga
    SupplierSaga(), // Assuming you have a SupplierSaga1
    // Add other sagas here
  ]);
}