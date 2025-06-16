
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface AddTransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: any) => void;
  account: any;
}

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({ isOpen, onClose, onSave, account }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: "",
    type: "",
    amount: "",
    category: "",
    reference: "",
    notes: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (formData.description && formData.type && formData.amount) {
      onSave({
        ...formData,
        amount: parseFloat(formData.amount),
      });
      setFormData({
        date: new Date().toISOString().split('T')[0],
        description: "",
        type: "",
        amount: "",
        category: "",
        reference: "",
        notes: "",
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Manual Transaction Entry</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <div className="space-y-2">
            <Label htmlFor="date">Date *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter transaction description"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Transaction Type *</Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select transaction type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit">Credit (Money In)</SelectItem>
                <SelectItem value="debit">Debit (Money Out)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount *</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
              placeholder="Enter amount"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Sales Revenue</SelectItem>
                <SelectItem value="purchase">Purchase Payment</SelectItem>
                <SelectItem value="expense">Business Expense</SelectItem>
                <SelectItem value="refund">Refund</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reference">Reference Number</Label>
            <Input
              id="reference"
              value={formData.reference}
              onChange={(e) => handleInputChange("reference", e.target.value)}
              placeholder="Transaction reference"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Additional notes"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!formData.description || !formData.type || !formData.amount}>
            Add Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionForm;
