
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface CreateReturnFormProps {
  returnItem?: any;
  isEdit?: boolean;
  onClose: () => void;
}

const CreateReturnForm = ({ returnItem, isEdit = false, onClose }: CreateReturnFormProps) => {
  const [customerName, setCustomerName] = useState(returnItem?.customerName || "");
  const [salesOrderNumber, setSalesOrderNumber] = useState(returnItem?.orderID || "");
  const [invoiceNumber, setInvoiceNumber] = useState("INV-1001");
  const [returnDate, setReturnDate] = useState(returnItem?.date || new Date().toISOString().split('T')[0]);
  const [returnReason, setReturnReason] = useState(returnItem?.reason || "");

  const [items, setItems] = useState([
    {
      id: 1,
      name: "Product A",
      description: "High quality product",
      originalQty: 2,
      returnQty: isEdit ? 1 : 0,
      rate: 1000,
      amount: 1000
    },
    {
      id: 2,
      name: "Product B",
      description: "Premium product",
      originalQty: 1,
      returnQty: isEdit ? 1 : 0,
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

  const availableSalesOrders = [
    { id: "SO-1001", customer: "Rahul Sharma" },
    { id: "SO-1002", customer: "Priya Patel" },
    { id: "SO-1003", customer: "Amit Kumar" },
  ];

  const filteredSalesOrders = availableSalesOrders.filter(so => 
    so.customer === customerName
  );

  const updateReturnQty = (itemId: number, qty: number) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, returnQty: Math.min(qty, item.originalQty), amount: item.rate * Math.min(qty, item.originalQty) }
        : item
    ));
  };

  const totalRefundAmount = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>{isEdit ? "Edit Sales Return" : "Create New Sales Return"}</DialogTitle>
      </DialogHeader>

      <div className="space-y-6 max-h-[70vh] overflow-y-auto">
        {/* Customer and Order Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="customer">Customer *</Label>
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
            <Label htmlFor="invoice">Invoice Number</Label>
            <Input
              id="invoice"
              value={invoiceNumber}
              readOnly
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="returnDate">Return Date *</Label>
            <Input
              id="returnDate"
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>

          <div className="col-span-2 space-y-2">
            <Label htmlFor="reason">Return Reason *</Label>
            <Select value={returnReason} onValueChange={setReturnReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select return reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Damaged Product">Damaged Product</SelectItem>
                <SelectItem value="Incorrect Size">Incorrect Size</SelectItem>
                <SelectItem value="Wrong Item Delivered">Wrong Item Delivered</SelectItem>
                <SelectItem value="Defective">Defective</SelectItem>
                <SelectItem value="Customer Dissatisfied">Customer Dissatisfied</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Invoice Amount:</span>
                <span className="font-medium">{formatIndianCurrency(28999)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Paid Amount:</span>
                <span className="font-medium text-green-600">{formatIndianCurrency(28999)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Outstanding:</span>
                <span className="font-medium text-red-600">{formatIndianCurrency(0)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Return Items */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Return Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Original Qty</TableHead>
                  <TableHead>Return Qty</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead className="text-right">Refund Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.originalQty}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        max={item.originalQty}
                        value={item.returnQty}
                        onChange={(e) => updateReturnQty(item.id, Number(e.target.value))}
                        className="w-20"
                      />
                    </TableCell>
                    <TableCell>{formatIndianCurrency(item.rate)}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatIndianCurrency(item.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Total Refund */}
            <div className="flex justify-end mt-4">
              <div className="w-64 space-y-2">
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total Refund Amount:</span>
                  <span className="text-red-600">{formatIndianCurrency(totalRefundAmount)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="outline">
          Save as Draft
        </Button>
        <Button onClick={onClose}>
          {isEdit ? "Update Return" : "Create Return"}
        </Button>
      </div>
    </div>
  );
};

export default CreateReturnForm;
