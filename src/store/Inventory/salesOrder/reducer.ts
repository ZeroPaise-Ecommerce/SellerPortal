import {
  CREATE_SALES_ORDER_REQUEST,
  CREATE_SALES_ORDER_SUCCESS,
  CREATE_SALES_ORDER_FAILURE,
  GET_SALES_ORDERS_REQUEST,
  GET_SALES_ORDERS_SUCCESS,
  GET_SALES_ORDERS_FAILURE,
  UPDATE_SALES_ORDER_REQUEST,
  UPDATE_SALES_ORDER_SUCCESS,
  UPDATE_SALES_ORDER_FAILURE,
  DELETE_SALES_ORDER_REQUEST,
  DELETE_SALES_ORDER_SUCCESS,
  DELETE_SALES_ORDER_FAILURE
} from './actions';

const initialState = {
  salesOrders: [],
  loading: false,
  error: null
};

export const salesOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SALES_ORDER_REQUEST:
    case GET_SALES_ORDERS_REQUEST:
    case UPDATE_SALES_ORDER_REQUEST:
    case DELETE_SALES_ORDER_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_SALES_ORDER_SUCCESS:
      return { ...state, loading: false, salesOrders: [...state.salesOrders, action.payload] };
    case GET_SALES_ORDERS_SUCCESS:
      return { ...state, loading: false, salesOrders: action.payload };
    case UPDATE_SALES_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        salesOrders: state.salesOrders.map(order =>
          order.salesOrderId === action.payload.salesOrderId ? action.payload : order
        )
      };
    case DELETE_SALES_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        salesOrders: state.salesOrders.filter(order => order.salesOrderId !== action.payload)
      };
    case CREATE_SALES_ORDER_FAILURE:
    case GET_SALES_ORDERS_FAILURE:
    case UPDATE_SALES_ORDER_FAILURE:
    case DELETE_SALES_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}; 