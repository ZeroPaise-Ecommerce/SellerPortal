import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

interface AddExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateCategory: () => void;
  onCreateExpense: (expense: any) => void;
  loading: boolean;
  error: string | null;
}

const AddExpenseDialog: React.FC<AddExpenseDialogProps> = ({ open, onOpenChange, onCreateCategory, onCreateExpense, loading, error }) => {
  const [form, setForm] = React.useState({
    category: '',
    amount: '',
    date: '',
    paymentMethod: '',
    account: '',
    description: ''
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    let dateISO = '';
    if (form.date) {
      const dateObj = new Date(form.date + 'T00:00:00Z');
      dateISO = dateObj.toISOString();
    }
    const expenseNumber = `EXP-${Date.now()}`;
    onCreateExpense({
      ...form,
      amount: parseFloat(form.amount),
      date: dateISO,
      expenseNumber,
    });
    onOpenChange(false);
    setForm({ category: '', amount: '', date: '', paymentMethod: '', account: '', description: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <div className="flex gap-2">
                <Select value={form.category} onValueChange={v => handleChange('category', v)}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rent">Rent</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="salaries">Salaries</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onCreateCategory}
                  className="px-3"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="number" placeholder="Enter amount" value={form.amount} onChange={e => handleChange('amount', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={form.date} onChange={e => handleChange('date', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select value={form.paymentMethod} onValueChange={v => handleChange('paymentMethod', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BankTransfer">Bank Transfer</SelectItem>
                  <SelectItem value="CreditCard">Credit Card</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="neft">Neft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="account">Account</Label>
              <Select value={form.account} onValueChange={v => handleChange('account', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hdfc">HDFC XXX3652</SelectItem>
                  <SelectItem value="sbi">SBI XXX7845</SelectItem>
                  <SelectItem value="visa">Visa XXX6365</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter expense description..." value={form.description} onChange={e => handleChange('description', e.target.value)} />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? 'Saving...' : 'Save Expense'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseDialog; 