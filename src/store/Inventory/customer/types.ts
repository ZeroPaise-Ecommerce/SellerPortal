export interface CustomerState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  stageCompleted: boolean;
}

// Address
export interface CustomerAddress {
  id: string;
  customerId: number;
  country: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pinCode: string;
  addressType: number; // 0 for billing, 1 for shipping
  createdOn: string;
  updatedOn: string | null;
  createdBy: string | null;
  updatedBy: string | null;
}

// Contact
export interface CustomerContact {
  id: string;
  customerId: number;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  workPhone: string;
  emailAddress: string;
  remarks: string;
  createdOn: string;
  updatedOn: string | null;
  createdBy: string | null;
  updatedBy: string | null;
}

// Banking
export interface CustomerBanking {
  id: string;
  customerId: number;
  accountHolderName: string;
  accountNumber: string;
  reEnterAccountNumber: string;
  ifsc: string;
  bankName: string;
  remarks: string;
  createdOn: string;
  updatedOn: string | null;
  createdBy: string | null;
  updatedBy: string | null;
}

// Main Customer
export interface Customer {
  customerId: number;
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  nickName: string | null;
  companyName: string;
  mobileNumber: string;
  gstin: string;
  pan: string;
  currency: string;
  designation: string;
  heading: string;
  comments: string;
  addresses: CustomerAddress[];
  contactDetails: CustomerContact[];
  bankingDetails: CustomerBanking[];
  createdOn: string;
  updatedOn: string | null;
  createdBy: string | null;
  updatedBy: string | null;
}

// API Response
export interface CustomerApiResponse {
  errorCode: string;
  data: Customer[];
  validationMessage: string[];
  operationMessage: string | null;
} 