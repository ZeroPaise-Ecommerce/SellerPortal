
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
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, Plus, Filter, Eye, Edit, CheckCircle2, Clock, AlertCircle, RotateCcw, TrendingDown, FileX, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import CreateReturnForm from "./CreateReturnForm";
import ViewReturnDetails from "./ViewReturnDetails";

const formatIndianCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Approved":
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200"><CheckCircle2 className="h-3 w-3 mr-1" /> Approved</span>;
    case "Pending":
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200"><Clock className="h-3 w-3 mr-1" /> Pending</span>;
    case "Rejected":
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200"><AlertCircle className="h-3 w-3 mr-1" /> Rejected</span>;
    case "Processing":
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"><Play className="h-3 w-3 mr-1" /> Processing</span>;
    default:
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">{status}</span>;
  }
};

const SalesReturns = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState<any>(null);

  const returns = [
    {
      id: "SR-1001",
      orderID: "SO-1001",
      customerName: "Rahul Sharma",
      date: "16-Jun-2023",
      amount: 5999,
      status: "Approved",
      reason: "Damaged Product",
      items: 1
    },
    {
      id: "SR-1002",
      orderID: "SO-1002",
      customerName: "Priya Patel",
      date: "12-Jun-2023",
      amount: 2150,
      status: "Pending",
      reason: "Incorrect Size",
      items: 1
    },
    {
      id: "SR-1003",
      orderID: "SO-1004",
      customerName: "Deepa Singh",
      date: "05-Jun-2023",
      amount: 4199,
      status: "Processing",
      reason: "Wrong Item Delivered",
      items: 2
    },
    {
      id: "SR-1004",
      orderID: "SO-1005",
      customerName: "Vikram Reddy",
      date: "30-May-2023",
      amount: 1250,
      status: "Rejected",
      reason: "Used Item",
      items: 1
    },
    {
      id: "SR-1005",
      orderID: "SO-1007",
      customerName: "Anjali Gupta",
      date: "28-May-2023",
      amount: 3750,
      status: "Approved",
      reason: "Customer Dissatisfied",
      items: 3
    },
  ];

  const filteredReturns = returns.filter((returnItem) => {
    const matchesSearch = returnItem.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         returnItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         returnItem.orderID.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || returnItem.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalItems = filteredReturns.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredReturns.slice(startIndex, endIndex);

  const totalAmount = returns.reduce((sum, returnItem) => sum + returnItem.amount, 0);
  const approvedReturns = returns.filter(r => r.status === "Approved").length;
  const pendingReturns = returns.filter(r => r.status === "Pending").length;

  const handleView = (returnItem: any) => {
    setSelectedReturn(returnItem);
    setIsViewModalOpen(true);
  };

  const handleEdit = (returnItem: any) => {
    setSelectedReturn(returnItem);
    setIsEditModalOpen(true);
  };

  const handleStatusChange = (returnId: string, newStatus: string) => {
    if (newStatus === "Approved") {
      alert("Return approved. Payment channel details form would open here.");
    } else if (newStatus === "Rejected") {
      alert("Return rejected. Status updated.");
    } else if (newStatus === "Processing") {
      alert("Return moved to processing.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700">Total Returns</CardTitle>
            <RotateCcw className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">{returns.length}</div>
            <p className="text-xs text-red-600 mt-1">{approvedReturns} approved, {pendingReturns} pending</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Return Value</CardTitle>
            <TrendingDown className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{formatIndianCurrency(totalAmount)}</div>
            <p className="text-xs text-orange-600 mt-1">Total return amount</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-700">Avg. Return</CardTitle>
            <FileX className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">
              {formatIndianCurrency(totalAmount / returns.length)}
            </div>
            <p className="text-xs text-yellow-600 mt-1">Average return value</p>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sales Returns</h2>
          <p className="text-sm text-gray-600 mt-1">Manage customer returns and refunds</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search returns..."
              className="pl-10 w-80 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                <Plus className="h-4 w-4 mr-2" />
                Create Return
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
              <CreateReturnForm onClose={() => setIsCreateModalOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Items per page selector */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show</span>
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
          <span className="text-sm text-gray-600">entries</span>
        </div>
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
        </div>
      </div>

      {/* Table */}
      <Card className="border-0 shadow-xl bg-white">
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 border-b border-gray-200">
                  <TableHead className="font-semibold text-gray-700 py-4">Return ID</TableHead>
                  <TableHead className="font-semibold text-gray-700">Order ID</TableHead>
                  <TableHead className="font-semibold text-gray-700">Customer</TableHead>
                  <TableHead className="font-semibold text-gray-700">Date</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-right">Amount</TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700">Reason</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center">Items</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center w-48">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((returnItem, index) => (
                  <TableRow 
                    key={returnItem.id}
                    className={`hover:bg-blue-50 transition-colors duration-150 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <TableCell className="font-medium text-blue-600 py-4">{returnItem.id}</TableCell>
                    <TableCell className="text-gray-700 font-mono text-sm">{returnItem.orderID}</TableCell>
                    <TableCell className="text-gray-700">{returnItem.customerName}</TableCell>
                    <TableCell className="text-gray-700">{returnItem.date}</TableCell>
                    <TableCell className="text-right font-semibold text-gray-900">
                      {formatIndianCurrency(returnItem.amount)}
                    </TableCell>
                    <TableCell>{getStatusBadge(returnItem.status)}</TableCell>
                    <TableCell className="text-gray-700">{returnItem.reason}</TableCell>
                    <TableCell className="text-center">{returnItem.items}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                          onClick={() => handleView(returnItem)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-600"
                          onClick={() => handleEdit(returnItem)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {returnItem.status === "Pending" && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                            title="Move to Processing"
                            onClick={() => handleStatusChange(returnItem.id, "Processing")}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                        {returnItem.status === "Processing" && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-600"
                              title="Approve"
                              onClick={() => handleStatusChange(returnItem.id, "Approved")}
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                              title="Reject"
                              onClick={() => handleStatusChange(returnItem.id, "Rejected")}
                            >
                              <AlertCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
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
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationPrevious 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
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
            <PaginationNext 
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationContent>
        </Pagination>
      )}

      {/* View Return Dialog */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          {selectedReturn && (
            <ViewReturnDetails 
              returnItem={selectedReturn} 
              onClose={() => setIsViewModalOpen(false)}
              onEdit={() => {
                setIsViewModalOpen(false);
                handleEdit(selectedReturn);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Return Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          {selectedReturn && (
            <CreateReturnForm 
              returnItem={selectedReturn} 
              isEdit={true}
              onClose={() => setIsEditModalOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalesReturns;
