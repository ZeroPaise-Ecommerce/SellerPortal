import { promises } from "dns";
import {PurchaseOrderAttachmentDTO, PurchaseOrderDto, PurchaseOrderItemDTO} from "./types"

export const GET_PURCHASE_ORDER_REQUEST = 'GET_PURCHASE_ORDER_REQUEST';
export const GET_PURCHASE_ORDER_SUCCESS = 'GET_PURCHASE_ORDER_SUCCESS';
export const GET_PURCHASE_ORDER_FAILURE = 'GET_PURCHASE_ORDER_FAILURE';

export const ADD_PURCHASE_ORDER__REQUEST = 'ADD_PURCHASE_ORDER__REQUEST';
export const ADD_PURCHASE_ORDER__SUCCESS = 'ADD_PURCHASE_ORDER__SUCCESS';
export const ADD_PURCHASE_ORDER__FAILURE = 'ADD_PURCHASE_ORDER__FAILURE';

export const getPurchaseOrderRequest = () => ({ type: GET_PURCHASE_ORDER_REQUEST });
export const getPurchaseOrderSuccess = (payload: any) => ({ type: GET_PURCHASE_ORDER_SUCCESS, payload });
export const getPurchaseOrderFailure = (payload: string) => ({ type: GET_PURCHASE_ORDER_FAILURE, payload });

export const addPurchaseOrderRequest = (payload: any) => ({ type: ADD_PURCHASE_ORDER__REQUEST, payload });
export const addPurchaseOrderSuccess = (payload: any) => ({ type: ADD_PURCHASE_ORDER__SUCCESS, payload });
export const addPurchaseOrderFailure = (payload: string) => ({ type: ADD_PURCHASE_ORDER__FAILURE, payload });
