import { boolean } from 'zod';
import { ADD_PURCHASE_ORDER__FAILURE, ADD_PURCHASE_ORDER__REQUEST, ADD_PURCHASE_ORDER__SUCCESS, GET_PURCHASE_ORDER_FAILURE, GET_PURCHASE_ORDER_REQUEST, GET_PURCHASE_ORDER_SUCCESS } from './actions';
import { PurchaseOrderState } from './types';

const initialState: PurchaseOrderState = {
  purchareOrders: [],
  editingPurchaseOrder: null,
  loading: false,
  error: null,
  stageCompleted: false
};

export const PurchaseOrderReducer = (state = initialState, action: any): PurchaseOrderState => {
  switch (action.type) {
    case ADD_PURCHASE_ORDER__REQUEST:
    case GET_PURCHASE_ORDER_REQUEST:
   
      return { ...state, loading: true, error: null };

    case GET_PURCHASE_ORDER_SUCCESS:
      return { ...state, loading: false, purchareOrders: action.payload };

    case ADD_PURCHASE_ORDER__SUCCESS:
      return {
        ...state,
        loading: false,
        editingPurchaseOrder: {
          ...state,
          editingPurchaseOrder: action.payload,
        },
        stageCompleted: true,
      };

    case GET_PURCHASE_ORDER_FAILURE:
    case ADD_PURCHASE_ORDER__FAILURE:   
      return { ...state, loading: false, error: action.payload, stageCompleted: true };    
    case 'RESET_STAGE_COMPLETED':
    return {
        ...state,
        stageCompleted: false,
    };
    default:
      return state;
  }
};
