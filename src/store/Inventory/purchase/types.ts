export interface PurchaseOrderState {
  purchareOrders: any[];
  editingPurchaseOrder: object;
  loading: boolean;
  error: string | null;
  stageCompleted: boolean;
}


// Enums
export enum PRRecivedStaus {
  Complete = "Complete",
  Partial = "Partial"
}

export enum BillPaymentTerms {
  Complete = "Complete",
  Net30 = "Net30",
  Net15 = "Net15"
}

export enum OperationType {
  Create = "Create",
  Update = "Update",
  Delete = "Delete"
}

export enum ExpenseCategory {
  Rent = "Rent",
  Utilities = "Utilities",
  Transport = "Transport",
  Salaries = "Salaries",
  Marketing = "Marketing"
}

export enum BankPaymentMethod {
  BankTransfer = "BankTransfer",
  CreditCard = "CreditCard",
  Cash = "Cash",
  NEFT = "NEFT"
}

// Child DTOs
export interface PurchaseOrderItemDTO {
  itemName: string;
  account: string;
  quantity: number;
  rate: number;
  description: string;
}

export interface PurchaseOrderAttachmentDTO {
  fileName: string;
  fileType: string;
  fileSizeMB: number;
}

// Main DTO
export interface PurchaseOrderDto {
  id: string;
  purchaseOrderId: number;
  supplierId: number;
  supplierName: string;
  purchaseOrderNumber: string;
  inventory: string;
  expectedDeliveryDate: string; // ISO date string
  purchaseOrderDate: string;
  referenceNumber: string;
  paymentPolicy: string;
  notesToSupplier: string;
  received: boolean;

  // Purchase Receipt
  prNumber?: string;
  prReceivedDate?: string;
  prDate?: string;
  prInternalNotes?: string;
  prRecivedStaus: PRRecivedStaus;

  // Bill
  billNumber?: string;
  billDate?: string;
  billInternalNotes?: string;
  billPaymentTerms: BillPaymentTerms;

  createdDate: string;
  updatedDate: string;
  createdBy: string;
  operation: OperationType;

  items: PurchaseOrderItemDTO[];
  attachments: PurchaseOrderAttachmentDTO[];
}

export interface ExpenseDto {
  expenseId: number;
  expenseNumber: string;
  category: ExpenseCategory;
  amount: number;
  date: string; // ISO string
  paymentMethod: BankPaymentMethod;
  account: string;
  description: string;
  operationType: OperationType;
}

export interface ExpenseState {
  expenses: ExpenseDto[];
  loading: boolean;
  error: string | null;
  stageCompleted: boolean;
}
