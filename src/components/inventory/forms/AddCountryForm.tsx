
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface AddCountryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (country: { name: string; code: string }) => void;
}

const AddCountryForm: React.FC<AddCountryFormProps> = ({ isOpen, onClose, onSave }) => {
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const handleSave = () => {
    if (countryName.trim() && countryCode.trim()) {
      onSave({ name: countryName.trim(), code: countryCode.trim().toUpperCase() });
      setCountryName("");
      setCountryCode("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Country</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="countryName">Country Name *</Label>
            <Input
              id="countryName"
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
              placeholder="Enter country name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="countryCode">Country Code *</Label>
            <Input
              id="countryCode"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              placeholder="Enter country code (e.g., IN, US)"
              maxLength={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!countryName.trim() || !countryCode.trim()}>
            Add Country
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCountryForm;
