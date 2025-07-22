import { call, put, takeLatest } from 'redux-saga/effects';
import { ADD_PURCHASE_ORDER__REQUEST, addPurchaseOrderFailure, addPurchaseOrderRequest, addPurchaseOrderSuccess, GET_PURCHASE_ORDER_REQUEST,  getPurchaseOrderFailure, getPurchaseOrderSuccess, CREATE_EXPENSE_REQUEST, createExpenseSuccess, createExpenseFailure, GET_EXPENSE_REQUEST, getExpenseSuccess, getExpenseFailure } from './actions';
import * as api from '../../../services/CommonService';

export function* createPurchaseOrder(action: any) {
  try {
    const response = yield call(api.CreateActions, action.payload, "PurchaseOrder", "Save", "Inventory");
    yield put(addPurchaseOrderSuccess(response));
  } catch (error: any) {
    yield put(addPurchaseOrderFailure(error.message));
  }
}

export function* getAllPurchaseOrders(action: any) {
  try {
    const response = yield call(api.GetDataFromService, "Inventory", "PurchaseOrder", "all", null, );
    yield put(getPurchaseOrderSuccess(response));
  } catch (error: any) {
    yield put(getPurchaseOrderFailure(error.message));
  }
}

export function* createExpense(action: any) {
  
  try {
    const response = yield call(api.CreateActions, action.payload, "Expense", "Save", "Inventory");
    yield put(createExpenseSuccess(response));
  } catch (error: any) {
    yield put(createExpenseFailure(error.message));
  }
}

export function* getExpense(action: any) {
  try {
    const response = yield call(api.GetDataFromService, "Inventory", "Expense", "all", null);
    yield put(getExpenseSuccess(response));
  } catch (error: any) {
    yield put(getExpenseFailure(error.message));
  }
}

export function* PurchaseSage() {
  yield takeLatest(ADD_PURCHASE_ORDER__REQUEST, createPurchaseOrder);
  yield takeLatest(GET_PURCHASE_ORDER_REQUEST, getAllPurchaseOrders);
  yield takeLatest(CREATE_EXPENSE_REQUEST, createExpense);
  yield takeLatest(GET_EXPENSE_REQUEST, getExpense);
  yield put({ type: 'SET_STAGE_COMPLETED', payload: true });
}
