import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchProducts } from '../../services/client';
import { fetchProductsSuccess, fetchProductsFailure, fetchProductsStart } from './productSlice';

function* fetchProductsSaga() {
  try {
    const products = yield call(fetchProducts);
    yield put(fetchProductsSuccess(products.data));
  } catch (error) {
    yield put(fetchProductsFailure(error.message || 'Failed to fetch products'));
  }
}

export default function* productSaga() {
  yield takeLatest(fetchProductsStart.type, fetchProductsSaga);
}