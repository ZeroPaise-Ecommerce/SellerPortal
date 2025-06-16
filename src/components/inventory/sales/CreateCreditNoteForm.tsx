
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CreateCreditNoteFormProps {
  creditNote?: any;
  isEdit?: boolean;
  onClose: () => void;
}

const CreateCreditNoteForm = ({ creditNote, isEdit = false, onClose }: CreateCreditNoteFormProps) => {
  const [customerName, setCustomerName] = useState(creditNote?.customerName || "");
  const [invoiceNumber, setInvoiceNumber] = useState(creditNote?.invoiceId || "");
  const [creditNoteNumber, setCreditNoteNumber] = useState(creditNote?.id || "CN-" + Date.now());
  const [date, setDate] = useState(creditNote?.date || new Date().toISOString().split('T')[0]);
  const [reason, setReason] = useState(creditNote?.reason || "");
  const [notes, setNotes] = useState("");

  const [items, setItems] = useState([
    {
      id: 1,
      name: "Product A",
      description: "High quality product",
      qty: 1,
      rate: 1000,
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

  const updateItemQty = (itemId: number, qty: number) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, qty, amount: item.rate * qty }
        : item
    ));
  };

  const updateItemRate = (itemId: number, rate: number) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, rate, amount: item.qty * rate }
        : item
    ));
  };

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>{isEdit ? "Edit Credit Note" : "Create New Credit Note"}</DialogTitle>
      </DialogHeader>

      <div className="space-y-6 max-h-[70vh] overflow-y-auto">
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
            <Label htmlFor="invoice">Invoice Number *</Label>
            <Select value={invoiceNumber} onValueChange={setInvoiceNumber}>
              <SelectTrigger>
                <SelectValue placeholder="Select invoice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INV-2023-001">INV-2023-001</SelectItem>
                <SelectItem value="INV-2023-002">INV-2023-002</SelectItem>
                <SelectItem value="INV-2023-003">INV-2023-003</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="creditNoteNumber">Credit Note Number</Label>
            <Input
              id="creditNoteNumber"
              value={creditNoteNumber}
              onChange={(e) => setCreditNoteNumber(e.target.value)}
              placeholder="CN-001"
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

          <div className="col-span-2 space-y-2">
            <Label htmlFor="reason">Reason for Credit Note *</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Product Return">Product Return</SelectItem>
                <SelectItem value="Billing Error">Billing Error</SelectItem>
                <SelectItem value="Discount Adjustment">Discount Adjustment</SelectItem>
                <SelectItem value="Quality Issue">Quality Issue</SelectItem>
                <SelectItem value="Overpayment">Overpayment</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Items */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Credit Note Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.qty}
                        onChange={(e) => updateItemQty(item.id, Number(e.target.value))}
                        className="w-20"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.rate}
                        onChange={(e) => updateItemRate(item.id, Number(e.target.value))}
                        className="w-24"
                      />
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatIndianCurrency(item.amount)}
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
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total Credit:</span>
                  <span className="text-red-600">{formatIndianCurrency(total)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any additional notes..."
            rows={4}
          />
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
        <Button onClick={onClose}>
          {isEdit ? "Update Credit Note" : "Create Credit Note"}
        </Button>
      </div>
    </div>
  );
};

export default CreateCreditNoteForm;
