import { SalesOrder } from './types';

export interface SalesOrderState {
  salesOrders: SalesOrder[];
  loading: boolean;
  error: string | null;
}

export const initialSalesOrderState: SalesOrderState = {
  salesOrders: [],
  loading: false,
  error: null,
}; 