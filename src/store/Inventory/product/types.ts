export interface Product {
  id: string;
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
  basicInfo: { id: string;
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
  operation: number;}
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  stageCompleted: boolean;
}