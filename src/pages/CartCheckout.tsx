
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Trash, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type CartProduct = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  companyName?: string;
  gstNumber?: string;
  isBusinessCustomer: boolean;
};

const CartCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get customer and cart items from location state
  const customerId = location.state?.customerId;
  const cartItems = location.state?.cartItems || [];

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch customer details
  useEffect(() => {
    if (customerId) {
      // This would typically be an API call, simulating with sample data
      const customerData = {
        id: customerId,
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@example.com",
        phone: "+91 98765 43210",
        addressLine1: "123 Main Street",
        addressLine2: "Apartment 4B",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        country: "India",
        isBusinessCustomer: false,
      };
      
      setCustomer(customerData);
    }
  }, [customerId]);

  // Set cart products from location state
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      setProducts(cartItems);
    }
  }, [cartItems]);

  // Add a product to the cart
  const handleAddProduct = () => {
    const newProduct: CartProduct = {
      id: `PROD-${Math.floor(Math.random() * 10000)}`,
      name: "New Product",
      price: 0,
      quantity: 1,
      image: "/placeholder.svg",
    };
    setProducts([...products, newProduct]);
  };

  // Update product quantity
  const handleQuantityChange = (id: string, quantity: number) => {
    setProducts(
      products.map((product) => 
        product.id === id ? { ...product, quantity: Math.max(1, quantity) } : product
      )
    );
  };

  // Update product price
  const handlePriceChange = (id: string, price: string) => {
    const numPrice = Number(price) || 0;
    setProducts(
      products.map((product) => 
        product.id === id ? { ...product, price: numPrice } : product
      )
    );
  };

  // Update product name
  const handleNameChange = (id: string, name: string) => {
    setProducts(
      products.map((product) => 
        product.id === id ? { ...product, name } : product
      )
    );
  };

  // Remove product from cart
  const handleRemoveProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Calculate subtotal
  const subtotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);

  // Calculate GST (18%)
  const gstAmount = subtotal * 0.18;

  // Calculate total
  const total = subtotal + gstAmount;

  // Handle order submission
  const handlePlaceOrder = async () => {
    setLoading(true);
    
    try {
      // This would typically be an API call to create a new order
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Order Placed Successfully!",
        description: `Order total: ₹${total.toFixed(2)}`,
      });
      
      // Navigate back to orders page
      navigate("/orders");
    } catch (error) {
      toast({
        title: "Failed to place order",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6 flex items-start gap-2">
        <Button variant="ghost" size="icon" className="mt-0.5" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </Button>
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBag size={24} className="text-brand-blue" />
            <h1 className="text-lg font-bold">Checkout Cart</h1>
          </div>
          <p className="text-sm text-gray-500">Complete the order for selected products</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Customer Information */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            {customer ? (
              <div className="space-y-1">
                <div className="text-sm font-medium">{customer.firstName} {customer.lastName}</div>
                <div className="text-sm">{customer.email}</div>
                <div className="text-sm">{customer.phone}</div>
                <Separator className="my-3" />
                <div className="text-xs font-semibold text-gray-500 mb-1">SHIPPING ADDRESS</div>
                <div className="text-sm">{customer.addressLine1}</div>
                {customer.addressLine2 && <div className="text-sm">{customer.addressLine2}</div>}
                <div className="text-sm">
                  {customer.city}, {customer.state} {customer.pincode}
                </div>
                <div className="text-sm">{customer.country}</div>
                {customer.isBusinessCustomer && (
                  <>
                    <Separator className="my-3" />
                    <div className="text-xs font-semibold text-gray-500 mb-1">BUSINESS DETAILS</div>
                    <div className="text-sm">{customer.companyName}</div>
                    <div className="text-sm">GST: {customer.gstNumber}</div>
                  </>
                )}
              </div>
            ) : (
              <div className="text-sm text-gray-500 italic">Customer details not available</div>
            )}
          </CardContent>
        </Card>

        {/* Products */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Order Items</CardTitle>
            <Button size="sm" onClick={handleAddProduct}>
              <Plus size={16} className="mr-1" /> Add Product
            </Button>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                <h3 className="text-sm font-medium">No products added</h3>
                <p className="text-xs text-gray-500 mt-1 mb-4">
                  Add products to create an order
                </p>
                <Button onClick={handleAddProduct}>
                  <Plus size={16} className="mr-1" /> Add Product
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {products.map((product) => (
                    <div key={product.id} className="flex flex-col sm:flex-row gap-3 border-b pb-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center shrink-0">
                        <img src={product.image} alt={product.name} className="h-10 w-10" />
                      </div>
                      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor={`name-${product.id}`} className="text-xs">Product Name</Label>
                          <Input
                            id={`name-${product.id}`}
                            value={product.name}
                            onChange={(e) => handleNameChange(product.id, e.target.value)}
                            className="h-8"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`price-${product.id}`} className="text-xs">Price</Label>
                          <Input
                            id={`price-${product.id}`}
                            type="number"
                            value={product.price}
                            onChange={(e) => handlePriceChange(product.id, e.target.value)}
                            className="h-8"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`qty-${product.id}`} className="text-xs">Quantity</Label>
                          <div className="flex items-center h-8">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-full rounded-r-none px-2"
                              onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                              disabled={product.quantity <= 1}
                            >
                              -
                            </Button>
                            <Input
                              id={`qty-${product.id}`}
                              type="number"
                              min="1"
                              value={product.quantity}
                              onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 1)}
                              className="h-full rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-full rounded-l-none px-2"
                              onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-end justify-between">
                          <div>
                            <span className="text-xs text-gray-500">Subtotal:</span>
                            <div className="font-medium">₹{(product.price * product.quantity).toFixed(2)}</div>
                          </div>
                          <Button 
                            variant="ghost"
                            size="sm"
                            className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleRemoveProduct(product.id)}
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-3">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>GST (18%)</span>
                      <span>₹{gstAmount.toFixed(2)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mt-6">
                  <Label htmlFor="payment-method" className="mb-2 block">Payment Method</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger id="payment-method">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="upi">UPI</SelectItem>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Notes */}
                <div className="mt-4">
                  <Label htmlFor="notes" className="mb-2 block">Order Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Enter any additional notes for this order"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={() => navigate(-1)}>
                    Cancel
                  </Button>
                  <Button onClick={handlePlaceOrder} disabled={products.length === 0 || loading}>
                    {loading ? "Processing..." : "Place Order"}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CartCheckout;
