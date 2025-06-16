import { call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_PRODUCTS_REQUEST, getProductsSuccess, getProductsFailure,
  ADD_PRODUCT_REQUEST, addProductSuccess, addProductFailure
} from './actions';
import * as api from '../../../services/productService';

function* fetchProducts() {
  try {
    const products = yield call(api.fetchProducts);
    yield put(getProductsSuccess(products));
  } catch (error: any) {
    yield put(getProductsFailure(error.message));
  }
}

export function* addBasicInfo(action: any) {
  try {
    const newProduct = yield call(api.createBasicInfo, action.payload);
    yield put(addProductSuccess(newProduct));
  } catch (error: any) {
    yield put(addProductFailure(error.message));
  }
}

export function* productSaga1() {
  yield takeLatest(GET_PRODUCTS_REQUEST, fetchProducts);
  yield takeLatest(ADD_PRODUCT_REQUEST, addBasicInfo);
  yield put({ type: 'SET_STAGE_COMPLETED', payload: true });
}
