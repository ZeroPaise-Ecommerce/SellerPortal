import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Edit, Eye, FileDown, X, Calendar, Ticket } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import api from "@/api"; // path to your api.ts

const Coupons = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState(null);
  const [endDateFilter, setEndDateFilter] = useState(null);
  
  // State for table
  const [selectedCoupons, setSelectedCoupons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // State for create coupon modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Check if any filter is applied
  const isAnyFilterApplied = !!statusFilter || !!typeFilter || !!startDateFilter || !!endDateFilter;
  
  // State for coupons
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    activeCouponsCount: 0,
    totalRedemptions: 0,
    totalSavings: 0,
    avgDiscount: 0,
  });

  const fetchCoupons = () => {
    setLoading(true);
    api.get("/coupons")
      .then(res => setCoupons(res.data))
      .catch(err => {
        // handle error, show toast, etc.
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  useEffect(() => {
    api.get("/coupons/stats")
      .then(res => setStats(res.data))
      .catch(() => setStats({
        activeCouponsCount: 0,
        totalRedemptions: 0,
        totalSavings: 0,
        avgDiscount: 0,
      }));
  }, []);
  
  // Apply filters to coupons data
  const filteredCoupons = coupons.filter((coupon) => {
    // Search by code or name
    const matchesSearch = searchQuery === "" || 
                          coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          coupon.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesStatus = !statusFilter || coupon.status === statusFilter;
    
    // Filter by type
    const matchesType = !typeFilter || coupon.type === typeFilter;
    
    // Filter by start date
    const couponStartDate = new Date(coupon.startDate);
    const matchesStartDate = !startDateFilter || couponStartDate >= startDateFilter;
    
    // Filter by end date
    const couponEndDate = new Date(coupon.endDate);
    const matchesEndDate = !endDateFilter || couponEndDate <= endDateFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesStartDate && matchesEndDate;
  });
  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCoupons.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage);
  
  // Handler for select all checkbox
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedCoupons(currentItems.map(coupon => coupon.id));
    } else {
      setSelectedCoupons([]);
    }
  };
  
  // Handler for checkbox selection
  const handleSelectCoupon = (checked, id) => {
    if (checked) {
      setSelectedCoupons([...selectedCoupons, id]);
    } else {
      setSelectedCoupons(selectedCoupons.filter(couponId => couponId !== id));
    }
  };
  
  // Handler for export selected
  const handleExportSelected = () => {
    toast({
      title: "Export Started",
      description: `Exporting ${selectedCoupons.length} coupons`,
    });
    // In a real app, this would trigger a download
    console.log("Exporting coupons:", selectedCoupons);
  };
  
  // Handler for clearing filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("");
    setTypeFilter("");
    setStartDateFilter(null);
    setEndDateFilter(null);
  };
  
  // Handler for viewing coupon details
  const handleViewCoupon = (couponId) => {
    // In a real app, this would navigate to the coupon detail page
    navigate(`/coupons/${couponId}`);
  };

  const handleCreateCoupon = (data) => {
    api.post("/coupons", {
      ...data,
      // tenantId will be set by backend from header, but you can include it for completeness
    })
      .then(res => {
        setCoupons(prev => [...prev, res.data]);
        // close modal, show toast, etc.
      })
      .catch(err => {
        // handle error
      });
  };

  const handleUpdateCoupon = (couponId, updatedData) => {
    api.put(`/coupons/${couponId}`, updatedData)
      .then(res => {
        setCoupons(prev => prev.map(coupon =>
          coupon.id === couponId ? res.data : coupon
        ));
        toast({
          title: "Coupon Updated",
          description: `Coupon ${couponId} has been updated successfully`,
        });
      })
      .catch(err => {
        toast({
          title: "Error",
          description: `Failed to update coupon ${couponId}: ${err.message}`,
          variant: "destructive",
        });
      });
  };

  const handleDeleteCoupon = (couponId) => {
    api.delete(`/coupons/${couponId}`)
      .then(() => {
        setCoupons(prev => prev.filter(coupon => coupon.id !== couponId));
        toast({
          title: "Coupon Deleted",
          description: `Coupon ${couponId} has been deleted successfully`,
        });
      })
      .catch(err => {
        toast({
          title: "Error",
          description: `Failed to delete coupon ${couponId}: ${err.message}`,
          variant: "destructive",
        });
      });
  };

  const formatINR = (amount) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center">
        <div className="mr-3">
          <Ticket size={24} className="text-brand-blue" />
        </div>
        <div>
          <h1 className="text-lg font-bold">Coupons</h1>
          <p className="text-sm text-gray-500">Manage promotional discounts</p>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-md border">
              <p className="text-sm text-gray-500">Active Coupons</p>
              <p className="text-lg font-bold">{stats.activeCouponsCount}</p>
              <p className="text-xs text-gray-500">Currently running</p>
            </div>
            <div className="bg-white p-4 rounded-md border">
              <p className="text-sm text-gray-500">Total Redemptions</p>
              <p className="text-lg font-bold">{stats.totalRedemptions}</p>
              <p className="text-xs text-green-500">+128 this month</p>
            </div>
            <div className="bg-white p-4 rounded-md border">
              <p className="text-sm text-gray-500">Total Savings</p>
              <p className="text-lg font-bold">{formatINR(stats.totalSavings)}</p>
              <p className="text-xs text-gray-500">All time</p>
            </div>
            <div className="bg-white p-4 rounded-md border">
              <p className="text-sm text-gray-500">Avg. Discount</p>
              <p className="text-lg font-bold">{stats.avgDiscount}%</p>
              <p className="text-xs text-blue-500">Per order</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
            <CardTitle className="text-base font-semibold">Coupon Management</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto mt-3 sm:mt-0">
              <div className="relative flex-1 sm:flex-auto">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search coupons..."
                  className="pl-8 text-sm h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                size="sm" 
                className="bg-brand-blue hover:bg-brand-dark-blue h-9"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-1" /> Create Coupon
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] h-9">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            
            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px] h-9">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Percentage">Percentage</SelectItem>
                  <SelectItem value="Fixed Amount">Fixed Amount</SelectItem>
                  <SelectItem value="Free Shipping">Free Shipping</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            
            {/* Start Date Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-9 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {startDateFilter ? format(startDateFilter, "PPP") : "Start Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={startDateFilter}
                  onSelect={setStartDateFilter}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            
            {/* End Date Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-9 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {endDateFilter ? format(endDateFilter, "PPP") : "End Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={endDateFilter}
                  onSelect={setEndDateFilter}
                  disabled={(date) => startDateFilter && date < startDateFilter}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            
            {/* Clear Filters button - only show when filters are active */}
            {isAnyFilterApplied && (
              <Button 
                variant="ghost" 
                className="h-9 flex items-center gap-1"
                onClick={handleClearFilters}
              >
                <X className="h-4 w-4" /> Clear Filters
              </Button>
            )}
            
            {/* Export button - only show when coupons are selected */}
            {selectedCoupons.length > 0 && (
              <Button 
                variant="outline" 
                className="h-9 ml-auto"
                onClick={handleExportSelected}
              >
                <FileDown className="h-4 w-4 mr-1" /> Export {selectedCoupons.length} Selected
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px] text-xs font-semibold">
                    <Checkbox 
                      onCheckedChange={handleSelectAll}
                      checked={currentItems.length > 0 && currentItems.length === selectedCoupons.length}
                    />
                  </TableHead>
                  <TableHead className="text-xs font-semibold">ID</TableHead>
                  <TableHead className="text-xs font-semibold">Coupon Code</TableHead>
                  <TableHead className="text-xs font-semibold">Discount</TableHead>
                  <TableHead className="text-xs font-semibold">Type</TableHead>
                  <TableHead className="text-xs font-semibold">Usage</TableHead>
                  <TableHead className="text-xs font-semibold">Start Date</TableHead>
                  <TableHead className="text-xs font-semibold">End Date</TableHead>
                  <TableHead className="text-xs font-semibold">Status</TableHead>
                  <TableHead className="text-xs font-semibold w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((coupon) => (
                  <TableRow key={coupon.id} className="hover:bg-gray-50">
                    <TableCell>
                      <Checkbox 
                        checked={selectedCoupons.includes(coupon.id)}
                        onCheckedChange={(checked) => handleSelectCoupon(checked, coupon.id)}
                      />
                    </TableCell>
                    <TableCell className="text-xs">{coupon.id}</TableCell>
                    <TableCell className="text-xs font-medium">{coupon.code}</TableCell>
                    <TableCell className="text-xs">
                      {coupon.type === "Percentage"
                        ? `${coupon.discount}%`
                        : coupon.type === "Fixed Amount"
                        ? `$${coupon.discount}`
                        : "—"}
                    </TableCell>
                    <TableCell className="text-xs">{coupon.type}</TableCell>
                    <TableCell className="text-xs">
                      {coupon.usageCount}/{coupon.usageLimit === 0 ? "∞" : coupon.usageLimit}
                    </TableCell>
                    <TableCell className="text-xs">{coupon.startDate}</TableCell>
                    <TableCell className="text-xs">{coupon.endDate}</TableCell>
                    <TableCell className="text-xs">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          coupon.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : coupon.status === "Expired"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {coupon.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs">
                      <div className="flex space-x-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => handleViewCoupon(coupon.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-2 border-t">
            <div className="text-xs text-gray-500 mb-2 sm:mb-0">
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredCoupons.length)} of {filteredCoupons.length} results
            </div>
            
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  // Show first page, last page, and pages around current page
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          isActive={pageNum === currentPage}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                  
                  // Show ellipsis for skipped pages
                  if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  
                  return null;
                })}
                
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={(currentPage === totalPages || totalPages === 0) ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Items per page:</span>
              <Select value={String(itemsPerPage)} onValueChange={(val) => setItemsPerPage(Number(val))}>
                <SelectTrigger className="w-[60px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Create Coupon Modal */}
      <CreateCouponDialog
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onCouponCreated={() => {
          fetchCoupons();
        }}
      />
    </DashboardLayout>
  );
};

// Create Coupon Dialog component
const CreateCouponDialog = ({ open, onOpenChange, onCouponCreated }) => {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      name: "",
      code: "",
      discountType: "percentage",
      discountValue: "",
      maxDiscount: "",
      minOrderValue: "0",
      startDate: new Date(),
      endDate: new Date(),
      lifetimeValidity: false,
      usageLimit: "1",
      unlimitedUses: false,
      usagePerCustomer: "1",
      couponType: "public",
      productAllocation: "all",
      customerAllocation: "all",
      selectedCustomers: [],
      selectedProducts: []
    }
  });

  const handleSubmit = async (data) => {
    // Map form fields to API fields
    const payload = {
      name: data.name,
      code: data.code,
      type:
        data.discountType === "percentage"
          ? "Percentage"
          : data.discountType === "fixed"
          ? "Fixed Amount"
          : "Free Shipping",
      discount: Number(data.discountValue) || 0,
      usageLimit: data.unlimitedUses ? 0 : Number(data.usageLimit) || 1,
      usageCount: 0,
      startDate: data.startDate,
      endDate: data.lifetimeValidity ? null : data.endDate,
      status: "Active",
      maxDiscount: data.maxDiscount ? Number(data.maxDiscount) : null,
      minOrderValue: data.minOrderValue ? Number(data.minOrderValue) : 0,
      products: data.productAllocation, // or data.selectedProducts.join(",") if you want
      customers: data.customerAllocation, // or data.selectedCustomers.join(",") if you want
      usagePerCustomer: Number(data.usagePerCustomer) || 1,
      description: "", // add if you have a description field
    };

    try {
      const res = await api.post("/coupons", payload);
      toast({
        title: "Coupon Created",
        description: `Coupon ${data.code} has been created successfully`,
      });
      if (onCouponCreated) {
        onCouponCreated(res.data); // Optionally update parent list
      }
      form.reset();
      onOpenChange(false);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to create coupon",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Coupon</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new coupon for your store
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Offer Name*</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. Summer Sale" required />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coupon Code*</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. SUMMER25" required />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-2">Discount Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="discountType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount Type*</FormLabel>
                        <Select 
                          value={field.value} 
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percentage">Percentage Discount</SelectItem>
                            <SelectItem value="fixed">Fixed Amount Discount</SelectItem>
                            <SelectItem value="shipping">Free Shipping</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  {form.watch("discountType") !== "shipping" && (
                    <FormField
                      name="discountValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {form.watch("discountType") === "percentage" 
                              ? "Discount Percentage*" 
                              : "Discount Amount*"}
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                {...field} 
                                type="number" 
                                min="0" 
                                placeholder={form.watch("discountType") === "percentage" ? "e.g. 25" : "e.g. 50"} 
                                required 
                              />
                              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                                {form.watch("discountType") === "percentage" ? "%" : "₹"}
                              </div>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                  
                  {form.watch("discountType") === "percentage" && (
                    <FormField
                      name="maxDiscount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Discount Amount</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                {...field} 
                                type="number" 
                                min="0" 
                                placeholder="e.g. 100" 
                              />
                              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                                ₹
                              </div>
                            </div>
                          </FormControl>
                          <FormDescription>
                            Leave empty for no maximum
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  )}
                  
                  <FormField
                    name="minOrderValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Order Value</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              {...field} 
                              type="number" 
                              min="0" 
                              placeholder="e.g. 100" 
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                              ₹
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Set to 0 for no minimum
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-2">Validity Period</h3>
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    name="lifetimeValidity"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between space-x-2 space-y-0">
                        <FormLabel>Lifetime Validity</FormLabel>
                        <FormControl>
                          <Switch 
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  {!form.watch("lifetimeValidity") && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Start Date */}
                        <FormField
                          name="startDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Start Date*</FormLabel>
                              <FormControl>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="w-full justify-start text-left"
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a start date</span>
                                      )}
                                      <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      initialFocus
                                      className="pointer-events-auto"
                                    />
                                  </PopoverContent>
                                </Popover>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        {/* End Date */}
                        <FormField
                          name="endDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>End Date*</FormLabel>
                              <FormControl>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="w-full justify-start text-left"
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick an end date</span>
                                      )}
                                      <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) => date < form.watch("startDate")}
                                      initialFocus
                                      className="pointer-events-auto"
                                    />
                                  </PopoverContent>
                                </Popover>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-2">Usage Limits</h3>
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    name="unlimitedUses"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between space-x-2 space-y-0">
                        <FormLabel>Unlimited Uses</FormLabel>
                        <FormControl>
                          <Switch 
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  {!form.watch("unlimitedUses") && (
                    <FormField
                      name="usageLimit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Usage Limit*</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="number" 
                              min="1"
                              placeholder="e.g. 100" 
                              required={!form.watch("unlimitedUses")}
                            />
                          </FormControl>
                          <FormDescription>
                            Maximum number of times this coupon can be used
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  )}
                  
                  <FormField
                    name="usagePerCustomer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Usage Per Customer</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="number" 
                            min="1"
                            placeholder="e.g. 1" 
                          />
                        </FormControl>
                        <FormDescription>
                          How many times a customer can use this coupon
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-2">Coupon Scope</h3>
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    name="couponType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Coupon Type</FormLabel>
                        <Select 
                          value={field.value} 
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public (Display in store)</SelectItem>
                            <SelectItem value="private">Private (Hidden)</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    name="productAllocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Allocation</FormLabel>
                        <Select 
                          value={field.value} 
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Products</SelectItem>
                            <SelectItem value="selected">Selected Products</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  {form.watch("productAllocation") === "selected" && (
                    <FormItem>
                      <FormLabel>Selected Products</FormLabel>
                      <FormControl>
                        <div className="border p-3 rounded-md">
                          <p className="text-sm text-gray-500">
                            No products selected. Use the search to add products.
                          </p>
                          <div className="mt-2">
                            <Input placeholder="Search products..." className="mb-2" />
                            <div className="text-center">
                              <Button type="button" variant="outline" size="sm" disabled>
                                Browse Products
                              </Button>
                            </div>
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                  
                  <FormField
                    name="customerAllocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer Allocation</FormLabel>
                        <Select 
                          value={field.value} 
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Customers</SelectItem>
                            <SelectItem value="selected">Selected Customers</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  {form.watch("customerAllocation") === "selected" && (
                    <FormItem>
                      <FormLabel>Selected Customers</FormLabel>
                      <FormControl>
                        <div className="border p-3 rounded-md">
                          <p className="text-sm text-gray-500">
                            No customers selected. Use the search to add customers.
                          </p>
                          <div className="mt-2">
                            <Input placeholder="Search customers..." className="mb-2" />
                            <div className="text-center">
                              <Button type="button" variant="outline" size="sm" disabled>
                                Browse Customers
                              </Button>
                            </div>
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Coupon</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Coupons;
