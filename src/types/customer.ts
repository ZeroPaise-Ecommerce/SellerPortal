// Customer DTOs (Data Transfer Objects)

// Create Customer DTO
export interface CreateCustomerDto {
  firstName: string;
  lastName: string;
  emailAddress: string;
  nickName?: string | null;
  companyName: string;
  mobileNumber: string;
  gstin: string;
  pan: string;
  currency: string;
  designation: string;
  heading: string;
  comments: string;
  addresses: CreateCustomerAddressDto[];
  contactDetails: CreateCustomerContactDto[];
  bankingDetails: CreateCustomerBankingDto[];
}

// Update Customer DTO
export interface UpdateCustomerDto {
  customerId: number;
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  nickName?: string | null;
  companyName: string;
  mobileNumber: string;
  gstin: string;
  pan: string;
  currency: string;
  designation: string;
  heading: string;
  comments: string;
  addresses: UpdateCustomerAddressDto[];
  contactDetails: UpdateCustomerContactDto[];
  bankingDetails: UpdateCustomerBankingDto[];
}

// Address DTOs
export interface CreateCustomerAddressDto {
  country: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pinCode: string;
  addressType: number; // 0 for billing, 1 for shipping
}

export interface UpdateCustomerAddressDto {
  id: string;
  customerId: number;
  country: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pinCode: string;
  addressType: number;
}

// Contact DTOs
export interface CreateCustomerContactDto {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  workPhone: string;
  emailAddress: string;
  remarks: string;
}

export interface UpdateCustomerContactDto {
  id: string;
  customerId: number;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  workPhone: string;
  emailAddress: string;
  remarks: string;
}

// Banking DTOs
export interface CreateCustomerBankingDto {
  accountHolderName: string;
  accountNumber: string;
  reEnterAccountNumber: string;
  ifsc: string;
  bankName: string;
  remarks: string;
}

export interface UpdateCustomerBankingDto {
  id: string;
  customerId: number;
  accountHolderName: string;
  accountNumber: string;
  reEnterAccountNumber: string;
  ifsc: string;
  bankName: string;
  remarks: string;
}

// API Response DTOs
export interface CustomerApiResponseDto {
  errorCode: string;
  data: CustomerDto[];
  validationMessage: string[];
  operationMessage: string | null;
}

export interface CustomerDto {
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
  addresses: CustomerAddressDto[];
  contactDetails: CustomerContactDto[];
  bankingDetails: CustomerBankingDto[];
  createdOn: string;
  updatedOn: string | null;
  createdBy: string | null;
  updatedBy: string | null;
}

export interface CustomerAddressDto {
  id: string;
  customerId: number;
  country: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pinCode: string;
  addressType: number;
  createdOn: string;
  updatedOn: string | null;
  createdBy: string | null;
  updatedBy: string | null;
}

export interface CustomerContactDto {
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

export interface CustomerBankingDto {
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