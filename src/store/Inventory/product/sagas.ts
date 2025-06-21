import { call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_PRODUCTS_REQUEST, getProductsSuccess, getProductsFailure,
  ADD_BASIC_INFO_PRODUCT_REQUEST, addBasicInfoProductSuccess, addBasicInfoProductFailure,
  addPricingProductSuccess,
  addPricingProductFailure,
  ADD_PRICING_PRODUCT_REQUEST
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
    yield put(addBasicInfoProductSuccess(newProduct));
  } catch (error: any) {
    yield put(addBasicInfoProductFailure(error.message));
  }
}

export function* createPricing(action: any) {
  try {
    const response = yield call(api.CreatePricing, action.payload);
    yield put(addPricingProductSuccess(response));
  } catch (error: any) {
    yield put(addPricingProductFailure(error.message));
  }
}

export function* productSaga1() {
  yield takeLatest(GET_PRODUCTS_REQUEST, fetchProducts);
  yield takeLatest(ADD_BASIC_INFO_PRODUCT_REQUEST, addBasicInfo);
  yield takeLatest(ADD_PRICING_PRODUCT_REQUEST, createPricing);
  yield put({ type: 'SET_STAGE_COMPLETED', payload: true });
}
