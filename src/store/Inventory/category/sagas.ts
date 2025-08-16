import * as api from '../../../services/CommonService';
import { call, put, take, takeLatest } from 'redux-saga/effects';
import {
  GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS, GET_CATEGORY_FAILURE,
  UPDATE_CATEGORY_REQUEST, UPDATE_CATEGORY_SUCCESS, UPDATE_CATEGORY_FAILURE, GET_BRAND_REQUEST,
  getCategorySuccess, getCategoryFailure, updateCategorySuccess, updateCategoryFailure, getCategoryRequest,
  getBrandSuccess,
  getBrandFailure,
  getBrandRequest,
  SAVE_BRAND_REQUEST,
  SAVE_BRAND_SUCCESS,
  SAVE_BRAND_FAILURE,
  saveBrandSuccess,
  saveBrandFailure,
} from './actions';

function* fetchCategories() {
  try {
    const response = yield call(api.GetDataFromService, 'Inventory', 'category', 'all', null);
    console.log('[Saga] API Response:', response); 
    yield put(getCategorySuccess({ data: response.data }));
  } catch (error: any) {
    console.log('[Saga] Error:', error.message); 
    yield put(getCategoryFailure(error.message));
  }
}

function* fetchBrand() {
  try {
    const response = yield call(api.GetDataFromService, 'Inventory', 'category', 'brands', null);
    yield put(getBrandSuccess({ data: response.data }));
  } catch (error: any) {
    console.log('[Saga] Error:', error.message); 
    yield put(getBrandFailure(error.message));
  }
}

function* updateCategory(action: any) {
  try {
    console.log("Called with", action.payload);
    // Call your API to update the category
    const response = yield call(api.CreateActions, action.payload, 'category', 'Save', 'Inventory');
    yield put(updateCategorySuccess(response));
    // Fetch categories after successful update
    yield put(getCategoryRequest());
  } catch (error) {
    yield put(updateCategoryFailure(error));
  }
}

function* saveBrand(action: any) {
  try {
    console.log('[Saga] Saving brand:', action.payload);
    // Call API to save the brand
    const response = yield call(api.CreateActions, action.payload, 'Brand', 'Save', 'Inventory');
    console.log('[Saga] Brand saved successfully:', response);
    yield put(saveBrandSuccess(response));
    // Optionally refresh brands list after successful save
    yield put(getBrandRequest());
  } catch (error: any) {
    console.log('[Saga] Error saving brand:', error.message);
    yield put(saveBrandFailure(error.message));
  }
}

export function* CategorySaga() {
  yield takeLatest(GET_CATEGORY_REQUEST, fetchCategories);
  yield takeLatest(UPDATE_CATEGORY_REQUEST, updateCategory);
  yield takeLatest(GET_BRAND_REQUEST, fetchBrand);
  yield takeLatest(SAVE_BRAND_REQUEST, saveBrand);
}
