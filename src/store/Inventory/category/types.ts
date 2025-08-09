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
  loading: boolean;
  error: string | null;
  stageCompleted: boolean;
}