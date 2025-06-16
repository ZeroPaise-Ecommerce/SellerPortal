
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

interface AddCustomerFormProps {
  customer?: any;
  isEdit?: boolean;
  onClose: () => void;
}

const AddCustomerForm = ({ customer, isEdit = false, onClose }: AddCustomerFormProps) => {
  const [activeTab, setActiveTab] = useState("general");
  const [copyBillingToShipping, setCopyBillingToShipping] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([{ id: 1 }]);
  const [contactPersons, setContactPersons] = useState([{ id: 1 }]);

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
      // Copy billing address to shipping address
      console.log("Copying billing address to shipping address");
    }
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
              <Input placeholder="Enter first name" defaultValue={customer?.firstName} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name *</label>
              <Input placeholder="Enter last name" defaultValue={customer?.lastName} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address *</label>
              <Input type="email" placeholder="Enter email address" defaultValue={customer?.email} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Nick Name</label>
              <Input placeholder="Enter nick name" defaultValue={customer?.nickName} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Name</label>
              <Input placeholder="Enter company name" defaultValue={customer?.company} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Mobile Number *</label>
              <Input placeholder="Enter mobile number" defaultValue={customer?.phone} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Currency</label>
              <Select defaultValue="INR">
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
              <Input placeholder="Enter GSTIN" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">PAN</label>
              <Input placeholder="Enter PAN" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Designation</label>
              <Input placeholder="Enter designation" />
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
                  <Input placeholder="Enter address line 1" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address Line 2</label>
                  <Input placeholder="Enter address line 2" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">City *</label>
                  <Input placeholder="Enter city" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pincode *</label>
                  <Input placeholder="Enter pincode" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">State *</label>
                  <Select>
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
                  <Select defaultValue="india">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="usa">USA</SelectItem>
                      <SelectItem value="uk">UK</SelectItem>
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
                  <Input placeholder="Enter address line 1" disabled={copyBillingToShipping} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address Line 2</label>
                  <Input placeholder="Enter address line 2" disabled={copyBillingToShipping} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">City *</label>
                  <Input placeholder="Enter city" disabled={copyBillingToShipping} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pincode *</label>
                  <Input placeholder="Enter pincode" disabled={copyBillingToShipping} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">State *</label>
                  <Select disabled={copyBillingToShipping}>
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
                  <Select defaultValue="india" disabled={copyBillingToShipping}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="usa">USA</SelectItem>
                      <SelectItem value="uk">UK</SelectItem>
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
                  <Input placeholder="Enter bank name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Account Holder Name</label>
                  <Input placeholder="Enter account holder name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Account Number</label>
                  <Input placeholder="Enter account number" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Re-enter Account Number</label>
                  <Input placeholder="Re-enter account number" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">IFSC Code</label>
                  <Input placeholder="Enter IFSC code" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Remarks</label>
                  <Input placeholder="Enter remarks" />
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
                  <Input placeholder="Enter first name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input placeholder="Enter last name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mobile Number</label>
                  <Input placeholder="Enter mobile number" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input placeholder="Enter email address" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Work Phone</label>
                  <Input placeholder="Enter work phone" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Remarks</label>
                  <Input placeholder="Enter remarks" />
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
              <Input placeholder="Enter heading" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Comments</label>
              <Textarea placeholder="Enter comments" rows={6} />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button variant="outline">Next</Button>
        <Button>{isEdit ? "Update" : "Save"} Customer</Button>
      </div>
    </div>
  );
};

export default AddCustomerForm;
