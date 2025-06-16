
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  ShoppingCart, 
  AlertTriangle, 
  TrendingUp,
  TrendingDown,
  Eye,
  FileText,
  Calendar,
  Filter,
  Download,
  BarChart3,
  PieChart,
  Clock,
  Warehouse,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  XCircle
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { cn } from "@/lib/utils";

const InventoryOverview = () => {
  const [dateRange, setDateRange] = useState("Today");
  
  // Sample data
  const categoryData = [
    { name: "Electronics", value: 450, color: "#8B5CF6" },
    { name: "Clothing", value: 320, color: "#06D6A0" },
    { name: "Books", value: 280, color: "#F59E0B" },
    { name: "Home & Garden", value: 220, color: "#EF4444" },
    { name: "Sports", value: 180, color: "#3B82F6" }
  ];

  const stockTrendData = [
    { day: "Mon", value: 45000 },
    { day: "Tue", value: 48000 },
    { day: "Wed", value: 44000 },
    { day: "Thu", value: 50000 },
    { day: "Fri", value: 47000 },
    { day: "Sat", value: 52000 },
    { day: "Sun", value: 49000 }
  ];

  const movingItems = [
    { name: "iPhone 15 Pro", type: "fast", moved: 45, color: "green" },
    { name: "MacBook Air M2", type: "fast", moved: 32, color: "green" },
    { name: "Samsung Galaxy S24", type: "fast", moved: 28, color: "green" },
    { name: "Old Keyboard Model", type: "slow", moved: 2, color: "orange" },
    { name: "Vintage Mouse", type: "slow", moved: 1, color: "orange" }
  ];

  const stockAlerts = [
    { sku: "IPH15-256-BLK", name: "iPhone 15 256GB Black", current: 5, reorder: 20, status: "critical" },
    { sku: "MBA-M2-512", name: "MacBook Air M2 512GB", current: 12, reorder: 25, status: "low" },
    { sku: "SGS24-128", name: "Samsung Galaxy S24", current: 8, reorder: 15, status: "low" }
  ];

  const warehouseData = [
    { name: "Main Warehouse", stock: 850, percentage: 45 },
    { name: "Retail Store 1", stock: 620, percentage: 33 },
    { name: "Retail Store 2", stock: 410, percentage: 22 }
  ];

  const recentActivity = [
    { time: "10:30 AM", sku: "IPH15-256", action: "Stock In", qty: 50, user: "Admin" },
    { time: "09:45 AM", sku: "MBA-M2-512", action: "Stock Out", qty: 5, user: "Sales" },
    { time: "09:15 AM", sku: "SGS24-128", action: "Stock In", qty: 25, user: "Admin" },
    { time: "08:30 AM", sku: "ACD-HEADPHONES", action: "Stock Out", qty: 12, user: "Sales" }
  ];

  const returnsData = [
    { type: "Returned", count: 45, value: "₹1,25,000", color: "blue" },
    { type: "Damaged", count: 12, value: "₹35,000", color: "red" },
    { type: "Restocked", count: 38, value: "₹98,000", color: "green" }
  ];

  const expiringItems = [
    { name: "Protein Powder", sku: "PP-CHOC-1KG", expiry: "15 days", status: "critical" },
    { name: "Vitamin D3", sku: "VD3-1000IU", expiry: "28 days", status: "warning" },
    { name: "Omega 3 Capsules", sku: "OM3-60CAP", expiry: "45 days", status: "normal" }
  ];

  const topSKUs = [
    { rank: 1, name: "iPhone 15 Pro", qty: 145, revenue: "₹2,85,000", image: "/placeholder.svg" },
    { rank: 2, name: "MacBook Air M2", qty: 87, revenue: "₹8,95,000", image: "/placeholder.svg" },
    { rank: 3, name: "AirPods Pro", qty: 234, revenue: "₹5,85,000", image: "/placeholder.svg" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            Inventory Overview
          </h1>
          <p className="text-slate-600 mt-2">Monitor and manage your inventory in real-time</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 rounded-lg border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Today</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Custom Range</option>
          </select>
          
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total SKUs</p>
                <p className="text-3xl font-bold text-slate-900">1,452</p>
                <Badge variant="secondary" className="mt-2 bg-green-100 text-green-700">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +6% from last week
                </Badge>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Low Stock Items</p>
                <p className="text-3xl font-bold text-slate-900">78</p>
                <Badge variant="destructive" className="mt-2">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Needs attention
                </Badge>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Out of Stock</p>
                <p className="text-3xl font-bold text-slate-900">23</p>
                <Button size="sm" variant="outline" className="mt-2">
                  Restock now
                </Button>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Stock Value</p>
                <p className="text-3xl font-bold text-slate-900">₹4,50,000</p>
                <div className="mt-2 h-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stockTrendData}>
                      <Area type="monotone" dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main 8 Section Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {/* Inventory by Category */}
        <Card className="lg:col-span-1 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <PieChart className="h-5 w-5 text-purple-600" />
              Inventory by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              View Full List
            </Button>
          </CardContent>
        </Card>

        {/* Fast & Slow Moving Items */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Fast & Slow Moving Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {movingItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-500">Moved: {item.moved} units</p>
                  </div>
                  <Badge variant={item.type === 'fast' ? 'default' : 'secondary'} className={
                    item.type === 'fast' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }>
                    {item.type === 'fast' ? 'Fast' : 'Slow'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stock Alerts */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4">
              {stockAlerts.map((item, index) => (
                <div key={index} className="p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm text-slate-900">{item.name}</p>
                    <Badge variant={item.status === 'critical' ? 'destructive' : 'secondary'}>
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500">Current: {item.current} | Reorder: {item.reorder}</p>
                </div>
              ))}
            </div>
            <Button size="sm" className="w-full">
              Generate Purchase Order
            </Button>
          </CardContent>
        </Card>

        {/* Warehouse Distribution */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Warehouse className="h-5 w-5 text-indigo-600" />
              Warehouse Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {warehouseData.map((warehouse, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-900">{warehouse.name}</span>
                    <span className="text-sm text-slate-600">{warehouse.stock} items</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${warehouse.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Clock className="h-5 w-5 text-green-600" />
              Recent Stock Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "h-2 w-2 rounded-full",
                      activity.action === 'Stock In' ? 'bg-green-500' : 'bg-red-500'
                    )}></div>
                    <div>
                      <p className="font-medium text-sm text-slate-900">{activity.sku}</p>
                      <p className="text-xs text-slate-500">{activity.time} • {activity.user}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm text-slate-900">{activity.action}</p>
                    <p className="text-xs text-slate-500">Qty: {activity.qty}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Returns & Damaged Stock */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <RefreshCw className="h-5 w-5 text-purple-600" />
              Returns & Damages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {returnsData.map((item, index) => (
                <div key={index} className="p-3 bg-slate-50 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm text-slate-900">{item.type}</span>
                    <span className="text-sm font-bold text-slate-900">{item.count}</span>
                  </div>
                  <p className="text-xs text-slate-500">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expiring Inventory */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Calendar className="h-5 w-5 text-red-600" />
              Expiring Inventory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {expiringItems.map((item, index) => (
                <div key={index} className="p-3 bg-slate-50 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium text-sm text-slate-900">{item.name}</p>
                    <Badge variant={
                      item.status === 'critical' ? 'destructive' : 
                      item.status === 'warning' ? 'secondary' : 'outline'
                    }>
                      {item.expiry}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500">{item.sku}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top SKUs This Week */}
        <Card className="lg:col-span-2 xl:col-span-1 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <TrendingUp className="h-5 w-5 text-yellow-600" />
              Top SKUs This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topSKUs.map((sku, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="h-10 w-10 bg-slate-200 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-slate-600">#{sku.rank}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-slate-900">{sku.name}</p>
                    <p className="text-xs text-slate-500">Qty: {sku.qty} • {sku.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InventoryOverview;
