import * as api from '../../../services/CommonService';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS, GET_CATEGORY_FAILURE,
  UPDATE_CATEGORY_REQUEST, UPDATE_CATEGORY_SUCCESS, UPDATE_CATEGORY_FAILURE,
  getCategorySuccess, getCategoryFailure, updateCategorySuccess, updateCategoryFailure
} from './actions';

function* fetchCategories() {
  try {
    const response = yield call(api.GetDataFromService, 'Inventory', 'category', 'all', null);
    yield put(getCategorySuccess(response));
  } catch (error: any) {
    yield put(getCategoryFailure(error.message));
  }
}

function* updateCategory(action: any) {
  try {
    const response = yield call(api.CreateActions, action.payload, 'category', 'Save', 'Inventory');
    yield put(updateCategorySuccess(response));
  } catch (error: any) {
    yield put(updateCategoryFailure(error.message));
  }
}

export function* CategorySaga() {
  yield takeLatest(GET_CATEGORY_REQUEST, fetchCategories);
  yield takeLatest(UPDATE_CATEGORY_REQUEST, updateCategory);
}
