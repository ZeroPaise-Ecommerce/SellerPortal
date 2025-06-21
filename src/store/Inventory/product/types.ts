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
  id: string;
  variantName: string;
  variantSKU: string;
  variantType: string;
  visibilityType: string;
}

export interface Pricing {
  id: string;
  pricing: string;
  pricingType: string;
  taxClass: string;
  hsnCode: string;
  gstType: string;
  
}

export interface Inventory {
  id: string;
  inventory: string;
  inventoryType: string;
}

export interface Additional {
  id: string;
  additional: string;
  additionalType: string;
}

export interface Channel {
  id: string;
  channel: string;
  channelType: string;
}

export interface Media {
  id: string;
  media: string;
  mediaType: string;
}

export interface Seo {
  id: string;
  seo: string;
  seoType: string;
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
  additional?: Additional;
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