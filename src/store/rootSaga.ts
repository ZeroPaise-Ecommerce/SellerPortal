import { all } from 'redux-saga/effects';
import productSaga from '../features/product/productSaga';
import addProductSaga from '@/features/product/addProductSaga';

export default function* rootSaga() {
  yield all([
    productSaga(),
    addProductSaga(),
    // Add other sagas here
  ]);
}