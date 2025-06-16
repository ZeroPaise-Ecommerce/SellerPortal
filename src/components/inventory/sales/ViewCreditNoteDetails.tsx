
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Send, Printer, Download } from "lucide-react";

interface ViewCreditNoteDetailsProps {
  creditNote: any;
  onClose: () => void;
  onEdit: () => void;
}

const ViewCreditNoteDetails = ({ creditNote, onClose, onEdit }: ViewCreditNoteDetailsProps) => {
  const formatIndianCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      Applied: "bg-green-100 text-green-800 border-green-200",
      Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Draft: "bg-gray-100 text-gray-800 border-gray-200",
      Cancelled: "bg-red-100 text-red-800 border-red-200"
    };
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        {status}
      </span>
    );
  };

  const creditNoteItems = [
    { id: 1, name: "Product A", description: "High quality product", qty: 1, rate: 1000, amount: 1000 },
    { id: 2, name: "Product B", description: "Premium product", qty: 1, rate: 1999, amount: 1999 },
  ];

  const subtotal = creditNoteItems.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const handleSend = () => {
    alert("Sending credit note to customer...");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert("Downloading credit note...");
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>Credit Note Details</DialogTitle>
      </DialogHeader>

      {/* Modern Credit Note Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">CREDIT NOTE</h1>
            <p className="text-purple-100 mt-1">{creditNote.id}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{formatIndianCurrency(creditNote.amount)}</div>
            <div className="mt-2">{getStatusBadge(creditNote.status)}</div>
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
          <Button variant="outline" size="sm" onClick={handleSend}>
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Credit Note Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Credit Note Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Credit Note ID:</span>
              <span className="font-medium font-mono">{creditNote.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{creditNote.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Customer:</span>
              <span className="font-medium">{creditNote.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Invoice Reference:</span>
              <span className="font-medium font-mono">{creditNote.invoiceId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Reason:</span>
              <span className="font-medium">{creditNote.reason}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <div>{getStatusBadge(creditNote.status)}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Customer Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="font-semibold text-lg">{creditNote.customerName}</p>
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
      </div>

      {/* Credit Note Items */}
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
              {creditNoteItems.map((item) => (
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
                <span>Total Credit Amount:</span>
                <span className="text-purple-600">{formatIndianCurrency(total)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Your Company Name</h4>
              <div className="space-y-1 text-sm">
                <p>123 Business Street</p>
                <p>Mumbai, Maharashtra 400001</p>
                <p>India</p>
                <p>GST: 27XXXXX1234X1ZX</p>
                <p>Email: info@company.com</p>
                <p>Phone: +91 98765 43210</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Terms & Notes</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>This credit note is issued in reference to the invoice {creditNote.invoiceId}.</p>
                <p>Credit issued can be used for future purchases or refunded as per company policy.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity & Comments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Activity & Comments History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Credit Note Created</p>
                  <p className="text-sm text-gray-600">Credit note was created for {creditNote.customerName}</p>
                </div>
                <span className="text-xs text-gray-500">{creditNote.date}</span>
              </div>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Related to Invoice</p>
                  <p className="text-sm text-gray-600">Created in reference to invoice {creditNote.invoiceId}</p>
                </div>
                <span className="text-xs text-gray-500">10-Jun-2023</span>
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
        <Button onClick={onEdit}>
          Edit Credit Note
        </Button>
      </div>
    </div>
  );
};

export default ViewCreditNoteDetails;
