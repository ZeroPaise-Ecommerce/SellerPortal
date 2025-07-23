
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
import { Search, Plus, MoreHorizontal, FileText, Edit, ArrowUp, CheckCircle2, Clock, CreditCard, Upload } from "lucide-react";
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
    case "Pending":
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200"><Clock className="h-3 w-3 mr-1" /> Pending</span>;
    case "Draft":
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">Draft</span>;
    default:
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">{status}</span>;
  }
};

const PurchasePaymentsOut = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  // Controlled form state for Make Payment dialog
  const [form, setForm] = useState({
    supplier: "",
    billNumber: "",
    prNumber: "",
    poNumber: "",
    date: "",
    paymentTerms: "",
    notes: "",
    file: null,
  });
  const [paymentErrors, setPaymentErrors] = useState({
    supplier: false,
    billNumber: false,
    prNumber: false,
    date: false,
    paymentTerms: false,
    notes: false,
    file: false,
  });

  const payments = [
    {
      id: "PAY-1001",
      billNumber: "BILL-1001",
      supplierName: "Reliance Industries Ltd.",
      date: "25-Jun-2023",
      amount: 35000,
      method: "Bank Transfer",
      account: "HDFC XXX3652",
      status: "Completed"
    },
    {
      id: "PAY-1002",
      billNumber: "BILL-1002",
      supplierName: "Infosys Limited",
      date: "22-Jun-2023",
      amount: 28500,
      method: "NEFT",
      account: "SBI XXX7845",
      status: "Pending"
    },
    {
      id: "PAY-1003",
      billNumber: "BILL-1003",
      supplierName: "Asian Paints Ltd.",
      date: "18-Jun-2023",
      amount: 15750,
      method: "Credit Card",
      account: "Visa XXX6365",
      status: "Completed"
    },
    {
      id: "PAY-1004",
      billNumber: "BILL-1004",
      supplierName: "Mahindra & Mahindra",
      date: "15-Jun-2023",
      amount: 42000,
      method: "Cash",
      account: "Cash",
      status: "Draft"
    },
    {
      id: "PAY-1005",
      billNumber: "BILL-1005",
      supplierName: "Tata Steel Limited",
      date: "10-Jun-2023",
      amount: 67500,
      method: "Bank Transfer",
      account: "ICICI XXX9876",
      status: "Completed"
    },
  ];

  const filteredPayments = payments.filter(payment =>
    payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.billNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPayments.length / parseInt(itemsPerPage));
  const startIndex = (currentPage - 1) * parseInt(itemsPerPage);
  const paginatedPayments = filteredPayments.slice(startIndex, startIndex + parseInt(itemsPerPage));

  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const completedPayments = payments.filter(payment => payment.status === "Completed").length;
  const pendingPayments = payments.filter(payment => payment.status === "Pending").length;

  const handleView = (payment: any) => {
    setSelectedPayment(payment);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (payment: any) => {
    setSelectedPayment(payment);
    setIsEditDialogOpen(true);
  };

  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setPaymentErrors((prev) => ({ ...prev, [field]: false }));
  };

  const handleSaveAsDraft = () => {
    setPaymentErrors({
      supplier: false,
      billNumber: false,
      prNumber: false,
      date: false,
      paymentTerms: false,
      notes: false,
      file: false,
    });
    // Optionally clear form or keep as is
    console.log("Save as Draft", form);
  };

  const handleSave = () => {
    // Validate required fields
    const errors = {
      supplier: !form.supplier,
      billNumber: !form.billNumber,
      prNumber: !form.prNumber,
      date: !form.date,
      paymentTerms: !form.paymentTerms,
      notes: !form.notes,
      file: !form.file,
    };
    setPaymentErrors(errors);
    const hasError = Object.values(errors).some(Boolean);
    if (hasError) return;
    // Proceed with save logic
    console.log("Save", form);
    setIsCreateDialogOpen(false);
    // Optionally reset form
    setForm({
      supplier: "",
      billNumber: "",
      prNumber: "",
      poNumber: "",
      date: "",
      paymentTerms: "",
      notes: "",
      file: null,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700">Total Payments</CardTitle>
            <ArrowUp className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">{payments.length}</div>
            <p className="text-xs text-red-600 mt-1">{completedPayments} completed, {pendingPayments} pending</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Total Amount</CardTitle>
            <CreditCard className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{formatIndianCurrency(totalAmount)}</div>
            <p className="text-xs text-orange-600 mt-1">Total paid out</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Average Payment</CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {formatIndianCurrency(totalAmount / payments.length)}
            </div>
            <p className="text-xs text-purple-600 mt-1">Per payment</p>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payments OUT</h2>
          <p className="text-sm text-gray-600 mt-1">Track outgoing payments to suppliers</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search payments..."
              className="pl-10 w-80 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                <Plus className="h-4 w-4 mr-2" />
                Make Payment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Make Payment</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="supplier">Supplier Name</Label>
                    <Select
                      value={form.supplier}
                      onValueChange={(value) => handleFormChange("supplier", value)}
                    >
                      <SelectTrigger className={paymentErrors.supplier ? "border border-red-500" : ""}>
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reliance">Reliance Industries Ltd.</SelectItem>
                        <SelectItem value="infosys">Infosys Limited</SelectItem>
                        <SelectItem value="asian">Asian Paints Ltd.</SelectItem>
                      </SelectContent>
                    </Select>
                    {paymentErrors.supplier && (
                      <span className="text-xs text-red-500">Supplier is required.</span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="po-number">Purchase Order Number</Label>
                    <Select
                      value={form.poNumber}
                      onValueChange={(value) => handleFormChange("poNumber", value)}
                    >
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
                    <Label htmlFor="bill-number">Bill Number</Label>
                    <Select
                      value={form.billNumber}
                      onValueChange={(value) => handleFormChange("billNumber", value)}
                    >
                      <SelectTrigger className={paymentErrors.billNumber ? "border border-red-500" : ""}>
                        <SelectValue placeholder="Select bill" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bill1">BILL-1001</SelectItem>
                        <SelectItem value="bill2">BILL-1002</SelectItem>
                        <SelectItem value="bill3">BILL-1003</SelectItem>
                      </SelectContent>
                    </Select>
                    {paymentErrors.billNumber && (
                      <span className="text-xs text-red-500">Bill Number is required.</span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="pr-number">PR Number</Label>
                    <Select
                      value={form.prNumber}
                      onValueChange={(value) => handleFormChange("prNumber", value)}
                    >
                      <SelectTrigger className={paymentErrors.prNumber ? "border border-red-500" : ""}>
                        <SelectValue placeholder="Select PR" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pr1">PR-1001</SelectItem>
                        <SelectItem value="pr2">PR-1002</SelectItem>
                        <SelectItem value="pr3">PR-1003</SelectItem>
                      </SelectContent>
                    </Select>
                    {paymentErrors.prNumber && (
                      <span className="text-xs text-red-500">PR Number is required.</span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={form.date}
                      onChange={(e) => handleFormChange("date", e.target.value)}
                      className={paymentErrors.date ? "border border-red-500" : ""}
                    />
                    {paymentErrors.date && (
                      <span className="text-xs text-red-500">Date is required.</span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="payment-terms">Payment Terms</Label>
                    <Select
                      value={form.paymentTerms}
                      onValueChange={(value) => handleFormChange("paymentTerms", value)}
                    >
                      <SelectTrigger className={paymentErrors.paymentTerms ? "border border-red-500" : ""}>
                        <SelectValue placeholder="Select payment terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="net30">Net 30</SelectItem>
                        <SelectItem value="net15">Net 15</SelectItem>
                        <SelectItem value="immediate">Immediate</SelectItem>
                      </SelectContent>
                    </Select>
                    {paymentErrors.paymentTerms && (
                      <span className="text-xs text-red-500">Payment Terms is required.</span>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Items</Label>
                  <div className="mt-2 border rounded-lg">
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
                          <TableCell>Sample Item 1</TableCell>
                          <TableCell>10</TableCell>
                          <TableCell>₹100.00</TableCell>
                          <TableCell>₹1,000.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Internal Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add internal notes..."
                    value={form.notes}
                    onChange={(e) => handleFormChange("notes", e.target.value)}
                    className={paymentErrors.notes ? "border border-red-500" : ""}
                  />
                  {paymentErrors.notes && (
                    <span className="text-xs text-red-500">Internal Notes is required.</span>
                  )}
                </div>

                <div>
                  <Label>Upload Document/Attachments</Label>
                  <div className={`mt-2 border-2 border-dashed rounded-lg p-6 text-center ${paymentErrors.file ? 'border-red-500' : 'border-gray-300'}`}>
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">Maximum file size: 5MB</p>
                    <Input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        handleFormChange("file", file ? file.name : "");
                      }}
                    />
                    {form.file && (
                      <p className="text-xs text-green-600 mt-2">Selected: {form.file}</p>
                    )}
                    {paymentErrors.file && (
                      <span className="text-xs text-red-500 block mt-2">Document is required.</span>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="outline" onClick={handleSaveAsDraft}>
                    Save as Draft
                  </Button>
                  <Button onClick={handleSave}>
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
                  <TableHead className="font-semibold text-gray-700 py-4">Payment #</TableHead>
                  <TableHead className="font-semibold text-gray-700">Bill Number</TableHead>
                  <TableHead className="font-semibold text-gray-700">Supplier</TableHead>
                  <TableHead className="font-semibold text-gray-700">Date</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-right">Amount</TableHead>
                  <TableHead className="font-semibold text-gray-700">Method</TableHead>
                  <TableHead className="font-semibold text-gray-700">Account</TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center w-16">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedPayments.map((payment, index) => (
                  <TableRow 
                    key={payment.id}
                    className={`hover:bg-blue-50 transition-colors duration-150 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <TableCell className="font-medium text-blue-600 py-4">{payment.id}</TableCell>
                    <TableCell className="text-gray-700">{payment.billNumber}</TableCell>
                    <TableCell className="text-gray-700">{payment.supplierName}</TableCell>
                    <TableCell className="text-gray-700">{payment.date}</TableCell>
                    <TableCell className="text-right font-semibold text-gray-900">
                      {formatIndianCurrency(payment.amount)}
                    </TableCell>
                    <TableCell>
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
                        {payment.method}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-md text-xs font-medium">
                        {payment.account}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-100">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg">
                          <DropdownMenuItem className="hover:bg-blue-50" onClick={() => handleView(payment)}>
                            <FileText className="h-4 w-4 mr-2" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-green-50" onClick={() => handleEdit(payment)}>
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
            <DialogTitle>Payment Details - {selectedPayment?.id}</DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p><strong>Supplier:</strong> {selectedPayment.supplierName}</p>
                  <p><strong>Bill Number:</strong> {selectedPayment.billNumber}</p>
                  <p><strong>Date:</strong> {selectedPayment.date}</p>
                  <p><strong>Amount:</strong> {formatIndianCurrency(selectedPayment.amount)}</p>
                  <p><strong>Method:</strong> {selectedPayment.method}</p>
                  <p><strong>Account:</strong> {selectedPayment.account}</p>
                  <p><strong>Status:</strong> {getStatusBadge(selectedPayment.status)}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">Send</Button>
                  <Button variant="outline" size="sm">Print</Button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Activity & Comments</h3>
                <div className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Payment initiated</span>
                    <span className="text-gray-500">{selectedPayment.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Payment {selectedPayment.status.toLowerCase()}</span>
                    <span className="text-gray-500">{selectedPayment.date}</span>
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
            <DialogTitle>Edit Payment - {selectedPayment?.id}</DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-supplier">Supplier Name</Label>
                  <Select defaultValue={selectedPayment.supplierName}>
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
                  <Label htmlFor="edit-status">Status</Label>
                  <Select defaultValue={selectedPayment.status.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="outline" onClick={handleSaveAsDraft}>
                  Save as Draft
                </Button>
                <Button onClick={handleSave}>
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
            Showing {startIndex + 1} to {Math.min(startIndex + parseInt(itemsPerPage), filteredPayments.length)} of {filteredPayments.length} payments
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

export default PurchasePaymentsOut;
