import { boolean } from 'zod';
import { ADD_PURCHASE_ORDER__FAILURE, ADD_PURCHASE_ORDER__REQUEST, ADD_PURCHASE_ORDER__SUCCESS, GET_PURCHASE_ORDER_FAILURE, GET_PURCHASE_ORDER_REQUEST, GET_PURCHASE_ORDER_SUCCESS } from './actions';
import { PurchaseOrderState } from './types';
import { CREATE_EXPENSE_REQUEST, CREATE_EXPENSE_SUCCESS, CREATE_EXPENSE_FAILURE } from './actions';
import { ExpenseState } from './types';
import { GET_EXPENSE_REQUEST, GET_EXPENSE_SUCCESS, GET_EXPENSE_FAILURE } from './actions';
import {
  CREATE_PURCHASE_RECEIVES_REQUEST,
  CREATE_PURCHASE_RECEIVES_SUCCESS,
  CREATE_PURCHASE_RECEIVES_FAILURE,
} from './actions';

const initialState: PurchaseOrderState = {
  purchareOrders: [],
  editingPurchaseOrder: null,
  loading: false,
  error: null,
  stageCompleted: false
};

const initialExpenseState: ExpenseState = {
  expenses: [],
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
      return { ...state, loading: false, purchareOrders: action.payload.data };

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

export const expenseReducer = (state = initialExpenseState, action: any): ExpenseState => {
  switch (action.type) {
    case CREATE_EXPENSE_REQUEST:
      return { ...state, loading: true, error: null, stageCompleted: false };
    case CREATE_EXPENSE_SUCCESS:
      return {
        ...state,
        loading: false,
        expenses: [...state.expenses, action.payload],
        stageCompleted: true
      };
    case CREATE_EXPENSE_FAILURE:
      return { ...state, loading: false, error: action.payload, stageCompleted: true };
    case GET_EXPENSE_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_EXPENSE_SUCCESS:
      return { ...state, loading: false, expenses: action.payload.data };
    case GET_EXPENSE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case 'RESET_STAGE_COMPLETED':
      return { ...state, stageCompleted: false };
    default:
      return state;
  }
};
