
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface AddressFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isBusinessAddress: boolean;
  companyName: string;
  gstNumber: string;
  addressType: 'billing' | 'shipping';
  sameAsBilling: boolean;
}

interface AddAddressModalProps {
  customerId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddressAdded?: (address: any) => void;
}

const AddAddressModal = ({ customerId, open, onOpenChange, onAddressAdded }: AddAddressModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [addressData, setAddressData] = useState<AddressFormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    isBusinessAddress: false,
    companyName: "",
    gstNumber: "",
    addressType: 'billing',
    sameAsBilling: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setAddressData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!addressData.firstName || !addressData.lastName || !addressData.phone || 
        !addressData.addressLine1 || !addressData.city || !addressData.pincode || 
        !addressData.state) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (addressData.email && !emailRegex.test(addressData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    try {
      // This would typically be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create unique ID for the new address
      const newAddress = {
        id: `addr_${Math.random().toString(36).substring(2, 9)}`,
        ...addressData,
        dateAdded: new Date().toISOString()
      };
      
      if (onAddressAdded) {
        onAddressAdded(newAddress);
      }
      
      toast({
        title: "Address Added",
        description: "New address has been added successfully",
      });
      
      // Reset form and close modal
      setAddressData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        isBusinessAddress: false,
        companyName: "",
        gstNumber: "",
        addressType: 'billing',
        sameAsBilling: false
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Failed to add address",
        description: "An error occurred while adding the address",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
          <DialogDescription>
            Add a new address for this customer
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="addressType" className="font-medium">Address Type:</Label>
            <div className="flex items-center space-x-2">
              <input 
                type="radio" 
                id="billing" 
                name="addressType" 
                value="billing"
                checked={addressData.addressType === 'billing'}
                onChange={() => setAddressData(prev => ({ ...prev, addressType: 'billing' }))}
                className="mr-1"
              />
              <label htmlFor="billing" className="text-sm">Billing</label>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="radio" 
                id="shipping" 
                name="addressType" 
                value="shipping"
                checked={addressData.addressType === 'shipping'}
                onChange={() => setAddressData(prev => ({ ...prev, addressType: 'shipping' }))}
                className="mr-1"
              />
              <label htmlFor="shipping" className="text-sm">Shipping</label>
            </div>
          </div>
          
          {addressData.addressType === 'shipping' && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sameAsBilling"
                checked={addressData.sameAsBilling}
                onCheckedChange={(checked) => 
                  handleCheckboxChange('sameAsBilling', checked === true)
                }
              />
              <label 
                htmlFor="sameAsBilling" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Same as billing address
              </label>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name*</Label>
              <Input
                id="firstName"
                name="firstName"
                value={addressData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name*</Label>
              <Input
                id="lastName"
                name="lastName"
                value={addressData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number*</Label>
              <Input
                id="phone"
                name="phone"
                value={addressData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={addressData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mt-2">
            <Checkbox
              id="isBusinessAddress"
              checked={addressData.isBusinessAddress}
              onCheckedChange={(checked) => 
                handleCheckboxChange('isBusinessAddress', checked === true)
              }
            />
            <label 
              htmlFor="isBusinessAddress" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              This is a business address
            </label>
          </div>

          {addressData.isBusinessAddress && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={addressData.companyName}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gstNumber">GST Number</Label>
                <Input
                  id="gstNumber"
                  name="gstNumber"
                  value={addressData.gstNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="addressLine1">Address Line 1*</Label>
            <Input
              id="addressLine1"
              name="addressLine1"
              value={addressData.addressLine1}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="addressLine2">Address Line 2</Label>
            <Input
              id="addressLine2"
              name="addressLine2"
              value={addressData.addressLine2}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City*</Label>
              <Input
                id="city"
                name="city"
                value={addressData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State*</Label>
              <Input
                id="state"
                name="state"
                value={addressData.state}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode*</Label>
              <Input
                id="pincode"
                name="pincode"
                value={addressData.pincode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country*</Label>
              <Input
                id="country"
                name="country"
                value={addressData.country}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Address"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressModal;
