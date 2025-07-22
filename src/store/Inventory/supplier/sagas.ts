import * as api from '../../../services/CommonService';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
  GET_SUPPLIER_REQUEST, GET_SUPPLIER_SUCCESS, GET_SUPPLIER_FAILURE,
  CREATE_SUPPLIER_ID_REQUEST, CREATE_SUPPLIER_ID_SUCCESS, CREATE_SUPPLIER_ID_FAILURE,
    CREATE_SUPPLIER_REQUEST, CREATE_SUPPLIER_SUCCESS, CREATE_SUPPLIER_FAILURE, 
    createSupplierSuccess,
    createSupplierFailure,
    getSupplierSuccess,
    getSupplierailure} from './actions';

//  function* fetchSuppliers() {
//   try {
//     const suppliers = yield call(api.fetchSuppliers);
//     yield put({ type: GET_SUPPLIER_SUCCESS, payload: suppliers });
//   } catch (error: any) {
//     yield put({ type: GET_SUPPLIER_FAILURE, payload: error.message });
//   }
// }

// export function* createSupplier(action: any) {
//   try {
//     const newProduct = yield call(api.createSupplier, action.payload);
//     yield put(createSupplierSuccess(newProduct));
//   } catch (error: any) {
//     yield put(createSupplierFailure(error.message));
//   }
// }


export function* SupplierSaga() {
  yield takeLatest(GET_SUPPLIER_REQUEST, fetchSuppliers);
   yield takeLatest(CREATE_SUPPLIER_REQUEST, createSupplier);
  // yield put({ type: 'SET_STAGE_COMPLETED', payload: true });
}

export function* fetchSuppliers(action: any) {
  try {
    const response = yield call(api.GetDataFromService, "Inventory", "supplier",  "getSupplier", null);
    yield put(getSupplierSuccess(response));
  } catch (error: any) {
    yield put(getSupplierailure(error.message));
  }
}

export function* createSupplier(action: any) {
  try {
    const newProduct = yield call(api.CreateActions, action.payload, "supplier", "createSupplier", "Inventory");
    yield put(createSupplierSuccess(newProduct));
  } catch (error: any) {
    yield put(createSupplierFailure(error.message));
  }
}