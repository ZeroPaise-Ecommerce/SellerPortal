
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Send, Printer, DollarSign, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ViewInvoiceDetailsProps {
  invoice: any;
  onClose: () => void;
  onEdit: () => void;
}

const ViewInvoiceDetails = ({ invoice, onClose, onEdit }: ViewInvoiceDetailsProps) => {
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  
  const formatIndianCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  };

  const invoiceItems = [
    { id: 1, name: "Product A", description: "High quality product", qty: 2, rate: 1000, amount: 2000 },
    { id: 2, name: "Product B", description: "Premium product", qty: 1, rate: 1500, amount: 1500 },
  ];

  const subtotal = invoiceItems.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const handleSendInvoice = () => {
    alert("Sending invoice to customer...");
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  const handleRecordPayment = () => {
    alert("Payment recorded successfully");
    setIsRecordPaymentOpen(false);
  };

  const handleDownload = () => {
    alert("Downloading invoice...");
  };

  return (
    <div className="space-y-6">
      {/* Modern Invoice Template Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">INVOICE</h1>
            <p className="text-blue-100 mt-1">{invoice.id}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{formatIndianCurrency(invoice.amount)}</div>
            <Badge variant={invoice.status === "Paid" ? "default" : "destructive"} className="mt-2">
              {invoice.status}
            </Badge>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={handleSendInvoice}>
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrintInvoice}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
        <Dialog open={isRecordPaymentOpen} onOpenChange={setIsRecordPaymentOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <DollarSign className="h-4 w-4 mr-2" />
              Record Payment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Record Payment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Payment Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="method">Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bank">Bank Account</Label>
                <Select value={bankAccount} onValueChange={setBankAccount}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bank account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hdfc_main">HDFC Bank - Main Account</SelectItem>
                    <SelectItem value="sbi_savings">SBI - Savings Account</SelectItem>
                    <SelectItem value="icici_current">ICICI - Current Account</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsRecordPaymentOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleRecordPayment}>
                  Record Payment
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Separator />

      {/* Invoice Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bill To</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="font-semibold text-lg">{invoice.customerName}</p>
              <p className="text-gray-600">customer@example.com</p>
              <p className="text-gray-600">+91 98765 43210</p>
              <p className="text-gray-600 mt-2">
                123 Business Street<br />
                Mumbai, Maharashtra 400001<br />
                India
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Invoice Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Invoice Date:</span>
              <span className="font-medium">{invoice.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Due Date:</span>
              <span className="font-medium">{invoice.dueDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sales Order:</span>
              <span className="font-medium">{invoice.salesOrderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Terms:</span>
              <span className="font-medium">Net 30 Days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Outstanding:</span>
              <span className="font-medium text-red-600">{formatIndianCurrency(invoice.outstandingAmount)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Items */}
      <Card>
        <CardHeader>
          <CardTitle>Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Rate</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoiceItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-right">{item.qty}</TableCell>
                  <TableCell className="text-right">{formatIndianCurrency(item.rate)}</TableCell>
                  <TableCell className="text-right">{formatIndianCurrency(item.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Totals */}
          <div className="flex justify-end mt-6">
            <div className="w-80 space-y-2">
              <div className="flex justify-between py-2 border-b">
                <span>Subtotal:</span>
                <span>{formatIndianCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Tax (18% GST):</span>
                <span>{formatIndianCurrency(tax)}</span>
              </div>
              <div className="flex justify-between py-3 border-t-2 font-bold text-lg">
                <span>Total Amount:</span>
                <span className="text-blue-600">{formatIndianCurrency(total)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Bank Details</h4>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Account Name:</span> Your Company Name</p>
                <p><span className="font-medium">Account Number:</span> 1234567890</p>
                <p><span className="font-medium">Bank:</span> HDFC Bank</p>
                <p><span className="font-medium">IFSC:</span> HDFC0001234</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Terms & Conditions</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• Payment is due within 30 days</p>
                <p>• Late payment charges may apply</p>
                <p>• All disputes subject to Mumbai jurisdiction</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default ViewInvoiceDetails;
