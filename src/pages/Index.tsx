
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import { 
  ArrowRight, 
  ArrowUp, 
  ArrowDown, 
  Clock, 
  Package, 
  ShoppingCart, 
  Users, 
  Wallet, 
  DollarSign, 
  Calendar,
  Bell,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Star
} from "lucide-react";

const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 7000 },
  { name: "Jun", sales: 6000 },
  { name: "Jul", sales: 8000 },
  { name: "Aug", sales: 7500 },
  { name: "Sep", sales: 9000 },
  { name: "Oct", sales: 8500 },
  { name: "Nov", sales: 10000 },
  { name: "Dec", sales: 9500 },
];

const visitorsData = [
  { name: "Mon", visitors: 1500, customers: 600 },
  { name: "Tue", visitors: 2000, customers: 800 },
  { name: "Wed", visitors: 1800, customers: 720 },
  { name: "Thu", visitors: 2200, customers: 950 },
  { name: "Fri", visitors: 2500, customers: 1100 },
  { name: "Sat", visitors: 2300, customers: 980 },
  { name: "Sun", visitors: 1900, customers: 820 },
];

const productCategories = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 25 },
  { name: "Furniture", value: 20 },
  { name: "Books", value: 12 },
  { name: "Others", value: 8 },
];

const COLORS = ["#1EAEDB", "#33C3F0", "#0FA0CE", "#6EDFF6", "#9BE8FA"];

const statCards = [
  {
    title: "Total Sales",
    value: "$12,346",
    change: "+12.5%",
    changeType: "positive",
    icon: DollarSign,
  },
  {
    title: "Orders",
    value: "234",
    change: "+18.2%",
    changeType: "positive",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    value: "1,245",
    change: "+5.3%",
    changeType: "positive",
    icon: Users,
  },
  {
    title: "Revenue",
    value: "$8,562",
    change: "-2.1%",
    changeType: "negative",
    icon: Wallet,
  },
];

const recentOrders = [
  { id: "#ORD-71253", customer: "John Smith", date: "May 6, 2023", amount: "$125.00", status: "Delivered" },
  { id: "#ORD-58234", customer: "Sara Johnson", date: "May 5, 2023", amount: "$245.99", status: "Processing" },
  { id: "#ORD-35912", customer: "Robert Brown", date: "May 5, 2023", amount: "$79.49", status: "Shipped" },
  { id: "#ORD-23145", customer: "Emily Davis", date: "May 4, 2023", amount: "$149.99", status: "Delivered" },
];

const activities = [
  { time: "09:32 AM", event: "New order received", orderId: "#ORD-71254", priority: "normal" },
  { time: "09:15 AM", event: "Low stock alert", product: "Wireless Headphones", priority: "high" },
  { time: "08:49 AM", event: "New product review", rating: "4.5", priority: "normal" },
  { time: "Yesterday", event: "Support ticket resolved", ticketId: "#TKT-4321", priority: "normal" },
  { time: "Yesterday", event: "Payment failed", orderId: "#ORD-71220", priority: "critical" },
];

const todayStats = [
  { title: "Online Visitors", value: "1,245", change: "+124" },
  { title: "Today's Revenue", value: "$1,834", change: "+$346" },
  { title: "Pending Orders", value: "18", change: "-3" },
  { title: "Support Tickets", value: "7", change: "+2" },
];

const topProducts = [
  { name: "Wireless Earbuds", sold: 24, amount: "$960" },
  { name: "Smart Watch", sold: 16, amount: "$1,600" },
  { name: "Bluetooth Speaker", sold: 12, amount: "$600" },
  { name: "Fitness Tracker", sold: 10, amount: "$450" },
];

const Index = () => {
  const [timeframe, setTimeframe] = useState("today");
  
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, Admin</h1>
          <p className="text-sm text-gray-500">Here's what's happening with your store today</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={timeframe === "today" ? "default" : "outline"}
            size="sm"
            className="text-xs font-semibold"
            onClick={() => setTimeframe("today")}
          >
            Today
          </Button>
          <Button
            variant={timeframe === "week" ? "default" : "outline"}
            size="sm"
            className="text-xs font-semibold"
            onClick={() => setTimeframe("week")}
          >
            This Week
          </Button>
          <Button
            variant={timeframe === "month" ? "default" : "outline"}
            size="sm"
            className="text-xs font-semibold"
            onClick={() => setTimeframe("month")}
          >
            This Month
          </Button>
        </div>
      </div>

      {/* Today's Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {todayStats.map((stat, index) => (
          <Card key={index} className="border hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">{stat.title}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-lg font-bold">{stat.value}</p>
                <div className={`text-xs ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="bg-brand-blue/10 p-3 rounded-lg mr-4">
                    <Icon className="h-5 w-5 text-brand-blue" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{stat.title}</p>
                    <h3 className="text-lg font-bold">{stat.value}</h3>
                    <div className={`flex items-center text-xs ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.changeType === 'positive' ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                      <span>{stat.change} this week</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Sales Chart & Visitor Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="border hover:shadow-md transition-shadow">
          <CardHeader className="pb-0 pt-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base font-semibold">Monthly Sales</CardTitle>
              <Button variant="outline" size="sm" className="text-xs flex items-center">
                View Report <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1EAEDB" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#1EAEDB" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="name" fontSize={12} tick={{ fill: '#6B7280' }} />
                  <YAxis fontSize={12} tick={{ fill: '#6B7280' }} />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, "Sales"]}
                    labelFormatter={(label) => `Month: ${label}`}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#1EAEDB" 
                    fillOpacity={1} 
                    fill="url(#colorSales)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border hover:shadow-md transition-shadow">
          <CardHeader className="pb-0 pt-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base font-semibold">Visitor Trends</CardTitle>
              <Button variant="outline" size="sm" className="text-xs flex items-center">
                View Details <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitorsData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="name" fontSize={12} tick={{ fill: '#6B7280' }} />
                  <YAxis fontSize={12} tick={{ fill: '#6B7280' }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="visitors" 
                    name="All Visitors"
                    stroke="#1EAEDB" 
                    strokeWidth={2}
                    activeDot={{ r: 6 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="customers" 
                    name="Customers"
                    stroke="#0FA0CE" 
                    strokeWidth={2}
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="border hover:shadow-md transition-shadow lg:col-span-2">
          <CardHeader className="pb-0 pt-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base font-semibold">Recent Orders</CardTitle>
              <Button variant="outline" size="sm" className="text-xs">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 font-medium text-xs">Order ID</th>
                    <th className="pb-2 font-medium text-xs">Customer</th>
                    <th className="pb-2 font-medium text-xs">Date</th>
                    <th className="pb-2 font-medium text-xs">Amount</th>
                    <th className="pb-2 font-medium text-xs">Status</th>
                    <th className="pb-2 font-medium text-xs"></th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-3 text-xs">{order.id}</td>
                      <td className="py-3 text-xs">{order.customer}</td>
                      <td className="py-3 text-xs">{order.date}</td>
                      <td className="py-3 text-xs font-semibold">{order.amount}</td>
                      <td className="py-3 text-xs">
                        <span 
                          className={`px-2 py-1 rounded-full text-xs ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 text-xs">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="border hover:shadow-md transition-shadow">
          <CardHeader className="pb-0 pt-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Bell className="h-4 w-4" /> Recent Activities
              </CardTitle>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex gap-3">
                  <div className={`flex-shrink-0 mt-0.5 w-2 h-2 rounded-full ${
                    activity.priority === 'critical' ? 'bg-red-500' : 
                    activity.priority === 'high' ? 'bg-yellow-500' : 'bg-gray-300'
                  }`} />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-xs font-medium">{activity.event}</p>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {activity.orderId ? `Order: ${activity.orderId}` : ''}
                      {activity.product ? `Product: ${activity.product}` : ''}
                      {activity.rating ? `Rating: ${activity.rating}/5` : ''}
                      {activity.ticketId ? `Ticket: ${activity.ticketId}` : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border hover:shadow-md transition-shadow">
          <CardHeader className="pb-0 pt-4">
            <CardTitle className="text-base font-semibold">Product Categories</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productCategories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {productCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border hover:shadow-md transition-shadow">
          <CardHeader className="pb-0 pt-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base font-semibold">Top Selling Products</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-brand-blue/10 rounded-md flex items-center justify-center">
                      <Package className="h-4 w-4 text-brand-blue" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.sold} units sold</p>
                    </div>
                  </div>
                  <div className="text-xs font-medium">{product.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border hover:shadow-md transition-shadow">
          <CardHeader className="pb-0 pt-4">
            <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="sm" className="flex flex-col h-auto py-3 gap-1 justify-center text-left">
                <Package className="h-4 w-4" />
                <span className="text-xs">Add Product</span>
              </Button>
              <Button variant="outline" size="sm" className="flex flex-col h-auto py-3 gap-1 justify-center text-left">
                <ShoppingCart className="h-4 w-4" />
                <span className="text-xs">New Order</span>
              </Button>
              <Button variant="outline" size="sm" className="flex flex-col h-auto py-3 gap-1 justify-center text-left">
                <Users className="h-4 w-4" />
                <span className="text-xs">Add Customer</span>
              </Button>
              <Button variant="outline" size="sm" className="flex flex-col h-auto py-3 gap-1 justify-center text-left">
                <Calendar className="h-4 w-4" />
                <span className="text-xs">Schedule</span>
              </Button>
              <Button variant="outline" size="sm" className="flex flex-col h-auto py-3 gap-1 justify-center text-left">
                <Star className="h-4 w-4" />
                <span className="text-xs">Reviews</span>
              </Button>
              <Button variant="outline" size="sm" className="flex flex-col h-auto py-3 gap-1 justify-center text-left">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs">Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Index;
