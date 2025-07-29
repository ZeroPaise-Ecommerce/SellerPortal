
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
import { Search, Plus, MoreHorizontal, FileText, Edit, Receipt, CheckCircle2, Clock, AlertCircle, DollarSign, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addPurchaseOrderRequest } from '@/store/Inventory/purchase/actions';

const formatIndianCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Paid":
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200"><CheckCircle2 className="h-3 w-3 mr-1" /> Paid</span>;
    case "Pending":
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200"><Clock className="h-3 w-3 mr-1" /> Pending</span>;
    case "Partial":
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200"><AlertCircle className="h-3 w-3 mr-1" /> Partial</span>;
    case "Draft":
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">Draft</span>;
    default:
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">{status}</span>;
  }
};

const PurchaseBills = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<any>(null);

  const [createForm, setCreateForm] = useState({
    supplier: "",
    poNumber: "",
    billNumber: "",
    date: "",
    amount: "",
    prNumber: "",
    paymentTerms: "",
    items: [],
    notes: "",
    document: null as File | null,
  });

  const [errors, setErrors] = useState({
    supplier: false,
    poNumber: false,
    billNumber: false,
    date: false,
    amount: false,
    prNumber: false,
    paymentTerms: false,
    items: false,
    notes: false,
    document: false,
  });

  // Redux: Get purchase orders
  const purchaseOrders = useSelector((state: any) => state.purchase?.purchareOrders || []);

  // State for filtered bills and form
  const [filteredBills, setFilteredBills] = useState<any[]>([]);
  const [billForm, setBillForm] = useState({
    supplier: '',
    poNumber: '',
    billNumber: '',
    date: '',
    amount: '',
    prNumber: '',
    paymentTerms: '',
    items: [],
    notes: '',
    document: null as File | null,
  });

  // Filter bills on mount and when purchaseOrders changes
  useEffect(() => {
    const filtered = purchaseOrders.filter((po: any) => po.billNumber && po.billNumber !== 'NotApplicable');
    setFilteredBills(filtered);
  }, [purchaseOrders]);

  // Helper: get unique suppliers from filteredBills
  const uniqueSuppliers = Array.from(new Set(filteredBills.map(bill => bill.supplierName)));

  // State for PO options and selected PO
  const [poOptions, setPoOptions] = useState<any[]>([]);
  const [selectedPO, setSelectedPO] = useState<any>(null);

  // When supplier changes, update PO options
  useEffect(() => {
    if (billForm.supplier) {
      const pos = filteredBills.filter(bill => bill.supplierName === billForm.supplier);
      setPoOptions(pos);
    } else {
      setPoOptions([]);
    }
    setBillForm(f => ({ ...f, poNumber: '', prNumber: '', items: [] }));
    setSelectedPO(null);
  }, [billForm.supplier, filteredBills]);

  // When PO changes, update PR number, items, and auto-generate Bill Number
  useEffect(() => {
    if (billForm.poNumber) {
      const po = poOptions.find(po => po.purchaseOrderNumber === billForm.poNumber);
      setSelectedPO(po);
      setBillForm(f => ({
        ...f,
        prNumber: po ? po.purchaseOrderNumber : '',
        billNumber: po ? `BILL-${po.purchaseOrderNumber}-${Math.floor(Math.random() * 1000)}` : '',
        items: po ? (po.items || []) : [],
        amount: po ? po.totalAmount : '',
      }));
    } else {
      setSelectedPO(null);
      setBillForm(f => ({ ...f, prNumber: '', billNumber: '', items: [], amount: '' }));
    }
  }, [billForm.poNumber, poOptions]);

  // Payment terms: remove spaces
  const handlePaymentTermsChange = (value: string) => {
    setBillForm(f => ({ ...f, paymentTerms: value.replace(/\s+/g, '') }));
  };

  const dispatch = useDispatch();
  const { stageCompleted, error: billError, loading: billLoading } = useSelector((state: any) => state.purchase);

  // Feedback state
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Calculate BillDueDate (BillDate + PaymentTerms)
  function calculateDueDate(billDate: string, paymentTerms: string) {
    if (!billDate || !paymentTerms) return '';
    let days = 0;
    if (/Net(\d+)/i.test(paymentTerms)) {
      days = parseInt(paymentTerms.replace(/\D/g, ''));
    }
    if (days > 0) {
      const date = new Date(billDate);
      date.setDate(date.getDate() + days);
      return date.toISOString().split('T')[0];
    }
    return billDate;
  }

  // Validate form
  const validateBillForm = () => {
    const newErrors = {
      supplier: !billForm.supplier,
      poNumber: !billForm.poNumber,
      billNumber: !billForm.billNumber,
      date: !billForm.date,
      amount: !billForm.amount,
      prNumber: false,
      paymentTerms: !billForm.paymentTerms,
      items: !billForm.items || billForm.items.length === 0,
      notes: false,
      document: false,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  // On Save: dispatch create bill
  const handleBillSave = () => {
    if (!validateBillForm()) return;
    const payload = {
      PurchaseOrderId: selectedPO?.purchaseOrderId || 0,
      PurchaseOrderNumber: selectedPO?.purchaseOrderNumber || '',
      BillNumber: billForm.billNumber,
      BillDate: billForm.date,
      BillPaymentTerms: billForm.paymentTerms,
      BillDueDate: calculateDueDate(billForm.date, billForm.paymentTerms),
      BillInternalNotes: billForm.notes,
      IsBillDraft: false,
      Attachments: [],
      BillStatus: 'Draft',
      Items: billForm.items,
      Amount: billForm.amount,
      Supplier: billForm.supplier,
      PRNumber: billForm.prNumber,
      PONumber: billForm.poNumber,
      Operation: 1,
    };
    setSuccessMsg('');
    setErrorMsg('');
    dispatch(addPurchaseOrderRequest(payload));
  };

  // After save, close dialog, refresh, reset form, show feedback
  useEffect(() => {
    if (stageCompleted && isCreateDialogOpen) {
      if (!billError) {
        setSuccessMsg('Bill created successfully!');
        setIsCreateDialogOpen(false);
        setBillForm({
          supplier: '', poNumber: '', billNumber: '', date: '', amount: '', prNumber: '', paymentTerms: '', items: [], notes: '', document: null,
        });
      } else {
        setErrorMsg('Error creating bill: ' + billError);
      }
      dispatch({ type: 'RESET_STAGE_COMPLETED' });
    }
  }, [stageCompleted, billError, isCreateDialogOpen, dispatch]);

  // Document upload handler
  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillForm(f => ({ ...f, document: e.target.files?.[0] || null }));
    setErrors(e => ({ ...e, document: false }));
  };

  // Clear feedback messages after a timeout
  useEffect(() => {
    if (successMsg || errorMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg('');
        setErrorMsg('');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [successMsg, errorMsg]);

  // Scroll to top on success
  useEffect(() => {
    if (successMsg) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [successMsg]);

  const totalPages = Math.ceil(filteredBills.length / parseInt(itemsPerPage));
  const startIndex = (currentPage - 1) * parseInt(itemsPerPage);
  const paginatedBills = filteredBills.slice(startIndex, startIndex + parseInt(itemsPerPage));

  const totalAmount = filteredBills.reduce((sum, bill) => sum + (bill.amount || 0), 0);
  const paidBills = filteredBills.filter(bill => bill.billStatus === "Paid").length;
  const pendingBills = filteredBills.filter(bill => bill.billStatus === "Pending").length;

  // Reset form and errors
  const resetForm = () => {
    setBillForm({
      supplier: '', poNumber: '', billNumber: '', date: '', amount: '', prNumber: '', paymentTerms: '', items: [], notes: '', document: null,
    });
    setErrors({
      supplier: false, poNumber: false, billNumber: false, date: false, amount: false, prNumber: false, paymentTerms: false, items: false, notes: false, document: false,
    });
    setSelectedPO(null);
    setPoOptions([]);
  };

  // View/Edit dialog stubs (future expansion)
  const handleView = (bill: any) => {
    setSelectedBill(bill);
    setIsViewDialogOpen(true);
  };
  const handleEdit = (bill: any) => {
    setSelectedBill(bill);
    setIsEditDialogOpen(true);
  };

  const handleSaveDraft = () => {
    const newErrors = {
      supplier: !createForm.supplier,
      poNumber: !createForm.poNumber,
      billNumber: !createForm.billNumber,
      date: !createForm.date,
      amount: !createForm.amount,
      prNumber: false,
      paymentTerms: !createForm.paymentTerms,
      items: false,
      notes: false,
      document: !createForm.document,
    };
    setErrors(newErrors);
    console.log("Save Draft");
  };

  const handleSave = () => {
    const newErrors = {
      supplier: !createForm.supplier,
      poNumber: !createForm.poNumber,
      billNumber: !createForm.billNumber,
      date: !createForm.date,
      amount: !createForm.amount,
      prNumber: false,
      paymentTerms: !createForm.paymentTerms,
      items: false,
      notes: false,
      document: !createForm.document,
    };
    setErrors(newErrors);
    console.log("Save");
  };

  // Show loading, error, or success after all variables are defined
  // (move this block just before the return statement)
  // Show loading, error, or success
  if (billLoading) return <div className="p-8 text-center">Saving bill...</div>;
  if (errorMsg) return <div className="p-8 text-center text-red-600">{errorMsg}</div>;
  if (successMsg) return <div className="p-8 text-center text-green-600">{successMsg}</div>;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Bills</CardTitle>
            <Receipt className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{filteredBills.length}</div>
            <p className="text-xs text-blue-600 mt-1">{paidBills} paid, {pendingBills} pending</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Total Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{formatIndianCurrency(totalAmount)}</div>
            <p className="text-xs text-green-600 mt-1">Total bill value</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Average Bill</CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {formatIndianCurrency(filteredBills.length ? totalAmount / filteredBills.length : 0)}
            </div>
            <p className="text-xs text-purple-600 mt-1">Per bill</p>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Bills</h2>
          <p className="text-sm text-gray-600 mt-1">Manage supplier bills and payments</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search bills..."
              className={`pl-10 w-80 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${errors.supplier ? "border-red-500" : ""}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                <Plus className="h-4 w-4 mr-2" />
                Create Bill
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Bill</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="supplier">Supplier Name</Label>
                    <Select
                      value={billForm.supplier}
                      onValueChange={(value) => {
                        setBillForm(f => ({ ...f, supplier: value }));
                        setErrors(e => ({ ...e, supplier: false }));
                      }}
                    >
                      <SelectTrigger className={errors.supplier ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        {uniqueSuppliers.map(supplier => (
                          <SelectItem key={supplier} value={supplier}>{supplier}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.supplier && <p className="text-xs text-red-500 mt-1">Please select a supplier.</p>}
                  </div>
                  <div>
                    <Label htmlFor="po-number">Purchase Order Number</Label>
                    <Select
                      value={billForm.poNumber}
                      onValueChange={(value) => {
                        setBillForm(f => ({ ...f, poNumber: value }));
                        setErrors(e => ({ ...e, poNumber: false }));
                      }}
                    >
                      <SelectTrigger className={errors.poNumber ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select PO" />
                      </SelectTrigger>
                      <SelectContent>
                        {poOptions.map(po => (
                          <SelectItem key={po.purchaseOrderNumber} value={po.purchaseOrderNumber}>{po.purchaseOrderNumber}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.poNumber && <p className="text-xs text-red-500 mt-1">Please select a PO number.</p>}
                  </div>
                  <div>
                    <Label htmlFor="bill-number">Bill Number</Label>
                    <Input
                      id="bill-number"
                      placeholder="Auto-generated"
                      className={errors.billNumber ? "border-red-500" : ""}
                      value={billForm.billNumber}
                      readOnly
                    />
                    {errors.billNumber && <p className="text-xs text-red-500 mt-1">Bill number is required.</p>}
                  </div>
                  <div>
                    <Label htmlFor="pr-number">PR Number (Optional)</Label>
                    <Input
                      id="pr-number"
                      placeholder="Auto-filled"
                      className={errors.prNumber ? "border-red-500" : ""}
                      value={billForm.prNumber}
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      className={errors.date ? "border-red-500" : ""}
                      value={billForm.date}
                      onChange={e => {
                        setBillForm(f => ({ ...f, date: e.target.value }));
                        setErrors(e => ({ ...e, date: false }));
                      }}
                    />
                    {errors.date && <p className="text-xs text-red-500 mt-1">Date is required.</p>}
                  </div>
                  <div>
                    <Label htmlFor="payment-terms">Payment Terms</Label>
                    <Select
                      value={billForm.paymentTerms}
                      onValueChange={handlePaymentTermsChange}
                    >
                      <SelectTrigger className={errors.paymentTerms ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select payment terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Net30">Net 30</SelectItem>
                        <SelectItem value="Net15">Net 15</SelectItem>
                        <SelectItem value="Immediate">Immediate</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.paymentTerms && <p className="text-xs text-red-500 mt-1">Payment terms are required.</p>}
                  </div>
                </div>

                <div>
                  <Label>Items from Purchase Order</Label>
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
                        {billForm.items && billForm.items.length > 0 ? billForm.items.map((item: any, idx: number) => (
                          <TableRow key={idx}>
                            <TableCell>{item.itemName || item.ItemName}</TableCell>
                            <TableCell>{item.quantity || item.Quantity}</TableCell>
                            <TableCell>₹{item.rate || item.Rate}</TableCell>
                            <TableCell>₹{(item.quantity || item.Quantity) * (item.rate || item.Rate)}</TableCell>
                          </TableRow>
                        )) : (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-400">No items found for this PO.</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Internal Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add internal notes..."
                    value={billForm.notes}
                    onChange={e => setBillForm(f => ({ ...f, notes: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>Document Upload</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">Maximum file size: 5MB</p>
                    <Input
                      type="file"
                      className={`${errors.document ? "border-red-500" : ""}`}
                      onChange={handleDocumentChange}
                    />
                    {errors.document && <p className="text-xs text-red-500 mt-1">Document is required</p>}
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => {
                    setIsCreateDialogOpen(false);
                    resetForm();
                  }}>
                    Cancel
                  </Button>
                  {/* Save as Draft can be implemented later if needed */}
                  <Button onClick={handleBillSave} disabled={billLoading}>
                    {billLoading ? 'Saving...' : 'Save'}
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
                  <TableHead className="font-semibold text-gray-700 py-4">Bill #</TableHead>
                  <TableHead className="font-semibold text-gray-700">PO Number</TableHead>
                  <TableHead className="font-semibold text-gray-700">Supplier</TableHead>
                  <TableHead className="font-semibold text-gray-700">Date</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-right">Amount</TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700">Due Date</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center w-16">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedBills.map((bill, index) => (
                  <TableRow 
                    key={bill.billNumber || bill.BillNumber || bill.id || index}
                    className={`hover:bg-blue-50 transition-colors duration-150 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <TableCell className="font-medium text-blue-600 py-4">{bill.billNumber || bill.BillNumber}</TableCell>
                    <TableCell className="text-gray-700">{bill.poNumber || bill.PurchaseOrderNumber}</TableCell>
                    <TableCell className="text-gray-700">{bill.supplierName || bill.Supplier}</TableCell>
                    <TableCell className="text-gray-700">{bill.billDate || bill.BillDate}</TableCell>
                    <TableCell className="text-right font-semibold text-gray-900">
                      {formatIndianCurrency(bill.amount || bill.Amount || 0)}
                    </TableCell>
                    <TableCell>{getStatusBadge(bill.billStatus || bill.BillStatus)}</TableCell>
                    <TableCell className="text-gray-700">{bill.billDueDate || bill.BillDueDate}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-100">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg">
                          <DropdownMenuItem className="hover:bg-blue-50" onClick={() => handleView(bill)}>
                            <FileText className="h-4 w-4 mr-2" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-green-50" onClick={() => handleEdit(bill)}>
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
            <DialogTitle>Bill Details - {selectedBill?.id}</DialogTitle>
          </DialogHeader>
          {selectedBill && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p><strong>Supplier:</strong> {selectedBill.supplierName}</p>
                  <p><strong>PO Number:</strong> {selectedBill.poNumber}</p>
                  <p><strong>Date:</strong> {selectedBill.date}</p>
                  <p><strong>Due Date:</strong> {selectedBill.dueDate}</p>
                  <p><strong>Amount:</strong> {formatIndianCurrency(selectedBill.amount)}</p>
                  <p><strong>Status:</strong> {getStatusBadge(selectedBill.status)}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">Send</Button>
                  <Button variant="outline" size="sm">Print</Button>
                  <Button size="sm">Mark as Paid</Button>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Bill Items</h3>
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
                      <TableCell>10</TableCell>
                      <TableCell>₹100.00</TableCell>
                      <TableCell>₹1,000.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Activity & Comments</h3>
                <div className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Bill created</span>
                    <span className="text-gray-500">{selectedBill.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Payment pending</span>
                    <span className="text-gray-500">{selectedBill.date}</span>
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
            <DialogTitle>Edit Bill - {selectedBill?.id}</DialogTitle>
          </DialogHeader>
          {selectedBill && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-supplier">Supplier Name</Label>
                  <Select defaultValue={selectedBill.supplierName}>
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
                  <Select defaultValue={selectedBill.status.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="partial">Partial</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
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
            Showing {startIndex + 1} to {Math.min(startIndex + parseInt(itemsPerPage), filteredBills.length)} of {filteredBills.length} bills
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

export default PurchaseBills;
