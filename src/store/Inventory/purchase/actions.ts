import { promises } from "dns";
import {PurchaseOrderAttachmentDTO, PurchaseOrderDto, PurchaseOrderItemDTO} from "./types"

export const GET_PURCHASE_ORDER_REQUEST = 'GET_PURCHASE_ORDER_REQUEST';
export const GET_PURCHASE_ORDER_SUCCESS = 'GET_PURCHASE_ORDER_SUCCESS';
export const GET_PURCHASE_ORDER_FAILURE = 'GET_PURCHASE_ORDER_FAILURE';

export const ADD_PURCHASE_ORDER__REQUEST = 'ADD_PURCHASE_ORDER__REQUEST';
export const ADD_PURCHASE_ORDER__SUCCESS = 'ADD_PURCHASE_ORDER__SUCCESS';
export const ADD_PURCHASE_ORDER__FAILURE = 'ADD_PURCHASE_ORDER__FAILURE';

export const CREATE_EXPENSE_REQUEST = 'CREATE_EXPENSE_REQUEST';
export const CREATE_EXPENSE_SUCCESS = 'CREATE_EXPENSE_SUCCESS';
export const CREATE_EXPENSE_FAILURE = 'CREATE_EXPENSE_FAILURE';

export const GET_EXPENSE_REQUEST = 'GET_EXPENSE_REQUEST';
export const GET_EXPENSE_SUCCESS = 'GET_EXPENSE_SUCCESS';
export const GET_EXPENSE_FAILURE = 'GET_EXPENSE_FAILURE';

export const getPurchaseOrderRequest = () => ({ type: GET_PURCHASE_ORDER_REQUEST });
export const getPurchaseOrderSuccess = (payload: any) => ({ type: GET_PURCHASE_ORDER_SUCCESS, payload });
export const getPurchaseOrderFailure = (payload: string) => ({ type: GET_PURCHASE_ORDER_FAILURE, payload });

export const addPurchaseOrderRequest = (payload: any) => ({ type: ADD_PURCHASE_ORDER__REQUEST, payload });
export const addPurchaseOrderSuccess = (payload: any) => ({ type: ADD_PURCHASE_ORDER__SUCCESS, payload });
export const addPurchaseOrderFailure = (payload: string) => ({ type: ADD_PURCHASE_ORDER__FAILURE, payload });

export const createExpenseRequest = (payload: any) => ({ type: CREATE_EXPENSE_REQUEST, payload });
export const createExpenseSuccess = (payload: any) => ({ type: CREATE_EXPENSE_SUCCESS, payload });
export const createExpenseFailure = (payload: string) => ({ type: CREATE_EXPENSE_FAILURE, payload });

export const getExpenseRequest = () => ({ type: GET_EXPENSE_REQUEST });
export const getExpenseSuccess = (payload: any) => ({ type: GET_EXPENSE_SUCCESS, payload });
export const getExpenseFailure = (payload: string) => ({ type: GET_EXPENSE_FAILURE, payload });
