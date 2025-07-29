import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash, Upload } from "lucide-react";
import AddSupplierForm from "../AddSupplierForm";
import { addPurchaseOrderRequest } from "@/store/Inventory/purchase/actions";
import { useDispatch, useSelector } from "react-redux";
import { getInventoryItemsRequest } from "@/store/Inventory/product/actions";
import { getPurchaseOrderRequest } from "@/store/Inventory/purchase/actions";

const CreatePurchaseOrder = ({ onClose, isEdit = false, orderId }: { 
  onClose: () => void; 
  isEdit?: boolean;
  orderId?: string;
}) => {
  const dispatch = useDispatch();
  let passSupplier = undefined;
  const [showSupplierForm, setShowSupplierForm] = useState(false);
  const [errors, setErrors] = useState({ supplierName: false, itemName: false, expectedDeliveryDate: false, purchaseOrderDate: false, purchaseOrderNumber: false, inventory: false, paymentPolicy: false });

  const generatePurchaseOrderNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `PO-${year}${month}${day}-${randomNum}`;
  };

  const [purchaseOrder, setPurchaseOrder] = useState({
    supplierId: "1",
    supplierName: "",
    purchaseOrderNumber: generatePurchaseOrderNumber(),
    inventory: "",
    expectedDeliveryDate: "",
    purchaseOrderDate: new Date().toISOString().split("T")[0],
    referenceNumber: "",
    paymentPolicy: "",
    notesToSupplier: "",
    attachments: [],
    items: [{ id: 1, productId: "", itemName: "", account: "", quantity: 0, rate: 0, amount: 0, description: "" }],
  });

  const addItem = () => {
    const newItem = { id: Date.now(), productId: "", itemName: "", account: "", quantity: 0, rate: 0, amount: 0, description: "" };
    setPurchaseOrder((prev) => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const updateItem = (id: number, field: string, value: any) => {
    setPurchaseOrder((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          if (field === "quantity" || field === "rate") {
            updated.amount = updated.quantity * updated.rate;
          }
          return updated;
        }
        return item;
      }),
    }));
  };

  const removeItem = (id: number) => {
    setPurchaseOrder((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const totalAmount = purchaseOrder.items.reduce((sum, item) => sum + item.amount, 0);

  const createPurchaseOrder = async () => {
    console.log("createPurchaseOrder function called");
    // Map items to DTO structure
    const items = purchaseOrder.items.map(item => ({
      PurchaseOrderItemId: 0, // 0 for new items
      ItemName: item.itemName,
      Quantity: item.quantity,
      Rate: item.rate,
      Amount: item.quantity * item.rate,
      Description: item.description,
      ReceivedQuantity: 0 // Default to 0, since not present in item
    }));

    // Build payload matching PurchaseOrderDto
    const payload = {
      PurchaseOrderId: 0, // 0 for new
      PurchaseOrderDate: purchaseOrder.purchaseOrderDate,
      PurchaseOrderNumber: purchaseOrder.purchaseOrderNumber,
      SupplierId: parseInt(purchaseOrder.supplierId, 10),
      SupplierName: purchaseOrder.supplierName,
      Status: "NotApplicable", // Set as needed
      BillStatus: "NotApplicable", // Set as needed
      PoRecived: "NotApplicable", // Set as needed
      ExpectedDeliveryDate: purchaseOrder.expectedDeliveryDate,
      TotalAmount: totalAmount,
      Inventory: purchaseOrder.inventory,
      ReferenceNumber: purchaseOrder.referenceNumber,
      NotesToSupplier: purchaseOrder.notesToSupplier,
      PaymentPolicy: purchaseOrder.paymentPolicy, // Should match enum string
      CreatedDate: new Date().toISOString(),
      UpdatedDate: new Date().toISOString(),
      CreatedBy: "admin",
      UpdatedBy: "admin",
      Operation: 0,
      Items: items,
      Attachments: [], // Add if needed
      PRNumber: null,
      PRReceivedDate: null,
      PRDate: null,
      PRInternalNotes: null,
      PRRecivedStaus: "Partial", // Set as needed
      IsPRDraft: false,
      WareHouse: null,
      BillNumber: null,
      BillDate: null,
      BillInternalNotes: null,
      BillDueDate: null,
      IsBillDraft: false,
      BillPaymentTerms: "Net30", // Set as needed
      PaymentOutDate: null,
      IsPaymentOutDraft: false,
      PaymentOutNotes: null,
      BankPaymentMethod: "NEFT", // Set as needed
      PaymentOutStatus: "Pending", // Set as needed
      AccountDetails: null
    };

    console.log("Dispatching payload:", payload);
    dispatch(addPurchaseOrderRequest(payload));
    console.log("Dispatch completed");  

  };

  const { stageCompleted, error } = useSelector((state: any) => state.purchase);
  // Add selector for suppliers
  const suppliers = useSelector((state: any) => state.supplier.suppliers || []);
  // Add selector for inventory items
  const inventoryItems = useSelector((state: any) => state.product.inventoryItems || []);

  useEffect(() => {
    dispatch(getInventoryItemsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (stageCompleted) {
      if (!error) {
        alert('✅ Purchase order created!');
        onClose();
        dispatch(getPurchaseOrderRequest());
      } else {
        alert('❌ Error creating purchase order: ' + error);
      }
      // Reset the flag if you have an action for it
      dispatch({ type: 'RESET_STAGE_COMPLETED' });
    }
  }, [stageCompleted, error, dispatch, onClose]);

  if (showSupplierForm) {
    return <AddSupplierForm supplier={passSupplier} onClose={() => setShowSupplierForm(false)} />;
  }

  const handleSave = () => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const poDate = new Date(purchaseOrder.purchaseOrderDate);
    const expectedDate = new Date(purchaseOrder.expectedDeliveryDate);
    poDate.setHours(0,0,0,0);
    expectedDate.setHours(0,0,0,0);
    const newErrors = {
      supplierName: purchaseOrder.supplierName === "",
      itemName: purchaseOrder.items.some(item => !item.productId || item.itemName === ""),
      expectedDeliveryDate: purchaseOrder.expectedDeliveryDate === "" || expectedDate < today,
      purchaseOrderDate: purchaseOrder.purchaseOrderDate === "" || poDate < today,
      purchaseOrderNumber: purchaseOrder.purchaseOrderNumber === "",
      inventory: purchaseOrder.inventory === "",
      paymentPolicy: purchaseOrder.paymentPolicy === ""
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) {
      return;
    }
    setErrors({ supplierName: false, itemName: false, expectedDeliveryDate: false, purchaseOrderDate: false, purchaseOrderNumber: false, inventory: false, paymentPolicy: false });
    createPurchaseOrder();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">
            {isEdit ? `Edit Purchase Order ${orderId}` : "Create Purchase Order"}
          </h2>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="supplierName">Supplier Name *</Label>
              <div className="flex gap-2">
                <Select onValueChange={(key) => {
                  const selected = suppliers.find((s: any) => String(s.supplierId) === key);
                  setPurchaseOrder(prev => ({
                    ...prev,
                    supplierId: key,
                    supplierName: selected ? (selected.companyName || (selected.firstName + ' ' + selected.lastName)) : ''
                  }));
                }} value={purchaseOrder.supplierId ? String(purchaseOrder.supplierId) : ""}>
                  <SelectTrigger className={`flex-1 ${errors.supplierName ? "border border-red-500" : ""}`}>
                    <SelectValue placeholder="Select or search supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier: any) => (
                      <SelectItem key={supplier.supplierId} value={String(supplier.supplierId)}>
                        {supplier.companyName || (supplier.firstName + ' ' + supplier.lastName)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => setShowSupplierForm(true)} className="whitespace-nowrap">
                  Create Supplier
                </Button>
              </div>
              {errors.supplierName && (
                <span className="text-xs text-red-500">Supplier is required.</span>
              )}
            </div>

            <div>
              <Label htmlFor="poNumber">Purchase Order Number *</Label>
              <Input 
                id="poNumber" 
                value={purchaseOrder.purchaseOrderNumber}
                readOnly 
                className={`bg-gray-50 ${errors.purchaseOrderNumber ? "border border-red-500" : ""}`}
              />
              {errors.purchaseOrderNumber && (
                <span className="text-xs text-red-500">Purchase Order Number is required.</span>
              )}
            </div>

            <div>
              <Label htmlFor="inventory">Inventory *</Label>
              <Select onValueChange={(value) => setPurchaseOrder(prev => ({ ...prev, inventory: value }))}>
                <SelectTrigger className={errors.inventory ? "border border-red-500" : ""}>
                  <SelectValue placeholder="Select inventory" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Main Warehouse">Main Warehouse</SelectItem>
                  <SelectItem value="Retail Store 1">Retail Store 1</SelectItem>
                  <SelectItem value="Retail Store 2">Retail Store 2</SelectItem>
                </SelectContent>
              </Select>
              {errors.inventory && (
                <span className="text-xs text-red-500">Inventory is required.</span>
              )}
            </div>

            <div>
              <Label htmlFor="expectedDelivery">Expected Delivery *</Label>
              <Input
                id="expectedDelivery"
                type="date"
                value={purchaseOrder.expectedDeliveryDate}
                onChange={(e) => setPurchaseOrder({ ...purchaseOrder, expectedDeliveryDate: e.target.value })}
                className={errors.expectedDeliveryDate ? "border border-red-500" : ""}
              />
              {errors.expectedDeliveryDate && (
                <span className="text-xs text-red-500">Expected Delivery must be today or later.</span>
              )}
            </div>

            <div>
              <Label htmlFor="poDate">Purchase Order Date *</Label>
              <Input
                id="poDate"
                type="date"
                value={purchaseOrder.purchaseOrderDate}
                onChange={(e) => setPurchaseOrder({ ...purchaseOrder, purchaseOrderDate: e.target.value })}
                className={errors.purchaseOrderDate ? "border border-red-500" : ""}
              />
              {errors.purchaseOrderDate && (
                <span className="text-xs text-red-500">Purchase Order Date must be today or later.</span>
              )}
            </div>

            <div>
              <Label htmlFor="paymentPolicy">Payment Policy *</Label>
              <Select onValueChange={(value) => setPurchaseOrder(prev => ({ ...prev, paymentPolicy: value }))}>
                <SelectTrigger className={errors.paymentPolicy ? "border border-red-500" : ""}>
                  <SelectValue placeholder="Select payment policy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Net30">Net 30</SelectItem>
                  <SelectItem value="Net15">Net 15</SelectItem>
                  <SelectItem value="CashOnDelivery">Cash on Delivery</SelectItem>
                  <SelectItem value="AdvancePayment">Advance Payment</SelectItem>
                </SelectContent>
              </Select>
              {errors.paymentPolicy && (
                <span className="text-xs text-red-500">Payment Policy is required.</span>
              )}
            </div>

            <div className="col-span-3">
              <Label htmlFor="referenceNumber">Reference Number</Label>
              <Input
                id="referenceNumber"
                value={purchaseOrder.referenceNumber}
                onChange={(e) => setPurchaseOrder({ ...purchaseOrder, referenceNumber: e.target.value })}
              />
            </div>
          </div>

          {/* Items Table */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Items</CardTitle>
                <Button onClick={addItem} size="sm">
                  <Plus className="h-4 w-4 mr-2" /> Add Item
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Item Name *</TableHead>
                    <TableHead className="w-[15%]">Quantity</TableHead>
                    <TableHead className="w-[15%]">Rate</TableHead>
                    <TableHead className="w-[15%]">Amount</TableHead>
                    <TableHead className="w-[10%]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchaseOrder.items.map((item) => {
                    // Get productIds already selected in other rows
                    const selectedProductIds = purchaseOrder.items.filter(i => i.id !== item.id).map(i => i.productId);
                    return (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Select
                            onValueChange={(value) => {
                              const selected = inventoryItems.find((inv: any) => String(inv.productId) === value);
                              updateItem(item.id, 'productId', value);
                              updateItem(item.id, 'itemName', selected ? `${selected.productName}-${selected.productId}` : '');
                              updateItem(item.id, 'id', selected ? selected.productId : '');
                              // Optionally set rate, etc. here:
                              // updateItem(item.id, 'rate', selected ? selected.buyPrice : 0);
                            }}
                            value={item.productId ? String(item.productId) : ""}
                          >
                            <SelectTrigger className={`${errors.itemName ? "border border-red-500" : ""}`} >
                              <SelectValue placeholder="Select item" />
                            </SelectTrigger>
                            <SelectContent>
                              {inventoryItems.filter((inv: any) => !selectedProductIds.includes(String(inv.productId))).map((inv: any) => (
                                <SelectItem key={inv.productId} value={String(inv.productId)}>
                                  {inv.productName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.itemName && (!item.productId || item.itemName === "") && (
                            <span className="text-xs text-red-500">Item name is required.</span>
                          )}
                        </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.rate}
                          onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input value={item.amount.toFixed(2)} readOnly className="bg-gray-50" />
                      </TableCell>
                      <TableCell>
                        {purchaseOrder.items.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="h-8 w-8 text-red-600"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
                  <TableRow>
                    <TableCell colSpan={3} className="text-right font-medium">Total Amount:</TableCell>
                    <TableCell className="font-bold">₹{totalAmount.toFixed(2)}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="supplierNote">Note for Supplier</Label>
              <Textarea
                id="supplierNote"
                rows={4}
                placeholder="Enter any special instructions..."
                value={purchaseOrder.notesToSupplier}
                onChange={(e) => setPurchaseOrder({ ...purchaseOrder, notesToSupplier: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="fileUpload">Upload Files (Max 5MB)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400">PDF, DOC, XLS files up to 5MB</p>
                <input type="file" className="hidden" multiple accept=".pdf,.doc,.docx,.xls,.xlsx" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between p-6 border-t">
          <Button variant="outline" onClick={() => {
            onClose();
            dispatch(getPurchaseOrderRequest());
          }}>Cancel</Button>
          <div className="flex gap-2">
            <Button variant="outline">Save as Draft</Button>
            <Button variant="outline" onClick={handleSave}>Save & Send</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePurchaseOrder;
