// Action Types
export const CREATE_SALES_ORDER_REQUEST = 'CREATE_SALES_ORDER_REQUEST';
export const CREATE_SALES_ORDER_SUCCESS = 'CREATE_SALES_ORDER_SUCCESS';
export const CREATE_SALES_ORDER_FAILURE = 'CREATE_SALES_ORDER_FAILURE';

export const GET_SALES_ORDERS_REQUEST = 'GET_SALES_ORDERS_REQUEST';
export const GET_SALES_ORDERS_SUCCESS = 'GET_SALES_ORDERS_SUCCESS';
export const GET_SALES_ORDERS_FAILURE = 'GET_SALES_ORDERS_FAILURE';

export const UPDATE_SALES_ORDER_REQUEST = 'UPDATE_SALES_ORDER_REQUEST';
export const UPDATE_SALES_ORDER_SUCCESS = 'UPDATE_SALES_ORDER_SUCCESS';
export const UPDATE_SALES_ORDER_FAILURE = 'UPDATE_SALES_ORDER_FAILURE';

export const DELETE_SALES_ORDER_REQUEST = 'DELETE_SALES_ORDER_REQUEST';
export const DELETE_SALES_ORDER_SUCCESS = 'DELETE_SALES_ORDER_SUCCESS';
export const DELETE_SALES_ORDER_FAILURE = 'DELETE_SALES_ORDER_FAILURE';

// Action Creators
export const createSalesOrderRequest = (salesOrder) => ({
  type: CREATE_SALES_ORDER_REQUEST,
  payload: salesOrder,
});
export const createSalesOrderSuccess = (salesOrder) => ({
  type: CREATE_SALES_ORDER_SUCCESS,
  payload: salesOrder,
});
export const createSalesOrderFailure = (error) => ({
  type: CREATE_SALES_ORDER_FAILURE,
  payload: error,
});

export const getSalesOrdersRequest = () => ({
  type: GET_SALES_ORDERS_REQUEST,
});
export const getSalesOrdersSuccess = (salesOrders) => ({
  type: GET_SALES_ORDERS_SUCCESS,
  payload: salesOrders,
});
export const getSalesOrdersFailure = (error) => ({
  type: GET_SALES_ORDERS_FAILURE,
  payload: error,
});

export const updateSalesOrderRequest = (salesOrder) => ({
  type: UPDATE_SALES_ORDER_REQUEST,
  payload: salesOrder,
});
export const updateSalesOrderSuccess = (salesOrder) => ({
  type: UPDATE_SALES_ORDER_SUCCESS,
  payload: salesOrder,
});
export const updateSalesOrderFailure = (error) => ({
  type: UPDATE_SALES_ORDER_FAILURE,
  payload: error,
});

export const deleteSalesOrderRequest = (salesOrderId) => ({
  type: DELETE_SALES_ORDER_REQUEST,
  payload: salesOrderId,
});
export const deleteSalesOrderSuccess = (salesOrderId) => ({
  type: DELETE_SALES_ORDER_SUCCESS,
  payload: salesOrderId,
});
export const deleteSalesOrderFailure = (error) => ({
  type: DELETE_SALES_ORDER_FAILURE,
  payload: error,
}); 