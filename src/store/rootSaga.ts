import { all } from 'redux-saga/effects';
import productSaga from '../features/product/productSaga';

export default function* rootSaga() {
  yield all([
    productSaga(),
    // Add other sagas here
  ]);
}