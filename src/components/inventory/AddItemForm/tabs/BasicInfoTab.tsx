import React from "react";
import { Button } from "@/components/ui/button";

const BasicInfoTab = ({
  productName,
  setProductName,
  productSku,
  setProductSku,
  productType,
  setProductType,
  brand,
  setBrand,
  category,
  setCategory,
  description,
  setDescription,
  shortDescription,
  setShortDescription,
  errors,
  brands,
  setShowAddBrand,
  categories,
  setShowAddCategory,
}) => {
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
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors["productName"] ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors["productName"] && (
            <p className="text-sm text-red-500">{errors["productName"]}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="productSku">Product SKU</label>
          <input
            id="productSku"
            placeholder="Auto-generated or manual"
            value={productSku}
            onChange={(e) => setProductSku(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors["productSku"] ? "border-red-500" : "border-gray-300"
            }`}
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
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors["productType"] ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select a product type</option>
            <option value="simple">Simple Product</option>
            <option value="variant">Variant Product</option>
          </select>
          {errors["productType"] && (
            <p className="text-sm text-red-500">{errors["productType"]}</p>
          )}
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
};

export default BasicInfoTab; 