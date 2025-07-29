import { CategoryState } from './types';
import {
  GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS, GET_CATEGORY_FAILURE,
  UPDATE_CATEGORY_REQUEST, UPDATE_CATEGORY_SUCCESS, UPDATE_CATEGORY_FAILURE
} from './actions';

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
  stageCompleted: false
};

export const categoryReducer = (state = initialState, action: any): CategoryState => {
  switch (action.type) {
    case GET_CATEGORY_REQUEST:
    case UPDATE_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_CATEGORY_SUCCESS:
      return { ...state, loading: false, categories: action.payload.data };
    case UPDATE_CATEGORY_SUCCESS:
      return { ...state, loading: false, categories: state.categories.map(cat =>
        cat.categoryId === action.payload.categoryId ? action.payload : cat
      ), stageCompleted: true };
    case GET_CATEGORY_FAILURE:
    case UPDATE_CATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload, stageCompleted: true };
    default:
      return state;
  }
};
