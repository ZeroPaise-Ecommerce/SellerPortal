import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Package,
  Search,
  Plus,
  Edit,
  Trash2,
  Info,
  Filter,
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { fetchProductsStart } from '@/features/product/productSlice';
import ConfigurableTable from "@/components/configurableTable/ConfigurableTable";
import { getProductTableColumns } from "./productTableConfig";
import { useDispatch, useSelector } from "react-redux";

// Selectors
const selectProductState = (state) => state.product;

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(selectProductState);  
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeStatus, setActiveStatus] = useState<{ [key: string]: boolean }>({});

  const productsPerPage = 5;

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, [dispatch]);

  // Initialize activeStatus when products are fetched
  useEffect(() => {
    if (products && products.length > 0) {
      const statusObj: { [key: string]: boolean } = {};
      products.forEach((product) => {
        statusObj[product.id] = product.active;
      });
      setActiveStatus(statusObj);
    }
  }, [products]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <h1 className="text-lg font-bold">Loading...</h1>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <h1 className="text-lg font-bold">Error</h1>
          <p className="text-gray-500 mt-2">{error}</p>
        </div>
      </DashboardLayout>
    );
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const handleAddProductClick = () => {
    //navigate("/products/add");
    navigate("/products/addproducts");
  };

  const handleActiveToggle = (productId: string) => {
    setActiveStatus((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center">
        <div className="mr-3">
          <Package size={24} className="text-brand-blue" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold">Products</h1>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Info className="h-4 w-4 text-gray-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-sm">
                  <p className="text-xs">
                    These are the products that are allocated for the website and App sales.
                    For detailed and all product list, visit the inventory page.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-sm text-gray-500">Manage your product inventory</p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { title: "Total Products", value: 745, change: "+12%", color: "green" },
          { title: "Out of Stock", value: 23, change: "+5", color: "red" },
          { title: "Low Stock", value: 48, change: "-3", color: "yellow" },
          { title: "New Products", value: 15, change: "Added", color: "blue" },
        ].map((stat, idx) => (
          <Card className="bg-white" key={idx}>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
              <div className="flex items-baseline">
                <span className="text-lg font-bold">{stat.value}</span>
                <span className={`text-xs text-${stat.color}-500 ml-2`}>{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3">
          <CardTitle className="text-base font-semibold">Product Inventory</CardTitle>
          <div className="flex gap-2 w-full sm:w-auto mt-3 sm:mt-0">
            <div className="relative flex-1 sm:flex-auto">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="pl-8 text-sm h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button size="sm" variant="outline" className="gap-1 h-9">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
            <Button
              size="sm"
              className="bg-brand-blue hover:bg-brand-dark-blue h-9"
              onClick={handleAddProductClick}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <ConfigurableTable
              data={currentProducts}
              rowKey={(row) => row.id}
              onRowClick={(product) => handleProductClick(product.id)}
              columns={getProductTableColumns({
                ...activeStatus,
              }, handleActiveToggle, handleProductClick, (id) => {
                if (window.confirm("Are you sure you want to delete this product?")) {

                  // Handle delete logic here
                  console.log(`Deleting product with ID: ${id}`);
                }
              })}
            />
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {Array.from({ length: Math.min(totalPages, 3) }).map((_, i) => {
                  const pageNum = i + 1;
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
                })}
                {totalPages > 3 && (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink onClick={() => setCurrentPage(totalPages)}>
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Products;
