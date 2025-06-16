import { boolean } from 'zod';
import {
  GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE,
  ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAILURE
} from './actions';
import { ProductState } from './types';

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  stageCompleted: false
};

export const productReducer = (state = initialState, action: any): ProductState => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
    case ADD_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload };

    case ADD_PRODUCT_SUCCESS:
      return { ...state, loading: false, products: [...state.products, action.payload], stageCompleted: true};

    case GET_PRODUCTS_FAILURE:
    case ADD_PRODUCT_FAILURE:
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
