// Action types
export const GET_PURCHASE_RETURN_REQUEST = 'GET_PURCHASE_RETURN_REQUEST';
export const GET_PURCHASE_RETURN_SUCCESS = 'GET_PURCHASE_RETURN_SUCCESS';
export const GET_PURCHASE_RETURN_FAILURE = 'GET_PURCHASE_RETURN_FAILURE';

export const ADD_PURCHASE_RETURN_REQUEST = 'ADD_PURCHASE_RETURN_REQUEST';
export const ADD_PURCHASE_RETURN_SUCCESS = 'ADD_PURCHASE_RETURN_SUCCESS';
export const ADD_PURCHASE_RETURN_FAILURE = 'ADD_PURCHASE_RETURN_FAILURE';

// Action creators
export const getPurchaseReturnRequest = () => ({ type: GET_PURCHASE_RETURN_REQUEST });
export const getPurchaseReturnSuccess = (payload: any) => ({ type: GET_PURCHASE_RETURN_SUCCESS, payload });
export const getPurchaseReturnFailure = (payload: string) => ({ type: GET_PURCHASE_RETURN_FAILURE, payload });

export const addPurchaseReturnRequest = (payload: any) => ({ type: ADD_PURCHASE_RETURN_REQUEST, payload });
export const addPurchaseReturnSuccess = (payload: any) => ({ type: ADD_PURCHASE_RETURN_SUCCESS, payload });
export const addPurchaseReturnFailure = (payload: string) => ({ type: ADD_PURCHASE_RETURN_FAILURE, payload });
