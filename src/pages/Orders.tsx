import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  Search, 
  ChevronDown, 
  Plus, 
  Eye, 
  Pen,
  Check,
  Clock,
  Truck,
  Package,
  X,
  Loader,
  FileText,
  FileUp,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { type DateRange } from "react-day-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Extended order data with the new fields
const ordersData = [
  {
    id: "ORD-7652",
    product: "Premium Headphones",
    customer: "John Smith",
    date: new Date(2023, 4, 7, 14, 30), // May 7, 2023, 2:30 PM
    items: 3,
    total: 149.97,
    status: "Delivered",
    payment: "Paid",
    paymentMode: "Online",
    source: "Website"
  },
  {
    id: "ORD-7651",
    product: "Wireless Mouse",
    customer: "Emily Johnson",
    date: new Date(2023, 4, 7, 10, 15), // May 7, 2023, 10:15 AM
    items: 2,
    total: 89.98,
    status: "Processing",
    payment: "Paid",
    paymentMode: "COD",
    source: "Android App"
  },
  {
    id: "ORD-7650",
    product: "Gaming Monitor",
    customer: "Michael Williams",
    date: new Date(2023, 4, 6, 16, 45), // May 6, 2023, 4:45 PM
    items: 1,
    total: 299.99,
    status: "Shipped",
    payment: "Paid",
    paymentMode: "Online",
    source: "Website"
  },
  {
    id: "ORD-7649",
    product: "Mechanical Keyboard",
    customer: "Jessica Brown",
    date: new Date(2023, 4, 6, 9, 20), // May 6, 2023, 9:20 AM
    items: 4,
    total: 215.96,
    status: "Delivered",
    payment: "Paid",
    paymentMode: "Online",
    source: "iOS App"
  },
  {
    id: "ORD-7648",
    product: "USB-C Hub",
    customer: "David Jones",
    date: new Date(2023, 4, 5, 13, 10), // May 5, 2023, 1:10 PM
    items: 2,
    total: 79.98,
    status: "Cancelled",
    payment: "Refunded",
    paymentMode: "Online",
    source: "Amazon"
  },
  {
    id: "ORD-7647",
    product: "Smart Watch",
    customer: "Sarah Miller",
    date: new Date(2023, 4, 5, 11, 5), // May 5, 2023, 11:05 AM
    items: 5,
    total: 359.95,
    status: "Processing",
    payment: "Paid",
    paymentMode: "Online",
    source: "Flipkart"
  },
  {
    id: "ORD-7646",
    product: "Bluetooth Speaker",
    customer: "Thomas Davis",
    date: new Date(2023, 4, 4, 15, 30), // May 4, 2023, 3:30 PM
    items: 1,
    total: 149.99,
    status: "Delivered",
    payment: "Paid",
    paymentMode: "COD",
    source: "Manual"
  },
  {
    id: "ORD-7645",
    product: "Desk Lamp",
    customer: "Jennifer Wilson",
    date: new Date(2023, 4, 4, 9, 45), // May 4, 2023, 9:45 AM
    items: 3,
    total: 89.97,
    status: "Pending",
    payment: "Pending",
    paymentMode: "COD",
    source: "Myntra"
  },
  {
    id: "ORD-7644",
    product: "Office Chair",
    customer: "Robert Taylor",
    date: new Date(2023, 4, 3, 14, 15), // May 3, 2023, 2:15 PM
    items: 1,
    total: 199.99,
    status: "Confirmed",
    payment: "Paid",
    paymentMode: "Online",
    source: "Website"
  },
  {
    id: "ORD-7643",
    product: "Laptop Stand",
    customer: "Lisa Anderson",
    date: new Date(2023, 4, 3, 10, 30), // May 3, 2023, 10:30 AM
    items: 2,
    total: 59.98,
    status: "Pickup",
    payment: "Paid",
    paymentMode: "COD",
    source: "Meesho"
  },
];

// Status icon mapping
const StatusIcon = ({ status }) => {
  switch (status) {
    case "Pending":
      return <Loader className="h-4 w-4 text-yellow-500" />;
    case "Confirmed":
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

// Format date relative to now (e.g., "1 hour ago")
const getRelativeTime = (date) => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime(); // Fix: Use getTime() to get numeric value
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);

  // Only show relative time for the last 24 hours
  if (diffHours < 24) {
    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} min${diffMinutes === 1 ? '' : 's'} ago`;
    return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  }
  
  return format(date, "MMM d, yyyy");
};

// Source badge color mapping
const getSourceBadgeColor = (source) => {
  switch (source) {
    case "Website":
      return "bg-blue-100 text-blue-800";
    case "Android App":
      return "bg-green-100 text-green-800";
    case "iOS App":
      return "bg-purple-100 text-purple-800";
    case "Amazon":
      return "bg-yellow-100 text-yellow-800";
    case "Flipkart":
      return "bg-indigo-100 text-indigo-800";
    case "Myntra":
      return "bg-pink-100 text-pink-800";
    case "Meesho":
      return "bg-red-100 text-red-800";
    case "Manual":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Status badge color mapping
const getStatusBadgeColor = (status) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Confirmed":
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

// Items per page options
const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50];

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedSources, setSelectedSources] = useState([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({ from: undefined, to: undefined });
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
  const [orderToUpdate, setOrderToUpdate] = useState(null);

  // Filter orders based on search query and filters
  const filteredOrders = ordersData.filter(
    (order) => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.product.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = selectedStatus ? order.status === selectedStatus : true;
      const matchesPayment = selectedPayment ? order.payment === selectedPayment : true;
      
      const matchesSource = selectedSources.length > 0 
        ? selectedSources.includes(order.source) 
        : true;
      
      let matchesDate = true;
      if (dateRange?.from && dateRange?.to) {
        const orderDate = new Date(order.date);
        matchesDate = 
          orderDate >= dateRange.from && 
          orderDate <= dateRange.to;
      }
      
      return matchesSearch && matchesStatus && matchesPayment && matchesSource && matchesDate;
    }
  );

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle status filter click
  const handleStatusFilter = (status) => {
    setSelectedStatus(selectedStatus === status ? "" : status);
    setCurrentPage(1);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedStatus("");
    setSelectedPayment("");
    setSelectedSources([]);
    setDateRange(undefined);
    setCurrentPage(1);
  };

  // Handle bulk select
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedOrders(paginatedOrders.map(order => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  // Handle individual order selection
  const handleSelectOrder = (orderId, checked) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId]);
    } else {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    }
  };

  // Handle order status update
  const handleOrderStatusUpdate = (orderId, newStatus) => {
    // This function would update the order status in a real application
    console.log(`Updating order ${orderId} status to ${newStatus}`);
    setIsUpdateStatusOpen(false);
  };

  // All available sources
  const allSources = ["Website", "Android App", "iOS App", "Amazon", "Flipkart", "Myntra", "Meesho", "Manual"];
  
  // All available payment statuses
  const allPaymentStatuses = ["Paid", "Pending", "Refunded"];

  // All available order statuses
  const allOrderStatuses = ["Pending", "Confirmed", "Processing", "Pickup", "Shipped", "Delivered", "Cancelled"];

  // Handle source filter selection
  const handleSourceFilter = (source) => {
    if (selectedSources.includes(source)) {
      setSelectedSources(selectedSources.filter(s => s !== source));
    } else {
      setSelectedSources([...selectedSources, source]);
    }
    setCurrentPage(1);
  };

  // Handle payment status filter
  const handlePaymentFilter = (status) => {
    setSelectedPayment(selectedPayment === status ? "" : status);
    setCurrentPage(1);
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center">
        <div className="mr-3">
          <ShoppingCart size={24} className="text-brand-blue" />
        </div>
        <div>
          <h1 className="text-lg font-bold">Orders</h1>
          <p className="text-sm text-gray-500">Manage your customer orders</p>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-md border">
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-lg font-bold">1,248</p>
              <p className="text-xs text-green-500">+18% this month</p>
            </div>
            <div className="bg-white p-4 rounded-md border">
              <p className="text-sm text-gray-500">Processing</p>
              <p className="text-lg font-bold">43</p>
              <p className="text-xs text-yellow-500">-5% this month</p>
            </div>
            <div className="bg-white p-4 rounded-md border">
              <p className="text-sm text-gray-500">Shipped</p>
              <p className="text-lg font-bold">28</p>
              <p className="text-xs text-green-500">+12% this month</p>
            </div>
            <div className="bg-white p-4 rounded-md border">
              <p className="text-sm text-gray-500">Delivered</p>
              <p className="text-lg font-bold">1,152</p>
              <p className="text-xs text-green-500">+24% this month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3">
          <div className="flex justify-between w-full">
            <CardTitle className="text-base font-semibold">Recent Orders</CardTitle>
            <Button
              size="sm"
              className="bg-brand-blue hover:bg-brand-blue/90 text-xs px-3 py-1"
              asChild
            >
              <Link to="/new-order">
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Order
              </Link>
            </Button>
          </div>
        </CardHeader>

        <div className="px-6 pb-2">
          <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto">
            <Button
              key="all"
              size="sm"
              variant={!selectedStatus ? "default" : "outline"}
              className={`text-xs ${!selectedStatus ? "bg-brand-blue hover:bg-brand-blue/90" : ""}`}
              onClick={() => handleStatusFilter("")}
            >
              All Orders
            </Button>
            {allOrderStatuses.map((status) => (
              <Button
                key={status}
                size="sm"
                variant={selectedStatus === status ? "default" : "outline"}
                className={`text-xs ${selectedStatus === status ? "bg-brand-blue hover:bg-brand-blue/90" : ""}`}
                onClick={() => handleStatusFilter(status)}
              >
                {status === "Pending" && <Loader className="h-3 w-3 mr-1" />}
                {status === "Confirmed" && <Check className="h-3 w-3 mr-1" />}
                {status === "Processing" && <Clock className="h-3 w-3 mr-1" />}
                {status === "Pickup" && <Package className="h-3 w-3 mr-1" />}
                {status === "Shipped" && <Truck className="h-3 w-3 mr-1" />}
                {status === "Delivered" && <Check className="h-3 w-3 mr-1" />}
                {status === "Cancelled" && <X className="h-3 w-3 mr-1" />}
                {status}
              </Button>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 mb-4 items-start sm:items-center">
            <div className="relative flex-1 sm:flex-auto">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search orders..."
                className="pl-8 text-sm h-9 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto flex-wrap">
              {/* Date Range Filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    {dateRange?.from && dateRange?.to ? (
                      `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d")}`
                    ) : (
                      <>Date <ChevronDown className="ml-1 h-4 w-4" /></>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                  <div className="p-3 border-t flex justify-between">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setDateRange(undefined)}
                    >
                      Clear
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => document.body.click()} // Close popover
                    >
                      Apply
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Payment Status Filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    Payment <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-3" align="start">
                  <div className="space-y-2">
                    {allPaymentStatuses.map((status) => (
                      <div key={status} className="flex items-center">
                        <Checkbox 
                          id={`payment-${status}`} 
                          checked={selectedPayment === status}
                          onCheckedChange={() => handlePaymentFilter(status)}
                        />
                        <label 
                          htmlFor={`payment-${status}`} 
                          className="ml-2 text-sm"
                        >
                          {status}
                        </label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Source Filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    Source <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-3" align="start">
                  <div className="space-y-2">
                    {allSources.map((source) => (
                      <div key={source} className="flex items-center">
                        <Checkbox 
                          id={`source-${source}`} 
                          checked={selectedSources.includes(source)}
                          onCheckedChange={() => handleSourceFilter(source)}
                        />
                        <label 
                          htmlFor={`source-${source}`} 
                          className="ml-2 text-sm"
                        >
                          {source}
                        </label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Clear Filters Button */}
              <Button 
                variant="outline" 
                size="sm" 
                className="h-9"
                onClick={clearAllFilters}
              >
                Clear Filters
              </Button>
            </div>
          </div>
          
          {/* Export Options - Only show when orders are selected */}
          {selectedOrders.length > 0 && (
            <div className="mb-4 flex gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                <FileUp className="h-3.5 w-3.5 mr-1" /> Export
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <FileText className="h-3.5 w-3.5 mr-1" /> Print Invoice
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <FileText className="h-3.5 w-3.5 mr-1" /> Shipping Label
              </Button>
            </div>
          )}
        </div>
        
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30px]">
                    <Checkbox 
                      onCheckedChange={handleSelectAll} 
                      checked={selectedOrders.length === paginatedOrders.length && paginatedOrders.length > 0}
                    />
                  </TableHead>
                  <TableHead className="text-xs font-semibold">Order ID</TableHead>
                  <TableHead className="text-xs font-semibold">Product</TableHead>
                  <TableHead className="text-xs font-semibold">Items</TableHead>
                  <TableHead className="text-xs font-semibold">Customer</TableHead>
                  <TableHead className="text-xs font-semibold">Date</TableHead>
                  <TableHead className="text-xs font-semibold">Total</TableHead>
                  <TableHead className="text-xs font-semibold">Source</TableHead>
                  <TableHead className="text-xs font-semibold">Status</TableHead>
                  <TableHead className="text-xs font-semibold">Payment Mode</TableHead>
                  <TableHead className="text-xs font-semibold">Payment</TableHead>
                  <TableHead className="text-xs font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={12} className="text-center py-6">
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedOrders.map((order) => (
                    <TableRow key={order.id} className="cursor-pointer hover:bg-gray-50">
                      <TableCell>
                        <Checkbox 
                          checked={selectedOrders.includes(order.id)}
                          onCheckedChange={(checked) => handleSelectOrder(order.id, checked)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </TableCell>
                      <TableCell className="text-xs font-medium">
                        <Link to={`/orders/${order.id}`} className="text-brand-blue hover:underline">
                          {order.id}
                        </Link>
                      </TableCell>
                      <TableCell className="text-xs">{order.product}</TableCell>
                      <TableCell className="text-xs">{order.items}</TableCell>
                      <TableCell className="text-xs">{order.customer}</TableCell>
                      <TableCell className="text-xs">{getRelativeTime(order.date)}</TableCell>
                      <TableCell className="text-xs">₹{order.total.toFixed(2)}</TableCell>
                      <TableCell className="text-xs">
                        <span className={`px-2 py-1 rounded-full text-xs ${getSourceBadgeColor(order.source)}`}>
                          {order.source}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs">
                        <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 w-fit ${getStatusBadgeColor(order.status)}`}>
                          <StatusIcon status={order.status} />
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs">
                        <span className={`px-2 py-1 rounded-full text-xs ${order.paymentMode === "COD" ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800"}`}>
                          {order.paymentMode}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            order.payment === "Paid"
                              ? "bg-green-100 text-green-800"
                              : order.payment === "Refunded"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.payment}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                            <Link to={`/orders/${order.id}`}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => {
                              setOrderToUpdate(order);
                              setIsUpdateStatusOpen(true);
                            }}
                          >
                            <Pen className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          {filteredOrders.length > 0 && (
            <div className="py-4 flex flex-col sm:flex-row justify-between items-center px-4">
              <div className="flex items-center gap-2 mb-4 sm:mb-0">
                <span className="text-xs text-gray-500">Items per page:</span>
                <Select
                  value={String(itemsPerPage)}
                  onValueChange={(value) => {
                    setItemsPerPage(Number(value));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue placeholder={itemsPerPage} />
                  </SelectTrigger>
                  <SelectContent>
                    {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                      <SelectItem key={option} value={String(option)}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-xs text-gray-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1}-
                  {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of{" "}
                  {filteredOrders.length}
                </span>
              </div>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {/* ... keep existing code (pagination UI) */}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Status Update Dialog */}
      <Dialog open={isUpdateStatusOpen} onOpenChange={setIsUpdateStatusOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Change the status for order {orderToUpdate?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select 
              defaultValue={orderToUpdate?.status}
              onValueChange={(value) => handleOrderStatusUpdate(orderToUpdate?.id, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                {allOrderStatuses.map((status) => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsUpdateStatusOpen(false)}>Cancel</Button>
            <Button onClick={() => handleOrderStatusUpdate(orderToUpdate?.id, orderToUpdate?.status)}>Update</Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Orders;
