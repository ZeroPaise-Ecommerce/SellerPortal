
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Edit, Send, Printer, CreditCard, Smartphone, IndianRupee, Wallet } from "lucide-react";

interface ViewPaymentDetailsProps {
  payment: any;
  onClose: () => void;
  onEdit: () => void;
}

const ViewPaymentDetails = ({ payment, onClose, onEdit }: ViewPaymentDetailsProps) => {
  const formatIndianCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case "Credit Card":
        return <CreditCard className="h-5 w-5 text-blue-500" />;
      case "UPI":
        return <Smartphone className="h-5 w-5 text-green-500" />;
      case "Cash":
        return <IndianRupee className="h-5 w-5 text-yellow-500" />;
      case "Net Banking":
        return <Wallet className="h-5 w-5 text-purple-500" />;
      default:
        return <Wallet className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleSend = () => {
    alert("Sending payment receipt to customer...");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>Payment Receipt</DialogTitle>
      </DialogHeader>

      {/* Modern Receipt Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6 rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">PAYMENT RECEIPT</h1>
            <p className="text-green-100 mt-1">{payment.id}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{formatIndianCurrency(payment.amount)}</div>
            <div className="flex items-center gap-2 mt-2 justify-end">
              {getPaymentIcon(payment.method)}
              <span className="text-green-100">{payment.method}</span>
            </div>
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
        </div>
      </div>

      {/* Payment Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Payment ID:</span>
              <span className="font-medium font-mono">{payment.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Date:</span>
              <span className="font-medium">{payment.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium text-green-600">{formatIndianCurrency(payment.amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <div className="flex items-center gap-2">
                {getPaymentIcon(payment.method)}
                <span className="font-medium">{payment.method}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Account:</span>
              <span className="font-medium font-mono">{payment.account}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Reference:</span>
              <span className="font-medium font-mono">{payment.reference}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Customer & Invoice Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Customer:</span>
              <span className="font-medium">{payment.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Invoice ID:</span>
              <span className="font-medium font-mono">{payment.invoiceId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sales Order:</span>
              <span className="font-medium font-mono">SO-1001</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Invoice Amount:</span>
              <span className="font-medium">{formatIndianCurrency(28999)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Outstanding:</span>
              <span className="font-medium text-red-600">{formatIndianCurrency(0)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Company Details</CardTitle>
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
              <h4 className="font-semibold mb-2">Bank Details</h4>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Account Name:</span> Your Company Name</p>
                <p><span className="font-medium">Account Number:</span> 1234567890</p>
                <p><span className="font-medium">Bank:</span> HDFC Bank</p>
                <p><span className="font-medium">IFSC:</span> HDFC0001234</p>
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
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Payment Received</p>
                  <p className="text-sm text-gray-600">Payment of {formatIndianCurrency(payment.amount)} received via {payment.method}</p>
                </div>
                <span className="text-xs text-gray-500">{payment.date}</span>
              </div>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Invoice Created</p>
                  <p className="text-sm text-gray-600">Invoice {payment.invoiceId} created for {payment.customerName}</p>
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
          Edit Payment
        </Button>
      </div>
    </div>
  );
};

export default ViewPaymentDetails;
