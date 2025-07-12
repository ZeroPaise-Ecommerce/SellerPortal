import { call, put, takeLatest } from 'redux-saga/effects';
import {
  CREATE_CUSTOMER_REQUEST,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_FAILURE,
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_FAILURE,
  GET_CUSTOMER_BY_ID_REQUEST,
  GET_CUSTOMER_BY_ID_SUCCESS,
  GET_CUSTOMER_BY_ID_FAILURE,
  UPDATE_CUSTOMER_REQUEST,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAILURE,
  DELETE_CUSTOMER_REQUEST,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAILURE
} from './actions';
import { Customer, CustomerApiResponse } from './types';
import { 
  fetchCustomers, 
  fetchCustomerById, 
  createCustomer, 
  updateCustomer, 
  deleteCustomer 
} from '../../../services/customerService';

// Sagas
function* createCustomerSaga(action: any) {
  try {
    const customer: Customer = yield call(createCustomer, action.payload);
    yield put({ type: CREATE_CUSTOMER_SUCCESS, payload: customer });
  } catch (error: any) {
    yield put({ type: CREATE_CUSTOMER_FAILURE, payload: error.message });
  }
}

function* getCustomersSaga() {
  try {
    const response: CustomerApiResponse = yield call(fetchCustomers);
    if (response.errorCode === '0') {
      yield put({ type: GET_CUSTOMERS_SUCCESS, payload: response.data });
    } else {
      yield put({ type: GET_CUSTOMERS_FAILURE, payload: response.operationMessage || 'Failed to fetch customers' });
    }
  } catch (error: any) {
    yield put({ type: GET_CUSTOMERS_FAILURE, payload: error.message });
  }
}

function* getCustomerByIdSaga(action: any) {
  try {
    const customer: Customer = yield call(fetchCustomerById, action.payload);
    yield put({ type: GET_CUSTOMER_BY_ID_SUCCESS, payload: customer });
  } catch (error: any) {
    yield put({ type: GET_CUSTOMER_BY_ID_FAILURE, payload: error.message });
  }
}

function* updateCustomerSaga(action: any) {
  try {
    const customer: Customer = yield call(updateCustomer, action.payload);
    yield put({ type: UPDATE_CUSTOMER_SUCCESS, payload: customer });
  } catch (error: any) {
    yield put({ type: UPDATE_CUSTOMER_FAILURE, payload: error.message });
  }
}

function* deleteCustomerSaga(action: any) {
  try {
    yield call(deleteCustomer, action.payload);
    yield put({ type: DELETE_CUSTOMER_SUCCESS, payload: action.payload });
  } catch (error: any) {
    yield put({ type: DELETE_CUSTOMER_FAILURE, payload: error.message });
  }
}

// Root saga
export function* customerSaga() {
  yield takeLatest(CREATE_CUSTOMER_REQUEST, createCustomerSaga);
  yield takeLatest(GET_CUSTOMERS_REQUEST, getCustomersSaga);
  yield takeLatest(GET_CUSTOMER_BY_ID_REQUEST, getCustomerByIdSaga);
  yield takeLatest(UPDATE_CUSTOMER_REQUEST, updateCustomerSaga);
  yield takeLatest(DELETE_CUSTOMER_REQUEST, deleteCustomerSaga);
} 