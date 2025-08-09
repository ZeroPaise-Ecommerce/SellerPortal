
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

interface AddCategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: { name: string; description: string; parentCategory: string }) => void;
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ isOpen, onClose, onSave }) => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state: any) => state.category || { categories: [], loading: false });

  useEffect(() => {
    if (isOpen) {
      dispatch({ type: 'FETCH_CATEGORY_REQUEST' });
    }
  }, [isOpen, dispatch]);

  const handleSaveCategory = () => {
    if (!categoryName.trim()) {
      setError("Category name is required.");
      return;
    }
    setError("");
    onSave({
      name: categoryName.trim(),
      description: description.trim(),
      parentCategory: parentCategory
    });
    setCategoryName("");
    setDescription("");
    setParentCategory("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="categoryName">Category Name asasa*</Label>
            <Input
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="parentCategory">Parent Category</Label>
            <Select value={parentCategory} onValueChange={setParentCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select parent category (optional)" />
              </SelectTrigger>
              <SelectContent>
                {loading ? (
                  <SelectItem value="" disabled>Loading...</SelectItem>
                ) : (
                  categories.map((cat: any) => (
                    <SelectItem key={cat.id || cat.categoryId || cat.name} value={cat.name}>{cat.name}</SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Category description"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSaveCategory} disabled={!categoryName.trim()}>
            Add Category
          </Button>
          {error && <div className="text-red-600 p-2">{error}</div>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryForm;
