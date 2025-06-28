export interface SupplierState {
  suppliers: any[];
  loading: boolean;
  error: string | null;
  stageCompleted: boolean;
}


 // Address
export interface SupplierAddress {
  id: string;
  supplierId: number;
  country: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pinCode: string;
  addressType: string; // Consider using an enum

}

// Contact
export interface SupplierContact {
  id: string;
  supplierId: number;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  workPhone: string;
  emailAddress: string;
  remarks: string;

}

// Banking
export interface SupplierBanking {
  id: string;
  supplierId: number;
  accountHolderName: string;
  accountNumber: string;
  reEnterAccountNumber: string;
  ifsc: string;
  bankName: string;
  remarks: string;

}

// Main Supplier
export interface Supplier {
  supplierId: number;
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  supplierNickName: string;
  companyName: string;
  mobileNumber: string;
  gstin: string;
  pan: string;
  currency: string;
  designation: string;
  heading: string;
  comments: string;
  addresses: SupplierAddress[];
  contactDetails: SupplierContact[];
  bankingDetails: SupplierBanking[];

}