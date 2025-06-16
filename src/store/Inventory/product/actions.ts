import { promises } from "dns";
import {Product} from "./types"

export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE';

export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';

export const getProductsRequest = () => ({ type: GET_PRODUCTS_REQUEST });
export const getProductsSuccess = (payload: any) => ({ type: GET_PRODUCTS_SUCCESS, payload });
export const getProductsFailure = (payload: string) => ({ type: GET_PRODUCTS_FAILURE, payload });

export const addProductRequest = (payload: any) => ({ type: ADD_PRODUCT_REQUEST, payload });
export const addProductSuccess = (payload: any) => ({ type: ADD_PRODUCT_SUCCESS, payload });
export const addProductFailure = (payload: string) => ({ type: ADD_PRODUCT_FAILURE, payload });