// export interface Product {
//   id: string;
//   productName: string;
//   productSKU: string;
//   productType: string;
//   category: string;
//   brand: string;
//   description: string;
//   shortDescription: string;
//   createdDate: string;
//   updatedDate: string;
//   createdBy: string;
//   updatedBy: string;
//   operation: number;
//   basicInfo: { id: string;
//   productName: string;
//   productSKU: string;
//   productType: string;
//   category: string;
//   brand: string;
//   description: string;
//   shortDescription: string;
//   createdDate: string;
//   updatedDate: string;
//   createdBy: string;
//   updatedBy: string;
//   operation: number;}
// }

import { UUID } from "crypto";

export interface BasicInfo {
  id: string;
  productId: number;
  productName: string;
  productSKU: string;
  productType: string;
  category: string;
  brand: string;
  description: string;
  shortDescription: string;
  createdDate: string;
  updatedDate: string;
  createdBy: string;
  updatedBy: string;
  operation: number;
}

export interface Variant {
  id: UUID;
  variantName: string;
  variantOption: string;
  variantValues: string;
  variantSKU: string;
  variantType: string;
  visibilityType: string;
  createdDate: string;
  updatedDate: string;
  createdBy: string;
  updatedBy: string;
}

export interface Pricing {
  id: number;
  pricing: string;
  pricingType: string;
  taxClass: string;
  hsnCode: string;
  gstType: string;
  
}

export interface Inventory {
  id: number;
  warehouse: number;
  stock: string;
  reOrderPoint: number;
  incomingStock: number;
  expiryDate: string;
}

export interface AdditionalSettings {
  id: number;
  productId: number;
  variantId: number;
  countryOrgin: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  returnable: boolean;
  returnWindow: number; // consider using enum if applicable
  returnType: number;   // consider using enum if applicable
  returnConditions: string;
  returnShipping: number; // consider using enum if applicable
  codAvailable: boolean;
  warrantyInfo: string;
  customAttributes: string;
}


export interface Channel {
  id: string;
  channel: string;
  channelType: string;
}

export interface Media {
  id: string;
  productId: number;
  variantId: number;
  galleryImages: string[];
  mainImages: string[];
  channelSpecificImages: string[];
  videoUploadLink: string;
}

export interface Seo {
  id: string;
  productId: number;
  variantId: number;
  MetaTitle: string;
  MetaDescription: string;
  Keywords: string;
}

export interface Visibility {
  id: string;
  visibility: string;
  visibilityType: string;
}

export interface Product {
  basicInfo?: BasicInfo;
  variants?: Variant[];
  pricing?: Pricing;
  inventory?: Inventory;
  AdditionalSettings?: AdditionalSettings;
  channels?: Channel[];
  media?: Media[];
  seo?: Seo;
  visibility?: Visibility;
}

export interface ProductState {
  products: Product[];
  editingProduct: null | Product;
  loading: boolean;
  error: string | null;
  stageCompleted: boolean;
}