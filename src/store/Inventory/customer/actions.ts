import { Customer } from './types';

// Action Types
export const CREATE_CUSTOMER_REQUEST = 'CREATE_CUSTOMER_REQUEST';
export const CREATE_CUSTOMER_SUCCESS = 'CREATE_CUSTOMER_SUCCESS';
export const CREATE_CUSTOMER_FAILURE = 'CREATE_CUSTOMER_FAILURE';

export const GET_CUSTOMERS_REQUEST = 'GET_CUSTOMERS_REQUEST';
export const GET_CUSTOMERS_SUCCESS = 'GET_CUSTOMERS_SUCCESS';
export const GET_CUSTOMERS_FAILURE = 'GET_CUSTOMERS_FAILURE';

export const GET_CUSTOMER_BY_ID_REQUEST = 'GET_CUSTOMER_BY_ID_REQUEST';
export const GET_CUSTOMER_BY_ID_SUCCESS = 'GET_CUSTOMER_BY_ID_SUCCESS';
export const GET_CUSTOMER_BY_ID_FAILURE = 'GET_CUSTOMER_BY_ID_FAILURE';

export const UPDATE_CUSTOMER_REQUEST = 'UPDATE_CUSTOMER_REQUEST';
export const UPDATE_CUSTOMER_SUCCESS = 'UPDATE_CUSTOMER_SUCCESS';
export const UPDATE_CUSTOMER_FAILURE = 'UPDATE_CUSTOMER_FAILURE';

export const DELETE_CUSTOMER_REQUEST = 'DELETE_CUSTOMER_REQUEST';
export const DELETE_CUSTOMER_SUCCESS = 'DELETE_CUSTOMER_SUCCESS';
export const DELETE_CUSTOMER_FAILURE = 'DELETE_CUSTOMER_FAILURE';

export const DELETE_CUSTOMER_CONTACT_REQUEST = 'DELETE_CUSTOMER_CONTACT_REQUEST';
export const DELETE_CUSTOMER_CONTACT_SUCCESS = 'DELETE_CUSTOMER_CONTACT_SUCCESS';
export const DELETE_CUSTOMER_CONTACT_FAILURE = 'DELETE_CUSTOMER_CONTACT_FAILURE';

export const DELETE_CUSTOMER_BANKING_REQUEST = 'DELETE_CUSTOMER_BANKING_REQUEST';
export const DELETE_CUSTOMER_BANKING_SUCCESS = 'DELETE_CUSTOMER_BANKING_SUCCESS';
export const DELETE_CUSTOMER_BANKING_FAILURE = 'DELETE_CUSTOMER_BANKING_FAILURE';

// Action Creators
export const createCustomerRequest = (customer: Customer) => ({
  type: CREATE_CUSTOMER_REQUEST,
  payload: customer
});

export const createCustomerSuccess = (customer: Customer) => ({
  type: CREATE_CUSTOMER_SUCCESS,
  payload: customer
});

export const createCustomerFailure = (error: string) => ({
  type: CREATE_CUSTOMER_FAILURE,
  payload: error
});

export const getCustomersRequest = () => ({
  type: GET_CUSTOMERS_REQUEST
});

export const getCustomersSuccess = (customers: Customer[]) => ({
  type: GET_CUSTOMERS_SUCCESS,
  payload: customers
});

export const getCustomersFailure = (error: string) => ({
  type: GET_CUSTOMERS_FAILURE,
  payload: error
});

export const getCustomerByIdRequest = (customerId: number) => ({
  type: GET_CUSTOMER_BY_ID_REQUEST,
  payload: customerId
});

export const getCustomerByIdSuccess = (customer: Customer) => ({
  type: GET_CUSTOMER_BY_ID_SUCCESS,
  payload: customer
});

export const getCustomerByIdFailure = (error: string) => ({
  type: GET_CUSTOMER_BY_ID_FAILURE,
  payload: error
});

export const updateCustomerRequest = (customer: Customer) => ({
  type: UPDATE_CUSTOMER_REQUEST,
  payload: customer
});

export const updateCustomerSuccess = (customer: Customer) => ({
  type: UPDATE_CUSTOMER_SUCCESS,
  payload: customer
});

export const updateCustomerFailure = (error: string) => ({
  type: UPDATE_CUSTOMER_FAILURE,
  payload: error
});

export const deleteCustomerRequest = (customerId: number) => ({
  type: DELETE_CUSTOMER_REQUEST,
  payload: customerId
});

export const deleteCustomerSuccess = (customerId: number) => ({
  type: DELETE_CUSTOMER_SUCCESS,
  payload: customerId
});

export const deleteCustomerFailure = (error: string) => ({
  type: DELETE_CUSTOMER_FAILURE,
  payload: error
});

export const deleteCustomerContactRequest = (contactId: string) => ({
  type: DELETE_CUSTOMER_CONTACT_REQUEST,
  payload: contactId,
});
export const deleteCustomerContactSuccess = (contactId: string) => ({
  type: DELETE_CUSTOMER_CONTACT_SUCCESS,
  payload: contactId,
});
export const deleteCustomerContactFailure = (error: string) => ({
  type: DELETE_CUSTOMER_CONTACT_FAILURE,
  payload: error,
});

export const deleteCustomerBankingRequest = (bankingId: string) => ({
  type: DELETE_CUSTOMER_BANKING_REQUEST,
  payload: bankingId,
});
export const deleteCustomerBankingSuccess = (bankingId: string) => ({
  type: DELETE_CUSTOMER_BANKING_SUCCESS,
  payload: bankingId,
});
export const deleteCustomerBankingFailure = (error: string) => ({
  type: DELETE_CUSTOMER_BANKING_FAILURE,
  payload: error,
}); 