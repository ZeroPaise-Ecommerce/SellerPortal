import { Supplier, SupplierState } from "./types";
import {
  GET_SUPPLIER_REQUEST, GET_SUPPLIER_SUCCESS, GET_SUPPLIER_FAILURE,
  CREATE_SUPPLIER_ID_REQUEST, CREATE_SUPPLIER_ID_SUCCESS, CREATE_SUPPLIER_ID_FAILURE,
    CREATE_SUPPLIER_REQUEST, CREATE_SUPPLIER_SUCCESS, CREATE_SUPPLIER_FAILURE } from './actions';


    const initialState: SupplierState = {
      suppliers: [] as Supplier[],
      loading: false,
      error: null,
      stageCompleted: false
    };
    
 export const supplierReducer = (state = initialState, action: any): SupplierState => {
      switch (action.type) {
        case "supplier/fetchSupplierStart":
        case GET_SUPPLIER_REQUEST:
        case CREATE_SUPPLIER_REQUEST:
        case CREATE_SUPPLIER_ID_REQUEST:
          return { ...state, loading: true, error: null };

        case GET_SUPPLIER_SUCCESS:
        case "supplier/fetchSupplierSuccess":
          return { ...state, loading: false, suppliers: action.payload.data };

        case CREATE_SUPPLIER_SUCCESS:
          return { ...state, loading: false, suppliers: [...state.suppliers, action.payload], stageCompleted: true};

        case CREATE_SUPPLIER_ID_SUCCESS:
          return { ...state, loading: false, suppliers: [...state.suppliers, action.payload], stageCompleted: true};

        case GET_SUPPLIER_FAILURE:
        case CREATE_SUPPLIER_FAILURE:
        case CREATE_SUPPLIER_ID_FAILURE:
          return { ...state, loading: false, error: action.payload, stageCompleted: true };    
        
        case 'RESET_STAGE_COMPLETED':
          return {
              ...state,
              stageCompleted: false,
          };
          
        default:
          return state;
      }
 }   


