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

export interface VariantRequest {
  productId: number;
  Options: VariantOption[];
  VariantCombinations: ProductVariant[];
  createdBy: string;
  updatedBy: string;
}

export interface VariantOption {
  name: string;
  values: string[];
}

export interface ProductVariant {
  sku: string;
  mrp: number;
  sellingPrice: number;
  costPrice: number;
  stock: number;
  OptionValueNames: string[]; // Use values instead of IDs
  images: Image[];
}

export interface Image {
  imageUrl: string;
}

export interface VariantOptionState {
  option: string;
  values: string[];
}

export interface VariantCombination {
  id: string;
  attributes: Record<string, string>;
  mrp: number;
  sellingPrice: number;
  costPrice?: number;
  stock: number;
  images?: string[]; // URLs
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
  websiteTitle: string;
  websiteSku: string;
  websiteShortDesc: string;
  websiteDesc: string;
  websiteSpecs: string;
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
  variants?: VariantRequest;
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
  inventoryItems: InventoryItem[];
  editingProduct: null | Product;
  loading: boolean;
  error: string | null;
  stageCompleted: boolean;
}

export interface InventoryItem {
  itemId: string;
  sku: string;
  name: string;
  category: string;
  supplier: string;
  buyPrice: number;
  sellPrice: number;
  qty: number;
  stockValue: number;
  status: string;
}

export interface InventoryItems {
  products: InventoryItem[];
}
