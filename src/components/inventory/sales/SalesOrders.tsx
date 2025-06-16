
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Plus, Filter, Eye, Edit, CheckCircle2, Clock, XCircle, FileText, TrendingUp, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import CreateSalesOrderForm from "./CreateSalesOrderForm";
import ViewSalesOrderDetails from "./ViewSalesOrderDetails";

const formatIndianCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Completed":
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200"><CheckCircle2 className="h-3 w-3 mr-1" /> Completed</span>;
    case "Processing":
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"><Clock className="h-3 w-3 mr-1" /> Processing</span>;
    case "Draft":
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200"><FileText className="h-3 w-3 mr-1" /> Draft</span>;
    case "Cancelled":
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200"><XCircle className="h-3 w-3 mr-1" /> Cancelled</span>;
    default:
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">{status}</span>;
  }
};

const SalesOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const orders = [
    {
      id: "SO-1001",
      customerName: "Rahul Sharma",
      date: "15-Jun-2023",
      amount: 24599,
      status: "Completed",
      paymentStatus: "Paid",
      items: 3
    },
    {
      id: "SO-1002",
      customerName: "Priya Patel",
      date: "10-Jun-2023",
      amount: 18450,
      status: "Processing",
      paymentStatus: "Pending",
      items: 2
    },
    {
      id: "SO-1003",
      customerName: "Amit Kumar",
      date: "05-Jun-2023",
      amount: 9275,
      status: "Completed",
      paymentStatus: "Paid",
      items: 1
    },
    {
      id: "SO-1004",
      customerName: "Deepa Singh",
      date: "01-Jun-2023",
      amount: 15699,
      status: "Cancelled",
      paymentStatus: "Refunded",
      items: 4
    },
    {
      id: "SO-1005",
      customerName: "Vikram Reddy",
      date: "28-May-2023",
      amount: 7850,
      status: "Draft",
      paymentStatus: "Pending",
      items: 2
    },
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredOrders.slice(startIndex, endIndex);

  const totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);
  const completedOrders = orders.filter(order => order.status === "Completed").length;
  const processingOrders = orders.filter(order => order.status === "Processing").length;

  const handleView = (order: any) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const handleEdit = (order: any) => {
    setSelectedOrder(order);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Orders</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{orders.length}</div>
            <p className="text-xs text-blue-600 mt-1">{completedOrders} completed, {processingOrders} processing</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Total Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{formatIndianCurrency(totalAmount)}</div>
            <p className="text-xs text-green-600 mt-1">Total order value</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Avg. Order Value</CardTitle>
            <ShoppingCart className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {formatIndianCurrency(totalAmount / orders.length)}
            </div>
            <p className="text-xs text-purple-600 mt-1">Per order average</p>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sales Orders</h2>
          <p className="text-sm text-gray-600 mt-1">Track and manage all your sales orders</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                <Plus className="h-4 w-4 mr-2" />
                Create Order
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Sales Order</DialogTitle>
              </DialogHeader>
              <CreateSalesOrderForm onClose={() => setIsCreateModalOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Table */}
      <Card className="border-0 shadow-xl bg-white">
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 border-b border-gray-200">
                  <TableHead className="font-semibold text-gray-700 py-4">Order ID</TableHead>
                  <TableHead className="font-semibold text-gray-700">Customer</TableHead>
                  <TableHead className="font-semibold text-gray-700">Date</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-right">Amount</TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700">Payment</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center">Items</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center w-32">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((order, index) => (
                  <TableRow 
                    key={order.id}
                    className={`hover:bg-blue-50 transition-colors duration-150 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <TableCell className="font-medium text-blue-600 py-4">{order.id}</TableCell>
                    <TableCell className="text-gray-700">{order.customerName}</TableCell>
                    <TableCell className="text-gray-700">{order.date}</TableCell>
                    <TableCell className="text-right font-semibold text-gray-900">
                      {formatIndianCurrency(order.amount)}
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>
                      <span className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border",
                        order.paymentStatus === "Paid" ? "bg-green-100 text-green-800 border-green-200" :
                        order.paymentStatus === "Pending" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                        "bg-red-100 text-red-800 border-red-200"
                      )}>
                        {order.paymentStatus}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">{order.items}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                          onClick={() => handleView(order)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-600"
                          onClick={() => handleEdit(order)}
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

      {/* View Order Dialog */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Sales Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <ViewSalesOrderDetails 
              order={selectedOrder} 
              onClose={() => setIsViewModalOpen(false)}
              onEdit={() => {
                setIsViewModalOpen(false);
                handleEdit(selectedOrder);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Order Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Sales Order</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <CreateSalesOrderForm 
              order={selectedOrder}
              isEdit={true}
              onClose={() => setIsEditModalOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalesOrders;
