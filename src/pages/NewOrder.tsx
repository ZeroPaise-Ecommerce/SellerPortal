
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingCart, 
  ChevronLeft,
  Plus,
  Trash2,
  Save,
  Search
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";

// Sample product data
const products = [
  { id: 1, name: "Premium Headphones", price: 49.99, stock: 25 },
  { id: 2, name: "Wireless Mouse", price: 24.99, stock: 42 },
  { id: 3, name: "Gaming Monitor", price: 299.99, stock: 10 },
  { id: 4, name: "Mechanical Keyboard", price: 89.99, stock: 15 },
  { id: 5, name: "USB-C Hub", price: 39.99, stock: 30 },
  { id: 6, name: "Smart Watch", price: 199.99, stock: 8 },
  { id: 7, name: "Bluetooth Speaker", price: 79.99, stock: 20 },
  { id: 8, name: "Desk Lamp", price: 29.99, stock: 18 },
  { id: 9, name: "Office Chair", price: 199.99, stock: 5 },
  { id: 10, name: "Laptop Stand", price: 29.99, stock: 22 },
];

// Sample customer data
const customers = [
  { 
    id: "CUST-1001", 
    firstName: "John", 
    lastName: "Smith", 
    email: "john.smith@example.com", 
    phone: "+91 98765 43210",
    isBusinessCustomer: false,
    shipping: {
      address: "123 Main St",
      city: "New Delhi",
      state: "Delhi",
      pinCode: "110001",
      country: "India"
    },
    billing: {
      address: "123 Main St",
      city: "New Delhi",
      state: "Delhi",
      pinCode: "110001",
      country: "India"
    }
  },
  { 
    id: "CUST-1002", 
    firstName: "Sarah", 
    lastName: "Johnson", 
    email: "sarah.j@example.com", 
    phone: "+91 87654 32109",
    isBusinessCustomer: true,
    companyName: "Tech Solutions Inc.",
    gstNumber: "29ABCDE1234F1Z5",
    shipping: {
      address: "456 Park Ave",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400001",
      country: "India"
    },
    billing: {
      address: "789 Corporate Blvd",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400002",
      country: "India"
    }
  },
];

const NewOrder = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isCreateCustomerOpen, setIsCreateCustomerOpen] = useState(false);
  const [isBusinessCustomer, setIsBusinessCustomer] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sameBillingAddress, setSameBillingAddress] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [orderSource, setOrderSource] = useState("manual");
  const [discount, setDiscount] = useState<number>(0);
  const [discountType, setDiscountType] = useState('percentage');
  const [searchCustomer, setSearchCustomer] = useState('');
  const [shippingCharge, setShippingCharge] = useState<number>(0);
  const [showProductDiscount, setShowProductDiscount] = useState(false);

  // Filter customers based on search
  const filteredCustomers = customers.filter((customer) => {
    const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
    const email = customer.email.toLowerCase();
    const phone = customer.phone.toLowerCase();
    const searchTerm = searchCustomer.toLowerCase();
    
    return fullName.includes(searchTerm) || 
           email.includes(searchTerm) || 
           phone.includes(searchTerm);
  });

  // Add a new product to the order
  const addProduct = () => {
    setSelectedProducts([
      ...selectedProducts,
      { productId: "", quantity: 1, price: 0, total: 0, discount: 0, discountType: 'percentage' }
    ]);
  };

  // Remove a product from the order
  const removeProduct = (index) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts.splice(index, 1);
    setSelectedProducts(updatedProducts);
  };

  // Update product selection
  const updateProductSelection = (index, productId) => {
    const product = products.find(p => p.id === Number(productId));
    
    if (!product) return;
    
    const updatedProducts = [...selectedProducts];
    updatedProducts[index] = {
      ...updatedProducts[index],
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      discount: 0,
      discountType: 'percentage',
      total: product.price
    };
    
    setSelectedProducts(updatedProducts);
  };

  // Update product quantity
  const updateProductQuantity = (index, quantity) => {
    const updatedProducts = [...selectedProducts];
    const product = updatedProducts[index];
    
    if (product) {
      const newQuantity = Math.max(1, parseInt(quantity) || 1);
      product.quantity = newQuantity;
      
      // Recalculate total after discount
      updateProductTotal(updatedProducts, index);
      setSelectedProducts(updatedProducts);
    }
  };

  // Update product discount
  const updateProductDiscount = (index, discountValue) => {
    const updatedProducts = [...selectedProducts];
    const product = updatedProducts[index];
    
    if (product) {
      product.discount = Number(discountValue) || 0;
      updateProductTotal(updatedProducts, index);
      setSelectedProducts(updatedProducts);
    }
  };

  // Update product discount type
  const updateProductDiscountType = (index, type) => {
    const updatedProducts = [...selectedProducts];
    const product = updatedProducts[index];
    
    if (product) {
      product.discountType = type;
      updateProductTotal(updatedProducts, index);
      setSelectedProducts(updatedProducts);
    }
  };

  // Calculate product total with discount
  const updateProductTotal = (products, index) => {
    const product = products[index];
    const baseTotal = product.price * product.quantity;
    
    if (product.discount > 0) {
      if (product.discountType === 'percentage') {
        // Cap percentage discount at 100%
        const discountPercentage = Math.min(100, product.discount);
        const discountAmount = (baseTotal * discountPercentage) / 100;
        product.total = baseTotal - discountAmount;
      } else {
        // Flat discount - ensure it doesn't exceed the total
        const discountAmount = Math.min(baseTotal, product.discount);
        product.total = baseTotal - discountAmount;
      }
    } else {
      product.total = baseTotal;
    }
  };

  // Calculate order subtotal
  const calculateSubtotal = () => {
    return selectedProducts.reduce((total, item) => total + item.total, 0);
  };

  // Calculate discount amount
  const calculateDiscountAmount = () => {
    const subtotal = calculateSubtotal();
    if (discountType === 'percentage') {
      return (subtotal * discount) / 100;
    } else {
      return Math.min(subtotal, discount); // Ensure discount doesn't exceed subtotal
    }
  };

  // Calculate order total (with discount and shipping)
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = calculateDiscountAmount();
    return subtotal - discountAmount + shippingCharge;
  };

  // Handle customer selection
  const handleCustomerSelection = (customerId) => {
    if (customerId === "new") {
      setIsCreateCustomerOpen(true);
      setSelectedCustomer(null);
      return;
    }
    
    const customer = customers.find(c => c.id === customerId);
    setSelectedCustomer(customer);
    setIsBusinessCustomer(customer?.isBusinessCustomer || false);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // In a real application, this would send the order data to your backend
    const orderData = {
      customer: selectedCustomer,
      products: selectedProducts,
      subtotal: calculateSubtotal(),
      discountType,
      discount,
      discountAmount: calculateDiscountAmount(),
      shippingCharge,
      total: calculateTotal(),
      paymentMethod,
      orderSource,
      sameBillingAddress
    };
    
    console.log("Order submitted:", orderData);
    // Here you would typically redirect to a success page or back to the orders list
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-3">
            <ShoppingCart size={24} className="text-brand-blue" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Create New Order</h1>
            <p className="text-sm text-gray-500">Create a new order manually</p>
          </div>
        </div>
        <Button variant="outline" asChild>
          <Link to="/orders">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Orders
          </Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Customer Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Customer Information</CardTitle>
                <CardDescription>Select an existing customer or create a new one</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="w-full relative">
                      {/* Customer search box */}
                      <div className="relative mb-4">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input 
                          placeholder="Search customers by name, email or phone..." 
                          value={searchCustomer}
                          onChange={(e) => setSearchCustomer(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                      <ScrollArea className="max-h-64">
                        <Select onValueChange={handleCustomerSelection}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a customer" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">+ Create New Customer</SelectItem>
                            {filteredCustomers.map((customer) => (
                              <SelectItem key={customer.id} value={customer.id}>
                                {customer.firstName} {customer.lastName} ({customer.email})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </ScrollArea>
                    </div>
                  </div>

                  {selectedCustomer && (
                    <div className="border rounded-md p-4 space-y-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">
                            {selectedCustomer.firstName} {selectedCustomer.lastName}
                            {selectedCustomer.isBusinessCustomer && (
                              <Badge className="ml-2 bg-blue-100 text-blue-800">Business</Badge>
                            )}
                          </h3>
                          <p className="text-sm text-gray-600">{selectedCustomer.email}</p>
                          <p className="text-sm text-gray-600">{selectedCustomer.phone}</p>
                          {selectedCustomer.isBusinessCustomer && (
                            <div className="mt-2">
                              <p className="text-sm font-medium">{selectedCustomer.companyName}</p>
                              <p className="text-sm text-gray-600">GST: {selectedCustomer.gstNumber}</p>
                            </div>
                          )}
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setSelectedCustomer(null)}>
                          Change
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Shipping Address</h4>
                          <p className="text-sm">{selectedCustomer.shipping.address}</p>
                          <p className="text-sm">
                            {selectedCustomer.shipping.city}, {selectedCustomer.shipping.state} {selectedCustomer.shipping.pinCode}
                          </p>
                          <p className="text-sm">{selectedCustomer.shipping.country}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Billing Address</h4>
                          <p className="text-sm">{selectedCustomer.billing.address}</p>
                          <p className="text-sm">
                            {selectedCustomer.billing.city}, {selectedCustomer.billing.state} {selectedCustomer.billing.pinCode}
                          </p>
                          <p className="text-sm">{selectedCustomer.billing.country}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Order Items</CardTitle>
                  <CardDescription>Add products to this order</CardDescription>
                </div>
                <div className="flex items-center">
                  <Checkbox 
                    id="show-product-discount" 
                    checked={showProductDiscount} 
                    onCheckedChange={(checked) => setShowProductDiscount(!!checked)}
                    className="mr-2"
                  />
                  <Label htmlFor="show-product-discount">Enable Product-wise Discount</Label>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedProducts.length === 0 ? (
                    <div className="text-center py-8 border rounded-md">
                      <p className="text-gray-500">No products added yet</p>
                      <Button type="button" variant="outline" className="mt-2" onClick={addProduct}>
                        <Plus className="h-4 w-4 mr-1" /> Add Product
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-12 gap-2 text-sm font-medium text-gray-500">
                        <div className="col-span-6">Product</div>
                        <div className="col-span-1">Price</div>
                        <div className="col-span-1">Quantity</div>
                        {showProductDiscount && <div className="col-span-2">Discount</div>}
                        <div className="col-span-1">Total</div>
                        <div className="col-span-1"></div>
                      </div>
                      
                      {selectedProducts.map((item, index) => (
                        <div key={index} className="grid grid-cols-12 gap-2 items-center">
                          <div className="col-span-6">
                            <Select 
                              value={item.productId ? String(item.productId) : ""}
                              onValueChange={(value) => updateProductSelection(index, value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select product" />
                              </SelectTrigger>
                              <SelectContent>
                                {products.map((product) => (
                                  <SelectItem key={product.id} value={String(product.id)}>
                                    {product.name} - ₹{product.price.toFixed(2)} (Stock: {product.stock})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="col-span-1">
                            <Input 
                              type="text" 
                              value={item.price ? `₹${item.price.toFixed(2)}` : ""} 
                              disabled 
                            />
                          </div>
                          <div className="col-span-1">
                            <Input 
                              type="number" 
                              min="1" 
                              value={item.quantity} 
                              onChange={(e) => updateProductQuantity(index, e.target.value)} 
                            />
                          </div>

                          {showProductDiscount && (
                            <div className="col-span-2 flex items-center space-x-2">
                              <div className="w-2/3">
                                <Input
                                  type="number"
                                  min="0"
                                  value={item.discount}
                                  onChange={(e) => updateProductDiscount(index, e.target.value)}
                                />
                              </div>
                              <div className="w-1/3">
                                <Select
                                  value={item.discountType}
                                  onValueChange={(value) => updateProductDiscountType(index, value)}
                                >
                                  <SelectTrigger className="h-10">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="percentage">%</SelectItem>
                                    <SelectItem value="amount">₹</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}

                          <div className={showProductDiscount ? "col-span-1" : "col-span-3"}>
                            <Input 
                              type="text" 
                              value={item.total ? `₹${item.total.toFixed(2)}` : ""} 
                              disabled 
                            />
                          </div>
                          <div className="col-span-1 text-right">
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon"
                              onClick={() => removeProduct(index)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      <Button type="button" variant="outline" onClick={addProduct} className="w-full">
                        <Plus className="h-4 w-4 mr-1" /> Add Another Product
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Order Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="payment-method" className="mb-2 block">Payment Method</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger id="payment-method">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online Payment</SelectItem>
                      <SelectItem value="cod">Cash on Delivery (COD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right column - Order Summary */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                
                {/* Discount section */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="discount">Discount</Label>
                    <RadioGroup
                      className="flex items-center space-x-2"
                      value={discountType}
                      onValueChange={setDiscountType}
                    >
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="percentage" id="discount-percentage" />
                        <Label htmlFor="discount-percentage" className="text-sm">%</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="amount" id="discount-amount" />
                        <Label htmlFor="discount-amount" className="text-sm">₹</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="flex items-center mt-1">
                    <Input
                      id="discount"
                      type="number"
                      min="0"
                      value={discount}
                      onChange={(e) => setDiscount(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="ml-2">{discountType === 'percentage' ? '%' : '₹'}</span>
                  </div>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount Amount</span>
                    <span>-₹{calculateDiscountAmount().toFixed(2)}</span>
                  </div>
                )}

                {/* Shipping charge */}
                <div>
                  <Label htmlFor="shipping-charge">Shipping Charge (₹)</Label>
                  <Input
                    id="shipping-charge"
                    type="number"
                    min="0"
                    value={shippingCharge}
                    onChange={(e) => setShippingCharge(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                {shippingCharge > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Shipping Charge</span>
                    <span>₹{shippingCharge.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="pt-4 border-t flex justify-between text-base font-medium">
                  <span>Total</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-brand-blue hover:bg-brand-blue/90"
                    disabled={!selectedCustomer || selectedProducts.length === 0}
                  >
                    <Save className="h-4 w-4 mr-1" /> Create Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>

      {/* Create Customer Dialog */}
      <Dialog open={isCreateCustomerOpen} onOpenChange={setIsCreateCustomerOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create New Customer</DialogTitle>
            <DialogDescription>
              Add a new customer to your customer database
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="personal">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="address">Address Information</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div>
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Smith" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+91 98765 43210" />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="business-customer" 
                  checked={isBusinessCustomer} 
                  onCheckedChange={(checked) => setIsBusinessCustomer(checked === true)}
                />
                <Label htmlFor="business-customer">This is a business customer</Label>
              </div>
              
              {isBusinessCustomer && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" placeholder="Acme Inc." />
                  </div>
                  <div>
                    <Label htmlFor="gst-number">GST Number</Label>
                    <Input id="gst-number" placeholder="29ABCDE1234F1Z5" />
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="address" className="mt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-md font-medium mb-2">Shipping Address</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="shipping-address">Street Address</Label>
                      <Input id="shipping-address" placeholder="123 Main St" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="shipping-city">City</Label>
                        <Input id="shipping-city" placeholder="New Delhi" />
                      </div>
                      <div>
                        <Label htmlFor="shipping-state">State</Label>
                        <Input id="shipping-state" placeholder="Delhi" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="shipping-pin">PIN Code</Label>
                        <Input id="shipping-pin" placeholder="110001" />
                      </div>
                      <div>
                        <Label htmlFor="shipping-country">Country</Label>
                        <Input id="shipping-country" placeholder="India" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="same-billing" 
                    checked={sameBillingAddress} 
                    onCheckedChange={(checked) => setSameBillingAddress(checked === true)}
                  />
                  <Label htmlFor="same-billing">Billing address is the same as shipping address</Label>
                </div>
                
                {!sameBillingAddress && (
                  <div>
                    <h3 className="text-md font-medium mb-2">Billing Address</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="billing-address">Street Address</Label>
                        <Input id="billing-address" placeholder="456 Business Ave" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="billing-city">City</Label>
                          <Input id="billing-city" placeholder="Mumbai" />
                        </div>
                        <div>
                          <Label htmlFor="billing-state">State</Label>
                          <Input id="billing-state" placeholder="Maharashtra" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="billing-pin">PIN Code</Label>
                          <Input id="billing-pin" placeholder="400001" />
                        </div>
                        <div>
                          <Label htmlFor="billing-country">Country</Label>
                          <Input id="billing-country" placeholder="India" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateCustomerOpen(false)}>Cancel</Button>
            <Button type="button" onClick={() => {
              // In a real app, this would create the customer
              console.log("Creating new customer");
              setIsCreateCustomerOpen(false);
            }}>Create Customer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default NewOrder;
