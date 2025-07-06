import { boolean } from 'zod';
import {
  GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE,
  ADD_BASIC_INFO_PRODUCT_REQUEST, ADD_BASIC_INFO_PRODUCT_SUCCESS, ADD_BASIC_INFO_PRODUCT_FAILURE,
  ADD_PRICING_PRODUCT_REQUEST,
  ADD_PRICING_PRODUCT_SUCCESS,
  ADD_PRICING_PRODUCT_FAILURE,
  ADD_WAREHOUSE__PRODUCT_REQUEST,
  ADD_WAREHOUSE_PRODUCT_SUCCESS,
  ADD_WAREHOUSE_PRODUCT_FAILURE,
  ADD_MEDIA__PRODUCT_REQUEST,
  ADD_SEO__PRODUCT_REQUEST,
  ADD_MEDIA_PRODUCT_SUCCESS,
  ADD_SEO_PRODUCT_SUCCESS,
  ADD_MEDIA_PRODUCT_FAILURE,
  ADD_SEO_PRODUCT_FAILURE,
  ADD_VARIANT_REQUEST,
  ADD_VARIANT_SUCCESS,
  ADD_VARIANT_FAILURE,
  ADD_CHANNELS_REQUEST,
  ADD_CHANNELS_SUCCESS,
  ADD_CHANNELS_FAILURE,
  GET_INVENTORY_ITEMS_FAILURE,
  GET_INVENTORY_ITEMS_SUCCESS,
  GET_INVENTORY_ITEMS_REQUEST
} from './actions';
import { ProductState } from './types';

const initialState: ProductState = {
  products: [],
  inventoryItems: [],
  editingProduct: null,
  loading: false,
  error: null,
  stageCompleted: false
};

export const productReducer = (state = initialState, action: any): ProductState => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
    case ADD_BASIC_INFO_PRODUCT_REQUEST:
    case ADD_PRICING_PRODUCT_REQUEST:
    case ADD_WAREHOUSE__PRODUCT_REQUEST:
    case ADD_MEDIA__PRODUCT_REQUEST:
    case ADD_SEO__PRODUCT_REQUEST:
    case ADD_VARIANT_REQUEST:
    case ADD_CHANNELS_REQUEST:
    case GET_INVENTORY_ITEMS_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload };

    case ADD_BASIC_INFO_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        editingProduct: {
          ...state.editingProduct,
          basicInfo: action.payload,
        },
        stageCompleted: true,
      };
    
      case ADD_VARIANT_SUCCESS:
      return {
        ...state,
        loading: false,
        editingProduct: {
          ...state.editingProduct,
          variants: action.payload,
        },
        stageCompleted: true,
      };

    case ADD_CHANNELS_SUCCESS:
      return {
        ...state,
        loading: false,
        editingProduct: {
          ...state.editingProduct,
          channels: action.payload,
        },
        stageCompleted: true,
      };

  case ADD_PRICING_PRODUCT_SUCCESS:
    return {
      ...state,
      loading: false,
      editingProduct: {
        ...state.editingProduct,
        pricing: action.payload,
      },
      stageCompleted: true,
    };

    case ADD_WAREHOUSE_PRODUCT_SUCCESS:
    return {
      ...state,
      loading: false,
      editingProduct: {
        ...state.editingProduct,
        inventory: action.payload,
      },
      stageCompleted: true,
    };

    case ADD_MEDIA_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        editingProduct: {
          ...state.editingProduct,
          media: action.payload,
        },
        stageCompleted: true,
      };

    case ADD_SEO_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        editingProduct: {
          ...state.editingProduct,
          seo: action.payload,
        },
        stageCompleted: true,
      };

    case GET_INVENTORY_ITEMS_SUCCESS:
      return { ...state, loading: false, inventoryItems: action.payload.products };

    case GET_PRODUCTS_FAILURE:
    case ADD_BASIC_INFO_PRODUCT_FAILURE:
    case ADD_PRICING_PRODUCT_FAILURE:
    case ADD_WAREHOUSE_PRODUCT_FAILURE:
    case ADD_WAREHOUSE_PRODUCT_FAILURE:
    case ADD_MEDIA_PRODUCT_FAILURE:
    case ADD_SEO_PRODUCT_FAILURE:
    case ADD_VARIANT_FAILURE:
    case ADD_CHANNELS_FAILURE:
    case GET_INVENTORY_ITEMS_FAILURE:
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
