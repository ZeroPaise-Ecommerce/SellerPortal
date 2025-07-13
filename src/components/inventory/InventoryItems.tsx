
import React, { useEffect, useState } from "react";
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
  Search, 
  Plus, 
  Filter, 
  Eye,
  Edit,
  Upload,
  Package,
  TrendingUp,
  ShoppingCart,
  AlertOctagon
} from "lucide-react";
import AddItemForm from "./AddItemForm/AddItemForm";
import { getInventoryItemsRequest } from "@/store/Inventory/product/actions";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";

const formatIndianCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
};

const InventoryItems = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getInventoryItemsRequest());
  }, [dispatch]);

  const { inventoryItems } = useAppSelector((state: any) => state.product);

  const items = inventoryItems;

  console.log(items);

  // const items = [
  //   {
  //     id: "ITM001",
  //     itemId: "ITEM-001",
  //     sku: "WE-001-BLK",
  //     name: "Wireless Earbuds",
  //     variants: "+3 variants",
  //     category: "Electronics",
  //     supplier: "TechCorp Ltd",
  //     buyPrice: 45.99,
  //     salePrice: 89.99,
  //     qty: 245,
  //     stockValue: 11267.55,
  //     status: "Active",
  //   },
  //   {
  //     id: "ITM002",
  //     itemId: "ITEM-002",
  //     sku: "SW-005-SLV",
  //     name: "Smart Watch Series 5",
  //     variants: "+2 variants",
  //     category: "Electronics",
  //     supplier: "GadgetHub Inc",
  //     buyPrice: 149.99,
  //     salePrice: 249.99,
  //     qty: 120,
  //     stockValue: 17998.8,
  //     status: "Active",
  //   },
  //   {
  //     id: "ITM003",
  //     itemId: "ITEM-003",
  //     sku: "BS-010-RED",
  //     name: "Bluetooth Speaker",
  //     variants: "+4 variants",
  //     category: "Electronics",
  //     supplier: "AudioMax",
  //     buyPrice: 35.50,
  //     salePrice: 59.99,
  //     qty: 88,
  //     stockValue: 3124,
  //     status: "Active",
  //   },
  //   {
  //     id: "ITM004",
  //     itemId: "ITEM-004",
  //     sku: "PC-101-CLR",
  //     name: "Phone Case Premium",
  //     variants: "+6 variants",
  //     category: "Accessories",
  //     supplier: "CaseMaster",
  //     buyPrice: 8.50,
  //     salePrice: 24.99,
  //     qty: 320,
  //     stockValue: 2720,
  //     status: "Active",
  //   },
  //   {
  //     id: "ITM005",
  //     itemId: "ITEM-005",
  //     sku: "USB-056-WHT",
  //     name: "USB-C Cable",
  //     variants: "+2 variants",
  //     category: "Accessories",
  //     supplier: "CableTech",
  //     buyPrice: 4.99,
  //     salePrice: 19.99,
  //     qty: 12,
  //     stockValue: 59.88,
  //     status: "Low Stock",
  //   },
  //   {
  //     id: "ITM006",
  //     itemId: "ITEM-006",
  //     sku: "WC-022-BLK",
  //     name: "Wireless Charger",
  //     variants: "+1 variant",
  //     category: "Electronics",
  //     supplier: "PowerTech",
  //     buyPrice: 22.50,
  //     salePrice: 45.99,
  //     qty: 0,
  //     stockValue: 0,
  //     status: "Out of Stock",
  //   },
  // ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 border-green-200";
      case "Low Stock": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Out of Stock": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const totalItems = items.length;
  const uniqueCategories = new Set(items.map(item => item.category));
  const numberOfCategories = uniqueCategories.size;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const totalStockValue = items.reduce((sum, item) => sum + item.stockValue, 0);
  const activeItems = items.filter(item => item.status === "Active").length;
  const lowStockItems = items.filter(item => item.status === "Low Stock").length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Items</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{totalItems}</div>
            <p className="text-xs text-blue-600 mt-1">{activeItems} active items</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Stock Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{formatIndianCurrency(totalStockValue)}</div>
            <p className="text-xs text-green-600 mt-1">Total inventory value</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Categories</CardTitle>
            <ShoppingCart className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{numberOfCategories}</div>
            <p className="text-xs text-purple-600 mt-1">Product categories</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Low Stock Alerts</CardTitle>
            <AlertOctagon className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{lowStockItems}</div>
            <p className="text-xs text-orange-600 mt-1">Items need restock</p>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Inventory Items</h2>
          <p className="text-sm text-gray-600 mt-1">Manage your product inventory</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <Button variant="outline" size="sm" className="h-10">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Dialog open={isBulkUploadOpen} onOpenChange={setIsBulkUploadOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200 px-6 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <Upload className="h-4 w-4 mr-2" />
                Bulk Upload
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Bulk Upload Items</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="text-center">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-500 transition-colors cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Drop your CSV file here or click to browse
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsBulkUploadOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsBulkUploadOpen(false)}>Upload</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Item</DialogTitle>
              </DialogHeader>
              <AddItemForm onClose={() => setIsAddItemOpen(false)} />
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
                  <TableHead className="font-semibold text-gray-700 py-4">Item ID</TableHead>
                  <TableHead className="font-semibold text-gray-700">SKU</TableHead>
                  <TableHead className="font-semibold text-gray-700">Name</TableHead>
                  <TableHead className="font-semibold text-gray-700">Category</TableHead>
                  <TableHead className="font-semibold text-gray-700">Supplier</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-right">Buy Price</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-right">Sale Price</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-right">Qty</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-right">Stock Value</TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center w-32">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((item, index) => (
                  <TableRow 
                    key={item.id}
                    className={`hover:bg-blue-50 transition-colors duration-150 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <TableCell className="font-medium text-blue-600 py-4">{item.productId + '' + item.productName}</TableCell>
                    <TableCell className="text-gray-700 font-mono text-sm">{item.SKU}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{item.productName}</div>
                        <div className="text-sm text-blue-600">{item.variants}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700">{item.category}</TableCell>
                    <TableCell className="text-gray-700">{item.supplier}</TableCell>
                    <TableCell className="text-right font-medium">{formatIndianCurrency(item.buyPrice)}</TableCell>
                    <TableCell className="text-right font-medium">{formatIndianCurrency(item.sellPrice)}</TableCell>
                    <TableCell className="text-right font-medium">{item.stockQuantity}</TableCell>
                    <TableCell className="text-right font-semibold text-gray-900">
                      {formatIndianCurrency(item.stockValue)}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                        {item.status === "Low Stock" && <AlertOctagon className="h-3 w-3 mr-1" />}
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-600"
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
    </div>
  );
};

export default InventoryItems;
