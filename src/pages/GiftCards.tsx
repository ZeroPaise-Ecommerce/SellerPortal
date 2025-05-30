import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Gift, Search, Plus, Edit, Eye, FileDown, X, Calendar } from "lucide-react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
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
import api from "@/api";

const GiftCards = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState(null);
  const [endDateFilter, setEndDateFilter] = useState(null);
  
  // State for table
  const [selectedGiftCards, setSelectedGiftCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // State for create gift card modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newGiftCard, setNewGiftCard] = useState({
    recipientName: "",
    email: "",
    phone: "",
    amount: "",
    remarks: "",
  });
  
  // State for edit gift card modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingGiftCard, setEditingGiftCard] = useState(null);
  const [editAction, setEditAction] = useState("");
  const [extensionDays, setExtensionDays] = useState(1);
  
  // State for gift cards from API
  const [giftCards, setGiftCards] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch gift cards from API
  useEffect(() => {
    setLoading(true);
    api.get("/GiftCards")
      .then(res => setGiftCards(res.data))
      .catch(() => toast({ title: "Error", description: "Failed to fetch gift cards", variant: "destructive" }))
      .finally(() => setLoading(false));
  }, []);
  
  // Filtering logic (map backend fields to frontend fields)
  const filteredGiftCards = giftCards.filter((giftCard) => {
    const matchesSearch =
      giftCard.recipientEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      giftCard.recipientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      giftCard.code?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || giftCard.status === statusFilter;
    const issueDate = new Date(giftCard.issuedDate);
    const matchesIssueDate = !startDateFilter || issueDate >= startDateFilter;
    const expiryDate = new Date(giftCard.expiryDate);
    const matchesExpiryDate = !endDateFilter || expiryDate <= endDateFilter;
    return matchesSearch && matchesStatus && matchesIssueDate && matchesExpiryDate;
  });
  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredGiftCards.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredGiftCards.length / itemsPerPage);
  
  // Handler for select all checkbox
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedGiftCards(currentItems.map(card => card.id));
    } else {
      setSelectedGiftCards([]);
    }
  };
  
  // Handler for checkbox selection
  const handleSelectGiftCard = (checked, id) => {
    if (checked) {
      setSelectedGiftCards([...selectedGiftCards, id]);
    } else {
      setSelectedGiftCards(selectedGiftCards.filter(cardId => cardId !== id));
    }
  };
  
  // Handler for export selected
  const handleExport = () => {
    toast({
      title: "Export Started",
      description: `Exporting ${selectedGiftCards.length} gift cards`,
    });
    // In a real app, this would trigger a download
    console.log("Exporting gift cards:", selectedGiftCards);
  };
  
  // Handler for clearing filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("");
    setStartDateFilter(null);
    setEndDateFilter(null);
  };
  
  // Helper to generate a unique 16-character alphanumeric code
  function generateGiftCardCode(existingCodes = []) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code;
    do {
      code = Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    } while (existingCodes.includes(code));
    return code;
  }
  
  // Handler for create gift card form
  const handleCreateGiftCard = async (e) => {
    e.preventDefault();
    if (!newGiftCard.recipientName || !newGiftCard.email || !newGiftCard.amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    try {
      const existingCodes = giftCards.map(card => card.code);
      const payload = {
        code: generateGiftCardCode(existingCodes),
        balance: parseFloat(newGiftCard.amount),
        initialValue: parseFloat(newGiftCard.amount),
        issuedDate: new Date().toISOString(),
        expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
        status: "Active",
        recipientEmail: newGiftCard.email,
        recipientName: newGiftCard.recipientName,
        recipientPhone: newGiftCard.phone,
        remarks: newGiftCard.remarks,
      };
      const res = await api.post("/GiftCards", payload);
      setGiftCards(prev => [...prev, res.data]);
      toast({ title: "Gift Card Created", description: `Gift card created for ${newGiftCard.recipientName}` });
      setNewGiftCard({ recipientName: "", email: "", phone: "", amount: "", remarks: "" });
      setIsCreateModalOpen(false);
    } catch (err) {
      toast({ title: "Error", description: "Failed to create gift card", variant: "destructive" });
    }
  };
  
  // Handler for edit gift card
  const handleEditGiftCard = (giftCard) => {
    setEditingGiftCard(giftCard);
    setIsEditModalOpen(true);
    if (giftCard.status === "Active") setEditAction("inactive");
    else if (giftCard.status === "Inactive") setEditAction("active");
    else if (giftCard.status === "Expired") setEditAction("extend");
  };
  
  // Handler for submitting edit form
  const handleSubmitEdit = async () => {
    if (!editingGiftCard) return;
    let updatedStatus = editingGiftCard.status;
    let updatedExpiry = editingGiftCard.expiryDate;
    if (editAction === "active") updatedStatus = "Active";
    else if (editAction === "inactive") updatedStatus = "Inactive";
    else if (editAction === "suspend") updatedStatus = "Suspended";
    else if (editAction === "extend") {
      updatedStatus = "Active";
      updatedExpiry = new Date(new Date(editingGiftCard.expiryDate).setDate(new Date(editingGiftCard.expiryDate).getDate() + extensionDays)).toISOString();
    }
    try {
      const payload = {
        ...editingGiftCard,
        status: updatedStatus,
        expiryDate: updatedExpiry,
      };
      await api.put(`/GiftCards/${editingGiftCard.id}`, payload);
      setGiftCards(prev => prev.map(card => card.id === editingGiftCard.id ? { ...card, ...payload } : card));
      toast({ title: "Gift Card Updated", description: `Gift card updated successfully` });
      setIsEditModalOpen(false);
      setEditingGiftCard(null);
      setEditAction("");
      setExtensionDays(1);
    } catch (err) {
      toast({ title: "Error", description: "Failed to update gift card", variant: "destructive" });
    }
  };
  
  // Handler for viewing gift card details
  const handleViewGiftCard = (giftCard) => {
    navigate(`/gift-cards/${giftCard.id}`);
  };

  // Stats calculation
  const now = new Date();
  const totalGiftCards = giftCards.length;
  const totalActiveValue = giftCards
    .filter(card => card.status === "Active")
    .reduce((sum, card) => sum + (parseFloat(card.balance) || 0), 0);
  const totalRedeemed = giftCards.filter(card => card.status === "Redeemed").length;
  const expiringSoon = giftCards.filter(card => {
    const expiry = new Date(card.expiryDate);
    return card.status === "Active" && expiry > now && expiry <= new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  }).length;

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center">
        <div className="mr-3">
          <Gift size={24} className="text-brand-blue" />
        </div>
        <div>
          <h1 className="text-lg font-bold">Gift Cards</h1>
          <p className="text-sm text-gray-500">Manage your store's gift cards</p>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-md border">
              <p className="text-sm text-gray-500">Total Gift Cards</p>
              <p className="text-lg font-bold">{totalGiftCards}</p>
              {/* Optionally, add a trend or delta here */}
            </div>
            <div className="bg-white p-4 rounded-md border">
              <p className="text-sm text-gray-500">Active Value</p>
              <p className="text-lg font-bold">₹{totalActiveValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
              {/* Optionally, add a trend or delta here */}
            </div>
            <div className="bg-white p-4 rounded-md border">
              <p className="text-sm text-gray-500">Redeemed</p>
              <p className="text-lg font-bold">{totalRedeemed}</p>
              {/* Optionally, add a trend or delta here */}
            </div>
            <div className="bg-white p-4 rounded-md border">
              <p className="text-sm text-gray-500">Expiring Soon</p>
              <p className="text-lg font-bold">{expiringSoon}</p>
              {/* Optionally, add a trend or delta here */}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
            <CardTitle className="text-base font-semibold">Gift Card Management</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto mt-3 sm:mt-0">
              <div className="relative flex-1 sm:flex-auto">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search gift cards..."
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
                <Plus className="h-4 w-4 mr-1" /> Create Gift Card
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {/* Status Filter - Fixed to ensure all SelectItem elements have valid values */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] h-9">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Redeemed">Redeemed</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            
            {/* Issue Date Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-9 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {startDateFilter ? format(startDateFilter, "PPP") : "Issue Date"}
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
            
            {/* Expiry Date Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-9 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {endDateFilter ? format(endDateFilter, "PPP") : "Expiry Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={endDateFilter}
                  onSelect={setEndDateFilter}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            
            {/* Clear Filters button - only show when filters are active */}
            {(statusFilter || startDateFilter || endDateFilter) && (
              <Button 
                variant="ghost" 
                className="h-9 flex items-center gap-1"
                onClick={handleClearFilters}
              >
                <X className="h-4 w-4" /> Clear Filters
              </Button>
            )}
            
            {/* Export button - only show when gift cards are selected */}
            {selectedGiftCards.length > 0 && (
              <Button 
                variant="outline" 
                className="h-9 ml-auto"
                onClick={handleExport}
              >
                <FileDown className="h-4 w-4 mr-1" /> Export {selectedGiftCards.length} Selected
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
                      checked={currentItems.length > 0 && currentItems.length === selectedGiftCards.length}
                    />
                  </TableHead>
                  <TableHead className="text-xs font-semibold">ID</TableHead>
                  <TableHead className="text-xs font-semibold">Balance</TableHead>
                  <TableHead className="text-xs font-semibold">Initial Value</TableHead>
                  <TableHead className="text-xs font-semibold">Issued</TableHead>
                  <TableHead className="text-xs font-semibold">Expires</TableHead>
                  <TableHead className="text-xs font-semibold">Status</TableHead>
                  <TableHead className="text-xs font-semibold">Recipient</TableHead>
                  <TableHead className="text-xs font-semibold w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((giftCard) => (
                  <TableRow key={giftCard.id} className="hover:bg-gray-50">
                    <TableCell>
                      <Checkbox 
                        checked={selectedGiftCards.includes(giftCard.id)}
                        onCheckedChange={(checked) => handleSelectGiftCard(checked, giftCard.id)}
                      />
                    </TableCell>
                    <TableCell className="text-xs">{giftCard.id}</TableCell>
                    <TableCell className="text-xs">${giftCard.balance.toFixed(2)}</TableCell>
                    <TableCell className="text-xs">₹{giftCard.initialValue.toFixed(2)}</TableCell>
                    <TableCell className="text-xs">{giftCard.issuedDate}</TableCell>
                    <TableCell className="text-xs">{giftCard.expiryDate}</TableCell>
                    <TableCell className="text-xs">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          giftCard.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : giftCard.status === "Redeemed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {giftCard.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs">{giftCard.recipientEmail}</TableCell>
                    <TableCell className="text-xs">
                      <div className="flex space-x-1">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8"
                          onClick={() => handleViewGiftCard(giftCard)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8"
                          onClick={() => handleEditGiftCard(giftCard)}
                        >
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
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredGiftCards.length)} of {filteredGiftCards.length} results
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
      
      {/* Create Gift Card Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Gift Card</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new gift card
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleCreateGiftCard}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="recipientName" className="text-right">
                  Recipient Name*
                </Label>
                <Input
                  id="recipientName"
                  className="col-span-3"
                  value={newGiftCard.recipientName}
                  onChange={(e) => setNewGiftCard({...newGiftCard, recipientName: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="email" className="text-right">
                  Email Address*
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="col-span-3"
                  value={newGiftCard.email}
                  onChange={(e) => setNewGiftCard({...newGiftCard, email: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="phone" className="text-right">
                  Mobile Number
                </Label>
                <Input
                  id="phone"
                  className="col-span-3"
                  value={newGiftCard.phone}
                  onChange={(e) => setNewGiftCard({...newGiftCard, phone: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="amount" className="text-right">
                  Amount*
                </Label>
                <Input
                  id="amount"
                  type="number"
                  min="1"
                  step="0.01"
                  className="col-span-3"
                  value={newGiftCard.amount}
                  onChange={(e) => setNewGiftCard({...newGiftCard, amount: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="remarks" className="text-right">
                  Remarks
                </Label>
                <Textarea
                  id="remarks"
                  className="col-span-3"
                  value={newGiftCard.remarks}
                  onChange={(e) => setNewGiftCard({...newGiftCard, remarks: e.target.value})}
                  placeholder="Add any notes or remarks here..."
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Gift Card</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Gift Card Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Gift Card Status</DialogTitle>
            <DialogDescription>
              {editingGiftCard && (
                <>Update status for gift card {editingGiftCard.id}</>
              )}
            </DialogDescription>
          </DialogHeader>
          
          {editingGiftCard && (
            <div className="grid gap-4 py-4">
              {editingGiftCard.status !== "Expired" ? (
                <div className="grid grid-cols-4 items-center gap-2">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select value={editAction} onValueChange={setEditAction}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {editingGiftCard.status !== "Active" && (
                        <SelectItem value="active">Activate</SelectItem>
                      )}
                      {editingGiftCard.status !== "Inactive" && (
                        <SelectItem value="inactive">Deactivate</SelectItem>
                      )}
                      {editingGiftCard.status !== "Suspended" && (
                        <SelectItem value="suspend">Suspend</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="extension" className="text-right">
                      Extend By (Days)
                    </Label>
                    <Input
                      id="extension"
                      type="number"
                      min="1"
                      max="365"
                      className="col-span-3"
                      value={extensionDays}
                      onChange={(e) => setExtensionDays(parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Maximum extension period is 365 days.
                  </p>
                </>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmitEdit}>
              Update Gift Card
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default GiftCards;
