
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { ArrowLeft, Package, Edit, Share2, Trash2, ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock product data
const productsData = [
  {
    id: "PRD-001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 89.99,
    stock: 145,
    status: "In Stock",
    active: true,
    description: "Premium wireless headphones with noise cancellation technology and 30-hour battery life.",
    sku: "WH-NC100-BLK",
    weight: "0.5 kg",
    dimensions: "19 × 16 × 8 cm",
    images: ["https://placehold.co/600x400/e2e8f0/1e293b?text=Headphones+Image"],
    salesHistory: [
      { month: "Jan", sales: 45 },
      { month: "Feb", sales: 52 },
      { month: "Mar", sales: 49 },
      { month: "Apr", sales: 63 },
      { month: "May", sales: 59 },
      { month: "Jun", sales: 82 },
      { month: "Jul", sales: 90 },
      { month: "Aug", sales: 85 },
      { month: "Sep", sales: 94 },
      { month: "Oct", sales: 102 },
      { month: "Nov", sales: 120 },
      { month: "Dec", sales: 135 },
    ],
    dailySales: [
      { day: "Mon", sales: 12 },
      { day: "Tue", sales: 19 },
      { day: "Wed", sales: 15 },
      { day: "Thu", sales: 22 },
      { day: "Fri", sales: 28 },
      { day: "Sat", sales: 25 },
      { day: "Sun", sales: 18 },
    ],
    variants: [
      { id: 1, color: "Black", price: 89.99, stock: 65 },
      { id: 2, color: "White", price: 89.99, stock: 58 },
      { id: 3, color: "Blue", price: 94.99, stock: 22 },
    ],
    relatedProducts: ["PRD-002", "PRD-006"]
  },
  {
    id: "PRD-002",
    name: "Smart Watch Series 5",
    category: "Electronics",
    price: 299.99,
    stock: 78,
    status: "In Stock",
    active: true,
    description: "Advanced smartwatch with health monitoring, GPS, and 50+ sports modes.",
    sku: "SW-S5-SLV",
    weight: "0.35 kg",
    dimensions: "4.5 × 3.8 × 1.2 cm",
    images: ["https://placehold.co/600x400/e2e8f0/1e293b?text=Smart+Watch+Image"],
    salesHistory: [
      { month: "Jan", sales: 23 },
      { month: "Feb", sales: 35 },
      { month: "Mar", sales: 42 },
      { month: "Apr", sales: 46 },
      { month: "May", sales: 53 },
      { month: "Jun", sales: 62 },
      { month: "Jul", sales: 75 },
      { month: "Aug", sales: 83 },
      { month: "Sep", sales: 78 },
      { month: "Oct", sales: 90 },
      { month: "Nov", sales: 102 },
      { month: "Dec", sales: 115 },
    ],
    dailySales: [
      { day: "Mon", sales: 8 },
      { day: "Tue", sales: 12 },
      { day: "Wed", sales: 10 },
      { day: "Thu", sales: 15 },
      { day: "Fri", sales: 18 },
      { day: "Sat", sales: 22 },
      { day: "Sun", sales: 13 },
    ],
    variants: [
      { id: 1, color: "Silver", price: 299.99, stock: 35 },
      { id: 2, color: "Black", price: 299.99, stock: 28 },
      { id: 3, color: "Rose Gold", price: 319.99, stock: 15 },
    ],
    relatedProducts: ["PRD-001", "PRD-006"]
  },
  {
    id: "PRD-003",
    name: "Running Shoes",
    category: "Apparel",
    price: 119.99,
    stock: 212,
    status: "In Stock",
    active: true,
    description: "Lightweight running shoes with superior cushioning and breathable mesh upper.",
    sku: "RS-AIR-BLU",
    weight: "0.8 kg",
    dimensions: "30 × 20 × 12 cm",
    images: ["https://placehold.co/600x400/e2e8f0/1e293b?text=Running+Shoes+Image"],
    salesHistory: [
      { month: "Jan", sales: 35 },
      { month: "Feb", sales: 42 },
      { month: "Mar", sales: 38 },
      { month: "Apr", sales: 52 },
      { month: "May", sales: 48 },
      { month: "Jun", sales: 65 },
      { month: "Jul", sales: 72 },
      { month: "Aug", sales: 68 },
      { month: "Sep", sales: 75 },
      { month: "Oct", sales: 82 },
      { month: "Nov", sales: 90 },
      { month: "Dec", sales: 95 },
    ],
    dailySales: Array(7).fill(0).map((_, i) => ({ 
      day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i], 
      sales: Math.floor(Math.random() * 20) + 10 
    })),
    variants: [
      { id: 1, color: "Blue", size: "9", price: 119.99, stock: 45 },
      { id: 2, color: "Blue", size: "10", price: 119.99, stock: 38 },
      { id: 3, color: "Black", size: "9", price: 119.99, stock: 42 },
      { id: 4, color: "Black", size: "10", price: 119.99, stock: 37 },
    ],
    relatedProducts: ["PRD-004"]
  },
];

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [isActive, setIsActive] = React.useState(true);

  // Find the product based on the ID from the URL
  const product = productsData.find((p) => p.id === productId);

  if (!product) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <h1 className="text-lg font-bold">Product Not Found</h1>
          <p className="text-gray-500 mt-2">The requested product could not be found.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => navigate('/products')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const handleBackClick = () => {
    navigate('/products');
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4"
          onClick={handleBackClick}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </Button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3 mb-4 md:mb-0">
            <div className="bg-brand-blue bg-opacity-10 p-2 rounded-lg">
              <Package className="h-6 w-6 text-brand-blue" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold">{product.name}</h1>
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  product.status === "In Stock"
                    ? "bg-green-100 text-green-800"
                    : product.status === "Out of Stock"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {product.status}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <span>ID: {product.id}</span>
                <span className="text-gray-400">•</span>
                <span>SKU: {product.sku}</span>
                <span className="text-gray-400">•</span>
                <span>{product.category}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="active-status" className="text-sm font-medium">Active</Label>
              <Switch id="active-status" checked={isActive} onCheckedChange={setIsActive} />
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" /> Edit
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" /> Share
              </Button>
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content with tabs */}
      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details" className="text-xs">Details</TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs">Analytics</TabsTrigger>
          <TabsTrigger value="variants" className="text-xs">Variants</TabsTrigger>
          <TabsTrigger value="related" className="text-xs">Related Products</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Product Image */}
            <Card className="col-span-1">
              <CardContent className="p-4">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-auto rounded-md"
                />
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card className="col-span-1 md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm">Description</h3>
                  <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div>
                    <h3 className="font-medium text-xs text-gray-500">Price</h3>
                    <p className="text-sm font-semibold">${product.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-xs text-gray-500">Stock</h3>
                    <p className="text-sm font-semibold">{product.stock} units</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-xs text-gray-500">Weight</h3>
                    <p className="text-sm font-semibold">{product.weight}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-xs text-gray-500">Dimensions</h3>
                    <p className="text-sm font-semibold">{product.dimensions}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Sales Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Sales</p>
                  <div className="flex items-baseline">
                    <span className="text-lg font-bold">
                      {product.salesHistory.reduce((sum, item) => sum + item.sales, 0)}
                    </span>
                    <span className="text-xs text-green-500 ml-2">+12% this month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Revenue</p>
                  <div className="flex items-baseline">
                    <span className="text-lg font-bold">
                      ${(product.salesHistory.reduce((sum, item) => sum + item.sales, 0) * product.price).toFixed(2)}
                    </span>
                    <span className="text-xs text-green-500 ml-2">+8% this month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Avg. Order Value</p>
                  <div className="flex items-baseline">
                    <span className="text-lg font-bold">${(product.price * 1.2).toFixed(2)}</span>
                    <span className="text-xs text-green-500 ml-2">+3% this month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Sales Chart */}
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="text-base">Monthly Sales</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={product.salesHistory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#9b87f5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Daily Sales Chart */}
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="text-base">Daily Sales (This Week)</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={product.dailySales} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#1EAEDB" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="variants" className="space-y-6">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="text-base">Product Variants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs font-semibold">Variant ID</TableHead>
                      {product.variants[0].color && <TableHead className="text-xs font-semibold">Color</TableHead>}
                      {product.variants.some(v => 'size' in v) && <TableHead className="text-xs font-semibold">Size</TableHead>}
                      <TableHead className="text-xs font-semibold">Price</TableHead>
                      <TableHead className="text-xs font-semibold">Stock</TableHead>
                      <TableHead className="text-xs font-semibold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {product.variants.map((variant) => (
                      <TableRow key={variant.id}>
                        <TableCell className="text-xs">{variant.id}</TableCell>
                        {variant.color && <TableCell className="text-xs">{variant.color}</TableCell>}
                        {'size' in variant ? <TableCell className="text-xs">{variant.size}</TableCell> : <TableCell></TableCell>}
                        <TableCell className="text-xs">${variant.price.toFixed(2)}</TableCell>
                        <TableCell className="text-xs">{variant.stock}</TableCell>
                        <TableCell className="text-right">
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="related" className="space-y-6">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="text-base">Related Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                {product.relatedProducts.map(relatedId => {
                  const relatedProduct = productsData.find(p => p.id === relatedId);
                  if (!relatedProduct) return null;
                  
                  return (
                    <Card key={relatedId} className="overflow-hidden border">
                      <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img 
                          src={relatedProduct.images?.[0] || "https://placehold.co/600x400/e2e8f0/1e293b?text=Product+Image"} 
                          alt={relatedProduct.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-sm">{relatedProduct.name}</h3>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-semibold text-sm">${relatedProduct.price.toFixed(2)}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs h-8 px-2"
                            onClick={() => navigate(`/products/${relatedProduct.id}`)}
                          >
                            View <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ProductDetails;
