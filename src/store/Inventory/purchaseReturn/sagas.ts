import { call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_PURCHASE_RETURN_REQUEST,
  getPurchaseReturnSuccess,
  getPurchaseReturnFailure,
  ADD_PURCHASE_RETURN_REQUEST,
  addPurchaseReturnSuccess,
  addPurchaseReturnFailure
} from './actions';
import * as api from '../../../services/CommonService';

function* getAllPurchaseReturns(action: any) {
  try {
    const response = yield call(api.GetDataFromService, 'Inventory', 'PurchaseReturn', 'all', null);
    yield put(getPurchaseReturnSuccess(response));
  } catch (error: any) {
    yield put(getPurchaseReturnFailure(error.message));
  }
}

function* createPurchaseReturn(action: any) {
  try {
    const response = yield call(api.CreateActions, action.payload, 'PurchaseReturn', 'Save', 'Inventory');
    yield put(addPurchaseReturnSuccess(response));
  } catch (error: any) {
    yield put(addPurchaseReturnFailure(error.message));
  }
}

export function* purchaseReturnSaga() {
  yield takeLatest(GET_PURCHASE_RETURN_REQUEST, getAllPurchaseReturns);
  yield takeLatest(ADD_PURCHASE_RETURN_REQUEST, createPurchaseReturn);
}
