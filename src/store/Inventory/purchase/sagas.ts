import { call, put, takeLatest } from 'redux-saga/effects';
import { ADD_PURCHASE_ORDER__REQUEST, addPurchaseOrderFailure, addPurchaseOrderRequest, addPurchaseOrderSuccess, GET_PURCHASE_ORDER_REQUEST, getPurchaseOrderSuccess } from './actions';
import * as api from '../../../services/CommonService';

export function* createPurchaseOrder(action: any) {
  try {
    const response = yield call(api.CreateActions, action.payload, "PurchaseOrder", "Save", "Inventory");
    yield put(addPurchaseOrderSuccess(response));
  } catch (error: any) {
    yield put(addPurchaseOrderFailure(error.message));
  }
}

// export function* getAllPurchaseOrders(action: any) {
//   try {
//     const response = yield call(api.GetDataFromService, "getProducts", null);
//     yield put(getInventoryItemsSuccess(response));
//   } catch (error: any) {
//     yield put(getInventoryItemsFailure(error.message));
//   }
// }

export function* PurchaseSage() {
  yield takeLatest(ADD_PURCHASE_ORDER__REQUEST, createPurchaseOrder);
  //yield takeLatest(GET_PURCHASE_ORDER_REQUEST, getAllPurchaseOrders);
  yield put({ type: 'SET_STAGE_COMPLETED', payload: true });
}
