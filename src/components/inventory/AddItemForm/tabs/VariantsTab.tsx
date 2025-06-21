import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Palette, ImageIcon } from "lucide-react";

const VariantsTab = ({
  productType,
  variants,
  setVariants,
  variantCombinations,
  generateVariantCombinations,
  addVariantValue,
  addVariantOption,
  removeVariantOption,
  removeVariantValue,
  updateVariantCombination,
}) => {
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
                <div key={optionIndex} className="p-4 border rounded-md">
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
                  <div key={combo.id} className="p-4 border rounded-md">
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(combo.attributes).map(([key, value]) => (
                          <Badge key={key} variant="outline">
                            {key}: {value as string}
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
};

export default VariantsTab; 