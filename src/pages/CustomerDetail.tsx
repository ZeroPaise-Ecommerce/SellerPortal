
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddRewardModal from "@/components/customer/AddRewardModal";
import AddAddressModal from "@/components/customer/AddAddressModal";
import { 
  Users, 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  ShoppingBag, 
  Star, 
  Calendar, 
  MessageSquare, 
  Heart, 
  ShoppingCart, 
  Send, 
  Clock, 
  Eye,
  Plus
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

// Sample customer data - this would typically come from an API
const customersData = [
  {
    id: "CUST-1001",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    phone: "+91 98765 43210",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    country: "India",
    addressLine1: "123 Main Street",
    addressLine2: "Apartment 4B",
    orders: 8,
    spent: 1245.65,
    rewards: 125,
    status: "Active",
    joined: "2023-01-15",
    lastOrder: "2023-04-12",
    isBusinessCustomer: false,
    shippingAddressSameAsBilling: true,
    labels: ["VIP", "Regular"],
    addresses: [
      {
        id: "addr_1",
        type: "billing",
        firstName: "John",
        lastName: "Smith",
        phone: "+91 98765 43210",
        email: "john.smith@example.com",
        addressLine1: "123 Main Street",
        addressLine2: "Apartment 4B",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        country: "India",
        default: true,
        isBusinessAddress: false
      }
    ]
  },
  {
    id: "CUST-1002",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.j@example.com",
    phone: "+91 87654 32109",
    city: "Delhi",
    state: "Delhi",
    pincode: "110001",
    country: "India",
    addressLine1: "456 Park Avenue",
    addressLine2: "Tower 2, Flat 303",
    orders: 12,
    spent: 3456.78,
    rewards: 346,
    status: "Active",
    joined: "2022-11-05",
    lastOrder: "2023-05-01",
    isBusinessCustomer: true,
    companyName: "Johnson Enterprises",
    gstNumber: "07AAAAA0000A1Z5",
    shippingAddressSameAsBilling: false,
    shippingAddressLine1: "789 Business Park",
    shippingAddressLine2: "Building 3, Floor 5",
    shippingCity: "Gurugram",
    shippingState: "Haryana",
    shippingPincode: "122001",
    shippingCountry: "India",
    labels: ["Business", "Wholesale"],
    addresses: [
      {
        id: "addr_2",
        type: "billing",
        firstName: "Sarah",
        lastName: "Johnson",
        phone: "+91 87654 32109",
        email: "sarah.j@example.com",
        addressLine1: "456 Park Avenue",
        addressLine2: "Tower 2, Flat 303",
        city: "Delhi",
        state: "Delhi",
        pincode: "110001",
        country: "India",
        default: true,
        isBusinessAddress: true,
        companyName: "Johnson Enterprises",
        gstNumber: "07AAAAA0000A1Z5"
      },
      {
        id: "addr_3",
        type: "shipping",
        firstName: "Sarah",
        lastName: "Johnson",
        phone: "+91 87654 32109",
        email: "sarah.j@example.com",
        addressLine1: "789 Business Park",
        addressLine2: "Building 3, Floor 5",
        city: "Gurugram",
        state: "Haryana",
        pincode: "122001",
        country: "India",
        default: true,
        isBusinessAddress: true,
        companyName: "Johnson Enterprises",
        gstNumber: "07AAAAA0000A1Z5"
      }
    ]
  }
];

// Sample order data
const orderData = [
  {
    id: "ORD-10045",
    date: "2023-04-12",
    amount: 450.99,
    status: "Delivered",
    items: 3
  },
  {
    id: "ORD-10030",
    date: "2023-03-25",
    amount: 120.50,
    status: "Delivered",
    items: 1
  },
  {
    id: "ORD-10022",
    date: "2023-02-18",
    amount: 675.16,
    status: "Delivered",
    items: 5
  },
];

// Sample wishlist data
const wishlistData = [
  {
    id: "PROD-5001",
    name: "Wireless Headphones",
    price: 149.99,
    image: "/placeholder.svg"
  },
  {
    id: "PROD-6032",
    name: "Smartphone Case",
    price: 24.99,
    image: "/placeholder.svg"
  },
];

// Sample cart products
const cartData = [
  {
    id: "PROD-3045",
    name: "Smart Watch",
    price: 299.99,
    quantity: 1,
    image: "/placeholder.svg"
  },
  {
    id: "PROD-2089",
    name: "Bluetooth Speaker",
    price: 79.99,
    quantity: 2,
    image: "/placeholder.svg"
  },
];

// Sample message history
const messageHistory = [
  {
    id: "msg-1",
    content: "Hello, I was wondering when my order #10045 will be shipped?",
    timestamp: "2023-04-13T14:32:00",
    sender: "customer",
  },
  {
    id: "msg-2",
    content: "Hi John, your order is being processed and will be shipped out today. You should receive a tracking number by email in the next few hours.",
    timestamp: "2023-04-13T14:40:00",
    sender: "admin",
  },
  {
    id: "msg-3",
    content: "Thank you for the quick response! I appreciate it.",
    timestamp: "2023-04-13T14:43:00",
    sender: "customer",
  },
];

const CustomerDetail = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [newMessage, setNewMessage] = useState("");
  const [currentCart, setCurrentCart] = useState([...cartData]);
  const [currentRewards, setCurrentRewards] = useState<number | null>(null);
  
  // Modal states
  const [rewardModalOpen, setRewardModalOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  
  // Find customer by ID
  const customer = customersData.find(c => c.id === customerId) || customersData[0];
  
  // Set initial rewards points from customer data
  const rewardsPoints = currentRewards !== null ? currentRewards : customer.rewards;

  // Handle creating a new order from cart
  const handleCreateOrder = () => {
    navigate("/cart-checkout", { 
      state: { 
        customerId: customer.id,
        cartItems: currentCart
      } 
    });
  };

  // Send message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the customer",
    });
    
    setNewMessage("");
  };
  
  // Handle send email action
  const handleSendEmail = () => {
    toast({
      title: "Email Feature",
      description: "The email composition window would open here",
    });
  };

  // Handle add to cart from wishlist
  const handleAddToCart = (wishlistItem: any) => {
    // Check if the item already exists in cart
    const existingItemIndex = currentCart.findIndex(item => item.id === wishlistItem.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if item already exists
      const updatedCart = [...currentCart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + 1
      };
      setCurrentCart(updatedCart);
    } else {
      // Add new item to cart
      setCurrentCart([
        ...currentCart, 
        {
          ...wishlistItem,
          quantity: 1
        }
      ]);
    }
    
    toast({
      title: "Added to Cart",
      description: `${wishlistItem.name} has been added to the cart`,
    });
  };
  
  // Handle reward points update
  const handleRewardAdded = (points: number) => {
    setCurrentRewards((prev) => (prev !== null ? prev + points : customer.rewards + points));
  };
  
  // Handle adding new address
  const handleAddressAdded = (address: any) => {
    // In a real app, this would update the customer data via API
    toast({
      title: "Address Added",
      description: "New address has been added successfully",
    });
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6 flex items-start gap-2">
        <Button variant="ghost" size="icon" className="mt-0.5" onClick={() => navigate("/customers")}>
          <ArrowLeft size={20} />
        </Button>
        <div>
          <div className="flex items-center gap-2">
            <Users size={24} className="text-brand-blue" />
            <h1 className="text-lg font-bold">Customer Details</h1>
          </div>
          <p className="text-sm text-gray-500">View and manage customer information</p>
        </div>
      </div>

      {/* Customer Summary Card */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {/* Customer Info */}
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-brand-blue text-white text-xl">
                  {customer.firstName[0]}{customer.lastName[0]}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold">{customer.firstName} {customer.lastName}</h2>
                  <Badge variant={customer.status === "Active" ? "default" : "secondary"}>
                    {customer.status}
                  </Badge>
                </div>
                
                {customer.isBusinessCustomer && (
                  <div className="text-sm text-gray-700 mb-1">
                    {customer.companyName} · GST: {customer.gstNumber}
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Mail size={14} />
                    <span>{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone size={14} />
                    <span>{customer.phone}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                  <MapPin size={14} />
                  <span>{customer.city}, {customer.state}</span>
                </div>
                
                {/* Customer labels */}
                {customer.labels && customer.labels.length > 0 && (
                  <div className="flex gap-1 mt-2">
                    {customer.labels.map((label, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-100">
                        {label}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4">
              <div className="bg-gray-50 p-3 rounded-md flex items-center gap-2">
                <div className="bg-blue-100 rounded-full p-2">
                  <ShoppingBag size={18} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Total Orders</div>
                  <div className="font-semibold">{customer.orders}</div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md flex items-center gap-2">
                <div className="bg-green-100 rounded-full p-2">
                  <Star size={18} className="text-green-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Rewards</div>
                  <div className="font-semibold">{rewardsPoints} points</div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md flex items-center gap-2">
                <div className="bg-purple-100 rounded-full p-2">
                  <Calendar size={18} className="text-purple-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Customer Since</div>
                  <div className="font-semibold">{format(new Date(customer.joined), "dd/MM/yyyy")}</div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md flex items-center gap-2">
                <div className="bg-amber-100 rounded-full p-2">
                  <ShoppingBag size={18} className="text-amber-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Total Spent</div>
                  <div className="font-semibold">₹{customer.spent.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Customer Details */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist & Cart</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold">Recent Orders</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("orders")}>
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Order</TableHead>
                      <TableHead className="text-xs">Date</TableHead>
                      <TableHead className="text-xs">Amount</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderData.slice(0, 3).map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="text-xs font-medium">{order.id}</TableCell>
                        <TableCell className="text-xs">{format(new Date(order.date), "dd/MM/yyyy")}</TableCell>
                        <TableCell className="text-xs">₹{order.amount.toFixed(2)}</TableCell>
                        <TableCell className="text-xs">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={handleCreateOrder} className="justify-start">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Create New Order
                  </Button>
                  
                  <Button variant="outline" className="justify-start" onClick={handleSendEmail}>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                  
                  <Button variant="outline" className="justify-start" onClick={() => setNewMessage("How can I help you today?")}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                  
                  <Button variant="outline" className="justify-start" onClick={() => setRewardModalOpen(true)}>
                    <Star className="mr-2 h-4 w-4" />
                    Add Rewards
                  </Button>
                </div>
                
                {currentCart.length > 0 && (
                  <div className="border rounded-md p-3">
                    <div className="font-medium text-sm mb-2">Cart Items ({currentCart.reduce((acc, item) => acc + item.quantity, 0)})</div>
                    <div className="space-y-2">
                      {currentCart.map(item => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center">
                              <ShoppingCart size={14} />
                            </div>
                            <div className="text-xs">
                              {item.name} x {item.quantity}
                            </div>
                          </div>
                          <div className="text-xs font-medium">₹{(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <div className="text-sm font-medium">Total: ₹{currentCart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}</div>
                      <Button size="sm" className="h-8" onClick={handleCreateOrder}>Checkout</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Recent Messages */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold">Recent Messages</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="max-h-80 overflow-y-auto">
                {messageHistory.map((message) => (
                  <div 
                    key={message.id} 
                    className={`mb-3 ${
                      message.sender === "admin" ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block max-w-[80%] rounded-lg p-3 text-xs ${
                        message.sender === "admin"
                          ? "bg-brand-blue text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {message.content}
                      <div className="text-[10px] opacity-70 mt-1">
                        {format(new Date(message.timestamp), "dd/MM/yyyy HH:mm")}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <div className="p-3 border-t flex gap-2">
                <div className="flex-1">
                  <Textarea
                    placeholder="Type a message..."
                    className="min-h-[40px] text-sm resize-none"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                </div>
                <Button className="self-end" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </Card>
            
            {/* Recent Activity */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Customer Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 rounded-full p-1.5 mt-0.5">
                      <ShoppingBag size={14} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm">Placed an order <span className="font-medium">#ORD-10045</span></div>
                      <div className="text-xs text-gray-500">12 Apr 2023, 10:45 AM</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 rounded-full p-1.5 mt-0.5">
                      <Heart size={14} className="text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm">Added <span className="font-medium">Wireless Headphones</span> to wishlist</div>
                      <div className="text-xs text-gray-500">10 Apr 2023, 3:22 PM</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-100 rounded-full p-1.5 mt-0.5">
                      <ShoppingCart size={14} className="text-amber-600" />
                    </div>
                    <div>
                      <div className="text-sm">Added <span className="font-medium">Smart Watch</span> to cart</div>
                      <div className="text-xs text-gray-500">08 Apr 2023, 5:17 PM</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 rounded-full p-1.5 mt-0.5">
                      <MessageSquare size={14} className="text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm">Started a conversation</div>
                      <div className="text-xs text-gray-500">05 Apr 2023, 2:30 PM</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base font-semibold">Order History</CardTitle>
                <Button onClick={() => navigate("/cart-checkout", { state: { customerId: customer.id } })}>
                  <Plus className="h-4 w-4 mr-1" /> Create Order
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Order ID</TableHead>
                    <TableHead className="text-xs">Date</TableHead>
                    <TableHead className="text-xs">Items</TableHead>
                    <TableHead className="text-xs">Amount</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderData.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="text-xs font-medium">{order.id}</TableCell>
                      <TableCell className="text-xs">{format(new Date(order.date), "dd MMM yyyy")}</TableCell>
                      <TableCell className="text-xs">{order.items}</TableCell>
                      <TableCell className="text-xs">₹{order.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-xs">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 px-2"
                          onClick={() => navigate(`/orders/${order.id}`)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Wishlist & Cart Tab */}
        <TabsContent value="wishlist">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Wishlist */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Wishlist</CardTitle>
              </CardHeader>
              <CardContent>
                {wishlistData.length > 0 ? (
                  <div className="space-y-3">
                    {wishlistData.map(item => (
                      <div key={item.id} className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center">
                            <img src={item.image} alt={item.name} className="h-8 w-8" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{item.name}</div>
                            <div className="text-xs text-gray-500">₹{item.price.toFixed(2)}</div>
                          </div>
                        </div>
                        <Button size="sm" onClick={() => handleAddToCart(item)}>Add to Cart</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Heart className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                    <h3 className="text-sm font-medium">Wishlist is empty</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      The customer hasn't added any products to their wishlist yet
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Shopping Cart */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold">Shopping Cart</CardTitle>
                  {currentCart.length > 0 && (
                    <Button onClick={handleCreateOrder}>Create Order</Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {currentCart.length > 0 ? (
                  <div>
                    <div className="space-y-3 mb-4">
                      {currentCart.map(item => (
                        <div key={item.id} className="flex items-center justify-between border-b pb-3">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center">
                              <img src={item.image} alt={item.name} className="h-8 w-8" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">{item.name}</div>
                              <div className="flex items-center gap-3 mt-0.5">
                                <div className="text-xs text-gray-500">₹{item.price.toFixed(2)}</div>
                                <div className="text-xs bg-gray-100 px-2 py-0.5 rounded">Qty: {item.quantity}</div>
                              </div>
                            </div>
                          </div>
                          <div className="font-medium text-sm">₹{(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t pt-3">
                      <div className="flex justify-between mb-1">
                        <div className="text-sm">Subtotal:</div>
                        <div className="text-sm font-medium">₹{currentCart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}</div>
                      </div>
                      <div className="flex justify-between text-sm mb-3">
                        <div className="text-sm">Estimated Tax:</div>
                        <div className="text-sm">₹{(currentCart.reduce((acc, item) => acc + (item.price * item.quantity), 0) * 0.18).toFixed(2)}</div>
                      </div>
                      <div className="flex justify-between text-base font-bold">
                        <div>Total:</div>
                        <div>₹{(currentCart.reduce((acc, item) => acc + (item.price * item.quantity), 0) * 1.18).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <ShoppingCart className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                    <h3 className="text-sm font-medium">Shopping cart is empty</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      The customer doesn't have any products in their cart
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Recently Viewed */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Recently Viewed Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center">
                        <img src="/placeholder.svg" alt="Product" className="h-8 w-8" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Digital Camera</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="text-xs text-gray-500">₹599.99</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock size={10} /> 2 hours ago
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                  
                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center">
                        <img src="/placeholder.svg" alt="Product" className="h-8 w-8" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Wireless Earbuds</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="text-xs text-gray-500">₹129.99</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock size={10} /> Yesterday
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Reward Points */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Reward Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Available Points</div>
                    <div className="text-2xl font-bold">{rewardsPoints}</div>
                  </div>
                  <Button onClick={() => setRewardModalOpen(true)}>Add Points</Button>
                </div>
                
                <Separator className="my-4" />
                
                <h3 className="text-sm font-medium mb-3">Points History</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium">Order #ORD-10045</div>
                      <div className="text-xs text-gray-500">12 Apr 2023</div>
                    </div>
                    <div className="text-sm font-medium text-green-600">+45 points</div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium">Order #ORD-10030</div>
                      <div className="text-xs text-gray-500">25 Mar 2023</div>
                    </div>
                    <div className="text-sm font-medium text-green-600">+12 points</div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium">Points Redemption</div>
                      <div className="text-xs text-gray-500">10 Feb 2023</div>
                    </div>
                    <div className="text-sm font-medium text-red-600">-100 points</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Addresses Tab */}
        <TabsContent value="addresses">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Customer Addresses</h2>
            <Button onClick={() => setAddressModalOpen(true)}>
              <Plus size={16} className="mr-1" /> Add New Address
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {customer.addresses && customer.addresses.length > 0 ? (
              customer.addresses.map((address: any) => (
                <Card key={address.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                          {address.type === 'billing' ? 'Billing Address' : 'Shipping Address'}
                          {address.default && <Badge variant="secondary" className="ml-2">Default</Badge>}
                        </CardTitle>
                        {address.isBusinessAddress && (
                          <div className="text-xs text-gray-500 mt-1">Business Address</div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {address.isBusinessAddress && address.companyName && (
                        <div className="text-sm font-medium">{address.companyName}</div>
                      )}
                      <div className="text-sm">{address.firstName} {address.lastName}</div>
                      <div className="text-sm">{address.phone}</div>
                      {address.email && <div className="text-sm">{address.email}</div>}
                      <Separator className="my-2" />
                      <div className="text-sm">{address.addressLine1}</div>
                      {address.addressLine2 && (
                        <div className="text-sm">{address.addressLine2}</div>
                      )}
                      <div className="text-sm">
                        {address.city}, {address.state} {address.pincode}
                      </div>
                      <div className="text-sm">{address.country}</div>
                      {address.isBusinessAddress && address.gstNumber && (
                        <div className="text-sm mt-2">
                          <span className="text-gray-500">GST:</span> {address.gstNumber}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <MapPin size={48} className="mx-auto text-gray-300 mb-2" />
                <h3 className="text-base font-medium">No Addresses Found</h3>
                <p className="text-sm text-gray-500 mt-1 mb-4">
                  This customer does not have any addresses yet
                </p>
                <Button onClick={() => setAddressModalOpen(true)}>
                  <Plus size={16} className="mr-1" /> Add Address
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Add Reward Modal */}
      <AddRewardModal
        customerId={customer.id}
        open={rewardModalOpen}
        onOpenChange={setRewardModalOpen}
        onRewardAdded={handleRewardAdded}
      />
      
      {/* Add Address Modal */}
      <AddAddressModal 
        customerId={customer.id}
        open={addressModalOpen}
        onOpenChange={setAddressModalOpen}
        onAddressAdded={handleAddressAdded}
      />
    </DashboardLayout>
  );
};

export default CustomerDetail;
