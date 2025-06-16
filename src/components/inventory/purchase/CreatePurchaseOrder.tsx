
import React, { useState } from "react";
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

const CreatePurchaseOrder = ({ onClose, isEdit = false, orderId }: { 
  onClose: () => void; 
  isEdit?: boolean;
  orderId?: string;
}) => {
  const [showSupplierForm, setShowSupplierForm] = useState(false);
  const [items, setItems] = useState([
    { id: 1, name: "", quantity: 0, rate: 0, amount: 0 }
  ]);

  const addItem = () => {
    setItems([...items, { id: Date.now(), name: "", quantity: 0, rate: 0, amount: 0 }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: number, field: string, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          updated.amount = updated.quantity * updated.rate;
        }
        return updated;
      }
      return item;
    }));
  };

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);

  if (showSupplierForm) {
    return <AddSupplierForm onClose={() => setShowSupplierForm(false)} />;
  }

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
                <Select>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select or search supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supplier1">Tata Steel Limited</SelectItem>
                    <SelectItem value="supplier2">Reliance Industries Ltd.</SelectItem>
                    <SelectItem value="supplier3">Infosys Limited</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  onClick={() => setShowSupplierForm(true)}
                  className="whitespace-nowrap"
                >
                  Create Supplier
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="poNumber">Purchase Order Number</Label>
              <Input id="poNumber" placeholder="Auto-generated" readOnly />
            </div>
            <div>
              <Label htmlFor="inventory">Inventory</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select inventory" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Warehouse</SelectItem>
                  <SelectItem value="store1">Retail Store 1</SelectItem>
                  <SelectItem value="store2">Retail Store 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="expectedDelivery">Expected Delivery</Label>
              <Input id="expectedDelivery" type="date" />
            </div>
            <div>
              <Label htmlFor="poDate">Purchase Order Date</Label>
              <Input id="poDate" type="date" />
            </div>
            <div>
              <Label htmlFor="paymentPolicy">Payment Policy</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment policy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="net30">Net 30</SelectItem>
                  <SelectItem value="net15">Net 15</SelectItem>
                  <SelectItem value="cod">Cash on Delivery</SelectItem>
                  <SelectItem value="advance">Advance Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-3">
              <Label htmlFor="referenceNumber">Reference Number</Label>
              <Input id="referenceNumber" />
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Items</CardTitle>
                <Button onClick={addItem} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Item Name</TableHead>
                    <TableHead className="w-[15%]">Quantity</TableHead>
                    <TableHead className="w-[15%]">Rate</TableHead>
                    <TableHead className="w-[15%]">Amount</TableHead>
                    <TableHead className="w-[10%]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Input
                          placeholder="Enter item name"
                          value={item.name}
                          onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                        />
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
                        <Input
                          value={item.amount.toFixed(2)}
                          readOnly
                          className="bg-gray-50"
                        />
                      </TableCell>
                      <TableCell>
                        {items.length > 1 && (
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
                    <TableCell colSpan={3} className="text-right font-medium">
                      Total Amount:
                    </TableCell>
                    <TableCell className="font-bold">
                      ₹{totalAmount.toFixed(2)}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="supplierNote">Note for Supplier</Label>
              <Textarea id="supplierNote" rows={4} placeholder="Enter any special instructions..." />
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
            <Button variant="outline">Save & Send</Button>
            <Button>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePurchaseOrder;
