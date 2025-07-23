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
import AddSupplierForm from "./AddSupplierForm";
import { addPurchaseOrderRequest } from "@/store/Inventory/purchase/actions";
import { useDispatch, useSelector } from "react-redux";

const CreatePurchaseOrder = ({ onClose, isEdit = false, orderId }: { 
  onClose: () => void; 
  isEdit?: boolean;
  orderId?: string;
}) => {
  const dispatch = useDispatch();
  let passSupplier = undefined;
  const [showSupplierForm, setShowSupplierForm] = useState(false);
  const [errors, setErrors] = useState({ supplierName: false, itemName: false });

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
    items: [{ id: 1, itemName: "", account: "", quantity: 0, rate: 0, amount: 0, description: ""}],
  });

  const addItem = () => {
    const newItem = { id: Date.now(), itemName: "", account: "", quantity: 0, rate: 0, amount: 0, description: "" };
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
    const payload = {
      ...purchaseOrder,
      createdBy: "admin",
      updatedBy: "admin",
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      operation: 0,
    };

    console.log("Dispatching payload:", payload);
    dispatch(addPurchaseOrderRequest(payload));
    console.log("Dispatch completed");
  };

  const { stageCompleted, error } = useSelector((state: any) => state.purchase);

  useEffect(() => {
    if (stageCompleted) {
      if (!error) {
        alert('✅ Purchase order created!');
        onClose();
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
    if (purchaseOrder.supplierName === "" || purchaseOrder.items.some(item => item.itemName === "")) {
      setErrors((prev) => ({ ...prev, supplierName: purchaseOrder.supplierName === "", itemName: purchaseOrder.items.some(item => item.itemName === "") }));
      return;
    }
    setErrors({ supplierName: false, itemName: false });
    console.log("Save");
    createPurchaseOrder();
    // You can call createPurchaseOrder() here or add further logic
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
                <Select onValueChange={(value) => setPurchaseOrder(prev => ({ ...prev, supplierName: value }))}>
                  <SelectTrigger className={`flex-1 ${errors.supplierName ? "border border-red-500" : ""}`}>
                    <SelectValue placeholder="Select or search supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tata Steel Limited">Tata Steel Limited</SelectItem>
                    <SelectItem value="Reliance Industries Ltd.">Reliance Industries Ltd.</SelectItem>
                    <SelectItem value="Infosys Limited">Infosys Limited</SelectItem>
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
              <Label htmlFor="poNumber">Purchase Order Number</Label>
              <Input 
                id="poNumber" 
                value={purchaseOrder.purchaseOrderNumber}
                readOnly 
                className="bg-gray-50"
              />
            </div>

            <div>
              <Label htmlFor="inventory">Inventory</Label>
              <Select onValueChange={(value) => setPurchaseOrder(prev => ({ ...prev, inventory: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select inventory" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Main Warehouse">Main Warehouse</SelectItem>
                  <SelectItem value="Retail Store 1">Retail Store 1</SelectItem>
                  <SelectItem value="Retail Store 2">Retail Store 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="expectedDelivery">Expected Delivery</Label>
              <Input
                id="expectedDelivery"
                type="date"
                value={purchaseOrder.expectedDeliveryDate}
                onChange={(e) => setPurchaseOrder({ ...purchaseOrder, expectedDeliveryDate: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="poDate">Purchase Order Date</Label>
              <Input
                id="poDate"
                type="date"
                value={purchaseOrder.purchaseOrderDate}
                onChange={(e) => setPurchaseOrder({ ...purchaseOrder, purchaseOrderDate: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="paymentPolicy">Payment Policy</Label>
              <Select onValueChange={(value) => setPurchaseOrder(prev => ({ ...prev, paymentPolicy: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment policy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Net 30">Net 30</SelectItem>
                  <SelectItem value="Net 15">Net 15</SelectItem>
                  <SelectItem value="Cash on Delivery">Cash on Delivery</SelectItem>
                  <SelectItem value="Advance Payment">Advance Payment</SelectItem>
                </SelectContent>
              </Select>
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
                  {purchaseOrder.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Input
                          placeholder="Enter item name"
                          value={item.itemName}
                          className={`${errors.itemName ? "border border-red-500" : ""}`}
                          onChange={(e) => updateItem(item.id, 'itemName', e.target.value)}
                        />
                        {errors.itemName && item.itemName === "" && (
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
                  ))}
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
          <Button variant="outline" onClick={onClose}>Cancel</Button>
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
