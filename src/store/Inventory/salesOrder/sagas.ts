import { call, put, takeLatest } from 'redux-saga/effects';
import {
  CREATE_SALES_ORDER_REQUEST,
  CREATE_SALES_ORDER_SUCCESS,
  CREATE_SALES_ORDER_FAILURE,
  GET_SALES_ORDERS_REQUEST,
  GET_SALES_ORDERS_SUCCESS,
  GET_SALES_ORDERS_FAILURE,
  UPDATE_SALES_ORDER_REQUEST,
  UPDATE_SALES_ORDER_SUCCESS,
  UPDATE_SALES_ORDER_FAILURE,
  DELETE_SALES_ORDER_REQUEST,
  DELETE_SALES_ORDER_SUCCESS,
  DELETE_SALES_ORDER_FAILURE
} from './actions';
import { SalesOrder } from './types';
import { fetchData, CreateActions } from '../../../services/CommonService';

const baseurl = import.meta.env.VITE_API_GATEWAY_URL;

// Create Sales Order Saga
function* createSalesOrderSaga(action: any) {
  try {
    const salesOrder: SalesOrder = yield call(CreateActions, action.payload, 'SalesOrder', 'create', 'Inventory');
    yield put({ type: CREATE_SALES_ORDER_SUCCESS, payload: salesOrder });
  } catch (error: any) {
    yield put({ type: CREATE_SALES_ORDER_FAILURE, payload: error.message });
  }
}

// Get Sales Orders Saga
function* getSalesOrdersSaga() {
  try {
    const salesOrders: SalesOrder[] = yield call(fetchData, 'SalesOrder', baseurl);
    yield put({ type: GET_SALES_ORDERS_SUCCESS, payload: salesOrders });
  } catch (error: any) {
    yield put({ type: GET_SALES_ORDERS_FAILURE, payload: error.message });
  }
}

// Update Sales Order Saga
function* updateSalesOrderSaga(action: any) {
  try {
    const salesOrder: SalesOrder = yield call(CreateActions, action.payload, 'SalesOrder', 'update', 'Inventory');
    yield put({ type: UPDATE_SALES_ORDER_SUCCESS, payload: salesOrder });
  } catch (error: any) {
    yield put({ type: UPDATE_SALES_ORDER_FAILURE, payload: error.message });
  }
}

// Delete Sales Order Saga
function* deleteSalesOrderSaga(action: any) {
  try {
    yield call(CreateActions, { salesOrderId: action.payload }, 'SalesOrder', 'delete', 'Inventory');
    yield put({ type: DELETE_SALES_ORDER_SUCCESS, payload: action.payload });
  } catch (error: any) {
    yield put({ type: DELETE_SALES_ORDER_FAILURE, payload: error.message });
  }
}

// Root saga
export function* salesOrderSaga() {
  yield takeLatest(CREATE_SALES_ORDER_REQUEST, createSalesOrderSaga);
  yield takeLatest(GET_SALES_ORDERS_REQUEST, getSalesOrdersSaga);
  yield takeLatest(UPDATE_SALES_ORDER_REQUEST, updateSalesOrderSaga);
  yield takeLatest(DELETE_SALES_ORDER_REQUEST, deleteSalesOrderSaga);
} 