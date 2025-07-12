import { CustomerState } from './types';
import {
  CREATE_CUSTOMER_REQUEST,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_FAILURE,
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_FAILURE,
  GET_CUSTOMER_BY_ID_REQUEST,
  GET_CUSTOMER_BY_ID_SUCCESS,
  GET_CUSTOMER_BY_ID_FAILURE,
  UPDATE_CUSTOMER_REQUEST,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAILURE,
  DELETE_CUSTOMER_REQUEST,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAILURE,
  DELETE_CUSTOMER_CONTACT_SUCCESS,
  DELETE_CUSTOMER_CONTACT_FAILURE,
  DELETE_CUSTOMER_BANKING_REQUEST,
  DELETE_CUSTOMER_BANKING_SUCCESS,
  DELETE_CUSTOMER_BANKING_FAILURE
} from './actions';

const initialState: CustomerState = {
  customers: [],
  loading: false,
  error: null,
  stageCompleted: false
};

export const customerReducer = (state = initialState, action: any): CustomerState => {
  switch (action.type) {
    // Create Customer
    case CREATE_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case CREATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        customers: [...state.customers, action.payload],
        stageCompleted: true
      };
    case CREATE_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    // Get All Customers
    case GET_CUSTOMERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        loading: false,
        customers: action.payload,
        stageCompleted: true
      };
    case GET_CUSTOMERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    // Get Customer By ID
    case GET_CUSTOMER_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_CUSTOMER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        customers: state.customers.map(customer => 
          customer.customerId === action.payload.customerId ? action.payload : customer
        ),
        stageCompleted: true
      };
    case GET_CUSTOMER_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    // Update Customer
    case UPDATE_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        customers: state.customers.map(customer => 
          customer.customerId === action.payload.customerId ? action.payload : customer
        ),
        stageCompleted: true
      };
    case UPDATE_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    // Delete Customer
    case DELETE_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        customers: state.customers.filter(customer => customer.customerId !== action.payload),
        stageCompleted: true
      };
    case DELETE_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case DELETE_CUSTOMER_CONTACT_SUCCESS:
      return {
        ...state,
        customers: state.customers.map(customer => ({
          ...customer,
          contactDetails: customer.contactDetails.filter(
            contact => contact.id !== action.payload
          ),
        })),
      };

    case DELETE_CUSTOMER_BANKING_SUCCESS:
      return {
        ...state,
        customers: state.customers.map(customer => ({
          ...customer,
          bankingDetails: customer.bankingDetails.filter(
            bank => bank.id !== action.payload
          ),
        })),
      };

    default:
      return state;
  }
}; 