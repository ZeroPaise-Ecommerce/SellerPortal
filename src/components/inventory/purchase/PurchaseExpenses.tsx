
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, Plus, MoreHorizontal, FileText, Edit, CreditCard, Building, Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const formatIndianCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
};

const PurchaseExpenses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);
  const [isCreateCategoryDialogOpen, setIsCreateCategoryDialogOpen] = useState(false);

  const expenses = [
    {
      id: "EXP-1001",
      category: "Rent",
      date: "30-Jun-2023",
      amount: 50000,
      paymentMethod: "Bank Transfer",
      account: "HDFC XXX3652",
      description: "Office Rent for June 2023"
    },
    {
      id: "EXP-1002",
      category: "Utilities",
      date: "25-Jun-2023",
      amount: 12500,
      paymentMethod: "NEFT",
      account: "SBI XXX7845",
      description: "Electricity Bill for June 2023"
    },
    {
      id: "EXP-1003",
      category: "Transport",
      date: "20-Jun-2023",
      amount: 18750,
      paymentMethod: "Credit Card",
      account: "Visa XXX6365",
      description: "Logistics and Delivery Expenses"
    },
    {
      id: "EXP-1004",
      category: "Salaries",
      date: "05-Jun-2023",
      amount: 350000,
      paymentMethod: "Bank Transfer",
      account: "ICICI XXX9876",
      description: "Staff Salaries for May 2023"
    },
    {
      id: "EXP-1005",
      category: "Marketing",
      date: "02-Jun-2023",
      amount: 75000,
      paymentMethod: "Cash",
      account: "Cash",
      description: "Digital Marketing Campaign"
    },
  ];

  const filteredExpenses = expenses.filter(expense =>
    expense.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredExpenses.length / parseInt(itemsPerPage));
  const startIndex = (currentPage - 1) * parseInt(itemsPerPage);
  const paginatedExpenses = filteredExpenses.slice(startIndex, startIndex + parseInt(itemsPerPage));

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const categoryCount = new Set(expenses.map(expense => expense.category)).size;
  const methodCount = new Set(expenses.map(expense => expense.paymentMethod)).size;

  const handleView = (expense: any) => {
    setSelectedExpense(expense);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (expense: any) => {
    setSelectedExpense(expense);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-rose-700">Total Expenses</CardTitle>
            <Calculator className="h-4 w-4 text-rose-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-900">{expenses.length}</div>
            <p className="text-xs text-rose-600 mt-1">{categoryCount} categories</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700">Total Amount</CardTitle>
            <Building className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">{formatIndianCurrency(totalAmount)}</div>
            <p className="text-xs text-red-600 mt-1">Total spent</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-violet-50 to-violet-100 border-violet-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-violet-700">Payment Methods</CardTitle>
            <CreditCard className="h-4 w-4 text-violet-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-violet-900">{methodCount}</div>
            <p className="text-xs text-violet-600 mt-1">Different methods</p>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Expenses</h2>
          <p className="text-sm text-gray-600 mt-1">Track business expenses and costs</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search expenses..."
              className="pl-10 w-80 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Expense</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <div className="flex gap-2">
                      <Select>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rent">Rent</SelectItem>
                          <SelectItem value="utilities">Utilities</SelectItem>
                          <SelectItem value="transport">Transport</SelectItem>
                          <SelectItem value="salaries">Salaries</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsCreateCategoryDialogOpen(true)}
                        className="px-3"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" type="number" placeholder="Enter amount" />
                  </div>
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="payment-method">Payment Method</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                        <SelectItem value="credit-card">Credit Card</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="neft">NEFT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="account">Account</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hdfc">HDFC XXX3652</SelectItem>
                        <SelectItem value="sbi">SBI XXX7845</SelectItem>
                        <SelectItem value="visa">Visa XXX6365</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter expense description..." />
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button>
                    Save Expense
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Create Category Dialog */}
      <Dialog open={isCreateCategoryDialogOpen} onOpenChange={setIsCreateCategoryDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="category-name">Category Name</Label>
              <Input id="category-name" placeholder="Enter category name" />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsCreateCategoryDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCreateCategoryDialogOpen(false)}>
                Create Category
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Table */}
      <Card className="border-0 shadow-xl bg-white">
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 border-b border-gray-200">
                  <TableHead className="font-semibold text-gray-700 py-4">ID</TableHead>
                  <TableHead className="font-semibold text-gray-700">Category</TableHead>
                  <TableHead className="font-semibold text-gray-700">Date</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-right">Amount</TableHead>
                  <TableHead className="font-semibold text-gray-700">Payment Method</TableHead>
                  <TableHead className="font-semibold text-gray-700">Account</TableHead>
                  <TableHead className="font-semibold text-gray-700">Description</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center w-16">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedExpenses.map((expense, index) => (
                  <TableRow 
                    key={expense.id}
                    className={`hover:bg-blue-50 transition-colors duration-150 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <TableCell className="font-medium text-blue-600 py-4">{expense.id}</TableCell>
                    <TableCell>
                      <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
                        {expense.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-700">{expense.date}</TableCell>
                    <TableCell className="text-right font-semibold text-gray-900">
                      {formatIndianCurrency(expense.amount)}
                    </TableCell>
                    <TableCell>
                      <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs font-medium">
                        {expense.paymentMethod}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-md text-xs font-medium">
                        {expense.account}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-700 max-w-xs truncate">{expense.description}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-100">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg">
                          <DropdownMenuItem className="hover:bg-blue-50" onClick={() => handleView(expense)}>
                            <FileText className="h-4 w-4 mr-2" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-green-50" onClick={() => handleEdit(expense)}>
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Expense Details - {selectedExpense?.id}</DialogTitle>
          </DialogHeader>
          {selectedExpense && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p><strong>Category:</strong> {selectedExpense.category}</p>
                  <p><strong>Date:</strong> {selectedExpense.date}</p>
                  <p><strong>Amount:</strong> {formatIndianCurrency(selectedExpense.amount)}</p>
                </div>
                <div>
                  <p><strong>Payment Method:</strong> {selectedExpense.paymentMethod}</p>
                  <p><strong>Account:</strong> {selectedExpense.account}</p>
                </div>
              </div>
              <div>
                <p><strong>Description:</strong></p>
                <p className="text-gray-700 mt-1">{selectedExpense.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Expense - {selectedExpense?.id}</DialogTitle>
          </DialogHeader>
          {selectedExpense && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-category">Category</Label>
                  <Select defaultValue={selectedExpense.category.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="salaries">Salaries</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-amount">Amount</Label>
                  <Input id="edit-amount" type="number" defaultValue={selectedExpense.amount} />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea id="edit-description" defaultValue={selectedExpense.description} />
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Items per page:</span>
          <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
            <SelectTrigger className="w-20 border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600 ml-4">
            Showing {startIndex + 1} to {Math.min(startIndex + parseInt(itemsPerPage), filteredExpenses.length)} of {filteredExpenses.length} expenses
          </span>
        </div>
        
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-blue-50"}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                    className="cursor-pointer hover:bg-blue-50"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-blue-50"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default PurchaseExpenses;
