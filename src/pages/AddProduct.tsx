import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Search, Check, Filter, Package } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock inventory products data
const inventoryProducts = [
  {
    id: "INV-001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 89.99,
    stock: 145,
    supplier: "Tech Innovations Inc.",
    location: "Warehouse A",
  },
  {
    id: "INV-002",
    name: "Smart Watch Series 5",
    category: "Electronics",
    price: 299.99,
    stock: 78,
    supplier: "Tech Innovations Inc.",
    location: "Warehouse A",
  },
  {
    id: "INV-003",
    name: "Running Shoes",
    category: "Apparel",
    price: 119.99,
    stock: 212,
    supplier: "Sports Gear Ltd.",
    location: "Warehouse B",
  },
  {
    id: "INV-004",
    name: "Organic Cotton T-shirt",
    category: "Apparel",
    price: 24.99,
    stock: 189,
    supplier: "Eco Clothing Co.",
    location: "Warehouse B",
  },
  {
    id: "INV-005",
    name: "Stainless Steel Water Bottle",
    category: "Accessories",
    price: 34.99,
    stock: 87,
    supplier: "Green Products Inc.",
    location: "Warehouse A",
  },
  {
    id: "INV-006",
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 149.99,
    stock: 23,
    supplier: "Sound Systems Co.",
    location: "Warehouse C",
  },
  {
    id: "INV-007",
    name: "Yoga Mat",
    category: "Sports",
    price: 45.99,
    stock: 62,
    supplier: "Fitness Supplies Ltd.",
    location: "Warehouse B",
  },
  {
    id: "INV-008",
    name: "Professional Camera",
    category: "Electronics",
    price: 1299.99,
    stock: 18,
    supplier: "Photo Experts Inc.",
    location: "Warehouse A",
  },
  {
    id: "INV-009",
    name: "Leather Wallet",
    category: "Accessories",
    price: 49.99,
    stock: 95,
    supplier: "Fashion Accessories Co.",
    location: "Warehouse C",
  },
  {
    id: "INV-010",
    name: "Gaming Console",
    category: "Electronics",
    price: 499.99,
    stock: 42,
    supplier: "Gaming Tech Ltd.",
    location: "Warehouse A",
  },
];

const AddProduct = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  // Get unique categories for the filter
  const categories = Array.from(new Set(inventoryProducts.map(p => p.category)));
  
  // Filter products based on search query and category filter
  const filteredProducts = inventoryProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        product.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleSelectProduct = (productId: string) => {
    setSelectedProducts(prev => {
      const updated = new Set(prev);
      if (updated.has(productId)) {
        updated.delete(productId);
      } else {
        updated.add(productId);
      }
      return updated;
    });
  };
  
  const handleSelectAll = () => {
    if (selectedProducts.size === filteredProducts.length) {
      // If all are selected, unselect all
      setSelectedProducts(new Set());
    } else {
      // Otherwise select all filtered products
      setSelectedProducts(new Set(filteredProducts.map(p => p.id)));
    }
  };
  
  const handleAddSelectedProducts = () => {
    // In a real app, this would add the selected products to the store
    // For now, just navigate back to products page
    navigate('/products');
  };
  
  const handleBackClick = () => {
    navigate('/products');
  };
  
  const handleFilterChange = (category: string | null) => {
    setCategoryFilter(category === categoryFilter ? null : category);
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4"
          onClick={handleBackClick}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </Button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3 mb-4 md:mb-0">
            <div className="bg-brand-blue bg-opacity-10 p-2 rounded-lg">
              <Package className="h-6 w-6 text-brand-blue" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Add Products</h1>
              <p className="text-sm text-gray-500 mt-1">
                Select products from inventory to add to your online store
              </p>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              disabled={selectedProducts.size === 0}
              onClick={handleBackClick}
            >
              Cancel
            </Button>
            <Button 
              className="bg-brand-blue hover:bg-brand-dark-blue"
              size="sm"
              disabled={selectedProducts.size === 0}
              onClick={handleAddSelectedProducts}
            >
              <Check className="h-4 w-4 mr-1" /> 
              Add {selectedProducts.size} {selectedProducts.size === 1 ? 'Product' : 'Products'}
            </Button>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3">
          <CardTitle className="text-base font-semibold">Inventory Products</CardTitle>
          <div className="flex gap-2 w-full sm:w-auto mt-3 sm:mt-0">
            <div className="relative flex-1 sm:flex-auto">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search inventory..."
                className="pl-8 text-sm h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <Button size="sm" variant="outline" className="gap-1 h-9">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
              {/* Simple category filter dropdown - in a real app would be a proper dropdown */}
              <div className="absolute right-0 top-full mt-1 z-10 w-48 bg-white shadow-lg rounded-md border">
                <div className="p-2">
                  <Label className="text-xs font-medium">Categories</Label>
                  <div className="mt-2 space-y-1">
                    {categories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`category-${category}`} 
                          checked={categoryFilter === category}
                          onCheckedChange={() => handleFilterChange(category)}
                        />
                        <Label 
                          htmlFor={`category-${category}`} 
                          className="text-sm cursor-pointer"
                        >
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox 
                      checked={
                        filteredProducts.length > 0 && 
                        selectedProducts.size === filteredProducts.length
                      }
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead className="text-xs font-semibold">ID</TableHead>
                  <TableHead className="text-xs font-semibold">Name</TableHead>
                  <TableHead className="text-xs font-semibold">Category</TableHead>
                  <TableHead className="text-xs font-semibold">Price</TableHead>
                  <TableHead className="text-xs font-semibold">Stock</TableHead>
                  <TableHead className="text-xs font-semibold">Supplier</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow 
                    key={product.id} 
                    className={selectedProducts.has(product.id) ? "bg-gray-50" : ""}
                  >
                    <TableCell>
                      <Checkbox 
                        checked={selectedProducts.has(product.id)}
                        onCheckedChange={() => handleSelectProduct(product.id)}
                        aria-label={`Select ${product.name}`}
                      />
                    </TableCell>
                    <TableCell className="text-xs">{product.id}</TableCell>
                    <TableCell className="text-xs font-medium">{product.name}</TableCell>
                    <TableCell className="text-xs">{product.category}</TableCell>
                    <TableCell className="text-xs">${product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-xs">{product.stock}</TableCell>
                    <TableCell className="text-xs">{product.supplier}</TableCell>
                  </TableRow>
                ))}
                {filteredProducts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-gray-500 text-sm">
                      No products found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AddProduct;
