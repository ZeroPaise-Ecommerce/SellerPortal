
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users, Search, Plus, ChevronRight, Eye, Download, FilterX } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const customersData = [
  {
    id: "CUST-1001",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+91 98765 43210",
    city: "Mumbai",
    orders: 8,
    spent: 1245.65,
    rewards: 125,
    status: "Active",
    joined: "2023-01-15",
    lastOrder: "2023-04-12",
  },
  {
    id: "CUST-1002",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+91 87654 32109",
    city: "Delhi",
    orders: 12,
    spent: 3456.78,
    rewards: 346,
    status: "Active",
    joined: "2022-11-05",
    lastOrder: "2023-05-01",
  },
  {
    id: "CUST-1003",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+91 76543 21098",
    city: "Bangalore",
    orders: 3,
    spent: 567.32,
    rewards: 57,
    status: "Active",
    joined: "2023-03-20",
    lastOrder: "2023-04-28",
  },
  {
    id: "CUST-1004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+91 65432 10987",
    city: "Chennai",
    orders: 0,
    spent: 0,
    rewards: 0,
    status: "Inactive",
    joined: "2023-04-01",
    lastOrder: null,
  },
  {
    id: "CUST-1005",
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+91 54321 09876",
    city: "Hyderabad",
    orders: 5,
    spent: 1089.45,
    rewards: 109,
    status: "Active",
    joined: "2022-12-10",
    lastOrder: "2023-03-15",
  },
  {
    id: "CUST-1006",
    name: "Jennifer Taylor",
    email: "jennifer.t@example.com",
    phone: "+91 43210 98765",
    city: "Pune",
    orders: 2,
    spent: 389.98,
    rewards: 39,
    status: "Active",
    joined: "2023-02-18",
    lastOrder: "2023-02-25",
  },
];

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  mobile: z.string().min(10, "Valid mobile number is required"),
  email: z.string().email("Invalid email address"),
  isBusinessCustomer: z.boolean().default(false),
  companyName: z.string().optional(),
  gstNumber: z.string().optional(),
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  pincode: z.string().min(6, "Valid PIN code is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required").default("India"),
  shippingSameAsBilling: z.boolean().default(true),
  shippingAddressLine1: z.string().optional(),
  shippingAddressLine2: z.string().optional(),
  shippingCity: z.string().optional(),
  shippingPincode: z.string().optional(),
  shippingState: z.string().optional(),
  shippingCountry: z.string().optional().default("India"),
});

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", 
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", 
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [addCustomerOpen, setAddCustomerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [joinedDateFrom, setJoinedDateFrom] = useState<Date | null>(null);
  const [joinedDateTo, setJoinedDateTo] = useState<Date | null>(null);
  const [lastOrderFrom, setLastOrderFrom] = useState<Date | null>(null);
  const [lastOrderTo, setLastOrderTo] = useState<Date | null>(null);
  const [spentMin, setSpentMin] = useState<string>("");
  const [spentMax, setSpentMax] = useState<string>("");

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      isBusinessCustomer: false,
      addressLine1: "",
      addressLine2: "",
      city: "",
      pincode: "",
      state: "",
      country: "India",
      shippingSameAsBilling: true,
    },
  });
  
  const isBusinessCustomer = form.watch("isBusinessCustomer");
  const shippingSameAsBilling = form.watch("shippingSameAsBilling");

  // Handle address autofill
  const handleCopyAddress = () => {
    const { addressLine1, addressLine2, city, pincode, state, country } = form.getValues();
    
    form.setValue("shippingAddressLine1", addressLine1);
    form.setValue("shippingAddressLine2", addressLine2 || "");
    form.setValue("shippingCity", city);
    form.setValue("shippingPincode", pincode);
    form.setValue("shippingState", state);
    form.setValue("shippingCountry", country);
  };

  // Filter customers based on all criteria
  const filteredCustomers = customersData.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = 
      statusFilter === null || 
      (statusFilter === 'active' && customer.status === 'Active') ||
      (statusFilter === 'inactive' && customer.status === 'Inactive');
    
    // Joined date filter
    const customerJoinedDate = new Date(customer.joined);
    const matchesJoinedDate = 
      (!joinedDateFrom || customerJoinedDate >= joinedDateFrom) &&
      (!joinedDateTo || customerJoinedDate <= joinedDateTo);
    
    // Last order date filter
    const customerLastOrderDate = customer.lastOrder ? new Date(customer.lastOrder) : null;
    const matchesLastOrderDate = 
      (!lastOrderFrom || !customerLastOrderDate || customerLastOrderDate >= lastOrderFrom) &&
      (!lastOrderTo || !customerLastOrderDate || customerLastOrderDate <= lastOrderTo);
    
    // Spending range filter
    const matchesSpentRange = 
      (spentMin === "" || customer.spent >= parseFloat(spentMin)) &&
      (spentMax === "" || customer.spent <= parseFloat(spentMax));
    
    return matchesSearch && matchesStatus && matchesJoinedDate && matchesLastOrderDate && matchesSpentRange;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toggle select all customers
  const toggleSelectAll = () => {
    if (selectedCustomers.length === paginatedCustomers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(paginatedCustomers.map(customer => customer.id));
    }
  };

  // Toggle select individual customer
  const toggleSelectCustomer = (customerId: string) => {
    if (selectedCustomers.includes(customerId)) {
      setSelectedCustomers(selectedCustomers.filter(id => id !== customerId));
    } else {
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
  };

  // Add new customer
  const onSubmitCustomer = (data: z.infer<typeof formSchema>) => {
    console.log("Submitting customer data:", data);
    toast({
      title: "Customer Added",
      description: `${data.firstName} ${data.lastName} has been added successfully.`,
    });
    setAddCustomerOpen(false);
    form.reset();
  };

  // Reset filters
  const clearFilters = () => {
    setStatusFilter(null);
    setJoinedDateFrom(null);
    setJoinedDateTo(null);
    setLastOrderFrom(null);
    setLastOrderTo(null);
    setSpentMin("");
    setSpentMax("");
  };

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "—";
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center">
        <div className="mr-3">
          <Users size={24} className="text-brand-blue" />
        </div>
        <div>
          <h1 className="text-lg font-bold">Customers</h1>
          <p className="text-sm text-gray-500">Manage your customer base</p>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-md border">
              <p className="text-sm text-gray-500">Total Customers</p>
              <p className="text-lg font-bold">3,245</p>
              <p className="text-xs text-green-500">+125 this month</p>
            </div>
            <div className="bg-white p-4 rounded-md border">
              <p className="text-sm text-gray-500">Active Customers</p>
              <p className="text-lg font-bold">2,845</p>
              <p className="text-xs text-green-500">87.6% of total</p>
            </div>
            <div className="bg-white p-4 rounded-md border">
              <p className="text-sm text-gray-500">Average Spend</p>
              <p className="text-lg font-bold">₹246.88</p>
              <p className="text-xs text-green-500">+12.3% this month</p>
            </div>
            <div className="bg-white p-4 rounded-md border">
              <p className="text-sm text-gray-500">New Customers</p>
              <p className="text-lg font-bold">125</p>
              <p className="text-xs text-green-500">+18% this month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 gap-3">
            <div className="flex gap-3 w-full sm:w-auto">
              {/* Status filter */}
              <Select value={statusFilter || "all"} onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}>
                <SelectTrigger className="w-[120px] h-9">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              {/* Joined date filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="h-9 justify-start text-left">
                    {joinedDateFrom && joinedDateTo
                      ? `${format(joinedDateFrom, "dd/MM/yyyy")} - ${format(joinedDateTo, "dd/MM/yyyy")}`
                      : joinedDateFrom
                      ? `After ${format(joinedDateFrom, "dd/MM/yyyy")}`
                      : joinedDateTo
                      ? `Before ${format(joinedDateTo, "dd/MM/yyyy")}`
                      : "Joined Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="p-3 flex flex-col gap-2">
                    <h3 className="font-medium text-sm">Joined Date</h3>
                    <div className="flex gap-2">
                      <div>
                        <p className="text-xs mb-1">From</p>
                        <Calendar
                          mode="single"
                          selected={joinedDateFrom || undefined}
                          onSelect={setJoinedDateFrom}
                          disabled={(date) => joinedDateTo ? date > joinedDateTo : false}
                          className="rounded-md border"
                        />
                      </div>
                      <div>
                        <p className="text-xs mb-1">To</p>
                        <Calendar
                          mode="single"
                          selected={joinedDateTo || undefined}
                          onSelect={setJoinedDateTo}
                          disabled={(date) => joinedDateFrom ? date < joinedDateFrom : false}
                          className="rounded-md border"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setJoinedDateFrom(null);
                          setJoinedDateTo(null);
                        }}
                      >
                        Clear
                      </Button>
                      <Button size="sm">Apply</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Last order date filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="h-9 justify-start text-left">
                    {lastOrderFrom && lastOrderTo
                      ? `${format(lastOrderFrom, "dd/MM/yyyy")} - ${format(lastOrderTo, "dd/MM/yyyy")}`
                      : lastOrderFrom
                      ? `After ${format(lastOrderFrom, "dd/MM/yyyy")}`
                      : lastOrderTo
                      ? `Before ${format(lastOrderTo, "dd/MM/yyyy")}`
                      : "Last Order"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="p-3 flex flex-col gap-2">
                    <h3 className="font-medium text-sm">Last Order Date</h3>
                    <div className="flex gap-2">
                      <div>
                        <p className="text-xs mb-1">From</p>
                        <Calendar
                          mode="single"
                          selected={lastOrderFrom || undefined}
                          onSelect={setLastOrderFrom}
                          disabled={(date) => lastOrderTo ? date > lastOrderTo : false}
                          className="rounded-md border"
                        />
                      </div>
                      <div>
                        <p className="text-xs mb-1">To</p>
                        <Calendar
                          mode="single"
                          selected={lastOrderTo || undefined}
                          onSelect={setLastOrderTo}
                          disabled={(date) => lastOrderFrom ? date < lastOrderFrom : false}
                          className="rounded-md border"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setLastOrderFrom(null);
                          setLastOrderTo(null);
                        }}
                      >
                        Clear
                      </Button>
                      <Button size="sm">Apply</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Spending range filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="h-9 justify-start text-left">
                    {spentMin && spentMax
                      ? `₹${spentMin} - ₹${spentMax}`
                      : spentMin
                      ? `Min ₹${spentMin}`
                      : spentMax
                      ? `Max ₹${spentMax}`
                      : "Spent Amount"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3" align="start">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium text-sm">Spending Range (₹)</h3>
                    <div className="flex gap-2">
                      <div>
                        <Input
                          type="number"
                          placeholder="Min"
                          className="w-24"
                          value={spentMin}
                          onChange={(e) => setSpentMin(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center">
                        <span className="px-2">to</span>
                      </div>
                      <div>
                        <Input
                          type="number"
                          placeholder="Max"
                          className="w-24"
                          value={spentMax}
                          onChange={(e) => setSpentMax(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSpentMin("");
                          setSpentMax("");
                        }}
                      >
                        Clear
                      </Button>
                      <Button size="sm">Apply</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Clear filters button */}
              {(statusFilter !== null || joinedDateFrom || joinedDateTo || lastOrderFrom || lastOrderTo || spentMin || spentMax) && (
                <Button 
                  variant="outline" 
                  className="h-9"
                  onClick={clearFilters}
                >
                  <FilterX className="h-4 w-4 mr-1" /> Clear
                </Button>
              )}
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-auto">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search customers..."
                  className="pl-8 text-sm h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button size="sm" className="bg-brand-blue hover:bg-brand-dark-blue h-9" onClick={() => setAddCustomerOpen(true)}>
                <Plus className="h-4 w-4 mr-1" /> Add Customer
              </Button>
              
              {selectedCustomers.length > 0 && (
                <Button size="sm" className="h-9" variant="outline">
                  <Download className="h-4 w-4 mr-1" /> Export {selectedCustomers.length}
                </Button>
              )}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8 text-xs font-semibold">
                    <Checkbox 
                      checked={paginatedCustomers.length > 0 && selectedCustomers.length === paginatedCustomers.length}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-xs font-semibold">ID</TableHead>
                  <TableHead className="text-xs font-semibold">Name</TableHead>
                  <TableHead className="text-xs font-semibold">Mobile</TableHead>
                  <TableHead className="text-xs font-semibold">Email</TableHead>
                  <TableHead className="text-xs font-semibold">City</TableHead>
                  <TableHead className="text-xs font-semibold">Orders</TableHead>
                  <TableHead className="text-xs font-semibold">Total Spent</TableHead>
                  <TableHead className="text-xs font-semibold">Reward Points</TableHead>
                  <TableHead className="text-xs font-semibold">Status</TableHead>
                  <TableHead className="text-xs font-semibold">Last Order</TableHead>
                  <TableHead className="text-xs font-semibold w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCustomers.map((customer) => (
                  <TableRow key={customer.id} className="cursor-pointer hover:bg-gray-50">
                    <TableCell className="text-xs">
                      <Checkbox 
                        checked={selectedCustomers.includes(customer.id)}
                        onCheckedChange={() => toggleSelectCustomer(customer.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </TableCell>
                    <TableCell className="text-xs">{customer.id}</TableCell>
                    <TableCell className="text-xs font-medium">{customer.name}</TableCell>
                    <TableCell className="text-xs">{customer.phone}</TableCell>
                    <TableCell className="text-xs">{customer.email}</TableCell>
                    <TableCell className="text-xs">{customer.city}</TableCell>
                    <TableCell className="text-xs">{customer.orders}</TableCell>
                    <TableCell className="text-xs">₹{customer.spent.toFixed(2)}</TableCell>
                    <TableCell className="text-xs">{customer.rewards}</TableCell>
                    <TableCell className="text-xs">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          customer.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs">{formatDate(customer.lastOrder)}</TableCell>
                    <TableCell className="text-right text-xs">
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Showing {Math.min(filteredCustomers.length, 1 + (currentPage - 1) * itemsPerPage)}-{Math.min(filteredCustomers.length, currentPage * itemsPerPage)} of {filteredCustomers.length} results
            </div>
            <div className="flex items-center gap-2">
              <Select
                value={String(itemsPerPage)}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[110px] h-8">
                  <SelectValue placeholder="10 per page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 per page</SelectItem>
                  <SelectItem value="25">25 per page</SelectItem>
                  <SelectItem value="50">50 per page</SelectItem>
                </SelectContent>
              </Select>
              
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNumber = i + 1;
                    const showPage = 
                      pageNumber === 1 || 
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);
                    
                    if (!showPage) {
                      if (pageNumber === 2 || pageNumber === totalPages - 1) {
                        return (
                          <PaginationItem key={i}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      return null;
                    }
                    
                    return (
                      <PaginationItem key={i}>
                        <PaginationLink
                          isActive={pageNumber === currentPage}
                          onClick={() => setCurrentPage(pageNumber)}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Customer Dialog */}
      <Dialog open={addCustomerOpen} onOpenChange={setAddCustomerOpen}>
        <DialogContent className="md:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>
              Enter customer information to create a new account.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitCustomer)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Customer type */}
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="isBusinessCustomer"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Customer Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => field.onChange(value === "business")}
                            defaultValue={field.value ? "business" : "individual"}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="individual" id="individual" />
                              <label htmlFor="individual" className="text-sm font-medium">Individual</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="business" id="business" />
                              <label htmlFor="business" className="text-sm font-medium">Business</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Basic info */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number*</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 98765 43210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address*</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Business information (conditional) */}
                {isBusinessCustomer && (
                  <>
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="ABC Corporation" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="gstNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GST Number*</FormLabel>
                          <FormControl>
                            <Input placeholder="22AAAAA0000A1Z5" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                
                {/* Billing address */}
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium mb-2">Billing Address</h3>
                </div>
                
                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Address Line 1*</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main Street" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="addressLine2"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Address Line 2</FormLabel>
                      <FormControl>
                        <Input placeholder="Apartment, suite, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City*</FormLabel>
                      <FormControl>
                        <Input placeholder="Mumbai" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PIN Code*</FormLabel>
                      <FormControl>
                        <Input placeholder="400001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {indianStates.map(state => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country*</FormLabel>
                      <FormControl>
                        <Input defaultValue="India" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Shipping address */}
                <div className="md:col-span-2 flex items-center justify-between pt-2">
                  <h3 className="text-sm font-medium">Shipping Address</h3>
                  <FormField
                    control={form.control}
                    name="shippingSameAsBilling"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                              if (checked) {
                                handleCopyAddress();
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">Same as billing address</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Shipping address fields (conditional) */}
                {!shippingSameAsBilling && (
                  <>
                    <FormField
                      control={form.control}
                      name="shippingAddressLine1"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Address Line 1*</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main Street" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="shippingAddressLine2"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Address Line 2</FormLabel>
                          <FormControl>
                            <Input placeholder="Apartment, suite, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="shippingCity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City*</FormLabel>
                          <FormControl>
                            <Input placeholder="Mumbai" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="shippingPincode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PIN Code*</FormLabel>
                          <FormControl>
                            <Input placeholder="400001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="shippingState"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {indianStates.map(state => (
                                <SelectItem key={state} value={state}>{state}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="shippingCountry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country*</FormLabel>
                          <FormControl>
                            <Input defaultValue="India" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setAddCustomerOpen(false)}>Cancel</Button>
                <Button type="submit">Add Customer</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Customers;

