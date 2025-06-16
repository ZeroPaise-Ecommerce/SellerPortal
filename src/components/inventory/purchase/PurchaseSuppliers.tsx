
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
import { Search, Plus, Eye, Edit, Building2, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddSupplierForm from "./AddSupplierForm";

const formatIndianCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
};

const PurchaseSuppliers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddSupplier, setShowAddSupplier] = useState(false);

  const suppliers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      companyName: "Tata Steel Limited",
      mobile: "+91 98765 43210",
      email: "rajesh.k@tatasteel.com",
      payable: 125000,
      credits: 50000
    },
    {
      id: 2,
      name: "Anita Sharma",
      companyName: "Reliance Industries Ltd.",
      mobile: "+91 87654 32109",
      email: "anita.s@ril.com",
      payable: 245000,
      credits: 75000
    },
    {
      id: 3,
      name: "Vikram Singh",
      companyName: "Infosys Limited",
      mobile: "+91 76543 21098",
      email: "vikram.s@infosys.com",
      payable: 89000,
      credits: 25000
    },
    {
      id: 4,
      name: "Priya Patel",
      companyName: "Mahindra & Mahindra",
      mobile: "+91 65432 10987",
      email: "priya.p@mahindra.com",
      payable: 156000,
      credits: 40000
    },
    {
      id: 5,
      name: "Anil Reddy",
      companyName: "Asian Paints Ltd.",
      mobile: "+91 54321 09876",
      email: "anil.r@asianpaints.com",
      payable: 67000,
      credits: 15000
    },
  ];

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSuppliers.length / parseInt(itemsPerPage));
  const startIndex = (currentPage - 1) * parseInt(itemsPerPage);
  const paginatedSuppliers = filteredSuppliers.slice(startIndex, startIndex + parseInt(itemsPerPage));

  // Calculate totals for stats
  const totalPayable = suppliers.reduce((sum, supplier) => sum + supplier.payable, 0);
  const totalCredits = suppliers.reduce((sum, supplier) => sum + supplier.credits, 0);

  if (showAddSupplier) {
    return <AddSupplierForm onClose={() => setShowAddSupplier(false)} />;
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Suppliers</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{suppliers.length}</div>
            <p className="text-xs text-blue-600 mt-1">Active suppliers</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700">Total Payable</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">{formatIndianCurrency(totalPayable)}</div>
            <p className="text-xs text-red-600 mt-1">Outstanding payments</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Total Credits</CardTitle>
            <Building2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{formatIndianCurrency(totalCredits)}</div>
            <p className="text-xs text-green-600 mt-1">Available credits</p>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Suppliers</h2>
          <p className="text-sm text-gray-600 mt-1">Manage your supplier relationships and transactions</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search suppliers..."
              className="pl-10 w-80 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            onClick={() => setShowAddSupplier(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Supplier
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card className="border-0 shadow-xl bg-white">
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 border-b border-gray-200">
                  <TableHead className="font-semibold text-gray-700 py-4">Name</TableHead>
                  <TableHead className="font-semibold text-gray-700">Company Name</TableHead>
                  <TableHead className="font-semibold text-gray-700">Mobile</TableHead>
                  <TableHead className="font-semibold text-gray-700">Email</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-right">Payable</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-right">Credits</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center w-32">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedSuppliers.map((supplier, index) => (
                  <TableRow 
                    key={supplier.id} 
                    className={`hover:bg-blue-50 transition-colors duration-150 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <TableCell className="font-medium text-gray-900 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-semibold text-sm">
                            {supplier.name.charAt(0)}
                          </span>
                        </div>
                        {supplier.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700">{supplier.companyName}</TableCell>
                    <TableCell className="text-gray-700">{supplier.mobile}</TableCell>
                    <TableCell className="text-gray-700">{supplier.email}</TableCell>
                    <TableCell className="text-right">
                      <span className="text-red-600 font-semibold bg-red-50 px-2 py-1 rounded-md">
                        {formatIndianCurrency(supplier.payable)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-md">
                        {formatIndianCurrency(supplier.credits)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-600"
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
        </CardContent>
      </Card>

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
            Showing {startIndex + 1} to {Math.min(startIndex + parseInt(itemsPerPage), filteredSuppliers.length)} of {filteredSuppliers.length} suppliers
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

export default PurchaseSuppliers;
