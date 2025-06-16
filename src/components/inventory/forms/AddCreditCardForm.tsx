
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface AddCreditCardFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (card: any) => void;
}

const AddCreditCardForm: React.FC<AddCreditCardFormProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    bankName: "",
    cardName: "",
    cardNumber: "",
    cardType: "",
    creditLimit: "",
    currency: "",
    expiryDate: "",
    billingDate: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (formData.bankName && formData.cardName && formData.cardNumber) {
      onSave({
        ...formData,
        id: `card_${Date.now()}`,
        number: `•••• •••• •••• ${formData.cardNumber.slice(-4)}`,
        balance: formData.creditLimit || "0.00",
        available: formData.creditLimit || "0.00",
        dueDate: formData.billingDate || "Not set",
      });
      setFormData({
        bankName: "",
        cardName: "",
        cardNumber: "",
        cardType: "",
        creditLimit: "",
        currency: "",
        expiryDate: "",
        billingDate: "",
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Credit Card</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name *</Label>
            <Input
              id="bankName"
              value={formData.bankName}
              onChange={(e) => handleInputChange("bankName", e.target.value)}
              placeholder="Enter bank name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cardName">Card Name *</Label>
            <Input
              id="cardName"
              value={formData.cardName}
              onChange={(e) => handleInputChange("cardName", e.target.value)}
              placeholder="Enter card name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number *</Label>
            <Input
              id="cardNumber"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
              placeholder="Enter card number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cardType">Card Type</Label>
            <Select value={formData.cardType} onValueChange={(value) => handleInputChange("cardType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select card type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="creditLimit">Credit Limit</Label>
            <Input
              id="creditLimit"
              type="number"
              value={formData.creditLimit}
              onChange={(e) => handleInputChange("creditLimit", e.target.value)}
              placeholder="Enter credit limit"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency *</Label>
            <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                <SelectItem value="USD">USD - US Dollar</SelectItem>
                <SelectItem value="EUR">EUR - Euro</SelectItem>
                <SelectItem value="GBP">GBP - British Pound</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              type="month"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange("expiryDate", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="billingDate">Billing Date</Label>
            <Input
              id="billingDate"
              type="date"
              value={formData.billingDate}
              onChange={(e) => handleInputChange("billingDate", e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!formData.bankName || !formData.cardName || !formData.cardNumber}>
            Add Card
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCreditCardForm;
