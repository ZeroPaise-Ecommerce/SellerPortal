
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Plus, Filter, Eye, Edit, MoreHorizontal, Tag, TrendingUp, Package, Calendar } from "lucide-react";

const formatIndianCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
};

const InventoryCategories = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const categories = [
    {
      id: "CAT001",
      name: "Electronics",
      sales: 2456789,
      stock: 1247,
      stockValue: 3456789,
      added: "2023-05-12",
      description: "Electronic gadgets and devices including smartphones, laptops, accessories",
      itemCount: 147,
      status: "Active"
    },
    {
      id: "CAT002", 
      name: "Accessories",
      sales: 987456,
      stock: 2398,
      stockValue: 1234567,
      added: "2023-05-15",
      description: "Device accessories like cables, cases, chargers, and more",
      itemCount: 98,
      status: "Active"
    },
    {
      id: "CAT003",
      name: "Clothing",
      sales: 3567890,
      stock: 1856,
      stockValue: 4567890,
      added: "2023-06-02",
      description: "Fashion apparel and clothing items for all age groups",
      itemCount: 235,
      status: "Active"
    },
    {
      id: "CAT004",
      name: "Home Appliances",
      sales: 1876543,
      stock: 456,
      stockValue: 2345678,
      added: "2023-06-10",
      description: "Household electronic appliances and kitchen equipment",
      itemCount: 56,
      status: "Active"
    },
    {
      id: "CAT005",
      name: "Books",
      sales: 234567,
      stock: 1123,
      stockValue: 567890,
      added: "2023-06-25",
      description: "Books, magazines, educational materials and publications",
      itemCount: 112,
      status: "Active"
    },
  ];

  const totalItems = categories.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = categories.slice(startIndex, endIndex);

  const totalSales = categories.reduce((sum, cat) => sum + cat.sales, 0);
  const totalStock = categories.reduce((sum, cat) => sum + cat.stock, 0);
  const totalStockValue = categories.reduce((sum, cat) => sum + cat.stockValue, 0);

  const handleView = (category: any) => {
    setSelectedCategory(category);
    setIsViewModalOpen(true);
  };

  const handleEdit = (category: any) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Categories</CardTitle>
            <Tag className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{totalItems}</div>
            <p className="text-xs text-blue-600 mt-1">Active categories</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Total Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{formatIndianCurrency(totalSales)}</div>
            <p className="text-xs text-green-600 mt-1">Across all categories</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Total Stock</CardTitle>
            <Package className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{totalStock.toLocaleString()}</div>
            <p className="text-xs text-purple-600 mt-1">Items in stock</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Stock Value</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{formatIndianCurrency(totalStockValue)}</div>
            <p className="text-xs text-orange-600 mt-1">Total inventory value</p>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
          <p className="text-sm text-gray-600 mt-1">Organize your products by categories</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <Button variant="outline" size="sm" className="h-10">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category Name *</label>
                  <Input placeholder="Enter category name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Parent Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select parent category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Input placeholder="Enter category description" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Display Order</label>
                  <Input type="number" placeholder="1" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select defaultValue="active">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsAddCategoryOpen(false)}>Save Category</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Table */}
      <Card className="border-0 shadow-xl bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 border-b border-gray-200">
                  <TableHead className="font-semibold text-gray-700 py-4">Category</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-right">Sales</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-right">Stock</TableHead>
                  <TableHead className="font-semibold text-gray-700">Added</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center w-32">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((category, index) => (
                  <TableRow 
                    key={category.id}
                    className={`hover:bg-blue-50 transition-colors duration-150 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <TableCell className="py-4">
                      <div>
                        <div className="font-medium text-blue-600">{category.name}</div>
                        <div className="text-sm text-gray-500">{category.itemCount} items</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-gray-900">
                      {formatIndianCurrency(category.sales)}
                    </TableCell>
                    <TableCell className="text-right font-medium">{category.stock.toLocaleString()}</TableCell>
                    <TableCell className="text-gray-700">{category.added}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                          onClick={() => handleView(category)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-600"
                          onClick={() => handleEdit(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Items per page:</span>
          <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="text-sm text-gray-700">
          Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* View Category Dialog */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Category Details</DialogTitle>
          </DialogHeader>
          {selectedCategory && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Category Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Name</label>
                      <p className="text-base">{selectedCategory.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Description</label>
                      <p className="text-base">{selectedCategory.description}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Total Items</label>
                      <p className="text-base font-semibold">{selectedCategory.itemCount}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Total Sales</label>
                      <p className="text-base font-semibold">{formatIndianCurrency(selectedCategory.sales)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Stock Quantity</label>
                      <p className="text-base font-semibold">{selectedCategory.stock.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Stock Value</label>
                      <p className="text-base font-semibold">{formatIndianCurrency(selectedCategory.stockValue)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Added Date</label>
                      <p className="text-base">{selectedCategory.added}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>Close</Button>
                <Button onClick={() => {
                  setIsViewModalOpen(false);
                  handleEdit(selectedCategory);
                }}>Edit Category</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          {selectedCategory && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category Name *</label>
                <Input defaultValue={selectedCategory.name} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Parent Category</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Input defaultValue={selectedCategory.description} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select defaultValue={selectedCategory.status.toLowerCase()}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsEditModalOpen(false)}>Update Category</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryCategories;
