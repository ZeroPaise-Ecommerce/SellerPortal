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


const AddSupplierForm = ({supplier, onClose }: {  supplier: Supplier; onClose: () => void }) => {
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
  type GeneralData = typeof generalData;
  type AddressData = typeof addressData;
  type BankFormData = typeof bankFormData;
  type ContactFormData = typeof contactFormData;
  type CommentFormData = typeof commentFormData;

  type GeneralFormErrors = {
    [K in keyof GeneralData]?: boolean;
  };

  type AddressFormErrors = {
    billing: {
      addressLine1?: boolean;
      addressLine2?: boolean;
      city?: boolean;
      pincode?: boolean;
      state?: boolean;
      country?: boolean;
    };
    shipping: {
      addressLine1?: boolean;
      addressLine2?: boolean;
      city?: boolean;
      pincode?: boolean;
      state?: boolean;
      country?: boolean;
    };
  };

  type BankFormErrors = {
    [K in keyof BankFormData]?: boolean;
  };

  type ContactFormErrors = {
    [K in keyof ContactFormData]?: boolean;
  };

  type CommentFormErrors = {
    [K in keyof CommentFormData]?: boolean;
  };

  const [errors, setErrors] = useState<GeneralFormErrors>({});
  const [addressErrors, setAddressErrors] = useState<AddressFormErrors>({ 
    billing: {},
    shipping: {}
   });
  const [bankErrors, setBankErrors] = useState<BankFormErrors>({});
  const [contactErrors, setContactErrors] = useState<ContactFormErrors>({});
  const [commentErrors, setCommentErrors] = useState<CommentFormErrors>({});


 
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
    const payload = {
      supplierId: supplier?.supplierId || 0,
      id: supplier?.id || 0,
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
      heading: comments[0]?.heading || "",
      addresses: [
        {
          id: supplier?.addresses?.[0]?.id || "0",
          supplierId: supplier?.addresses?.[0]?.supplierId || 0,
          addressType: "0",
          addressLine1: addressData.billing.addressLine1,
          addressLine2: addressData.billing.addressLine2,
          city: addressData.billing.city,
          state: addressData.billing.state,
          pinCode: addressData.billing.pincode,
          country: addressData.billing.country
        },
        {
          id: supplier?.addresses?.[1]?.id || "0",
          supplierId: supplier?.addresses?.[1]?.supplierId || 0,
          addressType: "1",
          addressLine1: addressData.shipping.addressLine1,
          addressLine2: addressData.shipping.addressLine2,
          city: addressData.shipping.city,
          state: addressData.shipping.state,
          pinCode: addressData.shipping.pincode,
          country: addressData.shipping.country
        }
      ],
      contactDetails: contactPersons.map((contact) => {
        const match = supplier?.contactDetails?.find(
          (c) => c.firstName === contact.firstName && c.mobileNumber === contact.mobileNumber
        );
        return {
          ...contact,
          id: match?.id || "0",
          supplierId: match?.supplierId || 0,
        };
      }),
      bankingDetails: bankAccounts.map((bank) => {
        const match = supplier?.bankingDetails?.find((b) => b.bankName === bank.bankName);
        return {
          ...bank,
          id: match?.id || "0",
          supplierId: match?.supplierId || 0,
        };
      }),
      comments: comments[0]?.comment || "",
    };

      

    console.log("Submitting supplier data:", payload);
    setSupplierData(payload);
    console.log("Submitting supplier data:", supplierData);
 
    //dispatch supplier creation action
    dispatch(createSupplierRequest(payload));

  }

  // 2. Listen for the result using useEffect
useEffect(() => {
  
  if(supplier){
    setSupplierEditAction();
  }

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

  function setSupplierEditAction() {
    console.log("Received suppliers:", supplier);
    setGeneralData({
      firstName: supplier.firstName,
      lastName: supplier.lastName,
      email: supplier.emailAddress,
      supplierNickName: supplier.supplierNickName,
      companyName: supplier.companyName,
      mobile: supplier.mobileNumber,
      gstin: supplier.gstin,
      pan: supplier.pan,
      currency: supplier.currency,
      designation: supplier.designation
    });

    setAddressData({
      billing: {
        addressLine1: supplier?.addresses[0]?.addressLine1,
        addressLine2: supplier?.addresses[0]?.addressLine2,
        city: supplier?.addresses[0]?.city,
        pincode: supplier?.addresses[0]?.pinCode,
        state: supplier?.addresses[0]?.state,
        country: supplier?.addresses[0]?.country
      },
      shipping: {
        addressLine1: supplier?.addresses[1]?.addressLine1,
        addressLine2: supplier?.addresses[1]?.addressLine2,
        city: supplier?.addresses[1]?.city,
        pincode: supplier?.addresses[1]?.pinCode,
        state: supplier?.addresses[1]?.state,
        country: supplier?.addresses[1]?.country
      }
    });

    setBankAccounts(supplier?.bankingDetails || []);
    setContactPersons(supplier?.contactDetails || []);
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
      const newErrors: any = { };
      // check the previous step form is filled. Write a switch case for each step
      switch(currentStep){
        case 1:
          if (!generalData.firstName) newErrors.firstName = true;
          if (!generalData.lastName) newErrors.lastName = true;
          if (!generalData.email) newErrors.email = true;
          if (!generalData.companyName) newErrors.companyName = true;
          if (!generalData.mobile) newErrors.mobile = true;

          if (Object.keys(newErrors).length === 0) {
            setCurrentStep(currentStep + 1);
          } else {
            setErrors(newErrors);
          }
          break;
        case 2:
          const newAddressErrors: AddressFormErrors = {
            billing: {},
            shipping: {}
          };
          if (!addressData.billing.addressLine1) newAddressErrors.billing.addressLine1 = true;
          if (!addressData.billing.addressLine2) newAddressErrors.billing.addressLine2 = true;
          if (!addressData.billing.city) newAddressErrors.billing.city = true;
          if (!addressData.billing.pincode) newAddressErrors.billing.pincode = true;
          if (!addressData.billing.state) newAddressErrors.billing.state = true;
          if (!addressData.billing.country) newAddressErrors.billing.country = true;

          if (
            Object.keys(newAddressErrors.billing).length === 0 &&
            Object.keys(newAddressErrors.shipping).length === 0
          ) {
            setCurrentStep(currentStep + 1);
          } else {
            setAddressErrors(newAddressErrors);
          }
          break;
          case 3:
          case 4:
          case 5:
            setCurrentStep(currentStep + 1);
            break;
        default:
          break;
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAddBankAccount = () => {
    const newErrors: any = {};
    if (!bankFormData.bankName) newErrors.bankName = true;
    if (!bankFormData.accountNumber) newErrors.accountNumber = true;
    if (!bankFormData.ifsc) newErrors.ifsc = true;
    if (!bankFormData.accountHolderName) newErrors.accountHolderName = true;
    if (!bankFormData.reEnterAccountNumber) newErrors.reEnterAccountNumber = true;
    
    if (Object.keys(newErrors).length > 0) {
      setBankErrors(newErrors);
      return; 
    }

    if (bankFormData.bankName && bankFormData.accountNumber && bankFormData.ifsc) {
      const newAccount: SupplierBanking = {
        id:"0",
        supplierId: 0,
       ...bankFormData
      };
      setBankAccounts([...bankAccounts, newAccount]);
      // setBankFormData({
      //   bankName: "",
      //   accountHolderName: "",
      //   accountNumber: "",
      //   reEnterAccountNumber: "",
      //   ifsc: "",
      //   remarks: ""
      // });
      setShowBankForm(false);
    }
  };

  const handleAddContactPerson = () => {
    const newErrors: any = {};
    
    if (!contactFormData.firstName) newErrors.firstName = true;
    if (!contactFormData.mobileNumber) newErrors.mobileNumber = true;
    
    if (Object.keys(newErrors).length > 0) {
      setContactErrors(newErrors);
      return; 
    }
    
    if (contactFormData.firstName && contactFormData.mobileNumber) {
      const newContact: SupplierContact = {
        id: "0",
        supplierId: 0,
        ...contactFormData
      };
      setContactPersons([...contactPersons, newContact]);
      // setContactFormData({
      //   firstName: "",
      //   lastName: "",
      //   mobileNumber: "",
      //   emailAddress: "",
      //   workPhone: "",
      //   remarks: ""
      // });
      setShowContactForm(false);
    }
  };

  const handleAddComment = () => {
    const newErrors: any = {};
    if (!commentFormData.heading) newErrors.heading = true;
    if (!commentFormData.comment) newErrors.comment = true;
    
    if (Object.keys(newErrors).length > 0) {
      setCommentErrors(newErrors);
      return; 
    }

    if (commentFormData.heading && commentFormData.comment) {
      const newComment: any = {
        ...commentFormData,
        id: Date.now() // Assign a unique id
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
           maxLength={15}
           className={errors.firstName ? "border border-red-500" : ""}
           value={generalData.firstName}
           onChange={(e) => {
            const value = e.target.value.replace(/[^a-zA-Z]/g, ""); // Remove non-alphabet characters
            const formatted = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
             setGeneralData({ ...generalData, firstName: formatted });
             setErrors({ ...errors, firstName: false });
            }}
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            maxLength={15}
            className={errors.lastName ? "border border-red-500" : ""}
            value={generalData.lastName}
            onChange={(e) => {
              const value = e.target.value.replace(/[^a-zA-Z]/g, ""); // Remove non-alphabet characters
              const formatted = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
               setGeneralData({ ...generalData, lastName: formatted });
               setErrors({ ...errors, lastName: false });
   }}
          />
        
        </div>
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
          id="email"
          maxLength={30}
          type="email"
          className={errors.email ? "border border-red-500" : ""}
          value={generalData.email}
          onChange={(e) => {
            const value = e.target.value.toLowerCase(); 
               setGeneralData({ ...generalData, email: value });
               const isValidEmail = /^[a-z0-9._-]+@[a-z0-9-]+\.(com|in|org|net)$/.test(value);
                setErrors({ ...errors, email: !isValidEmail });
  }}
/>
        </div>
        <div>
          <Label htmlFor="supplierNickName">Supplier Nick Name</Label>
          <Input
            id="supplierNickName"
            maxLength={20}
            className={errors.supplierNickName ? "border border-red-500" : ""}
            value={generalData.supplierNickName}
            onChange={(e) => setGeneralData({...generalData, supplierNickName: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            maxLength={50}
            type="Company Name"
            className={errors.companyName ? "border border-red-500" : ""}
            value={generalData.companyName}
            onChange={(e) => setGeneralData({...generalData, companyName: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="mobile">Mobile Number *</Label>
          <Input
            id="mobile"
            maxLength={10}
            className={errors.mobile ? "border border-red-500" : ""}
            value={generalData.mobile}
            onChange={(e) => {
             const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
               setGeneralData({ ...generalData, mobile: value });
                setErrors({ ...errors, mobile: value.length !== 10 });
  }}
/>
          </div>
        <div>
          <Label htmlFor="gstin">GSTIN</Label>
          <Input
            id="gstin"
            maxLength={15}
            className={errors.gstin ? "border border-red-500" : ""}
            value={generalData.gstin}
            onChange={(e) => {
              const value = e.target.value.toUpperCase();
                setGeneralData({ ...generalData, gstin: value });
              const isValidGSTIN = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value);
                setErrors({ ...errors, gstin: !isValidGSTIN });
  }}
/>
        </div>
        <div>
          <Label htmlFor="pan">PAN</Label>
          <Input
            id="pan"
            maxLength={10}
            className={errors.pan ? "border border-red-500" : ""}
            value={generalData.pan}
            onChange={(e) => {
             const value = e.target.value.toUpperCase(); 
              setGeneralData({ ...generalData, pan: value });
              const isValidPAN = /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value);
               setErrors({ ...errors, pan: !isValidPAN });
  }}
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
            maxLength={20}
            className={errors.designation ? "border border-red-500" : ""}
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
               maxLength={50}
               className={addressErrors.billing.addressLine1 ? "border border-red-500" : ""}
               value={addressData.billing.addressLine1}
               onChange={(e) => {
               const rawValue = e.target.value.replace(/[^a-zA-Z0-9\s,./-]/g, ""); // remove invalid chars
               const formatted = rawValue.replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize each word
                setAddressData({...addressData, billing: { ...addressData.billing, addressLine1: formatted },});
                setAddressErrors({...addressErrors, billing: {...addressErrors.billing, addressLine1: formatted.trim() === "",
      },
    });
  }}
/>
          </div>
          <div>
            <Label htmlFor="billingAddress2">Address Line 2</Label>
            <Input
              id="billingAddress2"
              maxLength={50}
              className={addressErrors.billing.addressLine2 ? "border border-red-500" : ""}
              value={addressData.billing.addressLine2}
              onChange={(e) => {
              const rawValue = e.target.value.replace(/[^a-zA-Z0-9\s,./-]/g, ""); // Keep allowed characters only
              const formatted = rawValue.replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
                setAddressData({...addressData, billing: { ...addressData.billing, addressLine2: formatted },});
                setAddressErrors({...addressErrors, billing: {...addressErrors.billing, addressLine2: formatted.trim() === "",
      },
    });
  }}
/>

          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="billingCity">City *</Label>
              <Input
                id="billingCity"
                maxLength={25}
                className={addressErrors.billing.city ? "border border-red-500" : ""}
                value={addressData.billing.city}
                onChange={(e) => setAddressData({...addressData, billing: {...addressData.billing, city: e.target.value}})}
              />
            </div>
            <div>
              <Label htmlFor="billingPincode">Pincode *</Label>
              <Input
                id="billingPincode"
                maxLength={6}
                className={addressErrors.billing.pincode ? "border border-red-500" : ""}
                value={addressData.billing.pincode}
                onChange={(e) => setAddressData({...addressData, billing: {...addressData.billing, pincode: e.target.value}
                })}
              />
            </div>
            <div>
              <Label htmlFor="billingState">State *</Label>
              <Input
                id="billingState"
                maxLength={25}
                className={addressErrors.billing.state ? "border border-red-500" : ""}
                value={addressData.billing.state}
                onChange={(e) => setAddressData({...addressData, billing: {...addressData.billing, state: e.target.value}
                })}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="billingCountry">Country *</Label>
            <Select 
              value={addressData.billing.country} 
              onValueChange={(value) => setAddressData({...addressData, billing: {...addressData.billing, country: value}
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
              maxLength={20}
              className={addressErrors.shipping.addressLine1 ? "border border-red-500" : ""}
              value={addressData.shipping.addressLine1}
              onChange={(e) => setAddressData({...addressData, shipping: {...addressData.shipping, addressLine1: e.target.value}
              })}
              disabled={sameAsShipping}
            />
          </div>
          <div>
            <Label htmlFor="shippingAddress2">Address Line 2</Label>
            <Input
              id="shippingAddress2"
              maxLength={20}
              className={addressErrors.shipping.addressLine1 ? "border border-red-500" : ""}
              value={addressData.shipping.addressLine2}
              onChange={(e) => setAddressData({...addressData, shipping: {...addressData.shipping, addressLine2: e.target.value}
              })}
              disabled={sameAsShipping}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="shippingCity">City *</Label>
              <Input
                id="shippingCity"
                maxLength={20}            
                className={addressErrors.shipping.city ? "border border-red-500" : ""}
                value={addressData.shipping.city}
                onChange={(e) => setAddressData({...addressData, shipping: {...addressData.shipping, city: e.target.value}
                })}
                disabled={sameAsShipping}
              />
            </div>
            <div>
              <Label htmlFor="shippingPincode">Pincode *</Label>
              <Input
                id="shippingPincode"
                maxLength={6}
                className={addressErrors.shipping.pincode ? "border border-red-500" : ""}
                value={addressData.shipping.pincode}
                onChange={(e) => setAddressData({...addressData, shipping: {...addressData.shipping, pincode: e.target.value}
                })}
                disabled={sameAsShipping}
              />
            </div>
            <div>
              <Label htmlFor="shippingState">State *</Label>
              <Input
                id="shippingState"
                className={addressErrors.shipping.state ? "border border-red-500" : ""}
                value={addressData.shipping.state}
                onChange={(e) => setAddressData({...addressData, shipping: {...addressData.shipping, state: e.target.value}
                })}
                disabled={sameAsShipping}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="shippingCountry">Country *</Label>
            <Select 
              value={addressData.shipping.country} 
              onValueChange={(value) => setAddressData({...addressData, shipping: {...addressData.shipping, country: value}
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
                  maxLength={50}
                  className={bankErrors.bankName ? "border border-red-500" : ""}
                  value={bankFormData.bankName}
                  onChange={(e) => setBankFormData({...bankFormData, bankName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="accountHolder">Account Holder Name *</Label>
                <Input
                  id="accountHolder"
                  maxLength={50}
                  className={bankErrors.accountHolderName ? "border border-red-500" : ""}
                  value={bankFormData.accountHolderName}
                  onChange={(e) => {
                  const value = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Remove numbers and special characters
                  const formatted = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); // Capitalize first letter
                    setBankFormData({...bankFormData, accountHolderName: formatted,});
  }}
/>

              </div>
              <div>
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input
                id="accountNumber"
                maxLength={18}
                className={bankErrors.accountNumber ? "border border-red-500" : ""}
                value={bankFormData.accountNumber}
                onChange={(e) =>
                setBankFormData({...bankFormData, accountNumber: e.target.value.replace(/[^0-9]/g, "")
    })
  }
/>
              </div>
              <div>
                <Label htmlFor="reenterAccountNumber">Re-enter Account Number *</Label>
                <Input
                 id="reEnterAccountNumber"
                 maxLength={18}
                 className={
                 bankFormData.reEnterAccountNumber &&
                 bankFormData.reEnterAccountNumber !== bankFormData.accountNumber
                 ? "border border-red-500": ""
  }
                 value={bankFormData.reEnterAccountNumber}
                 onChange={(e) =>
                 setBankFormData({
                  ...bankFormData,
                 reEnterAccountNumber: e.target.value.replace(/[^0-9]/g, "")
    })
  }
                 onBlur={() =>
                 bankFormData.reEnterAccountNumber &&
                 bankFormData.reEnterAccountNumber !== bankFormData.accountNumber
                ? alert("Account numbers do not match."): null
  }
/>
              </div>
              <div>
                <Label htmlFor="ifsc">IFSC Code *</Label>
                <Input
                id="ifsc"
                maxLength={11}
                className={bankErrors.ifsc ? "border border-red-500" : ""}
                value={bankFormData.ifsc}
                onChange={(e) =>
                setBankFormData({...bankFormData, ifsc: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "")
    })
  }
/>
              </div>
              <div>
                <Label htmlFor="bankRemarks">Remarks</Label>
                <Input
                  id="bankRemarks"
                  maxLength={50}
                  className={bankErrors.remarks ? "border border-red-500" : ""}
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
                  className={contactErrors.firstName ? "border border-red-500" : ""}
                  value={contactFormData.firstName}
                  onChange={(e) => {
                  const value = e.target.value.replace(/[^a-zA-Z]/g, ""); // Remove numbers and special characters
                  const formatted = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); // Capitalize first letter
                   setContactFormData({ ...contactFormData, firstName: formatted });
  }}
/>
              </div>
              <div>
                <Label htmlFor="contactLastName">Last Name</Label>
                <Input
                  id="contactLastName"
                  className={contactErrors.lastName ? "border border-red-500" : ""}
                  value={contactFormData.lastName}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z]/g, ""); // Remove numbers and special characters
                    const formatted = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); // Capitalize first letter
                    setContactFormData({ ...contactFormData, lastName: formatted });
                    }}
                />
              </div>
              <div>
                <Label htmlFor="contactMobile">Mobile Number *</Label>
                <Input
                  id="contactMobile"
                  maxLength={10}
                  className={contactErrors.mobileNumber ? "border border-red-500" : ""}
                  value={contactFormData.mobileNumber}
                  onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
                    setContactFormData({ ...contactFormData, mobileNumber: value });
  }}
/>
              </div>
              <div>
                <Label htmlFor="contactEmail">Email Address</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  maxLength={30}
                  className={contactErrors.emailAddress ? "border border-red-500" : ""}
                  value={contactFormData.emailAddress}
                  onChange={(e) => {
                  const value = e.target.value.toLowerCase().replace(/[^a-z0-9@._-]/g, ""); // allow only valid characters
                  setContactFormData({ ...contactFormData, emailAddress: value });

                    const isValidEmail = /^[a-z0-9._-]+@[a-z0-9-]+\.(com|in|org|net)$/i.test(value);
                     setContactErrors({ ...contactErrors, emailAddress: !isValidEmail });
  }}
/>

              </div>
              <div>
                <Label htmlFor="workPhone">Work Phone</Label>
                <Input
                  id="workPhone"
                  maxLength={10}
                  className={contactErrors.workPhone ? "border border-red-500" : ""}
                  value={contactFormData.workPhone}
                  onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, ""); // Remove all non-digit characters
                  setContactFormData({ ...contactFormData, workPhone: value });
  }}
/>

              </div>
              <div>
                <Label htmlFor="contactRemarks">Remarks</Label>
                <Input
                  id="contactRemarks"
                  className={contactErrors.remarks ? "border border-red-500" : ""}
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
                className={commentErrors.heading ? "border border-red-500" : ""}
                value={commentFormData.heading}
                onChange={(e) => setCommentFormData({...commentFormData, heading: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="commentText">Comments *</Label>
              <Textarea
                id="commentText"
                rows={4}
                className={commentErrors.comment ? "border border-red-500" : ""}
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
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{supplier ? `Edit Supplier ${supplier.firstName}` : "Add Supplier"}</h2>
          <div className="flex items-center gap-2 mt-4">
            {stepTitles.map((title, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep === index + 1 ? 'bg-blue-600 text-white' : currentStep > index + 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>{index + 1}</div>
                <span className={`ml-2 text-sm ${currentStep === index + 1 ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>{title}</span>
                {index < stepTitles.length - 1 && (<div className="w-8 h-px bg-gray-300 mx-4" />)}
              </div>
            ))}
          </div>
        </div>
        <Card><CardContent className="p-6">{getCurrentStepContent()}</CardContent></Card>
        <div className="flex justify-between mt-6">
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            {currentStep > 1 && (<Button variant="outline" onClick={handlePrevious}>Previous</Button>)}
          </div>
          <div>
            {currentStep < 5 ? (
              <Button onClick={handleNext} disabled={(currentStep === 3 && bankAccounts.length === 0) || (currentStep === 4 && contactPersons.length === 0)}>Next</Button>
            ) : (
              <Button onClick={handleSubmit} disabled={bankAccounts.length === 0 || contactPersons.length === 0 || comments.length === 0}>Save Supplier</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSupplierForm;
