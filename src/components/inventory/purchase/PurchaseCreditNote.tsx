
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
import { Search, Plus, MoreHorizontal, FileText, Edit, FileCheck, Receipt, DollarSign } from "lucide-react";
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

const PurchaseCreditNote = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCreditNote, setSelectedCreditNote] = useState<any>(null);

  const creditNotes = [
    {
      id: "PCN-1001",
      supplierName: "Reliance Industries Ltd.",
      relatedBill: "BILL-1001",
      date: "24-Jun-2023",
      amount: 24500,
      reason: "Defective Items Return"
    },
    {
      id: "PCN-1002",
      supplierName: "Infosys Limited",
      relatedBill: "BILL-1002",
      date: "19-Jun-2023",
      amount: 12750,
      reason: "Price Adjustment"
    },
    {
      id: "PCN-1003",
      supplierName: "Asian Paints Ltd.",
      relatedBill: "BILL-1003",
      date: "13-Jun-2023",
      amount: 8500,
      reason: "Return of Damaged Goods"
    },
    {
      id: "PCN-1004",
      supplierName: "Mahindra & Mahindra",
      relatedBill: "BILL-2001",
      date: "09-Jun-2023",
      amount: 15750,
      reason: "Quantity Correction"
    },
    {
      id: "PCN-1005",
      supplierName: "Tata Steel Limited",
      relatedBill: "BILL-2002",
      date: "06-Jun-2023",
      amount: 32500,
      reason: "Overcharge Correction"
    },
  ];

  const filteredCreditNotes = creditNotes.filter(note =>
    note.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.relatedBill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCreditNotes.length / parseInt(itemsPerPage));
  const startIndex = (currentPage - 1) * parseInt(itemsPerPage);
  const paginatedCreditNotes = filteredCreditNotes.slice(startIndex, startIndex + parseInt(itemsPerPage));

  const totalAmount = creditNotes.reduce((sum, note) => sum + note.amount, 0);
  const uniqueSuppliers = new Set(creditNotes.map(note => note.supplierName)).size;

  const handleView = (creditNote: any) => {
    setSelectedCreditNote(creditNote);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (creditNote: any) => {
    setSelectedCreditNote(creditNote);
    setIsEditDialogOpen(true);
  };

  const [createForm, setCreateForm] = useState({
    supplier: "",
    bill: "",
    date: "",
    reason: "",
    notes: "",
  });
  const [errors, setErrors] = useState({
    supplier: false,
    bill: false,
    date: false,
    reason: false,
    notes: false,
  });

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-cyan-700">Total Credit Notes</CardTitle>
            <FileCheck className="h-4 w-4 text-cyan-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyan-900">{creditNotes.length}</div>
            <p className="text-xs text-cyan-600 mt-1">{uniqueSuppliers} suppliers</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Total Credit Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{formatIndianCurrency(totalAmount)}</div>
            <p className="text-xs text-green-600 mt-1">Credit value</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Average Credit</CardTitle>
            <Receipt className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {formatIndianCurrency(totalAmount / creditNotes.length)}
            </div>
            <p className="text-xs text-purple-600 mt-1">Per credit note</p>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Credit Notes</h2>
          <p className="text-sm text-gray-600 mt-1">Track credit notes from suppliers</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search credit notes..."
              className="pl-10 w-80 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                <Plus className="h-4 w-4 mr-2" />
                Create Credit Note
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Credit Note</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="supplier">Supplier Name <span className="text-red-500">*</span></Label>
                    <Select
                      value={createForm.supplier}
                      onValueChange={value => setCreateForm({ ...createForm, supplier: value })}
                    >
                      <SelectTrigger className={errors.supplier ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Reliance Industries Ltd.">Reliance Industries Ltd.</SelectItem>
                        <SelectItem value="Infosys Limited">Infosys Limited</SelectItem>
                        <SelectItem value="Asian Paints Ltd.">Asian Paints Ltd.</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.supplier && (
                      <span className="text-xs text-red-500">Supplier is required</span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="bill-id">Related Bill <span className="text-red-500">*</span></Label>
                    <Select
                      value={createForm.bill}
                      onValueChange={value => setCreateForm({ ...createForm, bill: value })}
                    >
                      <SelectTrigger className={errors.bill ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select bill" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BILL-1001">BILL-1001</SelectItem>
                        <SelectItem value="BILL-1002">BILL-1002</SelectItem>
                        <SelectItem value="BILL-1003">BILL-1003</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.bill && (
                      <span className="text-xs text-red-500">Related bill is required</span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="date">Date <span className="text-red-500">*</span></Label>
                    <Input
                      id="date"
                      type="date"
                      value={createForm.date}
                      onChange={e => setCreateForm({ ...createForm, date: e.target.value })}
                      className={errors.date ? "border-red-500" : ""}
                    />
                    {errors.date && (
                      <span className="text-xs text-red-500">Date is required</span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="reason">Credit Reason <span className="text-red-500">*</span></Label>
                    <Select
                      value={createForm.reason}
                      onValueChange={value => setCreateForm({ ...createForm, reason: value })}
                    >
                      <SelectTrigger className={errors.reason ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Defective Items Return">Defective Items Return</SelectItem>
                        <SelectItem value="Price Adjustment">Price Adjustment</SelectItem>
                        <SelectItem value="Return of Damaged Goods">Return of Damaged Goods</SelectItem>
                        <SelectItem value="Quantity Correction">Quantity Correction</SelectItem>
                        <SelectItem value="Overcharge Correction">Overcharge Correction</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.reason && (
                      <span className="text-xs text-red-500">Reason is required</span>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Notes <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="notes"
                    placeholder="Add credit note details..."
                    value={createForm.notes}
                    onChange={e => setCreateForm({ ...createForm, notes: e.target.value })}
                    className={errors.notes ? "border-red-500" : ""}
                  />
                  {errors.notes && (
                    <span className="text-xs text-red-500">Notes are required</span>
                  )}
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      // Validate required fields
                      const newErrors = {
                        supplier: !createForm.supplier,
                        bill: !createForm.bill,
                        date: !createForm.date,
                        reason: !createForm.reason,
                        notes: !createForm.notes,
                      };
                      setErrors(newErrors);
                      if (Object.values(newErrors).some(Boolean)) return;
                      // ...submit logic here
                      setIsCreateDialogOpen(false);
                    }}
                  >
                    Create Credit Note
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
                  <TableHead className="font-semibold text-gray-700 py-4">Credit Note #</TableHead>
                  <TableHead className="font-semibold text-gray-700">Supplier</TableHead>
                  <TableHead className="font-semibold text-gray-700">Related Bill</TableHead>
                  <TableHead className="font-semibold text-gray-700">Date</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-right">Amount</TableHead>
                  <TableHead className="font-semibold text-gray-700">Reason</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center w-16">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCreditNotes.map((note, index) => (
                  <TableRow 
                    key={note.id}
                    className={`hover:bg-blue-50 transition-colors duration-150 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <TableCell className="font-medium text-blue-600 py-4">{note.id}</TableCell>
                    <TableCell className="text-gray-700">{note.supplierName}</TableCell>
                    <TableCell className="text-gray-700">{note.relatedBill}</TableCell>
                    <TableCell className="text-gray-700">{note.date}</TableCell>
                    <TableCell className="text-right">
                      <span className="bg-green-50 text-green-700 px-3 py-1 rounded-md font-semibold">
                        {formatIndianCurrency(note.amount)}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-600">{note.reason}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-100">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg">
                          <DropdownMenuItem className="hover:bg-blue-50" onClick={() => handleView(note)}>
                            <FileText className="h-4 w-4 mr-2" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-green-50" onClick={() => handleEdit(note)}>
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
            <DialogTitle>Credit Note Details - {selectedCreditNote?.id}</DialogTitle>
          </DialogHeader>
          {selectedCreditNote && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p><strong>Credit Note ID:</strong> {selectedCreditNote.id}</p>
                  <p><strong>Supplier:</strong> {selectedCreditNote.supplierName}</p>
                  <p><strong>Related Bill:</strong> {selectedCreditNote.relatedBill}</p>
                  <p><strong>Date:</strong> {selectedCreditNote.date}</p>
                </div>
                <div>
                  <p><strong>Amount:</strong> {formatIndianCurrency(selectedCreditNote.amount)}</p>
                  <p><strong>Reason:</strong> {selectedCreditNote.reason}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Credit Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Quantity</TableHead>
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
            <DialogTitle>Edit Credit Note - {selectedCreditNote?.id}</DialogTitle>
          </DialogHeader>
          {selectedCreditNote && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-supplier">Supplier Name</Label>
                  <Select defaultValue={selectedCreditNote.supplierName}>
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
                  <Label htmlFor="edit-reason">Reason</Label>
                  <Select defaultValue="price-adjustment">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="defective">Defective Items Return</SelectItem>
                      <SelectItem value="price-adjustment">Price Adjustment</SelectItem>
                      <SelectItem value="damaged">Return of Damaged Goods</SelectItem>
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
            Showing {startIndex + 1} to {Math.min(startIndex + parseInt(itemsPerPage), filteredCreditNotes.length)} of {filteredCreditNotes.length} credit notes
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

export default PurchaseCreditNote;
