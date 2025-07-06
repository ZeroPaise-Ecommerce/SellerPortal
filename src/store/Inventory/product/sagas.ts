import { call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_PRODUCTS_REQUEST, getProductsSuccess, getProductsFailure,
  ADD_BASIC_INFO_PRODUCT_REQUEST, addBasicInfoProductSuccess, addBasicInfoProductFailure,
  addPricingProductSuccess,
  addPricingProductFailure,
  ADD_PRICING_PRODUCT_REQUEST,
  addWarehouseProductRequest,
  ADD_WAREHOUSE__PRODUCT_REQUEST,
  addWarehouseProductSuccess,
  addWarehouseProductFailure,
  addMediaProductSuccess,
  addMediaProductFailure,
  ADD_MEDIA__PRODUCT_REQUEST,
  addSEOProductSuccess,
  addSEOProductFailure,
  ADD_SEO__PRODUCT_REQUEST,
  addAdditionalProductSuccess,
  addAdditionalProductFailure,
  ADD_ADDITIONAL__PRODUCT_REQUEST,
  addVariantProductSuccess,
  addVariantProductFailure,
  ADD_VARIANT_REQUEST,
  addChannelsProductSuccess,
  addChannelsProductFailure,
  ADD_CHANNELS_REQUEST,
  GET_INVENTORY_ITEMS_REQUEST,
  getInventoryItemsSuccess,
  getInventoryItemsFailure
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
    const response = yield call(api.CreateActions, action.payload, "amendProductPricing");
    yield put(addPricingProductSuccess(response));
  } catch (error: any) {
    yield put(addPricingProductFailure(error.message));
  }
}

export function* createWarehouse(action: any) {
  try {
    const response = yield call(api.CreateActions, action.payload, "amendProductBatch");
    yield put(addWarehouseProductSuccess(response));
  } catch (error: any) {
    yield put(addWarehouseProductFailure(error.message));
  }
}

export function* createMedia(action: any) {
  try {
    const response = yield call(api.CreateActions, action.payload, "amendMedia");
    yield put(addMediaProductSuccess(response));
  } catch (error: any) {
    yield put(addMediaProductFailure(error.message));
  }
}

export function* createSEO(action: any) {
  try {
    const response = yield call(api.CreateActions, action.payload, "amendSeoTag");
    yield put(addSEOProductSuccess(response));
  } catch (error: any) {
    yield put(addSEOProductFailure(error.message));
  }
}


export function* createAdditional(action: any) {
  try {
    const response = yield call(api.CreateActions, action.payload, "amendAdditionalSettings");
    yield put(addAdditionalProductSuccess(response));
  } catch (error: any) {
    yield put(addAdditionalProductFailure(error.message));
  }
}

export function* createVariant(action: any) {
  try {
    const response = yield call(api.CreateActions, action.payload, "amendProductVariant");
    yield put(addVariantProductSuccess(response));
  } catch (error: any) {
    yield put(addVariantProductFailure(error.message));
  }
}

export function* createChannels(action: any) {
  try {
    const response = yield call(api.CreateActions, action.payload, "amendChannelListing");
    yield put(addChannelsProductSuccess(response));
  } catch (error: any) {
    yield put(addChannelsProductFailure(error.message));
  }
}

export function* getInventoryItems(action: any) {
  try {
    const response = yield call(api.GetDataFromService, "getProducts", null);
    yield put(getInventoryItemsSuccess(response));
  } catch (error: any) {
    yield put(getInventoryItemsFailure(error.message));
  }
}

export function* productSaga1() {
  yield takeLatest(GET_PRODUCTS_REQUEST, fetchProducts);
  yield takeLatest(ADD_BASIC_INFO_PRODUCT_REQUEST, addBasicInfo);
  yield takeLatest(ADD_PRICING_PRODUCT_REQUEST, createPricing);
  yield takeLatest(ADD_WAREHOUSE__PRODUCT_REQUEST, createWarehouse);
  yield takeLatest(ADD_MEDIA__PRODUCT_REQUEST, createMedia);
  yield takeLatest(ADD_SEO__PRODUCT_REQUEST, createSEO);
  yield takeLatest(ADD_ADDITIONAL__PRODUCT_REQUEST, createAdditional);
  yield takeLatest(ADD_VARIANT_REQUEST, createVariant);
  yield takeLatest(ADD_CHANNELS_REQUEST, createChannels);
  yield takeLatest(GET_INVENTORY_ITEMS_REQUEST, getInventoryItems);
  yield put({ type: 'SET_STAGE_COMPLETED', payload: true });
}
