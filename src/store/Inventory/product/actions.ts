import { promises } from "dns";
import {Product} from "./types"

export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE';

export const ADD_BASIC_INFO_PRODUCT_REQUEST = 'ADD_BASIC_INFO_PRODUCT_REQUEST';
export const ADD_BASIC_INFO_PRODUCT_SUCCESS = 'ADD_BASIC_INFO_PRODUCT_SUCCESS';
export const ADD_BASIC_INFO_PRODUCT_FAILURE = 'ADD_BASIC_INFO_PRODUCT_FAILURE';

export const ADD_PRICING_PRODUCT_REQUEST = 'ADD_PRICING_PRODUCT_REQUEST';
export const ADD_PRICING_PRODUCT_SUCCESS = 'ADD_PRICING_PRODUCT_SUCCESS';
export const ADD_PRICING_PRODUCT_FAILURE = 'ADD_PRICING_PRODUCT_FAILURE';

export const ADD_WAREHOUSE__PRODUCT_REQUEST = 'ADD_WAREHOUSE__PRODUCT_REQUEST';
export const ADD_WAREHOUSE_PRODUCT_SUCCESS = 'ADD_WAREHOUSE_PRODUCT_SUCCESS';
export const ADD_WAREHOUSE_PRODUCT_FAILURE = 'ADD_WAREHOUSE_PRODUCT_FAILURE';

export const ADD_MEDIA__PRODUCT_REQUEST = 'ADD_MEDIA__PRODUCT_REQUEST';
export const ADD_MEDIA_PRODUCT_SUCCESS = 'ADD_MEDIA_PRODUCT_SUCCESS';
export const ADD_MEDIA_PRODUCT_FAILURE = 'ADD_MEDIA_PRODUCT_FAILURE';

export const ADD_SEO__PRODUCT_REQUEST = 'ADD_SEO__PRODUCT_REQUEST';
export const ADD_SEO_PRODUCT_SUCCESS = 'ADD_SEO_PRODUCT_SUCCESS';
export const ADD_SEO_PRODUCT_FAILURE = 'ADD_SEO_PRODUCT_FAILURE';

export const ADD_ADDITIONAL__PRODUCT_REQUEST = 'ADD_ADDITIONAL__PRODUCT_REQUEST';
export const ADD_ADDITIONAL_PRODUCT_SUCCESS = 'ADD_ADDITIONAL_PRODUCT_SUCCESS';
export const ADD_ADDITIONAL_PRODUCT_FAILURE = 'ADD_ADDITIONAL_PRODUCT_FAILURE';

export const ADD_VARIANT_REQUEST = 'ADD_VARIANT_REQUEST';
export const ADD_VARIANT_SUCCESS = 'ADD_VARIANT_SUCCESS';
export const ADD_VARIANT_FAILURE = 'ADD_VARIANT_FAILURE';

export const ADD_CHANNELS_REQUEST = 'ADD_CHANNELS_REQUEST';
export const ADD_CHANNELS_SUCCESS = 'ADD_CHANNELS_SUCCESS';
export const ADD_CHANNELS_FAILURE = 'ADD_CHANNELS_FAILURE';

export const GET_INVENTORY_ITEMS_REQUEST = 'GET_INVENTORY_ITEMS_REQUEST';
export const GET_INVENTORY_ITEMS_SUCCESS = 'GET_INVENTORY_ITEMS_SUCCESS';
export const GET_INVENTORY_ITEMS_FAILURE = 'GET_INVENTORY_ITEMS_FAILURE';


export const getProductsRequest = () => ({ type: GET_PRODUCTS_REQUEST });
export const getProductsSuccess = (payload: any) => ({ type: GET_PRODUCTS_SUCCESS, payload });
export const getProductsFailure = (payload: string) => ({ type: GET_PRODUCTS_FAILURE, payload });

export const addBasicInfoProductRequest = (payload: any) => ({ type: ADD_BASIC_INFO_PRODUCT_REQUEST, payload });
export const addBasicInfoProductSuccess = (payload: any) => ({ type: ADD_BASIC_INFO_PRODUCT_SUCCESS, payload });
export const addBasicInfoProductFailure = (payload: string) => ({ type: ADD_BASIC_INFO_PRODUCT_FAILURE, payload });

export const addPricingProductRequest = (payload: any) => ({ type: ADD_PRICING_PRODUCT_REQUEST, payload });
export const addPricingProductSuccess = (payload: any) => ({ type: ADD_PRICING_PRODUCT_SUCCESS, payload });
export const addPricingProductFailure = (payload: string) => ({ type: ADD_PRICING_PRODUCT_FAILURE, payload });

export const addWarehouseProductRequest = (payload: any) => ({ type: ADD_WAREHOUSE__PRODUCT_REQUEST, payload });
export const addWarehouseProductSuccess = (payload: any) => ({ type: ADD_WAREHOUSE_PRODUCT_SUCCESS, payload });
export const addWarehouseProductFailure = (payload: string) => ({ type: ADD_WAREHOUSE_PRODUCT_FAILURE, payload });

export const addMediaProductRequest = (payload: any) => ({ type: ADD_MEDIA__PRODUCT_REQUEST, payload });
export const addMediaProductSuccess = (payload: any) => ({ type: ADD_MEDIA_PRODUCT_SUCCESS, payload });
export const addMediaProductFailure = (payload: string) => ({ type: ADD_MEDIA_PRODUCT_FAILURE, payload });

export const addSEOProductRequest = (payload: any) => ({ type: ADD_SEO__PRODUCT_REQUEST, payload });
export const addSEOProductSuccess = (payload: any) => ({ type: ADD_SEO_PRODUCT_SUCCESS, payload });
export const addSEOProductFailure = (payload: string) => ({ type: ADD_SEO_PRODUCT_FAILURE, payload });

export const addAdditionalSEOProductRequest = (payload: any) => ({ type: ADD_ADDITIONAL__PRODUCT_REQUEST, payload });
export const addAdditionalProductSuccess = (payload: any) => ({ type: ADD_ADDITIONAL_PRODUCT_SUCCESS, payload });
export const addAdditionalProductFailure = (payload: string) => ({ type: ADD_ADDITIONAL_PRODUCT_FAILURE, payload });

export const addVariantProductRequest = (payload: any) => ({ type: ADD_VARIANT_REQUEST, payload });
export const addVariantProductSuccess = (payload: any) => ({ type: ADD_VARIANT_SUCCESS, payload });
export const addVariantProductFailure = (payload: string) => ({ type: ADD_VARIANT_FAILURE, payload });

export const addChannelsProductRequest = (payload: any) => ({ type: ADD_CHANNELS_REQUEST, payload });
export const addChannelsProductSuccess = (payload: any) => ({ type: ADD_CHANNELS_SUCCESS, payload });
export const addChannelsProductFailure = (payload: string) => ({ type: ADD_CHANNELS_FAILURE, payload });

export const getInventoryItemsRequest = () => ({ type: GET_INVENTORY_ITEMS_REQUEST });
export const getInventoryItemsSuccess = (payload: any) => ({ type: GET_INVENTORY_ITEMS_SUCCESS, payload });
export const getInventoryItemsFailure = (payload: string) => ({ type: GET_INVENTORY_ITEMS_FAILURE, payload });