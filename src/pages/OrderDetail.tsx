
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  ArrowLeft,
  Printer,
  Package,
  Check,
  Clock,
  Truck,
  X,
  Loader,
  FileText,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Sample order data - in a real app, this would come from an API
const orderData = {
  "ORD-7652": {
    id: "ORD-7652",
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
    },
    date: new Date(2023, 4, 7, 14, 30),
    items: [
      {
        id: 1,
        name: "Premium Headphones",
        sku: "SKU-1234",
        quantity: 2,
        price: 59.99,
      },
      {
        id: 2,
        name: "Wireless Charging Pad",
        sku: "SKU-5678",
        quantity: 1,
        price: 29.99,
      },
    ],
    total: 149.97,
    subtotal: 129.97,
    tax: 10.00,
    shipping: 10.00,
    status: "Delivered",
    payment: {
      status: "Paid",
      method: "Credit Card",
      last4: "4242",
      transaction: "TXN-12345678",
    },
    source: "Website",
    shipping_address: {
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "USA",
    },
    billing_address: {
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "USA",
    },
    tracking: {
      number: "TRK-9876543210",
      carrier: "UPS",
      url: "https://example.com/tracking",
    },
    notes: "Customer requested gift wrapping.",
    history: [
      {
        status: "Order Placed",
        date: new Date(2023, 4, 5, 10, 15),
        comment: "Order placed by customer",
      },
      {
        status: "Payment Confirmed",
        date: new Date(2023, 4, 5, 10, 17),
        comment: "Payment processed successfully",
      },
      {
        status: "Processing",
        date: new Date(2023, 4, 6, 9, 30),
        comment: "Order is being processed",
      },
      {
        status: "Shipped",
        date: new Date(2023, 4, 6, 14, 25),
        comment: "Order has been shipped via UPS",
      },
      {
        status: "Delivered",
        date: new Date(2023, 4, 7, 11, 45),
        comment: "Package delivered to customer",
      },
    ],
  },
  // Additional order data would be added here for other order IDs
};

// Status icon mapping
const StatusIcon = ({ status }) => {
  switch (status) {
    case "Pending":
      return <Loader className="h-4 w-4 text-yellow-500" />;
    case "Confirmed":
    case "Payment Confirmed":
    case "Order Placed":
      return <Check className="h-4 w-4 text-blue-500" />;
    case "Processing":
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case "Pickup":
      return <Package className="h-4 w-4 text-blue-500" />;
    case "Shipped":
      return <Truck className="h-4 w-4 text-blue-500" />;
    case "Delivered":
      return <Check className="h-4 w-4 text-green-500" />;
    case "Cancelled":
      return <X className="h-4 w-4 text-red-500" />;
    default:
      return null;
  }
};

// Status badge color mapping
const getStatusBadgeColor = (status) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Confirmed":
    case "Order Placed":
    case "Payment Confirmed":
      return "bg-blue-100 text-blue-800";
    case "Processing":
      return "bg-yellow-100 text-yellow-800";
    case "Pickup":
      return "bg-indigo-100 text-indigo-800";
    case "Shipped":
      return "bg-blue-100 text-blue-800";
    case "Delivered":
      return "bg-green-100 text-green-800";
    case "Cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const OrderDetail = () => {
  const { orderId } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  
  // In a real app, we would fetch the order from an API
  const order = orderData[orderId];
  
  if (!order) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <p className="mb-6">The order you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/orders">Back to Orders</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Button asChild variant="ghost" size="sm">
            <Link to="/orders">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Orders
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center">
            <div className="mr-3">
              <ShoppingCart size={24} className="text-brand-blue" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold">{order.id}</h1>
                <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusBadgeColor(order.status)}`}>
                  <StatusIcon status={order.status} />
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Placed on {formatDate(order.date)} • {order.items.length} items
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Printer className="h-4 w-4" /> Print Invoice
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <FileText className="h-4 w-4" /> Shipping Label
            </Button>
            <Button size="sm" className="bg-brand-blue hover:bg-brand-blue/90">
              Update Status
            </Button>
          </div>
        </div>
      </div>
      
      {/* Order Content */}
      <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="details">Order Details</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4">
          {/* Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Customer Info */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Customer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-semibold">{order.customer.name}</p>
                <p className="text-xs text-gray-500">{order.customer.email}</p>
                <p className="text-xs text-gray-500">{order.customer.phone}</p>
              </CardContent>
            </Card>
            
            {/* Shipping Info */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{order.shipping_address.street}</p>
                <p className="text-sm">
                  {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip}
                </p>
                <p className="text-sm">{order.shipping_address.country}</p>
              </CardContent>
            </Card>
            
            {/* Payment Info */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.payment.status === "Paid" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {order.payment.status}
                  </span>
                </p>
                <p className="text-sm mt-2">{order.payment.method}</p>
                <p className="text-xs text-gray-500">
                  {order.payment.method === "Credit Card" && `Ending in ${order.payment.last4}`}
                </p>
                <p className="text-xs text-gray-500">Transaction: {order.payment.transaction}</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs font-semibold">Item</TableHead>
                    <TableHead className="text-xs font-semibold">SKU</TableHead>
                    <TableHead className="text-xs font-semibold text-right">Quantity</TableHead>
                    <TableHead className="text-xs font-semibold text-right">Unit Price</TableHead>
                    <TableHead className="text-xs font-semibold text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-sm font-medium">{item.name}</TableCell>
                      <TableCell className="text-sm">{item.sku}</TableCell>
                      <TableCell className="text-sm text-right">{item.quantity}</TableCell>
                      <TableCell className="text-sm text-right">${item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-sm text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-4 border-t pt-4">
                <div className="space-y-1 w-full max-w-xs ml-auto">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>${order.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold pt-2 border-t">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Tracking Info */}
          {order.tracking && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tracking Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                  <div>
                    <p className="text-sm font-semibold">Tracking Number</p>
                    <p className="text-sm">{order.tracking.number}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Carrier</p>
                    <p className="text-sm">{order.tracking.carrier}</p>
                  </div>
                  <div className="sm:ml-auto">
                    <Button asChild variant="outline" size="sm">
                      <a href={order.tracking.url} target="_blank" rel="noopener noreferrer">
                        Track Package
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.history.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`rounded-full p-1 ${getStatusBadgeColor(event.status)}`}>
                        <StatusIcon status={event.status} />
                      </div>
                      {index < order.history.length - 1 && (
                        <div className="w-px h-full bg-gray-200 my-1" />
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeColor(event.status)}`}>
                          {event.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(event.date)}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{event.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Order Notes</CardTitle>
            </CardHeader>
            <CardContent>
              {order.notes ? (
                <p className="text-sm">{order.notes}</p>
              ) : (
                <p className="text-sm text-gray-500">No notes available for this order.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default OrderDetail;
