
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
import { Upload, X } from "lucide-react";

interface CreateInvoiceFormProps {
  invoice?: any;
  isEdit?: boolean;
  onClose: () => void;
}

const CreateInvoiceForm = ({ invoice, isEdit = false, onClose }: CreateInvoiceFormProps) => {
  const [customerName, setCustomerName] = useState(invoice?.customerName || "");
  const [salesOrderNumber, setSalesOrderNumber] = useState(invoice?.salesOrderNumber || "");
  const [inventory, setInventory] = useState(invoice?.inventory || "");
  const [date, setDate] = useState(invoice?.date || new Date().toISOString().split('T')[0]);
  const [referenceNumber, setReferenceNumber] = useState(invoice?.referenceNumber || "");
  const [paymentPolicy, setPaymentPolicy] = useState(invoice?.paymentPolicy || "");
  const [notesToCustomer, setNotesToCustomer] = useState(invoice?.notes || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [items] = useState([
    {
      id: 1,
      name: "Product A",
      description: "High quality product",
      qty: 2,
      rate: 1000,
      amount: 2000
    },
    {
      id: 2,
      name: "Product B",
      description: "Premium product",
      qty: 1,
      rate: 1500,
      amount: 1500
    }
  ]);

  const formatIndianCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
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
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const availableSalesOrders = [
    { id: "SO-1001", customer: "Rahul Sharma" },
    { id: "SO-1002", customer: "Priya Patel" },
    { id: "SO-1003", customer: "Amit Kumar" },
  ];

  const filteredSalesOrders = availableSalesOrders.filter(so => 
    so.customer === customerName
  );

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="customer">Customer Name *</Label>
          <Select value={customerName} onValueChange={setCustomerName}>
            <SelectTrigger>
              <SelectValue placeholder="Select customer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Rahul Sharma">Rahul Sharma</SelectItem>
              <SelectItem value="Priya Patel">Priya Patel</SelectItem>
              <SelectItem value="Amit Kumar">Amit Kumar</SelectItem>
              <SelectItem value="Deepa Singh">Deepa Singh</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="salesOrder">Sales Order Number *</Label>
          <Select value={salesOrderNumber} onValueChange={setSalesOrderNumber}>
            <SelectTrigger>
              <SelectValue placeholder="Select sales order" />
            </SelectTrigger>
            <SelectContent>
              {filteredSalesOrders.map((so) => (
                <SelectItem key={so.id} value={so.id}>{so.id}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="inventory">Inventory</Label>
          <Input
            id="inventory"
            value={inventory}
            onChange={(e) => setInventory(e.target.value)}
            placeholder="Main Warehouse"
            readOnly
            className="bg-gray-50"
          />
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

      {/* Items from Sales Order */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Items (from Sales Order)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell>{formatIndianCurrency(item.rate)}</TableCell>
                  <TableCell className="font-medium">{formatIndianCurrency(item.amount)}</TableCell>
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
          {isEdit ? "Update Invoice" : "Save Invoice"}
        </Button>
      </div>
    </div>
  );
};

export default CreateInvoiceForm;
