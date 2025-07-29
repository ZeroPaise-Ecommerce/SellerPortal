// Category actions
export const GET_CATEGORY_REQUEST = 'GET_CATEGORY_REQUEST';
export const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS';
export const GET_CATEGORY_FAILURE = 'GET_CATEGORY_FAILURE';

export const UPDATE_CATEGORY_REQUEST = 'UPDATE_CATEGORY_REQUEST';
export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_FAILURE = 'UPDATE_CATEGORY_FAILURE';

export const getCategoryRequest = () => ({ type: GET_CATEGORY_REQUEST });
export const getCategorySuccess = (data: any) => ({ type: GET_CATEGORY_SUCCESS, payload: { data } });
export const getCategoryFailure = (error: string) => ({ type: GET_CATEGORY_FAILURE, payload: error });

export const updateCategoryRequest = (payload: any) => ({ type: UPDATE_CATEGORY_REQUEST, payload });
export const updateCategorySuccess = (data: any) => ({ type: UPDATE_CATEGORY_SUCCESS, payload: data });
export const updateCategoryFailure = (error: string) => ({ type: UPDATE_CATEGORY_FAILURE, payload: error });
