
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { Customer } from "@/store/Inventory/customer/types";
import { useDispatch } from "react-redux";
import { createCustomerRequest } from "@/store/Inventory/customer/actions";

interface AddCustomerFormProps {
  customer?: Customer | null;
  isEdit?: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const AddCustomerForm = ({ customer, isEdit = false, onClose, onSuccess }: AddCustomerFormProps) => {
  const [activeTab, setActiveTab] = useState("general");
  const [copyBillingToShipping, setCopyBillingToShipping] = useState(false);
  const [bankAccounts, setBankAccounts] = useState<Array<{ id: number; [key: string]: any }>>([{ id: 1 }]);
  const [contactPersons, setContactPersons] = useState<Array<{ id: number; [key: string]: any }>>([{ id: 1 }]);

  // Get dispatch function
  const dispatch = useDispatch();

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    nickName: "",
    companyName: "",
    mobileNumber: "",
    currency: "INR",
    gstin: "",
    pan: "",
    designation: "",
    heading: "",
    comments: "",
    // Billing Address
    billingAddressLine1: "",
    billingAddressLine2: "",
    billingCity: "",
    billingPincode: "",
    billingState: "",
    billingCountry: "India",
    // Shipping Address
    shippingAddressLine1: "",
    shippingAddressLine2: "",
    shippingCity: "",
    shippingPincode: "",
    shippingState: "",
    shippingCountry: "India",
  });

  // Initialize form data when customer prop changes
  useEffect(() => {
    if (customer && isEdit) {
      setFormData({
        firstName: customer.firstName || "",
        lastName: customer.lastName || "",
        emailAddress: customer.emailAddress || "",
        nickName: customer.nickName || "",
        companyName: customer.companyName || "",
        mobileNumber: customer.mobileNumber || "",
        currency: customer.currency || "INR",
        gstin: customer.gstin || "",
        pan: customer.pan || "",
        designation: customer.designation || "",
        heading: customer.heading || "",
        comments: customer.comments || "",
        // Billing Address - get from addresses array
        billingAddressLine1: customer.addresses?.find(addr => addr.addressType === 0)?.addressLine1 || "",
        billingAddressLine2: customer.addresses?.find(addr => addr.addressType === 0)?.addressLine2 || "",
        billingCity: customer.addresses?.find(addr => addr.addressType === 0)?.city || "",
        billingPincode: customer.addresses?.find(addr => addr.addressType === 0)?.pinCode || "",
        billingState: customer.addresses?.find(addr => addr.addressType === 0)?.state || "",
        billingCountry: customer.addresses?.find(addr => addr.addressType === 0)?.country || "India",
        // Shipping Address - get from addresses array
        shippingAddressLine1: customer.addresses?.find(addr => addr.addressType === 1)?.addressLine1 || "",
        shippingAddressLine2: customer.addresses?.find(addr => addr.addressType === 1)?.addressLine2 || "",
        shippingCity: customer.addresses?.find(addr => addr.addressType === 1)?.city || "",
        shippingPincode: customer.addresses?.find(addr => addr.addressType === 1)?.pinCode || "",
        shippingState: customer.addresses?.find(addr => addr.addressType === 1)?.state || "",
        shippingCountry: customer.addresses?.find(addr => addr.addressType === 1)?.country || "India",
      });

      // Initialize bank accounts from customer data
      if (customer.bankingDetails && customer.bankingDetails.length > 0) {
        setBankAccounts(customer.bankingDetails.map((bank, index) => {
          const { id, ...bankData } = bank;
          return { id: index + 1, ...bankData };
        }));
      }

      // Initialize contact persons from customer data
      if (customer.contactDetails && customer.contactDetails.length > 0) {
        setContactPersons(customer.contactDetails.map((contact, index) => {
          const { id, ...contactData } = contact;
          return { id: index + 1, ...contactData };
        }));
      }
    }
  }, [customer, isEdit]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBankAccountChange = (accountId: number, field: string, value: string) => {
    setBankAccounts(prev => prev.map(account => 
      account.id === accountId 
        ? { ...account, [field]: value }
        : account
    ));
  };

  const handleContactPersonChange = (personId: number, field: string, value: string) => {
    setContactPersons(prev => prev.map(person => 
      person.id === personId 
        ? { ...person, [field]: value }
        : person
    ));
  };

  const addBankAccount = () => {
    setBankAccounts([...bankAccounts, { id: bankAccounts.length + 1 }]);
  };

  const removeBankAccount = (id: number) => {
    setBankAccounts(bankAccounts.filter(acc => acc.id !== id));
  };

  const addContactPerson = () => {
    setContactPersons([...contactPersons, { id: contactPersons.length + 1 }]);
  };

  const removeContactPerson = (id: number) => {
    setContactPersons(contactPersons.filter(person => person.id !== id));
  };

  const handleCopyBillingAddress = () => {
    if (copyBillingToShipping) {
      setFormData(prev => ({
        ...prev,
        shippingAddressLine1: prev.billingAddressLine1,
        shippingAddressLine2: prev.billingAddressLine2,
        shippingCity: prev.billingCity,
        shippingPincode: prev.billingPincode,
        shippingState: prev.billingState,
        shippingCountry: prev.billingCountry,
      }));
    }
  };

  const handleSubmit = () => {
    // Prepare the payload according to the API structure
    const payload = {
      customerId: customer?.customerId || 0,
      firstName: formData.firstName,
      lastName: formData.lastName,
      emailAddress: formData.emailAddress,
      mobileNumber: formData.mobileNumber,
      companyName: formData.companyName,
      nickName: formData.nickName,
      gstin: formData.gstin,
      pan: formData.pan,
      currency: formData.currency,
      designation: formData.designation,
      heading: formData.heading,
      comments: formData.comments,
      addresses: [
        {
          id: customer?.addresses?.[0]?.id || "00000000-0000-0000-0000-000000000000",
          customerId: customer?.customerId || 0,
          country: formData.billingCountry,
          addressLine1: formData.billingAddressLine1,
          addressLine2: formData.billingAddressLine2,
          city: formData.billingCity,
          state: formData.billingState,
          pinCode: formData.billingPincode,
          addressType: 0 // 0 for billing
        },
        {
          id: customer?.addresses?.[1]?.id || "00000000-0000-0000-0000-000000000000",
          customerId: customer?.customerId || 0,
          country: formData.shippingCountry,
          addressLine1: formData.shippingAddressLine1,
          addressLine2: formData.shippingAddressLine2,
          city: formData.shippingCity,
          state: formData.shippingState,
          pinCode: formData.shippingPincode,
          addressType: 1 // 1 for shipping
        }
      ],
      bankingDetails: bankAccounts.map((account, index) => ({
        id: customer?.bankingDetails?.[index]?.id || "00000000-0000-0000-0000-000000000000",
        customerId: customer?.customerId || 0,
        accountHolderName: account.accountHolderName || "",
        accountNumber: account.accountNumber || "",
        reAccountNumber: account.reEnterAccountNumber || "",
        ifsc: account.ifsc || "",
        bankName: account.bankName || "",
        remarks: account.remarks || ""
      })),
      contactDetails: contactPersons.map((contact, index) => ({
        id: customer?.contactDetails?.[index]?.id || "00000000-0000-0000-0000-000000000000",
        customerId: customer?.customerId || 0,
        firstName: contact.firstName || "",
        lastName: contact.lastName || "",
        mobileNumber: contact.mobileNumber || "",
        workPhone: contact.workPhone || "",
        emailAddress: contact.emailAddress || "",
        remarks: contact.remarks || ""
      }))
    };

    console.log("Submitting customer payload:", payload);
    
    // Dispatch the create customer request action
    dispatch(createCustomerRequest(payload as unknown as Customer));
    
    // Call onSuccess callback if provided
    if (onSuccess) {
      onSuccess();
    }
    
    onClose();
  };

  const tabsList = [
    { id: "general", label: "General" },
    { id: "address", label: "Address" },
    { id: "banking", label: "Banking" },
    { id: "contacts", label: "Contact Persons" },
    { id: "comments", label: "Comments" },
  ];

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          {tabsList.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="text-xs">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name *</label>
              <Input 
                placeholder="Enter first name" 
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name *</label>
              <Input 
                placeholder="Enter last name" 
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address *</label>
              <Input 
                type="email" 
                placeholder="Enter email address" 
                value={formData.emailAddress}
                onChange={(e) => handleInputChange("emailAddress", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Nick Name</label>
              <Input 
                placeholder="Enter nick name" 
                value={formData.nickName}
                onChange={(e) => handleInputChange("nickName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Name</label>
              <Input 
                placeholder="Enter company name" 
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Mobile Number *</label>
              <Input 
                placeholder="Enter mobile number" 
                value={formData.mobileNumber}
                onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Currency</label>
              <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">INR (₹)</SelectItem>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">GSTIN</label>
              <Input 
                placeholder="Enter GSTIN" 
                value={formData.gstin}
                onChange={(e) => handleInputChange("gstin", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">PAN</label>
              <Input 
                placeholder="Enter PAN" 
                value={formData.pan}
                onChange={(e) => handleInputChange("pan", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Designation</label>
              <Input 
                placeholder="Enter designation" 
                value={formData.designation}
                onChange={(e) => handleInputChange("designation", e.target.value)}
              />
            </div>
          </div>
        </TabsContent>

        {/* Address Tab */}
        <TabsContent value="address" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Billing Address */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Billing Address</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address Line 1 *</label>
                  <Input 
                    placeholder="Enter address line 1" 
                    value={formData.billingAddressLine1}
                    onChange={(e) => handleInputChange("billingAddressLine1", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address Line 2</label>
                  <Input 
                    placeholder="Enter address line 2" 
                    value={formData.billingAddressLine2}
                    onChange={(e) => handleInputChange("billingAddressLine2", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">City *</label>
                  <Input 
                    placeholder="Enter city" 
                    value={formData.billingCity}
                    onChange={(e) => handleInputChange("billingCity", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pincode *</label>
                  <Input 
                    placeholder="Enter pincode" 
                    value={formData.billingPincode}
                    onChange={(e) => handleInputChange("billingPincode", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">State *</label>
                  <Select value={formData.billingState} onValueChange={(value) => handleInputChange("billingState", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="karnataka">Karnataka</SelectItem>
                      <SelectItem value="gujarat">Gujarat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Country *</label>
                  <Select value={formData.billingCountry} onValueChange={(value) => handleInputChange("billingCountry", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="USA">USA</SelectItem>
                      <SelectItem value="UK">UK</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Shipping Address</h3>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={copyBillingToShipping}
                    onCheckedChange={(checked) => {
                      setCopyBillingToShipping(checked);
                      if (checked) handleCopyBillingAddress();
                    }}
                  />
                  <label className="text-sm font-medium">Same as billing</label>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address Line 1 *</label>
                  <Input 
                    placeholder="Enter address line 1" 
                    disabled={copyBillingToShipping}
                    value={formData.shippingAddressLine1}
                    onChange={(e) => handleInputChange("shippingAddressLine1", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address Line 2</label>
                  <Input 
                    placeholder="Enter address line 2" 
                    disabled={copyBillingToShipping}
                    value={formData.shippingAddressLine2}
                    onChange={(e) => handleInputChange("shippingAddressLine2", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">City *</label>
                  <Input 
                    placeholder="Enter city" 
                    disabled={copyBillingToShipping}
                    value={formData.shippingCity}
                    onChange={(e) => handleInputChange("shippingCity", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pincode *</label>
                  <Input 
                    placeholder="Enter pincode" 
                    disabled={copyBillingToShipping}
                    value={formData.shippingPincode}
                    onChange={(e) => handleInputChange("shippingPincode", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">State *</label>
                  <Select 
                    value={formData.shippingState} 
                    onValueChange={(value) => handleInputChange("shippingState", value)}
                    disabled={copyBillingToShipping}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="karnataka">Karnataka</SelectItem>
                      <SelectItem value="gujarat">Gujarat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Country *</label>
                  <Select 
                    value={formData.shippingCountry} 
                    onValueChange={(value) => handleInputChange("shippingCountry", value)}
                    disabled={copyBillingToShipping}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="USA">USA</SelectItem>
                      <SelectItem value="UK">UK</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Banking Tab */}
        <TabsContent value="banking" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Bank Account Details</h3>
            <Button onClick={addBankAccount} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Bank Account
            </Button>
          </div>
          
          {bankAccounts.map((account, index) => (
            <div key={account.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Bank Account {index + 1}</h4>
                {bankAccounts.length > 1 && (
                  <Button 
                    onClick={() => removeBankAccount(account.id)}
                    variant="ghost" 
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bank Name</label>
                  <Input 
                    placeholder="Enter bank name" 
                    value={account.bankName || ""}
                    onChange={(e) => handleBankAccountChange(account.id, "bankName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Account Holder Name</label>
                  <Input 
                    placeholder="Enter account holder name" 
                    value={account.accountHolderName || ""}
                    onChange={(e) => handleBankAccountChange(account.id, "accountHolderName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Account Number</label>
                  <Input 
                    placeholder="Enter account number" 
                    value={account.accountNumber || ""}
                    onChange={(e) => handleBankAccountChange(account.id, "accountNumber", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Re-enter Account Number</label>
                  <Input 
                    placeholder="Re-enter account number" 
                    value={account.reEnterAccountNumber || ""}
                    onChange={(e) => handleBankAccountChange(account.id, "reEnterAccountNumber", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">IFSC Code</label>
                  <Input 
                    placeholder="Enter IFSC code" 
                    value={account.ifsc || ""}
                    onChange={(e) => handleBankAccountChange(account.id, "ifsc", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Remarks</label>
                  <Input 
                    placeholder="Enter remarks" 
                    value={account.remarks || ""}
                    onChange={(e) => handleBankAccountChange(account.id, "remarks", e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </TabsContent>

        {/* Contact Persons Tab */}
        <TabsContent value="contacts" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Contact Persons</h3>
            <Button onClick={addContactPerson} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Person
            </Button>
          </div>
          
          {contactPersons.map((person, index) => (
            <div key={person.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Contact Person {index + 1}</h4>
                {contactPersons.length > 1 && (
                  <Button 
                    onClick={() => removeContactPerson(person.id)}
                    variant="ghost" 
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input 
                    placeholder="Enter first name" 
                    value={person.firstName || ""}
                    onChange={(e) => handleContactPersonChange(person.id, "firstName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input 
                    placeholder="Enter last name" 
                    value={person.lastName || ""}
                    onChange={(e) => handleContactPersonChange(person.id, "lastName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mobile Number</label>
                  <Input 
                    placeholder="Enter mobile number" 
                    value={person.mobileNumber || ""}
                    onChange={(e) => handleContactPersonChange(person.id, "mobileNumber", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input 
                    placeholder="Enter email address" 
                    value={person.emailAddress || ""}
                    onChange={(e) => handleContactPersonChange(person.id, "emailAddress", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Work Phone</label>
                  <Input 
                    placeholder="Enter work phone" 
                    value={person.workPhone || ""}
                    onChange={(e) => handleContactPersonChange(person.id, "workPhone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Remarks</label>
                  <Input 
                    placeholder="Enter remarks" 
                    value={person.remarks || ""}
                    onChange={(e) => handleContactPersonChange(person.id, "remarks", e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </TabsContent>

        {/* Comments Tab */}
        <TabsContent value="comments" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Heading</label>
              <Input 
                placeholder="Enter heading" 
                value={formData.heading}
                onChange={(e) => handleInputChange("heading", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Comments</label>
              <Textarea 
                placeholder="Enter comments" 
                rows={6}
                value={formData.comments}
                onChange={(e) => handleInputChange("comments", e.target.value)}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button variant="outline">Next</Button>
        <Button onClick={handleSubmit}>{isEdit ? "Update" : "Save"} Customer</Button>
      </div>
    </div>
  );
};

export default AddCustomerForm;
