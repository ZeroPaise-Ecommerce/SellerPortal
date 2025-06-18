import React, { useState } from "react";
import {
  Info,
  Palette,
  IndianRupee,
  Warehouse,
  Share2,
  Camera,
  Search,
  Eye,
  Settings,
  Trash2,
  Plus,
  ImageIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Stepper from "../ui/stepper";
import useAppDispatch from "@/hooks/useAppDispatch";
import { addProductRequest } from "@/store/Inventory/product/actions";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { add } from "date-fns";

// --- START: Inlined Form Components (AddBrandForm, AddCategoryForm, AddCountryForm) ---
// These components were previously in separate files but are inlined here to resolve import errors.

const AddBrandForm = ({ isOpen, onClose, onSave }) => {
  const [brandName, setBrandName] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (brandName.trim() === '') {
      setError('Brand name cannot be empty.');
      return;
    }
    onSave(brandName);
    setBrandName('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">Add New Brand</h2>
        <div className="space-y-2">
          <label htmlFor="newBrandName" className="block text-sm font-medium text-gray-700">Brand Name</label>
          <input
            type="text"
            id="newBrandName"
            placeholder="e.g., Nike, Adidas"
            value={brandName}
            onChange={(e) => {
              setBrandName(e.target.value);
              if (e.target.value.trim() !== '') setError(''); // Clear error on input
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Brand
          </Button>
        </div>
      </div>
    </div>
  );
};

const AddCategoryForm = ({ isOpen, onClose, onSave }) => {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (categoryName.trim() === '') {
      setError('Category name cannot be empty.');
      return;
    }
    onSave(categoryName);
    setCategoryName('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">Add New Category</h2>
        <div className="space-y-2">
          <label htmlFor="newCategoryName" className="block text-sm font-medium text-gray-700">Category Name</label>
          <input
            type="text"
            id="newCategoryName"
            placeholder="e.g., Electronics, Apparel"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
              if (e.target.value.trim() !== '') setError(''); // Clear error on input
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Category
          </Button>
        </div>
      </div>
    </div>
  );
};

const AddCountryForm = ({ isOpen, onClose, onSave }) => {
  const [countryName, setCountryName] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (countryName.trim() === '') {
      setError('Country name cannot be empty.');
      return;
    }
    onSave(countryName);
    setCountryName('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">Add New Country</h2>
        <div className="space-y-2">
          <label htmlFor="newCountryName" className="block text-sm font-medium text-gray-700">Country Name</label>
          <input
            type="text"
            id="newCountryName"
            placeholder="e.g., India, USA"
            value={countryName}
            onChange={(e) => {
              setCountryName(e.target.value);
              if (e.target.value.trim() !== '') setError(''); // Clear error on input
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Country
          </Button>
        </div>
      </div>
    </div>
  );
};

interface VariantCombination {
  id: string;
  attributes: { [key: string]: string };
  mrp: string;
  sellingPrice: string;
  costPrice: string;
  stock: string;
  image?: string;
}

const AddItemForm = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddCountry, setShowAddCountry] = useState(false);
  const [channels, setChannels] = useState({
    website: true,
    amazon: false,
    flipkart: false,
    meesho: false,
    myntra: false
  });
    const [returnSettings, setReturnSettings] = useState({
    isReturnable: true,
    returnWindowDays: "7",
    returnType: "refund_or_replacement",
    returnConditions: "",
    nonReturnableReason: "",
    returnShippingBorneBy: "seller"
  });

  // State for all fields (add more as needed for each step)
  const [productName, setProductName] = useState("");
  const [productSku, setProductSku] = useState("");
  const [productType, setProductType] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [variants, setVariants] = useState([{ option: "", values: [""] }]);
  const [mrp, setMrp] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [stock, setStock] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mainImages, setMainImages] = useState<File[]>([]);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [tags, setTags] = useState("");
  const [visible, setVisible] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [variantCombinations, setVariantCombinations] = useState<VariantCombination[]>([]);


    const generateVariantCombinations = () => {
    if (variants.length === 0 || variants.some(v => !v.option || v.values.some(val => !val))) {
      setVariantCombinations([]);
      return;
    }

    const combinations: VariantCombination[] = [];
    
    const generateCombos = (index: number, currentCombo: { [key: string]: string }) => {
      if (index === variants.length) {
        combinations.push({
          id: Date.now().toString() + Math.random().toString(),
          attributes: { ...currentCombo },
          mrp: "",
          sellingPrice: "",
          costPrice: "",
          stock: ""
        });
        return;
      }

      const variant = variants[index];
      variant.values.forEach(value => {
        if (value.trim()) {
          generateCombos(index + 1, { ...currentCombo, [variant.option]: value });
        }
      });
    };

    generateCombos(0, {});
    setVariantCombinations(combinations);
  };

    const addVariantValue = (index: number) => {
    const newVariants = [...variants];
    newVariants[index].values.push("");
    setVariants(newVariants);
  };

   const addVariantOption = () => {
    setVariants([...variants, { option: "", values: [""] }]);
  };

  const removeVariantOption = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

   const [brands, setBrands] = useState([
    { name: "Apple", value: "apple" },
    { name: "Samsung", value: "samsung" },
    { name: "OnePlus", value: "oneplus" }
  ]);
  const [categories, setCategories] = useState([
    { name: "Electronics", value: "electronics" },
    { name: "Accessories", value: "accessories" },
    { name: "Clothing", value: "clothing" }
  ]);
  const [countries, setCountries] = useState([
    { name: "India", value: "india" },
    { name: "China", value: "china" },
    { name: "USA", value: "usa" }
  ]);

  const removeVariantValue = (optionIndex: number, valueIndex: number) => {
    const newVariants = [...variants];
    newVariants[optionIndex].values = newVariants[optionIndex].values.filter((_, i) => i !== valueIndex);
    setVariants(newVariants);
  };

  const updateVariantCombination = (id: string, field: string, value: string) => {
    setVariantCombinations(prev => 
      prev.map(combo => 
        combo.id === id ? { ...combo, [field]: value } : combo
      )
    );
  };

  const handleAddBrand = (brand: { name: string; description: string }) => {
    const newBrand = { name: brand.name, value: brand.name.toLowerCase().replace(/\s+/g, '_') };
    setBrands([...brands, newBrand]);
  };

  const handleAddCategory = (category: { name: string; description: string; parentCategory: string }) => {
    const newCategory = { name: category.name, value: category.name.toLowerCase().replace(/\s+/g, '_') };
    setCategories([...categories, newCategory]);
  };

  const handleAddCountry = (country: { name: string; code: string }) => {
    const newCountry = { name: country.name, value: country.name.toLowerCase().replace(/\s+/g, '_') };
    setCountries([...countries, newCountry]);
  };

   const renderStep = (stepName) => {
    switch (stepName) {
      case "basic":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="productName">Product Name *</label>
                <input
                  id="productName"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors['productName'] ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors['productName'] && <p className="text-sm text-red-500">{errors['productName']}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="productSku">Product SKU</label>
                <input
                  id="productSku"
                  placeholder="Auto-generated or manual"
                  value={productSku}
                  onChange={(e) => setProductSku(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors['productSku'] ? 'border-red-500' : 'border-gray-300'}`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="productType">Product Type *</label>
                <select
                  id="productType"
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors['productType'] ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select a product type</option>
                  <option value="simple">Simple Product</option>
                  <option value="variant">Variant Product</option>
                </select>
                {errors['productType'] && <p className="text-sm text-red-500">{errors['productType']}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="brand">Brand</label>
                <div className="flex gap-2">
                  <select
                    id="brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="input flex-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                  >
                    {brands.map((b) => (
                      <option key={b.value} value={b.value}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowAddBrand(true)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="categories">Categories *</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {/* Dynamic badges for selected categories */}
              </div>
              <div className="flex gap-2">
                <select
                  id="categories"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input flex-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowAddCategory(true)}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                placeholder="Long product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="shortDescription">Short Description</label>
              <textarea
                id="shortDescription"
                placeholder="For channel listings like Amazon"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );
      case "variants":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold mb-4">Product Variants</h2>
            <p className="text-sm text-gray-500">Configure product variants like size, color, etc.</p>
            <div>
               {productType === "variant" ? (
                <div className="space-y-6">
                  {/* Variant Options Setup */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Variant Options</h4>
                    {variants.map((variant, optionIndex) => (
                      <div key={optionIndex} className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <label>Variant Option {optionIndex + 1}</label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeVariantOption(optionIndex)}
                            disabled={variants.length === 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-3">
                          <Input
                            placeholder="e.g., Size, Color, Material"
                            value={variant.option}
                            onChange={(e) => {
                              const newVariants = [...variants];
                              newVariants[optionIndex].option = e.target.value;
                              setVariants(newVariants);
                            }}
                          />
                          
                          <div className="space-y-2">
                            <label>Values</label>
                            {variant.values.map((value, valueIndex) => (
                              <div key={valueIndex} className="flex gap-2">
                                <Input
                                  placeholder="e.g., Small, Medium, Large"
                                  value={value}
                                  onChange={(e) => {
                                    const newVariants = [...variants];
                                    newVariants[optionIndex].values[valueIndex] = e.target.value;
                                    setVariants(newVariants);
                                  }}
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeVariantValue(optionIndex, valueIndex)}
                                  disabled={variant.values.length === 1}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addVariantValue(optionIndex)}
                              className="w-full"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Value
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Button onClick={addVariantOption} variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Variant Option
                    </Button>

                    <Button onClick={generateVariantCombinations} className="w-full">
                      Generate Variant Combinations
                    </Button>
                  </div>

                  {/* Variant Combinations with Pricing */}
                  {variantCombinations.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="font-medium">Variant Combinations & Pricing</h4>
                      {variantCombinations.map((combo) => (
                        <div key={combo.id} className="p-4">
                          <div className="space-y-3">
                            <div className="flex flex-wrap gap-2">
                              {Object.entries(combo.attributes).map(([key, value]) => (
                                <Badge key={key} variant="outline">
                                  {key}: {value}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="grid grid-cols-4 gap-3">
                              <div className="space-y-1">
                                <label className="text-xs">MRP *</label>
                                <Input
                                  type="number"
                                  placeholder="0.00"
                                  value={combo.mrp}
                                  onChange={(e) => updateVariantCombination(combo.id, 'mrp', e.target.value)}
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-xs">Selling Price *</label>
                                <Input
                                  type="number"
                                  placeholder="0.00"
                                  value={combo.sellingPrice}
                                  onChange={(e) => updateVariantCombination(combo.id, 'sellingPrice', e.target.value)}
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-xs">Cost Price</label>
                                <Input
                                  type="number"
                                  placeholder="0.00"
                                  value={combo.costPrice}
                                  onChange={(e) => updateVariantCombination(combo.id, 'costPrice', e.target.value)}
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-xs">Stock</label>
                                <Input
                                  type="number"
                                  placeholder="0"
                                  value={combo.stock}
                                  onChange={(e) => updateVariantCombination(combo.id, 'stock', e.target.value)}
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-xs">Variant Image</label>
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer">
                                <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                                <p className="mt-1 text-xs text-gray-600">Upload variant image</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Palette className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Variants are only available for Variant Products</p>
                  <p className="text-sm">Change Product Type to "Variant Product" to add variants</p>
                </div>
              )}
            </div>
          </div>
        );
      case "pricing":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold mb-4">Pricing & Tax</h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="space-y-2">
                <label htmlFor="mrp">MRP *</label>
                <input
                  id="mrp"
                  type="number"
                  placeholder="0.00"
                  value={mrp}
                  onChange={(e) => setMrp(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors['mrp'] ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors['mrp'] && <p className="text-sm text-red-500">{errors['mrp']}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="sellingPrice">Selling Price *</label>
                <input
                  id="sellingPrice"
                  type="number"
                  placeholder="0.00"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors['sellingPrice'] ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors['sellingPrice'] && <p className="text-sm text-red-500">{errors['sellingPrice']}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="costPrice">Cost Price</label>
                <input
                  id="costPrice"
                  type="number"
                  placeholder="0.00"
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors['costPrice'] ? 'border-red-500' : 'border-gray-300'}`}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="taxClass">Tax Class</label>
                <select
                  id="taxClass"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors['taxClass'] ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="5">5% GST</option>
                  <option value="12">12% GST</option>
                  <option value="18">18% GST</option>
                  <option value="28">28% GST</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="hsnCode">HSN Code</label>
                <input
                  id="hsnCode"
                  placeholder="Enter HSN code"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="gstType">GST Type</label>
                <select
                  id="gstType"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors['gstType'] ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="inclusive">Inclusive</option>
                  <option value="exclusive">Exclusive</option>
                </select>
              </div>
            </div>
          </div>
        );
      case "inventory":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold mb-4">Inventory</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="stockQuantity">Stock Quantity *</label>
                <input
                  id="stockQuantity"
                  type="number"
                  placeholder="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors['stockQuantity'] ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors['stockQuantity'] && <p className="text-sm text-red-500">{errors['stockQuantity']}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="reorderPoint">Reorder Point</label>
                <input
                  id="reorderPoint"
                  type="number"
                  placeholder="10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="warehouse">Warehouse Location</label>
                <select
                  id="warehouse"
                  value={warehouse}
                  onChange={(e) => setWarehouse(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors['warehouse'] ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="main">Main Warehouse</option>
                  <option value="store1">Retail Store 1</option>
                  <option value="store2">Retail Store 2</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="incomingStock">Incoming Stock</label>
                <input
                  id="incomingStock"
                  type="number"
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="batchNumber">Batch Number</label>
                <input
                  id="batchNumber"
                  placeholder="Optional"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  id="expiryDate"
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                Stock quantities are managed at the variant level. Configure stock for each variant in the Variants step.
              </p>
            </div>
          </div>
        );
      case "channels":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold mb-4">Channels & Listings</h2>
            <div className="space-y-2">
              <label>Select Channel</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="website">Own Website</option>
                <option value="amazon">Amazon</option>
                <option value="flipkart">Flipkart</option>
                <option value="meesho">Meesho</option>
                <option value="myntra">Myntra</option>
              </select>
            </div>

            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">Website Configuration</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="websiteTitle">Website Title</label>
                  <input
                    id="websiteTitle"
                    placeholder="Product title for website"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="websiteSku">Website SKU</label>
                  <input
                    id="websiteSku"
                    placeholder="SKU for website"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="websiteShortDesc">Short Description</label>
                <textarea
                  id="websiteShortDesc"
                  placeholder="Short description for website"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="websiteDesc">Description</label>
                <textarea
                  id="websiteDesc"
                  placeholder="Detailed description for website"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="websiteSpecs">Specifications</label>
                <textarea
                  id="websiteSpecs"
                  placeholder="Product specifications"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );
      case "media":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold mb-4">Media Upload</h2>
            <div className="space-y-2">
              <label>Main Product Images *</label>
              <div
              onDrop={e => {
                e.preventDefault();
                const files = Array.from(e.dataTransfer.files).filter(
                file => file.type.startsWith("image/")
                );
                if (files.length > 0) {
                setMainImages(prev => [...prev, ...files]);
                }
              }}
              onDragOver={e => e.preventDefault()}
              >
              <label
                htmlFor="mainImages"
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer block"
                style={{ cursor: "pointer" }}
              >
                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                Drop your images here or click to browse
                </p>
                <p className="text-xs text-gray-500">JPG, PNG, WebP up to 10MB</p>
                <input
                id="mainImages"
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={e => {
                  const files = Array.from(e.target.files || []);
                  setMainImages(prev => [...prev, ...files]);
                }}
                />
              </label>
              {mainImages.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                {mainImages.map((file: any, idx: number) => (
                  <div key={idx} className="relative w-24 h-24">
                  <img
                    src={typeof file === "string" ? file : URL.createObjectURL(file)}
                    alt={`preview-${idx}`}
                    className="object-cover w-full h-full rounded"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                    onClick={() =>
                    setMainImages(prev =>
                      prev.filter((_: any, i: number) => i !== idx)
                    )
                    }
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                  </div>
                ))}
                </div>
              )}
              </div>
            </div>

            <div className="space-y-2">
              <label>Gallery Images</label>
              <div
              onDrop={e => {
                e.preventDefault();
                const files = Array.from(e.dataTransfer.files).filter(
                file => file.type.startsWith("image/")
                );
                if (files.length > 0) {
                setGalleryImages(prev => [...prev, ...files]);
                }
              }}
              onDragOver={e => e.preventDefault()}
              >
              <label
                htmlFor="galleryImages"
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer block"
                style={{ cursor: "pointer" }}
              >
                <Camera className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-1 text-sm text-gray-600">Drop your images here or click to browse</p>
                <p className="text-xs text-gray-500">JPG, PNG, WebP up to 10MB</p>
                <input
                id="galleryImages"
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={e => {
                  const files = Array.from(e.target.files || []);
                  setGalleryImages(prev => [...prev, ...files]);
                }}
                />
              </label>
              {galleryImages.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                {galleryImages.map((file: any, idx: number) => (
                  <div key={idx} className="relative w-20 h-20">
                  <img
                    src={typeof file === "string" ? file : URL.createObjectURL(file)}
                    alt={`gallery-preview-${idx}`}
                    className="object-cover w-full h-full rounded"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                    onClick={() =>
                    setGalleryImages(prev =>
                      prev.filter((_: any, i: number) => i !== idx)
                    )
                    }
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                  </div>
                ))}
                </div>
              )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="productVideo">Product Video (Optional)</label>
              <input
                id="productVideo"
                placeholder="Video URL or upload"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );
      case "seo":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold mb-4">SEO & Tags</h2>
            <div className="space-y-2">
              <label htmlFor="metaTitle">Meta Title</label>
              <input
                id="metaTitle"
                placeholder="SEO-friendly title"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="metaDescription">Meta Description</label>
              <textarea
                id="metaDescription"
                placeholder="SEO description for search results"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="searchTags">Search Tags / Keywords</label>
              <input
                id="searchTags"
                placeholder="Comma-separated tags for better searchability"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );
      case "visibility":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold mb-4">Visibility Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="onlineStore">Online Store Visibility</label>
                  <p className="text-sm text-gray-500">Show product on your website</p>
                </div>
                <input type="checkbox" id="onlineStore" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="amazonVisible">Amazon Marketplace</label>
                  <p className="text-sm text-gray-500">List on Amazon</p>
                </div>
                <input type="checkbox" id="amazonVisible" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="flipkartVisible">Flipkart Marketplace</label>
                  <p className="text-sm text-gray-500">List on Flipkart</p>
                </div>
                <input type="checkbox" id="flipkartVisible" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="meeshoVisible">Meesho Marketplace</label>
                  <p className="text-sm text-gray-500">List on Meesho</p>
                </div>
                <input type="checkbox" id="meeshoVisible" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="myntraVisible">Myntra Marketplace</label>
                  <p className="text-sm text-gray-500">List on Myntra</p>
                </div>
                <input type="checkbox" id="myntraVisible" />
              </div>
            </div>
          </div>
        );
      case "additional":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold mb-4">Additional Settings</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="countryOrigin">Country of Origin *</label>
                <select
                  id="countryOrigin"
                  value={countryOfOrigin}
                  onChange={(e) => setCountryOfOrigin(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {countries.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="weight">Weight (grams) *</label>
                <input
                  id="weight"
                  type="number"
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="length">Length (cm)</label>
                <input
                  id="length"
                  type="number"
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="width">Width (cm)</label>
                <input
                  id="width"
                  type="number"
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="height">Height (cm)</label>
                <input
                  id="height"
                  type="number"
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">Return Settings</h4>
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="returnable">Returnable</label>
                  <p className="text-sm text-gray-500">Allow returns for this product</p>
                </div>
                 <Switch 
                    id="returnable" 
                    checked={returnSettings.isReturnable}
                    onCheckedChange={(checked) => setReturnSettings(prev => ({ ...prev, isReturnable: checked }))}
                  />
              </div>
              
               {returnSettings.isReturnable && (
                <><div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="returnWindow">Return Window (Days)</label>
                  <select
                    id="returnWindow"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="7">7 Days</option>
                    <option value="10">10 Days</option>
                    <option value="15">15 Days</option>
                    <option value="30">30 Days</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="returnType">Return Type</label>
                  <select
                    id="returnType"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="refund">Refund Only</option>
                    <option value="replacement">Replacement Only</option>
                    <option value="refund_or_replacement">Refund or Replacement</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="returnConditions">Return Conditions</label>
                <textarea
                  id="returnConditions"
                  placeholder="e.g., Only unused and unopened items accepted"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="returnShipping">Return Shipping Borne By</label>
                <select
                  id="returnShipping"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="customer">Customer</option>
                  <option value="seller">Seller</option>
                  <option value="platform">Platform</option>
                </select>
              </div>
              </>)}
              {!returnSettings.isReturnable && (
                <div className="space-y-2">
                  <label htmlFor="nonReturnableReason">Reason for Non-Returnable</label>
                  <textarea
                    id="nonReturnableReason"
                    placeholder="e.g., Hygiene reasons, perishable item"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="codAvailable">COD Available</label>
                <p className="text-sm text-gray-500">Cash on delivery</p>
              </div>
              <input type="checkbox" id="codAvailable" defaultChecked />
            </div>

            <div className="space-y-2">
              <label htmlFor="warrantyInfo">Warranty Information</label>
              <textarea
                id="warrantyInfo"
                placeholder="Warranty details"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="customAttributes">Custom Attributes</label>
              <input
                id="customAttributes"
                placeholder="e.g., Fabric Type: Cotton, Season: Summer"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const steps = [
  { id: "basic", label: "Basic Information", icon: Info, content: renderStep('basic') },
  { id: "variants", label: "Variance", icon: Palette, content: renderStep('variants') },
  { id: "pricing", label: "Pricing and Taxing", icon: IndianRupee, content: renderStep('pricing') },
  { id: "inventory", label: "Warehousing", icon: Warehouse, content: renderStep('inventory') },
  { id: "channels", label: "Listing", icon: Share2, content: renderStep('channels') },
  { id: "media", label: "Media", icon: Camera, content: renderStep('media') },
  { id: "seo", label: "SEO", icon: Search, content: renderStep('seo') },
  { id: "additional", label: "Additional Settings", icon: Settings, content: renderStep('additional') },
];

  const handleNext = () => {
    const currentStepId = steps[currentStep].id;
    const requiredFields = {
      basic: ["productName", "productType"],
      pricing: ["mrp", "sellingPrice"],
      inventory: ["stockQuantity"],
      additional: ["countryOrigin"],
    };

    const fields = requiredFields[currentStepId];
    if (fields) {
      const newErrors = {};
      for (const id of fields) {
        const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
        if (!el || !el.value) {
          newErrors[id] = `This field is required.`;
        }
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        const firstErrorField = Object.keys(newErrors)[0];
        const el = document.getElementById(firstErrorField);
        el?.focus();
        return;
      }
    }
    setErrors({});
    saveStepToStore();

    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleSaveAsDraft = () => alert("Save as draft");
  const handleSaveAndPublish = () => alert("Save and Publish clicked");
  

  const renderStepperNavigation = () => {
    return (
      <div className="flex justify-between pt-6 border-t mt-6">
        <Button
          variant={currentStep === 0 ? "outline" : "destructive"}
          onClick={handleBack}
          disabled={currentStep === 0}
          className={`px-4 py-2 rounded ${currentStep === 0 ? 'bg-gray-300 text-gray-700 disabled:opacity-50' : ''}`}
        >
          Back
        </Button>
         <div className="flex gap-4">
          <Button
            onClick={handleSaveAsDraft}
            className="px-4 py-2 bg-brand-blue text-white rounded"
          >
            Save as Draft
          </Button>
          <Button
            onClick={currentStep === steps.length - 1 ? handleSaveAndPublish : handleNext}
            className="px-4 py-2 bg-green-600 hover:bg-green-700"
          >
           { currentStep === steps.length - 1 ? 'Save & Publish' : 'Save & Next'}
          </Button>
        </div>
      </div>
    );
  }
  

  // Handler to collect all data and dispatch to store/api
  const saveStepToStore = () => {
    const payload = {
      productName,
      productSku,
      productType,
      brand,
      category,
      description,
      shortDescription,
      variants,
      mrp,
      sellingPrice,
      costPrice,
      stock,
      warehouse,
      channels,
      mainImages,
      galleryImages,
      metaTitle,
      metaDescription,
      tags,
      visible,
      featured,
      countryOfOrigin,
    };
    dispatch(addProductRequest(payload));
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Stepper Component Integration */}
      <Stepper steps={steps} 
        handleNext={handleNext}
        handleBack={handleBack} 
        activeStep={currentStep} 
        setActiveStep={setCurrentStep} 
        navigationSection={renderStepperNavigation()}
      />

      {/* Inline form components remain */}
      <AddBrandForm
        isOpen={showAddBrand}
        onClose={() => setShowAddBrand(false)}
        onSave={handleAddBrand}
      />
      <AddCategoryForm
        isOpen={showAddCategory}
        onClose={() => setShowAddCategory(false)}
        onSave={handleAddCategory}
      />
      <AddCountryForm
        isOpen={showAddCountry}
        onClose={() => setShowAddCountry(false)}
        onSave={handleAddCountry}
      />
    </div>
  );
};

export default AddItemForm;
