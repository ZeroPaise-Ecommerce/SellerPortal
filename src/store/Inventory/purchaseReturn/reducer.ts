import {
  GET_PURCHASE_RETURN_REQUEST,
  GET_PURCHASE_RETURN_SUCCESS,
  GET_PURCHASE_RETURN_FAILURE,
  ADD_PURCHASE_RETURN_REQUEST,
  ADD_PURCHASE_RETURN_SUCCESS,
  ADD_PURCHASE_RETURN_FAILURE
} from './actions';
import { PurchaseReturnState } from './types';

const initialState: PurchaseReturnState = {
  purchaseReturns: [],
  loading: false,
  error: null,
  stageCompleted: false
};

export const purchaseReturnReducer = (state = initialState, action: any): PurchaseReturnState => {
  switch (action.type) {
    case GET_PURCHASE_RETURN_REQUEST:
    case ADD_PURCHASE_RETURN_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_PURCHASE_RETURN_SUCCESS:
      return { ...state, loading: false, purchaseReturns: action.payload.data };
    case ADD_PURCHASE_RETURN_SUCCESS:
      return {
        ...state,
        loading: false,
        stageCompleted: true
      };
    case GET_PURCHASE_RETURN_FAILURE:
    case ADD_PURCHASE_RETURN_FAILURE:
      return { ...state, loading: false, error: action.payload, stageCompleted: true };
    case 'RESET_STAGE_COMPLETED':
      return { ...state, stageCompleted: false };
    default:
      return state;
  }
};
