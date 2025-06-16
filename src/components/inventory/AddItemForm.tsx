import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Trash2, 
  Upload, 
  Image as ImageIcon,
  Tag,
  Package,
  Globe,
  Eye,
  Settings,
  Info,
  Palette,
  IndianRupee,
  Warehouse,
  Share2,
  Camera,
  Search
} from "lucide-react";
import AddBrandForm from "./forms/AddBrandForm";
import AddCategoryForm from "./forms/AddCategoryForm";
import AddCountryForm from "./forms/AddCountryForm";

interface AddItemFormProps {
  onClose: () => void;
}

interface VariantCombination {
  id: string;
  attributes: { [key: string]: string };
  mrp: string;
  sellingPrice: string;
  costPrice: string;
  stock: string;
  image?: string;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [productType, setProductType] = useState("simple");
  const [variants, setVariants] = useState([{ option: "", values: [""] }]);
  const [variantCombinations, setVariantCombinations] = useState<VariantCombination[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [channels, setChannels] = useState({
    website: true,
    amazon: false,
    flipkart: false,
    meesho: false,
    myntra: false
  });
  const [selectedChannel, setSelectedChannel] = useState("website");
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
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddCountry, setShowAddCountry] = useState(false);
  const [returnSettings, setReturnSettings] = useState({
    isReturnable: true,
    returnWindowDays: "7",
    returnType: "refund_or_replacement",
    returnConditions: "",
    nonReturnableReason: "",
    returnShippingBorneBy: "seller"
  });

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

  const addVariantOption = () => {
    setVariants([...variants, { option: "", values: [""] }]);
  };

  const addVariantValue = (index: number) => {
    const newVariants = [...variants];
    newVariants[index].values.push("");
    setVariants(newVariants);
  };

  const removeVariantOption = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

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

  const handleSaveAsDraft = () => {
    console.log("Saving as draft...");
    // Implement save as draft functionality
  };

  const handleSaveAndPublish = () => {
    console.log("Saving and publishing...");
    // Implement save and publish functionality
  };

  const tabs = [
    { id: "basic", label: "Basic Info", icon: Info },
    { id: "variants", label: "Variants", icon: Palette },
    { id: "pricing", label: "Pricing & Tax", icon: IndianRupee },
    { id: "inventory", label: "Inventory", icon: Warehouse },
    { id: "channels", label: "Channels", icon: Share2 },
    { id: "media", label: "Media", icon: Camera },
    { id: "seo", label: "SEO & Tags", icon: Search },
    { id: "visibility", label: "Visibility", icon: Eye },
    { id: "additional", label: "Additional", icon: Settings },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-9 mb-6">
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className="flex flex-col items-center gap-1 p-2 text-xs"
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:block">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Basic Info Tab */}
        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription>Enter the basic details of your product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="productName">Product Name *</Label>
                  <Input id="productName" placeholder="Enter product name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productSku">Product SKU</Label>
                  <Input id="productSku" placeholder="Auto-generated or manual" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="productType">Product Type *</Label>
                  <Select value={productType} onValueChange={setProductType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simple">Simple Product</SelectItem>
                      <SelectItem value="variant">Variant Product</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <div className="flex gap-2">
                    <Select>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem key={brand.value} value={brand.value}>{brand.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setShowAddBrand(true)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="categories">Categories *</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedCategories.map((category, index) => (
                    <Badge key={index} variant="secondary" className="gap-2">
                      {category}
                      <button onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== category))}>
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Select onValueChange={(value) => setSelectedCategories([...selectedCategories, value])}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select categories" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.name}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setShowAddCategory(true)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Long product description" rows={4} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Textarea id="shortDescription" placeholder="For channel listings like Amazon" rows={2} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Variants Tab */}
        <TabsContent value="variants" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Product Variants
              </CardTitle>
              <CardDescription>Configure product variants like size, color, etc.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {productType === "variant" ? (
                <div className="space-y-6">
                  {/* Variant Options Setup */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Variant Options</h4>
                    {variants.map((variant, optionIndex) => (
                      <Card key={optionIndex} className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <Label>Variant Option {optionIndex + 1}</Label>
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
                            <Label>Values</Label>
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
                      </Card>
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
                        <Card key={combo.id} className="p-4">
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
                                <Label className="text-xs">MRP *</Label>
                                <Input
                                  type="number"
                                  placeholder="0.00"
                                  value={combo.mrp}
                                  onChange={(e) => updateVariantCombination(combo.id, 'mrp', e.target.value)}
                                />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">Selling Price *</Label>
                                <Input
                                  type="number"
                                  placeholder="0.00"
                                  value={combo.sellingPrice}
                                  onChange={(e) => updateVariantCombination(combo.id, 'sellingPrice', e.target.value)}
                                />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">Cost Price</Label>
                                <Input
                                  type="number"
                                  placeholder="0.00"
                                  value={combo.costPrice}
                                  onChange={(e) => updateVariantCombination(combo.id, 'costPrice', e.target.value)}
                                />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">Stock</Label>
                                <Input
                                  type="number"
                                  placeholder="0"
                                  value={combo.stock}
                                  onChange={(e) => updateVariantCombination(combo.id, 'stock', e.target.value)}
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label className="text-xs">Variant Image</Label>
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer">
                                <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                                <p className="mt-1 text-xs text-gray-600">Upload variant image</p>
                              </div>
                            </div>
                          </div>
                        </Card>
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
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pricing & Tax Tab */}
        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IndianRupee className="h-5 w-5" />
                Pricing & Tax Information
              </CardTitle>
              <CardDescription>Set pricing and tax details for your product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {productType === "simple" && (
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="mrp">MRP *</Label>
                    <Input id="mrp" type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sellingPrice">Selling Price *</Label>
                    <Input id="sellingPrice" type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="costPrice">Cost Price</Label>
                    <Input id="costPrice" type="number" placeholder="0.00" />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="taxClass">Tax Class</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tax rate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5% GST</SelectItem>
                      <SelectItem value="12">12% GST</SelectItem>
                      <SelectItem value="18">18% GST</SelectItem>
                      <SelectItem value="28">28% GST</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hsnCode">HSN Code</Label>
                  <Input id="hsnCode" placeholder="Enter HSN code" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gstType">GST Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select GST type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inclusive">Inclusive</SelectItem>
                      <SelectItem value="exclusive">Exclusive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inventory Tab - Modified for variant products */}
        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Warehouse className="h-5 w-5" />
                Inventory & Warehousing
              </CardTitle>
              <CardDescription>Manage stock quantities and warehouse details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {productType === "simple" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stockQuantity">Stock Quantity *</Label>
                    <Input id="stockQuantity" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reorderPoint">Reorder Point</Label>
                    <Input id="reorderPoint" type="number" placeholder="10" />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="warehouse">Warehouse Location</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select warehouse" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Main Warehouse</SelectItem>
                      <SelectItem value="store1">Retail Store 1</SelectItem>
                      <SelectItem value="store2">Retail Store 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="incomingStock">Incoming Stock</Label>
                  <Input id="incomingStock" type="number" placeholder="0" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="batchNumber">Batch Number</Label>
                  <Input id="batchNumber" placeholder="Optional" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input id="expiryDate" type="date" />
                </div>
              </div>

              {productType === "variant" && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Stock quantities are managed at the variant level. Configure stock for each variant in the Variants tab.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Channels Tab - Updated with channel-specific forms */}
        <TabsContent value="channels" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Channels & Listings
              </CardTitle>
              <CardDescription>Configure where and how your product will be listed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Channel</Label>
                <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Own Website</SelectItem>
                    <SelectItem value="amazon">Amazon</SelectItem>
                    <SelectItem value="flipkart">Flipkart</SelectItem>
                    <SelectItem value="meesho">Meesho</SelectItem>
                    <SelectItem value="myntra">Myntra</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedChannel === "website" ? (
                <div className="space-y-4 p-4 border rounded-lg">
                  <h4 className="font-medium">Website Configuration</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="websiteTitle">Website Title</Label>
                      <Input id="websiteTitle" placeholder="Product title for website" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="websiteSku">Website SKU</Label>
                      <Input id="websiteSku" placeholder="SKU for website" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="websiteShortDesc">Short Description</Label>
                    <Textarea id="websiteShortDesc" placeholder="Short description for website" rows={2} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="websiteDesc">Description</Label>
                    <Textarea id="websiteDesc" placeholder="Detailed description for website" rows={4} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="websiteSpecs">Specifications</Label>
                    <Textarea id="websiteSpecs" placeholder="Product specifications" rows={3} />
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center border rounded-lg bg-gray-50">
                  <div className="text-gray-500">
                    <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <h4 className="font-medium mb-2">Coming Soon</h4>
                    <p className="text-sm">Integration with {selectedChannel} is coming soon!</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Media Tab - No changes */}
        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Media Upload
              </CardTitle>
              <CardDescription>Upload images and videos for your product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Main Product Images *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Drop your images here or click to browse
                  </p>
                  <p className="text-xs text-gray-500">JPG, PNG, WebP up to 10MB</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Gallery Images</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-1 text-sm text-gray-600">Additional product images</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="productVideo">Product Video (Optional)</Label>
                <Input id="productVideo" placeholder="Video URL or upload" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Tab - No changes */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                SEO & Tags
              </CardTitle>
              <CardDescription>Optimize your product for search engines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input id="metaTitle" placeholder="SEO-friendly title" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea id="metaDescription" placeholder="SEO description for search results" rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="searchTags">Search Tags / Keywords</Label>
                <Input id="searchTags" placeholder="Comma-separated tags for better searchability" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Visibility Tab - No changes */}
        <TabsContent value="visibility" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Visibility Settings
              </CardTitle>
              <CardDescription>Control where your product appears online</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="onlineStore">Online Store Visibility</Label>
                    <p className="text-sm text-gray-500">Show product on your website</p>
                  </div>
                  <Switch id="onlineStore" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="amazonVisible">Amazon Marketplace</Label>
                    <p className="text-sm text-gray-500">List on Amazon</p>
                  </div>
                  <Switch id="amazonVisible" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="flipkartVisible">Flipkart Marketplace</Label>
                    <p className="text-sm text-gray-500">List on Flipkart</p>
                  </div>
                  <Switch id="flipkartVisible" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="meeshoVisible">Meesho Marketplace</Label>
                    <p className="text-sm text-gray-500">List on Meesho</p>
                  </div>
                  <Switch id="meeshoVisible" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="myntraVisible">Myntra Marketplace</Label>
                    <p className="text-sm text-gray-500">List on Myntra</p>
                  </div>
                  <Switch id="myntraVisible" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Additional Settings Tab - Updated with new return conditions */}
        <TabsContent value="additional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Additional Settings
              </CardTitle>
              <CardDescription>Configure additional product properties</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="countryOrigin">Country of Origin *</Label>
                  <div className="flex gap-2">
                    <Select>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.value} value={country.value}>{country.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setShowAddCountry(true)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (grams) *</Label>
                  <Input id="weight" type="number" placeholder="0" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="length">Length (cm)</Label>
                  <Input id="length" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Width (cm)</Label>
                  <Input id="width" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input id="height" type="number" placeholder="0" />
                </div>
              </div>

              {/* Enhanced Return Settings */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h4 className="font-medium">Return Settings</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="returnable">Returnable</Label>
                    <p className="text-sm text-gray-500">Allow returns for this product</p>
                  </div>
                  <Switch 
                    id="returnable" 
                    checked={returnSettings.isReturnable}
                    onCheckedChange={(checked) => setReturnSettings(prev => ({ ...prev, isReturnable: checked }))}
                  />
                </div>

                {returnSettings.isReturnable && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="returnWindow">Return Window (Days)</Label>
                        <Select 
                          value={returnSettings.returnWindowDays} 
                          onValueChange={(value) => setReturnSettings(prev => ({ ...prev, returnWindowDays: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7">7 Days</SelectItem>
                            <SelectItem value="10">10 Days</SelectItem>
                            <SelectItem value="15">15 Days</SelectItem>
                            <SelectItem value="30">30 Days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="returnType">Return Type</Label>
                        <Select 
                          value={returnSettings.returnType} 
                          onValueChange={(value) => setReturnSettings(prev => ({ ...prev, returnType: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="refund">Refund Only</SelectItem>
                            <SelectItem value="replacement">Replacement Only</SelectItem>
                            <SelectItem value="refund_or_replacement">Refund or Replacement</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="returnConditions">Return Conditions</Label>
                      <Textarea 
                        id="returnConditions" 
                        placeholder="e.g., Only unused and unopened items accepted"
                        value={returnSettings.returnConditions}
                        onChange={(e) => setReturnSettings(prev => ({ ...prev, returnConditions: e.target.value }))}
                        rows={2}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="returnShipping">Return Shipping Borne By</Label>
                      <Select 
                        value={returnSettings.returnShippingBorneBy} 
                        onValueChange={(value) => setReturnSettings(prev => ({ ...prev, returnShippingBorneBy: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="customer">Customer</SelectItem>
                          <SelectItem value="seller">Seller</SelectItem>
                          <SelectItem value="platform">Platform</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {!returnSettings.isReturnable && (
                  <div className="space-y-2">
                    <Label htmlFor="nonReturnableReason">Reason for Non-Returnable</Label>
                    <Textarea 
                      id="nonReturnableReason" 
                      placeholder="e.g., Hygiene reasons, perishable item"
                      value={returnSettings.nonReturnableReason}
                      onChange={(e) => setReturnSettings(prev => ({ ...prev, nonReturnableReason: e.target.value }))}
                      rows={2}
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="codAvailable">COD Available</Label>
                  <p className="text-sm text-gray-500">Cash on delivery</p>
                </div>
                <Switch id="codAvailable" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="warrantyInfo">Warranty Information</Label>
                <Textarea id="warrantyInfo" placeholder="Warranty details" rows={2} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customAttributes">Custom Attributes</Label>
                <Input id="customAttributes" placeholder="e.g., Fabric Type: Cotton, Season: Summer" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons - Made functional */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="outline" onClick={handleSaveAsDraft}>
          Save as Draft
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveAndPublish}>
          Save & Publish
        </Button>
      </div>

      {/* Modal Forms */}
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
