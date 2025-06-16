
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash, Upload, X, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddCustomerForm from "./AddCustomerForm";

interface CreateSalesOrderFormProps {
  order?: any;
  isEdit?: boolean;
  onClose: () => void;
}

const CreateSalesOrderForm = ({ order, isEdit = false, onClose }: CreateSalesOrderFormProps) => {
  const [customerName, setCustomerName] = useState(order?.customerName || "");
  const [salesOrderNumber, setSalesOrderNumber] = useState(order?.id || "SO-" + Date.now());
  const [inventory, setInventory] = useState(order?.inventory || "");
  const [date, setDate] = useState(order?.date || new Date().toISOString().split('T')[0]);
  const [referenceNumber, setReferenceNumber] = useState(order?.referenceNumber || "");
  const [paymentPolicy, setPaymentPolicy] = useState(order?.paymentPolicy || "");
  const [notesToCustomer, setNotesToCustomer] = useState(order?.notes || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [itemSearch, setItemSearch] = useState("");

  const [items, setItems] = useState([
    {
      id: 1,
      name: "Product A",
      description: "",
      qty: 1,
      rate: 1000,
      discount: 0,
      discountType: "percentage",
      amount: 1000
    }
  ]);

  const formatIndianCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  };

  const calculateAmount = (qty: number, rate: number, discount: number, discountType: string) => {
    const subtotal = qty * rate;
    if (discountType === "percentage") {
      return subtotal - (subtotal * discount / 100);
    } else {
      return subtotal - discount;
    }
  };

  const addItem = () => {
    setItems([...items, {
      id: items.length + 1,
      name: "",
      description: "",
      qty: 1,
      rate: 0,
      discount: 0,
      discountType: "percentage",
      amount: 0
    }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: number, field: string, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'qty' || field === 'rate' || field === 'discount' || field === 'discountType') {
          updatedItem.amount = calculateAmount(
            updatedItem.qty,
            updatedItem.rate,
            updatedItem.discount,
            updatedItem.discountType
          );
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      setSelectedFile(file);
    } else {
      alert("File size must be less than 5MB");
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setSelectedFile(file);
    } else {
      alert("File size must be less than 5MB");
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="customer">Customer Name *</Label>
          <div className="flex gap-2">
            <Select value={customerName} onValueChange={setCustomerName}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Rahul Sharma">Rahul Sharma</SelectItem>
                <SelectItem value="Priya Patel">Priya Patel</SelectItem>
                <SelectItem value="Amit Kumar">Amit Kumar</SelectItem>
                <SelectItem value="Deepa Singh">Deepa Singh</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Customer</DialogTitle>
                </DialogHeader>
                <AddCustomerForm onClose={() => setIsAddCustomerOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="soNumber">Sales Order Number</Label>
          <Input
            id="soNumber"
            value={salesOrderNumber}
            onChange={(e) => setSalesOrderNumber(e.target.value)}
            placeholder="SO-001"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="inventory">Inventory</Label>
          <Select value={inventory} onValueChange={setInventory}>
            <SelectTrigger>
              <SelectValue placeholder="Select inventory" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="main">Main Warehouse</SelectItem>
              <SelectItem value="secondary">Secondary Warehouse</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date *</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reference">Reference Number</Label>
          <Input
            id="reference"
            value={referenceNumber}
            onChange={(e) => setReferenceNumber(e.target.value)}
            placeholder="REF-001"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="payment">Payment Policy</Label>
          <Select value={paymentPolicy} onValueChange={setPaymentPolicy}>
            <SelectTrigger>
              <SelectValue placeholder="Select payment policy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Immediate</SelectItem>
              <SelectItem value="15days">Net 15 Days</SelectItem>
              <SelectItem value="30days">Net 30 Days</SelectItem>
              <SelectItem value="45days">Net 45 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Items Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Order Items</CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search items..."
                value={itemSearch}
                onChange={(e) => setItemSearch(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
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
                <TableHead>Item Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Select 
                      value={item.name} 
                      onValueChange={(value) => updateItem(item.id, 'name', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select item" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Product A">Product A</SelectItem>
                        <SelectItem value="Product B">Product B</SelectItem>
                        <SelectItem value="Product C">Product C</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      placeholder="Item description"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={item.qty}
                      onChange={(e) => updateItem(item.id, 'qty', Number(e.target.value))}
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={item.rate}
                      onChange={(e) => updateItem(item.id, 'rate', Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Input
                        type="number"
                        value={item.discount}
                        onChange={(e) => updateItem(item.id, 'discount', Number(e.target.value))}
                        className="w-16"
                      />
                      <Select
                        value={item.discountType}
                        onValueChange={(value) => updateItem(item.id, 'discountType', value)}
                      >
                        <SelectTrigger className="w-16">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">%</SelectItem>
                          <SelectItem value="fixed">₹</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatIndianCurrency(item.amount)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Totals */}
          <div className="flex justify-end mt-4">
            <div className="w-64 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatIndianCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (18%):</span>
                <span>{formatIndianCurrency(tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>{formatIndianCurrency(total)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes and Attachments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="notes">Notes to Customer</Label>
          <Textarea
            id="notes"
            value={notesToCustomer}
            onChange={(e) => setNotesToCustomer(e.target.value)}
            placeholder="Add notes for the customer..."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label>Document Attachment (Max 5MB)</Label>
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {selectedFile ? (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{selectedFile.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedFile(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div>
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  Drag and drop a file here, or{" "}
                  <label className="text-blue-600 cursor-pointer hover:underline">
                    browse
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                  </label>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="outline">
          Save as Draft
        </Button>
        <Button variant="outline">
          Save and Send
        </Button>
        <Button onClick={onClose}>
          {isEdit ? "Update Order" : "Save Order"}
        </Button>
      </div>
    </div>
  );
};

export default CreateSalesOrderForm;
