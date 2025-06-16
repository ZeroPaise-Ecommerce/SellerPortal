import { all } from 'redux-saga/effects';
import productSaga from '../features/product/productSaga';
import { productSaga1 } from './Inventory/product/sagas';

export default function* rootSaga() {
  yield all([
    productSaga(),
    productSaga1(),
    // Add other sagas here
  ]);
}