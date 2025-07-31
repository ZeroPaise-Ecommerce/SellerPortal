
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
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPurchaseReturnRequest, addPurchaseReturnRequest } from '@/store/Inventory/purchaseReturn/actions';

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

  const dispatch = useDispatch();
  const { purchaseReturns, loading, error, stageCompleted } = useSelector((state: any) => state.purchaseReturn);
  // Add selectors for suppliers and purchaseOrders if available
  const suppliers = useSelector((state: any) => state.supplier?.suppliers || []);
  const purchaseOrders = useSelector((state: any) => state.purchase?.purchareOrders || []);

  useEffect(() => {
    dispatch(getPurchaseReturnRequest());
  }, [dispatch]);

  // Add effect to close dialog and refresh list after creation
  useEffect(() => {
    if (stageCompleted && isCreateDialogOpen) {
      setIsCreateDialogOpen(false);
      setCreateForm({
        supplier: '', poID: '', returnDate: '', reason: '', items: [], notes: ''
      });
      dispatch(getPurchaseReturnRequest());
      dispatch({ type: 'RESET_STAGE_COMPLETED' });
    }
  }, [stageCompleted, isCreateDialogOpen, dispatch]);

  const [createForm, setCreateForm] = useState({
    supplier: "",
    poID: "",
    returnDate: "",
    reason: "",
    items: [],
    notes: "",
  });

  const [errors, setErrors] = useState({
    supplier: false,
    poID: false,
    returnDate: false,
    reason: false,
    items: false,
    notes: false,
  });

  // Remove manual itemEntry state and add poItems state
  const [poItems, setPoItems] = useState<any[]>([]);
  const [itemError, setItemError] = useState('');

  // When PO changes, load items from the selected purchase order
  useEffect(() => {
    const po = purchaseOrders.find((po: any) => po.purchaseOrderNumber === createForm.poID);
    if (po && po.items) {
      // Map items to include a returnQty field
      setPoItems(po.items.map((item: any) => ({
        ...item,
        returnQty: 0,
        receivedQty: item.quantity || item.Quantity || 0,
        unitPrice: item.rate || item.Rate || 0,
        itemName: item.itemName || item.ItemName || '',
      })));
    } else {
      setPoItems([]);
    }
  }, [createForm.poID, purchaseOrders]);

  // Filter and search
  const filteredReturns = purchaseReturns.filter((returnItem: any) =>
    (returnItem.purchseReturnNumber || returnItem.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (returnItem.supplierName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (returnItem.purchaseOrderNumber || returnItem.poID || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReturns.length / parseInt(itemsPerPage));
  const startIndex = (currentPage - 1) * parseInt(itemsPerPage);
  const paginatedReturns = filteredReturns.slice(startIndex, startIndex + parseInt(itemsPerPage));

  const totalAmount = filteredReturns.reduce((sum: number, returnItem: any) => sum + (returnItem.totalAmount || returnItem.amount || 0), 0);
  const completedReturns = filteredReturns.filter((returnItem: any) => returnItem.status === "Completed").length;
  const processingReturns = filteredReturns.filter((returnItem: any) => returnItem.status === "Processing").length;
  const rejectedReturns = filteredReturns.filter((returnItem: any) => returnItem.status === "Rejected").length;

  const handleView = (returnItem: any) => {
    setSelectedReturn(returnItem);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (returnItem: any) => {
    setSelectedReturn(returnItem);
    setIsEditDialogOpen(true);
  };

  // Add edit form state
  const [editForm, setEditForm] = useState<any>(null);

  // When opening the edit dialog, populate editForm
  useEffect(() => {
    if (isEditDialogOpen && selectedReturn) {
      setEditForm({ ...selectedReturn });
    }
  }, [isEditDialogOpen, selectedReturn]);

  // On successful update, close dialog and refresh
  useEffect(() => {
    if (stageCompleted && isEditDialogOpen) {
      setIsEditDialogOpen(false);
      setEditForm(null);
      dispatch(getPurchaseReturnRequest());
      dispatch({ type: 'RESET_STAGE_COMPLETED' });
    }
  }, [stageCompleted, isEditDialogOpen, dispatch]);

  const handleCreateReturn = () => {
    // Validate required fields
    const newErrors = {
      supplier: !createForm.supplier,
      poID: !createForm.poID,
      returnDate: !createForm.returnDate,
      reason: !createForm.reason,
      items: poItems.filter((item: any) => item.returnQty > 0).length === 0,
      notes: !createForm.notes,
    };
    setErrors(newErrors);
    setItemError('');
    if (Object.values(newErrors).some(Boolean)) {
      if (newErrors.items) setItemError('Please enter a return quantity for at least one item.');
      return;
    }
    // Additional validation: returnQty <= receivedQty and >= 0
    for (const item of poItems) {
      if (item.returnQty > item.receivedQty) {
        setItemError(`Return quantity for '${item.itemName}' cannot exceed received quantity (${item.receivedQty}).`);
        return;
      }
      if (item.returnQty < 0) {
        setItemError(`Return quantity for '${item.itemName}' cannot be negative.`);
        return;
      }
    }
    // Map supplier and PO
    const supplierObj = suppliers.find((s: any) => s.companyName === createForm.supplier);
    const poObj = purchaseOrders.find((po: any) => po.purchaseOrderNumber === createForm.poID);
    // Generate return number (simple example)
    const returnNumber = `PR-${Math.floor(1000 + Math.random() * 9000)}`;
    // Build items array
    const items = poItems.filter((item: any) => item.returnQty > 0).map((item: any) => ({
      itemName: item.itemName,
      receivedQty: item.receivedQty,
      returnQty: item.returnQty,
      unitPrice: item.unitPrice,
      total: item.returnQty * item.unitPrice,
    }));
    // Calculate totalAmount
    const totalAmount = items.reduce((sum: number, item: any) => sum + (item.total || 0), 0);
    // Convert returnDate to UTC ISO string
    let returnDateUtc = '';
    if (createForm.returnDate) {
      const date = new Date(createForm.returnDate);
      returnDateUtc = date.toISOString();
    }
    // Build payload (PurchaseReturnDto)
    const payload = {
      supplierId: supplierObj?.supplierId || 0,
      supplierName: createForm.supplier,
      purchaseOrderId: poObj?.purchaseOrderId || 0,
      purchaseOrderNumber: createForm.poID,
      purchseReturnNumber: returnNumber,
      returnDate: returnDateUtc,
      returnReason: createForm.reason,
      returnNotes: createForm.notes,
      totalAmount,
      operation: 0,
      items,
    };
    dispatch(addPurchaseReturnRequest(payload));
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
            <div className="text-2xl font-bold text-amber-900">{purchaseReturns.length}</div>
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
                    <Label htmlFor="supplier">Supplier Name <span className="text-red-500">*</span></Label>
                    <Select
                      value={createForm.supplier}
                      onValueChange={value => setCreateForm({ ...createForm, supplier: value })}
                    >
                      <SelectTrigger className={errors.supplier ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        {suppliers.map((supplier: any) => (
                          <SelectItem key={supplier.supplierId} value={supplier.companyName}>{supplier.companyName}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.supplier && (
                      <span className="text-xs text-red-500">Supplier is required</span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="po-id">Purchase Order ID <span className="text-red-500">*</span></Label>
                    <Select
                      value={createForm.poID}
                      onValueChange={value => setCreateForm({ ...createForm, poID: value })}
                    >
                      <SelectTrigger className={errors.poID ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select PO" />
                      </SelectTrigger>
                      <SelectContent>
                        {purchaseOrders.map((po: any) => (
                          <SelectItem key={po.purchaseOrderId} value={po.purchaseOrderNumber}>{po.purchaseOrderNumber}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.poID && (
                      <span className="text-xs text-red-500">PO ID is required</span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="return-date">Return Date <span className="text-red-500">*</span></Label>
                    <Input
                      id="return-date"
                      type="date"
                      value={createForm.returnDate}
                      onChange={e => setCreateForm({ ...createForm, returnDate: e.target.value })}
                      className={errors.returnDate ? "border-red-500" : ""}
                    />
                    {errors.returnDate && (
                      <span className="text-xs text-red-500">Return date is required</span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="reason">Return Reason <span className="text-red-500">*</span></Label>
                    <Select
                      value={createForm.reason}
                      onValueChange={value => setCreateForm({ ...createForm, reason: value })}
                    >
                      <SelectTrigger className={errors.reason ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Defective Items">Defective Items</SelectItem>
                        <SelectItem value="Wrong Specifications">Wrong Specifications</SelectItem>
                        <SelectItem value="Damaged in Transit">Damaged in Transit</SelectItem>
                        <SelectItem value="Excess Quantity">Excess Quantity</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.reason && (
                      <span className="text-xs text-red-500">Reason is required</span>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Items to Return</Label>
                  <div className="mt-2">
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
                        {poItems.map((item: any, idx: number) => (
                          <TableRow key={idx}>
                            <TableCell>{item.itemName}</TableCell>
                            <TableCell>{item.receivedQty}</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                min={0}
                                max={item.receivedQty}
                                value={item.returnQty}
                                onChange={e => {
                                  const value = Number(e.target.value);
                                  setPoItems(items => items.map((it, i) => i === idx ? { ...it, returnQty: value } : it));
                                }}
                                className="w-24"
                              />
                            </TableCell>
                            <TableCell>{formatIndianCurrency(item.unitPrice)}</TableCell>
                            <TableCell>{formatIndianCurrency(item.returnQty * item.unitPrice)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Return Notes <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="notes"
                    placeholder="Add notes about the return..."
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
                    onClick={handleCreateReturn}
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Create Return'}
                  </Button>
                </div>
              </div>
              {error && <div className="text-red-600 p-2">{error}</div>}
              {itemError && <div className="text-red-600 p-2">{itemError}</div>}
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
                    <TableCell className="font-medium text-blue-600 py-4">{returnItem.purchseReturnNumber}</TableCell>
                    <TableCell className="text-gray-700">{returnItem.purchaseOrderNumber}</TableCell>
                    <TableCell className="text-gray-700">{returnItem.supplierName}</TableCell>
                    <TableCell className="text-gray-700">{returnItem.returnDate}</TableCell>
                    <TableCell className="text-right font-semibold text-gray-900">
                      {formatIndianCurrency(returnItem.totalAmount)}
                    </TableCell>
                    <TableCell>{getStatusBadge(returnItem.status? returnItem.status : 'Not Applicavle')}</TableCell>
                    <TableCell className="text-gray-600">{returnItem.returnReason}</TableCell>
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
            <DialogTitle>Edit Return - {editForm?.purchseReturnNumber || editForm?.id}</DialogTitle>
          </DialogHeader>
          {editForm && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-reason">Reason</Label>
                  <Input
                    id="edit-reason"
                    value={editForm.returnReason || ''}
                    onChange={e => setEditForm((f: any) => ({ ...f, returnReason: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-notes">Notes</Label>
                  <Textarea
                    id="edit-notes"
                    value={editForm.returnNotes || ''}
                    onChange={e => setEditForm((f: any) => ({ ...f, returnNotes: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    // Build payload for update
                    const payload = {
                      ...editForm,
                      operation: 'Update',
                    };
                    dispatch(addPurchaseReturnRequest(payload));
                  }}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
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
