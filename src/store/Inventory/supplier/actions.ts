// Action Types (Add these)
export const CREATE_SUPPLIER_REQUEST = 'CREATE_SUPPLIER_REQUEST';
export const CREATE_SUPPLIER_SUCCESS = 'CREATE_SUPPLIER_SUCCESS';
export const CREATE_SUPPLIER_FAILURE = 'CREATE_SUPPLIER_FAILURE';

export const GET_SUPPLIER_REQUEST = 'GET_SUPPLIER_REQUEST';
export const GET_SUPPLIER_SUCCESS = 'GET_SUPPLIER_SUCCESS';
export const GET_SUPPLIER_FAILURE = 'GET_SUPPLIER_FAILURE';

export const CREATE_SUPPLIER_ID_REQUEST = 'CREATE_SUPPLIER_REQUEST';
export const CREATE_SUPPLIER_ID_SUCCESS = 'CREATE_SUPPLIER_SUCCESS';
export const CREATE_SUPPLIER_ID_FAILURE = 'CREATE_SUPPLIER_FAILURE';


// Action Creators
export const createSupplierRequest = (supplier: any) => ({
    type: CREATE_SUPPLIER_REQUEST,
    payload:supplier
})

export const getSupplierIdRequest = (supplierId) => ({
    type: CREATE_SUPPLIER_ID_REQUEST,
    payload: supplierId
})

export const getSupplierRequest = () => ({ type: GET_SUPPLIER_REQUEST });

export const getSupplierSuccess = (payload: any) => ({ type: GET_SUPPLIER_SUCCESS, payload });
export const getSupplierailure = (error: string) => ({ type: GET_SUPPLIER_FAILURE, payload: error });

export const createSupplierSuccess = (payload: any) => ({ type: CREATE_SUPPLIER_SUCCESS, payload });
export const createSupplierFailure = (payload: string) => ({ type: CREATE_SUPPLIER_FAILURE, payload });