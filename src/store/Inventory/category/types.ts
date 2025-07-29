// Category types
export interface CategoryDto {
  categoryId: number;
  categoryName: string;
  parentCategoryId?: number;
  description: string;
  displayOrder: number;
  isActive: boolean;
  operation: number; // OperationType as number
}

export interface CategoryState {
  categories: CategoryDto[];
  loading: boolean;
  error: string | null;
  stageCompleted: boolean;
}
