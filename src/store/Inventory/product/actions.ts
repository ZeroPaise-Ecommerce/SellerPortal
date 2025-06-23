import { promises } from "dns";
import {Product} from "./types"

export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE';

export const ADD_BASIC_INFO_PRODUCT_REQUEST = 'ADD_BASIC_INFO_PRODUCT_REQUEST';
export const ADD_BASIC_INFO_PRODUCT_SUCCESS = 'ADD_BASIC_INFO_PRODUCT_SUCCESS';
export const ADD_BASIC_INFO_PRODUCT_FAILURE = 'ADD_BASIC_INFO_PRODUCT_FAILURE';

export const ADD_PRICING_PRODUCT_REQUEST = 'ADD_PRICING_PRODUCT_REQUEST';
export const ADD_PRICING_PRODUCT_SUCCESS = 'ADD_PRICING_PRODUCT_SUCCESS';
export const ADD_PRICING_PRODUCT_FAILURE = 'ADD_PRICING_PRODUCT_FAILURE';

export const ADD_WAREHOUSE__PRODUCT_REQUEST = 'ADD_WAREHOUSE__PRODUCT_REQUEST';
export const ADD_WAREHOUSE_PRODUCT_SUCCESS = 'ADD_WAREHOUSE_PRODUCT_SUCCESS';
export const ADD_WAREHOUSE_PRODUCT_FAILURE = 'ADD_WAREHOUSE_PRODUCT_FAILURE';

export const ADD_MEDIA__PRODUCT_REQUEST = 'ADD_MEDIA__PRODUCT_REQUEST';
export const ADD_MEDIA_PRODUCT_SUCCESS = 'ADD_MEDIA_PRODUCT_SUCCESS';
export const ADD_MEDIA_PRODUCT_FAILURE = 'ADD_MEDIA_PRODUCT_FAILURE';


export const getProductsRequest = () => ({ type: GET_PRODUCTS_REQUEST });
export const getProductsSuccess = (payload: any) => ({ type: GET_PRODUCTS_SUCCESS, payload });
export const getProductsFailure = (payload: string) => ({ type: GET_PRODUCTS_FAILURE, payload });

export const addBasicInfoProductRequest = (payload: any) => ({ type: ADD_BASIC_INFO_PRODUCT_REQUEST, payload });
export const addBasicInfoProductSuccess = (payload: any) => ({ type: ADD_BASIC_INFO_PRODUCT_SUCCESS, payload });
export const addBasicInfoProductFailure = (payload: string) => ({ type: ADD_BASIC_INFO_PRODUCT_FAILURE, payload });

export const addPricingProductRequest = (payload: any) => ({ type: ADD_PRICING_PRODUCT_REQUEST, payload });
export const addPricingProductSuccess = (payload: any) => ({ type: ADD_PRICING_PRODUCT_SUCCESS, payload });
export const addPricingProductFailure = (payload: string) => ({ type: ADD_PRICING_PRODUCT_FAILURE, payload });

export const addWarehouseProductRequest = (payload: any) => ({ type: ADD_WAREHOUSE__PRODUCT_REQUEST, payload });
export const addWarehouseProductSuccess = (payload: any) => ({ type: ADD_WAREHOUSE_PRODUCT_SUCCESS, payload });
export const addWarehouseProductFailure = (payload: string) => ({ type: ADD_WAREHOUSE_PRODUCT_FAILURE, payload });

export const addMediaProductRequest = (payload: any) => ({ type: ADD_MEDIA__PRODUCT_REQUEST, payload });
export const addMediaProductSuccess = (payload: any) => ({ type: ADD_MEDIA_PRODUCT_SUCCESS, payload });
export const addMediaProductFailure = (payload: string) => ({ type: ADD_MEDIA_PRODUCT_FAILURE, payload });