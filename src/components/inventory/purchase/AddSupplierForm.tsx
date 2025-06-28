
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash, Edit } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Supplier, SupplierAddress, SupplierBanking, SupplierContact } from "@/store/Inventory/supplier/types";
import { useDispatch, useSelector } from "react-redux";
import { createSupplierRequest, getSupplierRequest } from "@/store/Inventory/supplier/actions";
import { set } from "date-fns";


const AddSupplierForm = ({ onClose }: { onClose: () => void }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [address, setAddress] = useState<SupplierAddress[]>([]);
  const [bankAccounts, setBankAccounts] = useState<SupplierBanking[]>([]);
  const [contactPersons, setContactPersons] = useState<SupplierContact[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [showBankForm, setShowBankForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [supplierData, setSupplierData] = useState<Supplier>({} as Supplier);
  const dispatch = useDispatch();
  const { stageCompleted, error } = useSelector((state: any) => state.supplier);
 
  const handleClose = () => {
    onClose();
    setCurrentStep(1);
    setSameAsShipping(false);
    setBankAccounts([]);
    setContactPersons([]);
    setComments([]);
    setShowBankForm(false);
    setShowContactForm(false);
    setShowCommentForm(false);
  };

  //submit form data to the server
  const handleSubmit =  () => {
    setSupplierData({
      supplierId: 0,
      id: 0,
      firstName: generalData.firstName,
      lastName: generalData.lastName,
      emailAddress: generalData.email,
      mobileNumber: generalData.mobile,
      companyName: generalData.companyName,
      supplierNickName: generalData.supplierNickName,
      gstin: generalData.gstin,
      pan: generalData.pan,
      currency: generalData.currency,
      designation: generalData.designation,
      heading: comments[0].heading, // Provide a value or add a heading field to your form if needed
      addresses: [
        {
          id: "0",
          supplierId: 0,
          addressType: "billing",
          addressLine1: addressData.billing.addressLine1,
          addressLine2: addressData.billing.addressLine2,
          city: addressData.billing.city,
          state: addressData.billing.state,
          pinCode: addressData.billing.pincode,
          country: addressData.billing.country
        },
        {
          id: "0",
          supplierId: 0,
          addressType: "shipping",
          addressLine1: addressData.shipping.addressLine1,
          addressLine2: addressData.shipping.addressLine2,
          city: addressData.shipping.city,
          state: addressData.shipping.state,
          pinCode: addressData.shipping.pincode,
          country: addressData.shipping.country
        }
      ],
      contactDetails: [...contactPersons],
      bankingDetails: [...bankAccounts],
      comments: comments[0].comment, // Or however you want to aggregate comments
    });

    console.log("Submitting supplier data:", supplierData);
    //dispatch supplier creation action
    dispatch(createSupplierRequest(supplierData));

  }

  // 2. Listen for the result using useEffect
useEffect(() => {
  if (stageCompleted) {
    if (!error) {
      dispatch(getSupplierRequest()); // Reset stage completed state
      handleClose();
      alert('✅ Supplier created!');
      
    } else {
      alert('❌ Error creating supplier: ' + error);
    }

     // 🔁 Reset the flag
    dispatch({ type: 'RESET_STAGE_COMPLETED' });
  }
}, [stageCompleted, error,dispatch]);

  // Form data
  const [generalData, setGeneralData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    supplierNickName: "",
    companyName: "",
    mobile: "",
    gstin: "",
    pan: "",
    currency: "INR",
    designation: ""
  });

  const [addressData, setAddressData] = useState({
    billing: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      pincode: "",
      state: "",
      country: "India"
    },
    shipping: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      pincode: "",
      state: "",
      country: "India"
    }
  });

  const [bankFormData, setBankFormData] = useState({
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    reEnterAccountNumber: "",
    ifsc: "",
    remarks: ""
  });

  const [contactFormData, setContactFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    emailAddress: "",
    workPhone: "",
    remarks: ""
  });

  const [commentFormData, setCommentFormData] = useState({
    heading: "",
    comment: ""
  });

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAddBankAccount = () => {
    if (bankFormData.bankName && bankFormData.accountNumber && bankFormData.ifsc) {
      const newAccount: SupplierBanking = {
        id: "0",
        supplierId: 0,
       ...bankFormData
      };
      setBankAccounts([...bankAccounts, newAccount]);
      setBankFormData({
        bankName: "",
        accountHolderName: "",
        accountNumber: "",
        reEnterAccountNumber: "",
        ifsc: "",
        remarks: ""
      });
      setShowBankForm(false);
    }
  };

  const handleAddContactPerson = () => {
    if (contactFormData.firstName && contactFormData.mobileNumber) {
      const newContact: SupplierContact = {
        id: "0",
        supplierId: 0,
        ...contactFormData
      };
      setContactPersons([...contactPersons, newContact]);
      setContactFormData({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        emailAddress: "",
        workPhone: "",
        remarks: ""
      });
      setShowContactForm(false);
    }
  };

  const handleAddComment = () => {
    if (commentFormData.heading && commentFormData.comment) {
      const newComment: any = {
        ...commentFormData
      };
      setComments([...comments, newComment]);
      setCommentFormData({
        heading: "",
        comment: ""
      });
      setShowCommentForm(false);
    }
  };

  const copyBillingToShipping = () => {
    if (sameAsShipping) {
      setAddressData({
        ...addressData,
        shipping: { ...addressData.billing }
      });
    }
  };

  React.useEffect(() => {
    copyBillingToShipping();
  }, [sameAsShipping, addressData.billing]);

  const renderGeneralForm = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">General Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={generalData.firstName}
            onChange={(e) => setGeneralData({...generalData, firstName: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={generalData.lastName}
            onChange={(e) => setGeneralData({...generalData, lastName: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={generalData.email}
            onChange={(e) => setGeneralData({...generalData, email: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="supplierNickName">Supplier Nick Name</Label>
          <Input
            id="supplierNickName"
            value={generalData.supplierNickName}
            onChange={(e) => setGeneralData({...generalData, supplierNickName: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            value={generalData.companyName}
            onChange={(e) => setGeneralData({...generalData, companyName: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="mobile">Mobile Number *</Label>
          <Input
            id="mobile"
            value={generalData.mobile}
            onChange={(e) => setGeneralData({...generalData, mobile: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="gstin">GSTIN</Label>
          <Input
            id="gstin"
            value={generalData.gstin}
            onChange={(e) => setGeneralData({...generalData, gstin: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="pan">PAN</Label>
          <Input
            id="pan"
            value={generalData.pan}
            onChange={(e) => setGeneralData({...generalData, pan: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="currency">Currency</Label>
          <Select value={generalData.currency} onValueChange={(value) => setGeneralData({...generalData, currency: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INR">INR - Indian Rupee</SelectItem>
              <SelectItem value="USD">USD - US Dollar</SelectItem>
              <SelectItem value="EUR">EUR - Euro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="designation">Designation</Label>
          <Input
            id="designation"
            value={generalData.designation}
            onChange={(e) => setGeneralData({...generalData, designation: e.target.value})}
          />
        </div>
      </div>
    </div>
  );

  const renderAddressForm = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Address Information</h3>
      
      <Card>
        <CardHeader>
          <CardTitle>Billing Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="billingAddress1">Address Line 1 *</Label>
            <Input
              id="billingAddress1"
              value={addressData.billing.addressLine1}
              onChange={(e) => setAddressData({
                ...addressData,
                billing: {...addressData.billing, addressLine1: e.target.value}
              })}
            />
          </div>
          <div>
            <Label htmlFor="billingAddress2">Address Line 2</Label>
            <Input
              id="billingAddress2"
              value={addressData.billing.addressLine2}
              onChange={(e) => setAddressData({
                ...addressData,
                billing: {...addressData.billing, addressLine2: e.target.value}
              })}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="billingCity">City *</Label>
              <Input
                id="billingCity"
                value={addressData.billing.city}
                onChange={(e) => setAddressData({
                  ...addressData,
                  billing: {...addressData.billing, city: e.target.value}
                })}
              />
            </div>
            <div>
              <Label htmlFor="billingPincode">Pincode *</Label>
              <Input
                id="billingPincode"
                value={addressData.billing.pincode}
                onChange={(e) => setAddressData({
                  ...addressData,
                  billing: {...addressData.billing, pincode: e.target.value}
                })}
              />
            </div>
            <div>
              <Label htmlFor="billingState">State *</Label>
              <Input
                id="billingState"
                value={addressData.billing.state}
                onChange={(e) => setAddressData({
                  ...addressData,
                  billing: {...addressData.billing, state: e.target.value}
                })}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="billingCountry">Country *</Label>
            <Select 
              value={addressData.billing.country} 
              onValueChange={(value) => setAddressData({
                ...addressData,
                billing: {...addressData.billing, country: value}
              })}
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Shipping Address
            <div className="flex items-center space-x-2">
              <Switch
                id="sameAsShipping"
                checked={sameAsShipping}
                onCheckedChange={setSameAsShipping}
              />
              <Label htmlFor="sameAsShipping">Same as billing address</Label>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="shippingAddress1">Address Line 1 *</Label>
            <Input
              id="shippingAddress1"
              value={addressData.shipping.addressLine1}
              onChange={(e) => setAddressData({
                ...addressData,
                shipping: {...addressData.shipping, addressLine1: e.target.value}
              })}
              disabled={sameAsShipping}
            />
          </div>
          <div>
            <Label htmlFor="shippingAddress2">Address Line 2</Label>
            <Input
              id="shippingAddress2"
              value={addressData.shipping.addressLine2}
              onChange={(e) => setAddressData({
                ...addressData,
                shipping: {...addressData.shipping, addressLine2: e.target.value}
              })}
              disabled={sameAsShipping}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="shippingCity">City *</Label>
              <Input
                id="shippingCity"
                value={addressData.shipping.city}
                onChange={(e) => setAddressData({
                  ...addressData,
                  shipping: {...addressData.shipping, city: e.target.value}
                })}
                disabled={sameAsShipping}
              />
            </div>
            <div>
              <Label htmlFor="shippingPincode">Pincode *</Label>
              <Input
                id="shippingPincode"
                value={addressData.shipping.pincode}
                onChange={(e) => setAddressData({
                  ...addressData,
                  shipping: {...addressData.shipping, pincode: e.target.value}
                })}
                disabled={sameAsShipping}
              />
            </div>
            <div>
              <Label htmlFor="shippingState">State *</Label>
              <Input
                id="shippingState"
                value={addressData.shipping.state}
                onChange={(e) => setAddressData({
                  ...addressData,
                  shipping: {...addressData.shipping, state: e.target.value}
                })}
                disabled={sameAsShipping}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="shippingCountry">Country *</Label>
            <Select 
              value={addressData.shipping.country} 
              onValueChange={(value) => setAddressData({
                ...addressData,
                shipping: {...addressData.shipping, country: value}
              })}
              disabled={sameAsShipping}
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
        </CardContent>
      </Card>
    </div>
  );

  const renderBankingForm = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Banking Information</h3>
      
      {!showBankForm && (
        <Button onClick={() => setShowBankForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Bank Account
        </Button>
      )}

      {showBankForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add Bank Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bankName">Bank Name *</Label>
                <Input
                  id="bankName"
                  value={bankFormData.bankName}
                  onChange={(e) => setBankFormData({...bankFormData, bankName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="accountHolder">Account Holder Name *</Label>
                <Input
                  id="accountHolder"
                  value={bankFormData.accountHolderName}
                  onChange={(e) => setBankFormData({...bankFormData, accountHolderName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input
                  id="accountNumber"
                  value={bankFormData.accountNumber}
                  onChange={(e) => setBankFormData({...bankFormData, accountNumber: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="reenterAccountNumber">Re-enter Account Number *</Label>
                <Input
                  id="reenterAccountNumber"
                  value={bankFormData.reEnterAccountNumber}
                  onChange={(e) => setBankFormData({...bankFormData, reEnterAccountNumber: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="ifsc">IFSC Code *</Label>
                <Input
                  id="ifsc"
                  value={bankFormData.ifsc}
                  onChange={(e) => setBankFormData({...bankFormData, ifsc: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="bankRemarks">Remarks</Label>
                <Input
                  id="bankRemarks"
                  value={bankFormData.remarks}
                  onChange={(e) => setBankFormData({...bankFormData, remarks: e.target.value})}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddBankAccount}>Add Account</Button>
              <Button variant="outline" onClick={() => setShowBankForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {bankAccounts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Bank Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bank Name</TableHead>
                  <TableHead>Account Holder</TableHead>
                  <TableHead>Account Number</TableHead>
                  <TableHead>IFSC</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bankAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell>{account.bankName}</TableCell>
                    <TableCell>{account.accountHolderName}</TableCell>
                    <TableCell>{account.accountNumber}</TableCell>
                    <TableCell>{account.ifsc}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setBankAccounts(bankAccounts.filter(acc => acc.id !== account.id))}
                        className="h-8 w-8 text-red-600"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderContactPersonsForm = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Contact Persons</h3>
      
      {!showContactForm && (
        <Button onClick={() => setShowContactForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Contact Person
        </Button>
      )}

      {showContactForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add Contact Person</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactFirstName">First Name *</Label>
                <Input
                  id="contactFirstName"
                  value={contactFormData.firstName}
                  onChange={(e) => setContactFormData({...contactFormData, firstName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="contactLastName">Last Name</Label>
                <Input
                  id="contactLastName"
                  value={contactFormData.lastName}
                  onChange={(e) => setContactFormData({...contactFormData, lastName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="contactMobile">Mobile Number *</Label>
                <Input
                  id="contactMobile"
                  value={contactFormData.mobileNumber}
                  onChange={(e) => setContactFormData({...contactFormData, mobileNumber: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="contactEmail">Email Address</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={contactFormData.emailAddress}
                  onChange={(e) => setContactFormData({...contactFormData, emailAddress: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="workPhone">Work Phone</Label>
                <Input
                  id="workPhone"
                  value={contactFormData.workPhone}
                  onChange={(e) => setContactFormData({...contactFormData, workPhone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="contactRemarks">Remarks</Label>
                <Input
                  id="contactRemarks"
                  value={contactFormData.remarks}
                  onChange={(e) => setContactFormData({...contactFormData, remarks: e.target.value})}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddContactPerson}>Add Contact</Button>
              <Button variant="outline" onClick={() => setShowContactForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {contactPersons.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Contact Persons</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Work Phone</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contactPersons.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>{`${contact.firstName} ${contact.lastName}`}</TableCell>
                    <TableCell>{contact.mobileNumber}</TableCell>
                    <TableCell>{contact.emailAddress}</TableCell>
                    <TableCell>{contact.workPhone}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setContactPersons(contactPersons.filter(c => c.id !== contact.id))}
                        className="h-8 w-8 text-red-600"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderCommentsForm = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Comments</h3>
      
      {!showCommentForm && (
        <Button onClick={() => setShowCommentForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Comment
        </Button>
      )}

      {showCommentForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add Comment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="commentHeading">Heading *</Label>
              <Input
                id="commentHeading"
                value={commentFormData.heading}
                onChange={(e) => setCommentFormData({...commentFormData, heading: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="commentText">Comments *</Label>
              <Textarea
                id="commentText"
                rows={4}
                value={commentFormData.comment}
                onChange={(e) => setCommentFormData({...commentFormData, comment: e.target.value})}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddComment}>Save Comment</Button>
              <Button variant="outline" onClick={() => setShowCommentForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {comments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Heading</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell className="font-medium">{comment.heading}</TableCell>
                    <TableCell>{comment.comment}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setComments(comments.filter(c => c.id !== comment.id))}
                          className="h-8 w-8 text-red-600"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const getCurrentStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderGeneralForm();
      case 2:
        return renderAddressForm();
      case 3:
        return renderBankingForm();
      case 4:
        return renderContactPersonsForm();
      case 5:
        return renderCommentsForm();
      default:
        return renderGeneralForm();
    }
  };

  const stepTitles = [
    "General Information",
    "Address Information", 
    "Banking Information",
    "Contact Persons",
    "Comments"
  ];

  return (
      <div className="p-6">
        <div className="mx-auto"> 
          {/* max-w-4xl */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Add Supplier</h2>
            <div className="flex items-center gap-2 mt-4">
              {stepTitles.map((title, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === index + 1 
                      ? 'bg-blue-600 text-white' 
                      : currentStep > index + 1 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`ml-2 text-sm ${
                    currentStep === index + 1 ? 'text-blue-600 font-medium' : 'text-gray-600'
                  }`}>
                    {title}
                  </span>
                  {index < stepTitles.length - 1 && (
                    <div className="w-8 h-px bg-gray-300 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              {getCurrentStepContent()}
            </CardContent>
          </Card>

          <div className="flex justify-between mt-6">
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              {currentStep > 1 && (
                <Button variant="outline" onClick={handlePrevious}>
                  Previous
                </Button>
              )}
            </div>
            <div>
              {currentStep < 5 ? (
                <Button onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit}>
                  Save Supplier
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

  );
};

export default AddSupplierForm;
