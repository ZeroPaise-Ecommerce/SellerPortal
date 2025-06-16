
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Package, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Info,
  Filter,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const productsData = [
  {
    id: "PRD-001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 89.99,
    stock: 145,
    status: "In Stock",
    active: true
  },
  {
    id: "PRD-002",
    name: "Smart Watch Series 5",
    category: "Electronics",
    price: 299.99,
    stock: 78,
    status: "In Stock",
    active: true
  },
  {
    id: "PRD-003",
    name: "Running Shoes",
    category: "Apparel",
    price: 119.99,
    stock: 212,
    status: "In Stock",
    active: true
  },
  {
    id: "PRD-004",
    name: "Organic Cotton T-shirt",
    category: "Apparel",
    price: 24.99,
    stock: 0,
    status: "Out of Stock",
    active: false
  },
  {
    id: "PRD-005",
    name: "Stainless Steel Water Bottle",
    category: "Accessories",
    price: 34.99,
    stock: 87,
    status: "In Stock",
    active: true
  },
  {
    id: "PRD-006",
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 149.99,
    stock: 23,
    status: "Low Stock",
    active: true
  },
  {
    id: "PRD-007",
    name: "Yoga Mat",
    category: "Sports",
    price: 45.99,
    stock: 62,
    status: "In Stock",
    active: true
  },
];

const Products = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeStatus, setActiveStatus] = useState<{[key: string]: boolean}>(() => {
    const statusObj: {[key: string]: boolean} = {};
    productsData.forEach(product => {
      statusObj[product.id] = product.active;
    });
    return statusObj;
  });
  
  const productsPerPage = 5;

  const filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };
  
  const handleAddProductClick = () => {
    navigate('/products/add');
  };
  
  const handleActiveToggle = (productId: string) => {
    setActiveStatus(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center">
        <div className="mr-3">
          <Package size={24} className="text-brand-blue" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold">Products</h1>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Info className="h-4 w-4 text-gray-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-sm">
                  <p className="text-xs">
                    These are the products that allocated for the website and App sales. 
                    For detailed and all product list, visit the inventory page.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-sm text-gray-500">Manage your product inventory</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Products</p>
              <div className="flex items-baseline">
                <span className="text-lg font-bold">745</span>
                <span className="text-xs text-green-500 ml-2">+12% this month</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Out of Stock</p>
              <div className="flex items-baseline">
                <span className="text-lg font-bold">23</span>
                <span className="text-xs text-red-500 ml-2">+5 since last week</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Low Stock</p>
              <div className="flex items-baseline">
                <span className="text-lg font-bold">48</span>
                <span className="text-xs text-yellow-500 ml-2">-3 since last week</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">New Products</p>
              <div className="flex items-baseline">
                <span className="text-lg font-bold">15</span>
                <span className="text-xs text-blue-500 ml-2">Added this week</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3">
          <CardTitle className="text-base font-semibold">Product Inventory</CardTitle>
          <div className="flex gap-2 w-full sm:w-auto mt-3 sm:mt-0">
            <div className="relative flex-1 sm:flex-auto">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="pl-8 text-sm h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button size="sm" variant="outline" className="gap-1 h-9">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
            <Button size="sm" className="bg-brand-blue hover:bg-brand-dark-blue h-9" onClick={handleAddProductClick}>
              <Plus className="h-4 w-4 mr-1" /> Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-semibold">ID</TableHead>
                  <TableHead className="text-xs font-semibold">Name</TableHead>
                  <TableHead className="text-xs font-semibold">Category</TableHead>
                  <TableHead className="text-xs font-semibold">Price</TableHead>
                  <TableHead className="text-xs font-semibold">Stock</TableHead>
                  <TableHead className="text-xs font-semibold">Status</TableHead>
                  <TableHead className="text-xs font-semibold text-center">Active</TableHead>
                  <TableHead className="text-xs font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentProducts.map((product) => (
                  <TableRow key={product.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleProductClick(product.id)}>
                    <TableCell className="text-xs">{product.id}</TableCell>
                    <TableCell className="text-xs font-medium">{product.name}</TableCell>
                    <TableCell className="text-xs">{product.category}</TableCell>
                    <TableCell className="text-xs">${product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-xs">{product.stock}</TableCell>
                    <TableCell className="text-xs">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          product.status === "In Stock"
                            ? "bg-green-100 text-green-800"
                            : product.status === "Out of Stock"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {product.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                      <Switch 
                        checked={activeStatus[product.id]} 
                        onCheckedChange={() => handleActiveToggle(product.id)}
                      />
                    </TableCell>
                    <TableCell className="text-xs text-right">
                      <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(totalPages, 3) }).map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink 
                        isActive={pageNum === currentPage}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                {totalPages > 3 && (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink onClick={() => setCurrentPage(totalPages)}>
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Products;
