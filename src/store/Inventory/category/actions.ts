import { CategoryDto, BrandDto, CreateBrandDto } from "./types";

// Category actions
export const GET_CATEGORY_REQUEST = 'GET_CATEGORY_REQUEST';
export const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS';
export const GET_CATEGORY_FAILURE = 'GET_CATEGORY_FAILURE';

export const GET_BRAND_REQUEST = 'GET_BRAND_REQUEST';
export const GET_BRAND_SUCCESS = 'GET_BRAND_SUCCESS';
export const GET_BRAND_FAILURE = 'GET_BRAND_FAILURE';

export const UPDATE_CATEGORY_REQUEST = 'UPDATE_CATEGORY_REQUEST';
export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_FAILURE = 'UPDATE_CATEGORY_FAILURE';

// Brand actions
export const SAVE_BRAND_REQUEST = 'SAVE_BRAND_REQUEST';
export const SAVE_BRAND_SUCCESS = 'SAVE_BRAND_SUCCESS';
export const SAVE_BRAND_FAILURE = 'SAVE_BRAND_FAILURE';

export const getCategoryRequest = () => ({ type: GET_CATEGORY_REQUEST });
export const getCategorySuccess = (payload: { data: CategoryDto[] }) => ({
    type: GET_CATEGORY_SUCCESS,
    payload,
  });
export const getCategoryFailure = (error: string) => ({ type: GET_CATEGORY_FAILURE, payload: error });

export const getBrandRequest = () => ({ type: GET_BRAND_REQUEST });
export const getBrandSuccess = (payload: { data: BrandDto[] }) => ({
    type: GET_BRAND_SUCCESS,
    payload,
  });
export const getBrandFailure = (error: string) => ({ type: GET_BRAND_FAILURE, payload: error });

export const updateCategoryRequest = (payload: any) => ({ type: UPDATE_CATEGORY_REQUEST, payload });
export const updateCategorySuccess = (data: any) => ({ type: UPDATE_CATEGORY_SUCCESS, payload: data });
export const updateCategoryFailure = (error: string) => ({ type: UPDATE_CATEGORY_FAILURE, payload: error });

// Brand action creators
export const saveBrandRequest = (payload: CreateBrandDto) => ({ type: SAVE_BRAND_REQUEST, payload });
export const saveBrandSuccess = (data: BrandDto) => ({ type: SAVE_BRAND_SUCCESS, payload: data });
export const saveBrandFailure = (error: string) => ({ type: SAVE_BRAND_FAILURE, payload: error });
