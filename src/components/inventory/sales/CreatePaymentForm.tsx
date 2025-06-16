
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload, X } from "lucide-react";

interface CreatePaymentFormProps {
  payment?: any;
  isEdit?: boolean;
  onClose: () => void;
}

const CreatePaymentForm = ({ payment, isEdit = false, onClose }: CreatePaymentFormProps) => {
  const [customerName, setCustomerName] = useState(payment?.customerName || "");
  const [invoiceNumber, setInvoiceNumber] = useState(payment?.invoiceId || "");
  const [inventory, setInventory] = useState("Main Warehouse");
  const [salesOrderNumber, setSalesOrderNumber] = useState("SO-1001");
  const [invoiceDate, setInvoiceDate] = useState("15-Jun-2023");
  const [dueDate, setDueDate] = useState("30-Jun-2023");
  const [invoiceAmount, setInvoiceAmount] = useState("28999");
  const [outstandingAmount, setOutstandingAmount] = useState("28999");
  const [paymentDate, setPaymentDate] = useState(payment?.date || new Date().toISOString().split('T')[0]);
  const [referenceNumber, setReferenceNumber] = useState(payment?.reference || "");
  const [paymentAmount, setPaymentAmount] = useState(payment?.amount?.toString() || "");
  const [paymentMethod, setPaymentMethod] = useState(payment?.method || "");
  const [bankAccount, setBankAccount] = useState(payment?.account || "");
  const [notesToCustomer, setNotesToCustomer] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  const availableInvoices = [
    { id: "INV-1001", customer: "Rahul Sharma", amount: 28999, outstanding: 28999 },
    { id: "INV-1002", customer: "Priya Patel", amount: 21771, outstanding: 21771 },
    { id: "INV-1003", customer: "Amit Kumar", amount: 10945, outstanding: 5472 },
  ];

  const filteredInvoices = availableInvoices.filter(inv => 
    inv.customer === customerName
  );

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>{isEdit ? "Edit Payment" : "Record New Payment"}</DialogTitle>
      </DialogHeader>

      <div className="space-y-6 max-h-[70vh] overflow-y-auto">
        {/* Customer and Invoice Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Label htmlFor="invoice">Invoice Number *</Label>
            <Select value={invoiceNumber} onValueChange={setInvoiceNumber}>
              <SelectTrigger>
                <SelectValue placeholder="Select invoice" />
              </SelectTrigger>
              <SelectContent>
                {filteredInvoices.map((invoice) => (
                  <SelectItem key={invoice.id} value={invoice.id}>
                    {invoice.id} - {formatIndianCurrency(invoice.outstanding)} outstanding
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Invoice Details (Display Only) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Invoice Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Inventory</Label>
                <Input value={inventory} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label>Sales Order Number</Label>
                <Input value={salesOrderNumber} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label>Invoice Date</Label>
                <Input value={invoiceDate} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label>Due Date</Label>
                <Input value={dueDate} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label>Invoice Amount</Label>
                <Input value={formatIndianCurrency(Number(invoiceAmount))} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label>Outstanding Amount</Label>
                <Input value={formatIndianCurrency(Number(outstandingAmount))} readOnly className="bg-gray-50 font-semibold text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paymentDate">Payment Date *</Label>
                <Input
                  id="paymentDate"
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reference">Reference Number</Label>
                <Input
                  id="reference"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  placeholder="Transaction reference"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Payment Amount *</Label>
                <Input
                  id="amount"
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="method">Payment Method *</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="UPI">UPI</SelectItem>
                    <SelectItem value="Net Banking">Net Banking</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Cheque">Cheque</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2 space-y-2">
                <Label htmlFor="account">Bank Account / Cash *</Label>
                <Select value={bankAccount} onValueChange={setBankAccount}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HDFC XXX3652">HDFC Bank - Main Account</SelectItem>
                    <SelectItem value="SBI XXX8765">SBI - Savings Account</SelectItem>
                    <SelectItem value="ICICI XXX4321">ICICI - Current Account</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes and Document */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="customerNotes">Notes to Customer</Label>
            <Textarea
              id="customerNotes"
              value={notesToCustomer}
              onChange={(e) => setNotesToCustomer(e.target.value)}
              placeholder="Add notes for the customer..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="internalNotes">Internal Notes</Label>
            <Textarea
              id="internalNotes"
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              placeholder="Add internal notes..."
              rows={4}
            />
          </div>
        </div>

        {/* Document Upload */}
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
          {isEdit ? "Update Payment" : "Save Payment"}
        </Button>
      </div>
    </div>
  );
};

export default CreatePaymentForm;
