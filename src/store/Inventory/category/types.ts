export interface CategoryDto {
  id: number;
  categoryName: string;
  parentCategoryId?: number | null;
  parentCategory?: CategoryDto | null;
  subCategories?: CategoryDto[] | null;
  description: string;
  displayOrder: number;
  isActive: boolean;
  createdOn?: string;
  updatedOn?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface CategoryState {
  categories: CategoryDto[];
  brands: BrandDto[];
  loading: boolean;
  error: string | null;
  stageCompleted: boolean;
}

export interface BrandDto {
  id: number;
  brandName: string;
}

export interface CreateBrandDto {
  brandName: string;
}
