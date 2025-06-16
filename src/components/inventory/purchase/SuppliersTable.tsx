
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
import { Search, Plus, Eye, Edit } from "lucide-react";

const formatIndianCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
};

const SuppliersTable = ({ onAddSupplier }: { onAddSupplier: () => void }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);

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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Suppliers</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search suppliers..."
              className="pl-9 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={onAddSupplier}>
            <Plus className="h-4 w-4 mr-2" />
            Add Supplier
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Payable</TableHead>
              <TableHead className="text-right">Credits</TableHead>
              <TableHead className="w-24">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedSuppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell className="font-medium">{supplier.name}</TableCell>
                <TableCell>{supplier.companyName}</TableCell>
                <TableCell>{supplier.mobile}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell className="text-right font-medium text-red-600">
                  {formatIndianCurrency(supplier.payable)}
                </TableCell>
                <TableCell className="text-right font-medium text-green-600">
                  {formatIndianCurrency(supplier.credits)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Items per page:</span>
          <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                    className="cursor-pointer"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default SuppliersTable;
