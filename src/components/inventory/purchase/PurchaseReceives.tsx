
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
import { Search, Plus, MoreHorizontal, FileText, Edit, Package, CheckCircle2, AlertCircle, Truck, MapPin, Calendar, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Complete":
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200"><CheckCircle2 className="h-3 w-3 mr-1" /> Complete</span>;
    case "Partial":
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200"><AlertCircle className="h-3 w-3 mr-1" /> Partial</span>;
    default:
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">{status}</span>;
  }
};

const getIssuedStatusBadge = (status: string) => {
  switch (status) {
    case "Issued":
      return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Issued</span>;
    case "Paid":
      return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Paid</span>;
    case "Draft":
      return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Draft</span>;
    default:
      return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
  }
};

const PurchaseReceives = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedReceive, setSelectedReceive] = useState<any>(null);

  const receives = [
    {
      id: "GRN-1001",
      prNumber: "PR-1002",
      supplierName: "Reliance Industries Ltd.",
      date: "20-Jun-2023",
      items: 12,
      status: "Complete",
      issuedStatus: "Issued",
      warehouse: "Main Warehouse"
    },
    {
      id: "GRN-1002",
      prNumber: "PR-1003",
      supplierName: "Infosys Limited",
      date: "15-Jun-2023",
      items: 8,
      status: "Complete",
      issuedStatus: "Paid",
      warehouse: "Warehouse 2"
    },
    {
      id: "GRN-1003",
      prNumber: "PR-1005",
      supplierName: "Asian Paints Ltd.",
      date: "07-Jun-2023",
      items: 15,
      status: "Complete",
      issuedStatus: "Draft",
      warehouse: "Main Warehouse"
    },
    {
      id: "GRN-1004",
      prNumber: "PR-1006",
      supplierName: "Mahindra & Mahindra",
      date: "05-Jun-2023",
      items: 5,
      status: "Partial",
      issuedStatus: "Issued",
      warehouse: "Warehouse 3"
    },
    {
      id: "GRN-1005",
      prNumber: "PR-1007",
      supplierName: "Tata Steel Limited",
      date: "01-Jun-2023",
      items: 10,
      status: "Complete",
      issuedStatus: "Paid",
      warehouse: "Warehouse 2"
    },
  ];

  const filteredReceives = receives.filter(receipt =>
    receipt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.prNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReceives.length / parseInt(itemsPerPage));
  const startIndex = (currentPage - 1) * parseInt(itemsPerPage);
  const paginatedReceives = filteredReceives.slice(startIndex, startIndex + parseInt(itemsPerPage));

  const totalItems = receives.reduce((sum, receipt) => sum + receipt.items, 0);
  const completeReceives = receives.filter(receipt => receipt.status === "Complete").length;
  const partialReceives = receives.filter(receipt => receipt.status === "Partial").length;

  const handleView = (receive: any) => {
    setSelectedReceive(receive);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (receive: any) => {
    setSelectedReceive(receive);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Total Receipts</CardTitle>
            <Truck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{receives.length}</div>
            <p className="text-xs text-green-600 mt-1">{completeReceives} complete, {partialReceives} partial</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Items</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{totalItems}</div>
            <p className="text-xs text-blue-600 mt-1">Items received</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Warehouses</CardTitle>
            <MapPin className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">3</div>
            <p className="text-xs text-purple-600 mt-1">Active warehouses</p>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Purchase Receives</h2>
          <p className="text-sm text-gray-600 mt-1">Track goods received from suppliers</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search receipts..."
              className="pl-10 w-80 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                <Plus className="h-4 w-4 mr-2" />
                Create Receipt
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Purchase Receipt</DialogTitle>
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
                    <Label htmlFor="po-number">Purchase Order Number</Label>
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
                    <Label htmlFor="pr-number">PR Number</Label>
                    <Input id="pr-number" placeholder="Auto-generated" disabled />
                  </div>
                  <div>
                    <Label htmlFor="received-date">Received Date</Label>
                    <Input id="received-date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="status">Received Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="complete">Complete</SelectItem>
                        <SelectItem value="partial">Partial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Items from Purchase Order</Label>
                  <div className="mt-2 border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Ordered Qty</TableHead>
                          <TableHead>Received Qty</TableHead>
                          <TableHead>Unit Price</TableHead>
                          <TableHead>Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Sample Item 1</TableCell>
                          <TableCell>10</TableCell>
                          <TableCell>
                            <Input type="number" defaultValue="10" className="w-20" />
                          </TableCell>
                          <TableCell>₹100.00</TableCell>
                          <TableCell>₹1,000.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Internal Notes</Label>
                  <Textarea id="notes" placeholder="Add internal notes..." />
                </div>

                <div>
                  <Label>Document Upload</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">Maximum file size: 5MB</p>
                    <Input type="file" className="hidden" />
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="outline">
                    Save as Draft
                  </Button>
                  <Button>
                    Save
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
                  <TableHead className="font-semibold text-gray-700 py-4">PR Number</TableHead>
                  <TableHead className="font-semibold text-gray-700">Supplier</TableHead>
                  <TableHead className="font-semibold text-gray-700">Date</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-right">Items</TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700">Payment Status</TableHead>
                  <TableHead className="font-semibold text-gray-700">Warehouse</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center w-16">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedReceives.map((receipt, index) => (
                  <TableRow 
                    key={receipt.id}
                    className={`hover:bg-blue-50 transition-colors duration-150 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <TableCell className="font-medium text-blue-600 py-4">{receipt.prNumber}</TableCell>
                    <TableCell className="text-gray-700">{receipt.supplierName}</TableCell>
                    <TableCell className="text-gray-700">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {receipt.date}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-semibold">
                        {receipt.items}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(receipt.status)}</TableCell>
                    <TableCell>{getIssuedStatusBadge(receipt.issuedStatus)}</TableCell>
                    <TableCell>
                      <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-md text-xs font-medium">
                        {receipt.warehouse}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-100">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg">
                          <DropdownMenuItem className="hover:bg-blue-50" onClick={() => handleView(receipt)}>
                            <FileText className="h-4 w-4 mr-2" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-green-50" onClick={() => handleEdit(receipt)}>
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
            <DialogTitle>Purchase Receipt Details - {selectedReceive?.prNumber}</DialogTitle>
          </DialogHeader>
          {selectedReceive && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p><strong>Supplier:</strong> {selectedReceive.supplierName}</p>
                  <p><strong>Date:</strong> {selectedReceive.date}</p>
                  <p><strong>Status:</strong> {selectedReceive.status}</p>
                  <p><strong>Warehouse:</strong> {selectedReceive.warehouse}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">Send</Button>
                  <Button variant="outline" size="sm">Print</Button>
                  <Button variant="outline" size="sm">Mark as Received</Button>
                  <Button size="sm">Create Bill</Button>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Received Qty</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Sample Item</TableCell>
                      <TableCell>{selectedReceive.items}</TableCell>
                      <TableCell>₹100.00</TableCell>
                      <TableCell>₹{selectedReceive.items * 100}.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Activity & Comments</h3>
                <div className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Receipt created</span>
                    <span className="text-gray-500">{selectedReceive.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Items received</span>
                    <span className="text-gray-500">{selectedReceive.date}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Purchase Receipt - {selectedReceive?.prNumber}</DialogTitle>
          </DialogHeader>
          {selectedReceive && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-supplier">Supplier Name</Label>
                  <Select defaultValue={selectedReceive.supplierName}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Reliance Industries Ltd.">Reliance Industries Ltd.</SelectItem>
                      <SelectItem value="Infosys Limited">Infosys Limited</SelectItem>
                      <SelectItem value="Asian Paints Ltd.">Asian Paints Ltd.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-status">Received Status</Label>
                  <Select defaultValue={selectedReceive.status.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="complete">Complete</SelectItem>
                      <SelectItem value="partial">Partial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="outline">
                  Save as Draft
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
            Showing {startIndex + 1} to {Math.min(startIndex + parseInt(itemsPerPage), filteredReceives.length)} of {filteredReceives.length} receipts
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

export default PurchaseReceives;
