import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getCategoryRequest, updateCategoryRequest } from "@/store/Inventory/category/actions";
import { CategoryDto } from "@/store/Inventory/category/types";

const initialCategory: CategoryDto = {
  categoryId: 0,
  categoryName: "",
  parentCategoryId: undefined,
  description: "",
  displayOrder: 0,
  isActive: true,
  operation: 0,
};

const InternalCategory = () => {
  const dispatch = useDispatch();
  const { categories, loading, error, stageCompleted } = useSelector((state: any) => state.category);
  const [category, setCategory] = useState<CategoryDto>(initialCategory);

  useEffect(() => {
    dispatch(getCategoryRequest());
  }, [dispatch]);

  useEffect(() => {
    if (stageCompleted) {
      dispatch(getCategoryRequest());
    }
  }, [stageCompleted, dispatch]);

  // Example: populate form for edit (if needed)
  // useEffect(() => {
  //   if (categories.length > 0) setCategory(categories[0]);
  // }, [categories]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let newValue: any = value;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      newValue = e.target.checked;
    }
    setCategory((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value === "" ? undefined : Number(value),
    }));
  };

  const handleSave = () => {
    dispatch(updateCategoryRequest(category));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Category</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Category Name</label>
          <Input
            name="categoryName"
            value={category.categoryName}
            onChange={handleChange}
            placeholder="Category Name"
            maxLength={25}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Parent Category</label>
          <select
            name="parentCategoryId"
            value={category.parentCategoryId ?? ""}
            onChange={handleSelectChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">None</option>
            {categories.filter((cat: CategoryDto) => cat.parentCategoryId == null).map((cat: CategoryDto) => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Description</label>
          <Input
            name="description"
            value={category.description}
            onChange={handleChange}
            placeholder="Description"
            maxLength={50}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Display Order</label>
          <Input
            name="displayOrder"
            type="number"
            value={category.displayOrder}
            onChange={handleChange}
            placeholder="Display Order"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={category.isActive}
            onChange={handleChange}
            id="isActive"
          />
          <label htmlFor="isActive">Active</label>
        </div>
        <div>
          <label className="block font-medium mb-1">Operation</label>
          <Input
            name="operation"
            type="number"
            value={category.operation}
            onChange={handleChange}
            placeholder="Operation"
          />
        </div>
        <Button onClick={handleSave} disabled={loading} className="w-full mt-4">
          {loading ? "Saving..." : "Save Category"}
        </Button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">All Categories</h3>
        <ul className="divide-y divide-gray-200">
          {categories.map((cat: CategoryDto) => (
            <li key={cat.categoryId} className="py-2">
              <span className="font-medium">{cat.categoryName}</span> (ID: {cat.categoryId})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InternalCategory; 