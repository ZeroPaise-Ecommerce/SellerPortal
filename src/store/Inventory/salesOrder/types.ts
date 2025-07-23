// SalesOrderStatus and SalesReturnStatus enums
export type SalesOrderStatus = 'Create' | 'Sent' | 'Converted';
export type SalesReturnStatus = 'Pending' | 'Approved' | 'Rejected'; // Adjust as needed

export interface SalesOrderItem {
  id: number;
  salesOrderId: number;
  itemName: string;
  account: string;
  quantity: number;
  rate: number;
  gst: string;
  amount: number;
  description: string;
  productId: number;
  variantId: number;
}

export interface SalesInvoice {
  id: number;
  salesOrderInvoiceId?: number;
  salesOrderId?: number;
  flowDescription: string;
}

export interface SalesReturn {
  salesReturnId: number;
  returnNumber: string;
  returnDate: string;
  status: SalesReturnStatus;
  reason: string;
  returnQty: number;
  unitAmount: number;
  refundAmount: number;
  salesOrderItemId: number;
  salesOrderInvoiceId: number;
  customerId: number;
}

export interface SalesOrder {
  id: string;
  salesOrderId: number;
  salesOrderNumber: string;
  purchaseOrderNumber: number;
  customerId: number;
  customerName:string;
  inventory: string;
  date: string;
  purchaseOrderDate: string;
  referenceNumber: string;
  paymentPolicy: string;
  notesToSupplier: string;
  attachmentFileName: string;
  status: SalesOrderStatus;
  totalAmount: number;
  totalRefundAmount: number;
  items: SalesOrderItem[];
  salesInvoices: SalesInvoice[];
  salesReturns: SalesReturn[];
} 