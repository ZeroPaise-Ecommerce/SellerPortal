
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, Plus, MoreHorizontal, FileText, Edit, CheckCircle2, Clock, AlertCircle, RotateCcw, Package, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200"><Clock className="h-3 w-3 mr-1" /> Processing</span>;
    case "Rejected":
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200"><AlertCircle className="h-3 w-3 mr-1" /> Rejected</span>;
    default:
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">{status}</span>;
  }
};

const PurchaseReturns = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState<any>(null);

  const returns = [
    {
      id: "PR-1001",
      poID: "PO-1002",
      supplierName: "Reliance Industries Ltd.",
      date: "23-Jun-2023",
      amount: 24500,
      status: "Completed",
      reason: "Defective Items"
    },
    {
      id: "PR-1002",
      poID: "PO-1003",
      supplierName: "Infosys Limited",
      date: "18-Jun-2023",
      amount: 12750,
      status: "Processing",
      reason: "Wrong Specifications"
    },
    {
      id: "PR-1003",
      poID: "PO-1005",
      supplierName: "Asian Paints Ltd.",
      date: "12-Jun-2023",
      amount: 8500,
      status: "Completed",
      reason: "Damaged in Transit"
    },
    {
      id: "PR-1004",
      poID: "PO-1006",
      supplierName: "Mahindra & Mahindra",
      date: "08-Jun-2023",
      amount: 15750,
      status: "Rejected",
      reason: "Late Return Request"
    },
    {
      id: "PR-1005",
      poID: "PO-1007",
      supplierName: "Tata Steel Limited",
      date: "05-Jun-2023",
      amount: 32500,
      status: "Completed",
      reason: "Excess Quantity"
    },
  ];

  const filteredReturns = returns.filter(returnItem =>
    returnItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    returnItem.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    returnItem.poID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReturns.length / parseInt(itemsPerPage));
  const startIndex = (currentPage - 1) * parseInt(itemsPerPage);
  const paginatedReturns = filteredReturns.slice(startIndex, startIndex + parseInt(itemsPerPage));

  const totalAmount = returns.reduce((sum, returnItem) => sum + returnItem.amount, 0);
  const completedReturns = returns.filter(returnItem => returnItem.status === "Completed").length;
  const processingReturns = returns.filter(returnItem => returnItem.status === "Processing").length;
  const rejectedReturns = returns.filter(returnItem => returnItem.status === "Rejected").length;

  const handleView = (returnItem: any) => {
    setSelectedReturn(returnItem);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (returnItem: any) => {
    setSelectedReturn(returnItem);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-700">Total Returns</CardTitle>
            <RotateCcw className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">{returns.length}</div>
            <p className="text-xs text-amber-600 mt-1">{completedReturns} completed, {processingReturns} processing</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700">Return Value</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">{formatIndianCurrency(totalAmount)}</div>
            <p className="text-xs text-red-600 mt-1">Total return amount</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Rejected Returns</CardTitle>
            <Package className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{rejectedReturns}</div>
            <p className="text-xs text-gray-600 mt-1">Rejected requests</p>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Purchase Returns</h2>
          <p className="text-sm text-gray-600 mt-1">Manage product returns to suppliers</p>
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
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                <Plus className="h-4 w-4 mr-2" />
                Create Return
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Purchase Return</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="supplier">Supplier Name</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reliance">Reliance Industries Ltd.</SelectItem>
                        <SelectItem value="infosys">Infosys Limited</SelectItem>
                        <SelectItem value="asian">Asian Paints Ltd.</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="po-id">Purchase Order ID</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select PO" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="po1">PO-1001</SelectItem>
                        <SelectItem value="po2">PO-1002</SelectItem>
                        <SelectItem value="po3">PO-1003</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="return-date">Return Date</Label>
                    <Input id="return-date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="reason">Return Reason</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="defective">Defective Items</SelectItem>
                        <SelectItem value="wrong-spec">Wrong Specifications</SelectItem>
                        <SelectItem value="damaged">Damaged in Transit</SelectItem>
                        <SelectItem value="excess">Excess Quantity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Items to Return</Label>
                  <div className="mt-2 border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Received Qty</TableHead>
                          <TableHead>Return Qty</TableHead>
                          <TableHead>Unit Price</TableHead>
                          <TableHead>Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Sample Item 1</TableCell>
                          <TableCell>10</TableCell>
                          <TableCell>
                            <Input type="number" defaultValue="2" className="w-20" />
                          </TableCell>
                          <TableCell>₹100.00</TableCell>
                          <TableCell>₹200.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Return Notes</Label>
                  <Textarea id="notes" placeholder="Add notes about the return..." />
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button>
                    Create Return
                  </Button>
                </div>
              </div>
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
                  <TableHead className="font-semibold text-gray-700 py-4">Return ID</TableHead>
                  <TableHead className="font-semibold text-gray-700">PO ID</TableHead>
                  <TableHead className="font-semibold text-gray-700">Supplier</TableHead>
                  <TableHead className="font-semibold text-gray-700">Date</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-right">Amount</TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700">Reason</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center w-16">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedReturns.map((returnItem, index) => (
                  <TableRow 
                    key={returnItem.id}
                    className={`hover:bg-blue-50 transition-colors duration-150 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <TableCell className="font-medium text-blue-600 py-4">{returnItem.id}</TableCell>
                    <TableCell className="text-gray-700">{returnItem.poID}</TableCell>
                    <TableCell className="text-gray-700">{returnItem.supplierName}</TableCell>
                    <TableCell className="text-gray-700">{returnItem.date}</TableCell>
                    <TableCell className="text-right font-semibold text-gray-900">
                      {formatIndianCurrency(returnItem.amount)}
                    </TableCell>
                    <TableCell>{getStatusBadge(returnItem.status)}</TableCell>
                    <TableCell className="text-gray-600">{returnItem.reason}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-100">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg">
                          <DropdownMenuItem className="hover:bg-blue-50" onClick={() => handleView(returnItem)}>
                            <FileText className="h-4 w-4 mr-2" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-green-50" onClick={() => handleEdit(returnItem)}>
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Return Details - {selectedReturn?.id}</DialogTitle>
          </DialogHeader>
          {selectedReturn && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p><strong>Return ID:</strong> {selectedReturn.id}</p>
                  <p><strong>PO ID:</strong> {selectedReturn.poID}</p>
                  <p><strong>Supplier:</strong> {selectedReturn.supplierName}</p>
                  <p><strong>Date:</strong> {selectedReturn.date}</p>
                </div>
                <div>
                  <p><strong>Amount:</strong> {formatIndianCurrency(selectedReturn.amount)}</p>
                  <p><strong>Status:</strong> {getStatusBadge(selectedReturn.status)}</p>
                  <p><strong>Reason:</strong> {selectedReturn.reason}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Return Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Return Qty</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Sample Item</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>₹100.00</TableCell>
                      <TableCell>₹200.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Return - {selectedReturn?.id}</DialogTitle>
          </DialogHeader>
          {selectedReturn && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <Select defaultValue={selectedReturn.status.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-reason">Reason</Label>
                  <Select defaultValue={selectedReturn.reason.toLowerCase().replace(' ', '-')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="defective-items">Defective Items</SelectItem>
                      <SelectItem value="wrong-specifications">Wrong Specifications</SelectItem>
                      <SelectItem value="damaged-in-transit">Damaged in Transit</SelectItem>
                      <SelectItem value="excess-quantity">Excess Quantity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Items per page:</span>
          <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
            <SelectTrigger className="w-20 border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600 ml-4">
            Showing {startIndex + 1} to {Math.min(startIndex + parseInt(itemsPerPage), filteredReturns.length)} of {filteredReturns.length} returns
          </span>
        </div>
        
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-blue-50"}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                    className="cursor-pointer hover:bg-blue-50"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-blue-50"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default PurchaseReturns;
