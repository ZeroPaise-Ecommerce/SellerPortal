
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
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
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, Plus, Filter, Eye, Edit, Download, Printer, FileText, TrendingDown, CreditCard } from "lucide-react";
import CreateCreditNoteForm from "./CreateCreditNoteForm";
import ViewCreditNoteDetails from "./ViewCreditNoteDetails";

const formatIndianCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
};

const SalesCreditNote = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCreditNote, setSelectedCreditNote] = useState<any>(null);

  const creditNotes = [
    {
      id: "CN-1001",
      customerName: "Rahul Sharma",
      invoiceId: "INV-2023-001",
      date: "18-Jun-2023",
      amount: 2999,
      status: "Applied",
      reason: "Product Return"
    },
    {
      id: "CN-1002",
      customerName: "Priya Patel",
      invoiceId: "INV-2023-002",
      date: "15-Jun-2023",
      amount: 1500,
      status: "Pending",
      reason: "Billing Error"
    },
    {
      id: "CN-1003",
      customerName: "Amit Kumar",
      invoiceId: "INV-2023-003",
      date: "12-Jun-2023",
      amount: 850,
      status: "Applied",
      reason: "Discount Adjustment"
    },
    {
      id: "CN-1004",
      customerName: "Deepa Singh",
      invoiceId: "INV-2023-004",
      date: "10-Jun-2023",
      amount: 4200,
      status: "Draft",
      reason: "Quality Issue"
    },
  ];

  const filteredCreditNotes = creditNotes.filter((note) => {
    const matchesSearch = note.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.invoiceId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || note.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalItems = filteredCreditNotes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredCreditNotes.slice(startIndex, endIndex);

  const totalAmount = creditNotes.reduce((sum, note) => sum + note.amount, 0);
  const appliedNotes = creditNotes.filter(note => note.status === "Applied").length;
  const pendingNotes = creditNotes.filter(note => note.status === "Pending").length;

  const getStatusBadge = (status: string) => {
    const styles = {
      Applied: "bg-green-100 text-green-800 border-green-200",
      Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Draft: "bg-gray-100 text-gray-800 border-gray-200",
      Cancelled: "bg-red-100 text-red-800 border-red-200"
    };
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        {status}
      </span>
    );
  };

  const handleView = (creditNote: any) => {
    setSelectedCreditNote(creditNote);
    setIsViewModalOpen(true);
  };

  const handleEdit = (creditNote: any) => {
    setSelectedCreditNote(creditNote);
    setIsEditModalOpen(true);
  };

  const handleDownload = (creditNote: any) => {
    alert(`Downloading credit note ${creditNote.id}...`);
  };

  const handlePrint = (creditNote: any) => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Total Credit Notes</CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{creditNotes.length}</div>
            <p className="text-xs text-purple-600 mt-1">{appliedNotes} applied, {pendingNotes} pending</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Total Value</CardTitle>
            <TrendingDown className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{formatIndianCurrency(totalAmount)}</div>
            <p className="text-xs text-orange-600 mt-1">Total credit amount</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Avg. Credit</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {formatIndianCurrency(totalAmount / creditNotes.length)}
            </div>
            <p className="text-xs text-blue-600 mt-1">Average credit value</p>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Credit Notes</h2>
          <p className="text-sm text-gray-600 mt-1">Manage customer credits and adjustments</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search credit notes..."
              className="pl-10 w-80 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                <Plus className="h-4 w-4 mr-2" />
                Create Credit Note
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <CreateCreditNoteForm onClose={() => setIsCreateModalOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Items per page selector */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show</span>
          <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600">entries</span>
        </div>
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
        </div>
      </div>

      {/* Table */}
      <Card className="border-0 shadow-xl bg-white">
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 border-b border-gray-200">
                  <TableHead className="font-semibold text-gray-700 py-4">Credit Note ID</TableHead>
                  <TableHead className="font-semibold text-gray-700">Customer</TableHead>
                  <TableHead className="font-semibold text-gray-700">Invoice ID</TableHead>
                  <TableHead className="font-semibold text-gray-700">Date</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-right">Amount</TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700">Reason</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center w-40">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((creditNote, index) => (
                  <TableRow 
                    key={creditNote.id}
                    className={`hover:bg-blue-50 transition-colors duration-150 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <TableCell className="font-medium text-blue-600 py-4">{creditNote.id}</TableCell>
                    <TableCell className="text-gray-700">{creditNote.customerName}</TableCell>
                    <TableCell className="text-gray-700 font-mono text-sm">{creditNote.invoiceId}</TableCell>
                    <TableCell className="text-gray-700">{creditNote.date}</TableCell>
                    <TableCell className="text-right font-semibold text-gray-900">
                      {formatIndianCurrency(creditNote.amount)}
                    </TableCell>
                    <TableCell>{getStatusBadge(creditNote.status)}</TableCell>
                    <TableCell className="text-gray-700">{creditNote.reason}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                          onClick={() => handleView(creditNote)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-600"
                          onClick={() => handleEdit(creditNote)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-purple-100 hover:text-purple-600"
                          onClick={() => handleDownload(creditNote)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-gray-100 hover:text-gray-600"
                          onClick={() => handlePrint(creditNote)}
                        >
                          <Printer className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationPrevious 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationNext 
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationContent>
        </Pagination>
      )}

      {/* View Credit Note Dialog */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCreditNote && (
            <ViewCreditNoteDetails 
              creditNote={selectedCreditNote} 
              onClose={() => setIsViewModalOpen(false)}
              onEdit={() => {
                setIsViewModalOpen(false);
                handleEdit(selectedCreditNote);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Credit Note Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCreditNote && (
            <CreateCreditNoteForm 
              creditNote={selectedCreditNote} 
              isEdit={true}
              onClose={() => setIsEditModalOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalesCreditNote;
