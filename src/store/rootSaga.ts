import { all } from 'redux-saga/effects';
import productSaga from '../features/product/productSaga';
import { productSaga1 } from './Inventory/product/sagas';
import { SupplierSaga } from './Inventory/supplier/sagas';
import { PurchaseSage } from './Inventory/purchase/sagas';

export default function* rootSaga() {
  yield all([
     productSaga(),
     productSaga1(),
    //supplierSaga(), // Assuming you have a supplierSaga
    SupplierSaga(), // Assuming you have a SupplierSaga1
    PurchaseSage(), // Purchase order saga
    // Add other sagas here
  ]);
}