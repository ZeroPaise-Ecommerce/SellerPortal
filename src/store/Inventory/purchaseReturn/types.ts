// Types for Purchase Return
export enum OperationType {
  Create = "Create",
  Update = "Update",
  Delete = "Delete"
}

export interface PurchaseReturnItemDto {
  purchaseReturnItemId: number;
  itemName: string;
  receivedQty: number;
  returnQty: number;
  unitPrice: number;
  total: number;
}

export interface PurchaseReturnDto {
  purchaseReturnId: number;
  supplierId: number;
  supplierName: string;
  purchaseOrderId: number;
  purchaseOrderNumber: string;
  purchseReturnNumber: string;
  returnDate: string; // ISO string
  returnReason: string;
  returnNotes: string;
  totalAmount: number;
  operation: OperationType;
  createdDate?: string;
  updatedDate?: string;
  createdBy?: string;
  updatedBy?: string;
  items: PurchaseReturnItemDto[];
}

export interface PurchaseReturnState {
  purchaseReturns: PurchaseReturnDto[];
  loading: boolean;
  error: string | null;
  stageCompleted: boolean;
}
