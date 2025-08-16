import { CategoryState } from './types';
import {
  GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS, GET_CATEGORY_FAILURE,
  UPDATE_CATEGORY_REQUEST, UPDATE_CATEGORY_SUCCESS, UPDATE_CATEGORY_FAILURE,
  GET_BRAND_REQUEST,
  GET_BRAND_SUCCESS,
  GET_BRAND_FAILURE,
  SAVE_BRAND_REQUEST,
  SAVE_BRAND_SUCCESS,
  SAVE_BRAND_FAILURE,
} from './actions';
const initialState: CategoryState = {
  categories: [],
  brands: [],
  loading: false,
  error: null,
  stageCompleted: false
};

export const categoryReducer = (state = initialState, action: any): CategoryState => {
  console.log('[Reducer]', action.type, action.payload);
  switch (action.type) {
    case GET_CATEGORY_REQUEST:
    case UPDATE_CATEGORY_REQUEST:
    case GET_BRAND_REQUEST:
    case SAVE_BRAND_REQUEST:
      return { ...state, loading: true, error: null, stageCompleted: false };

      case GET_CATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          categories: action.payload.data,
          stageCompleted: true,
        };

        case GET_BRAND_SUCCESS:
          return {
            ...state,
            loading: false,
            brands: action.payload.data,
            stageCompleted: true,
          };

    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: state.categories.map(cat =>
          cat.id === action.payload.id ? action.payload : cat
        ),
        stageCompleted: true,
      };

    case SAVE_BRAND_SUCCESS:
      return {
        ...state,
        loading: false,
        brands: [...state.brands, action.payload],
        stageCompleted: true,
      };


    case GET_CATEGORY_FAILURE:
    case UPDATE_CATEGORY_FAILURE:
    case GET_BRAND_FAILURE:
    case SAVE_BRAND_FAILURE:
      return { ...state, loading: false, error: action.payload, stageCompleted: true };

    default:
      return state;
  }
};
