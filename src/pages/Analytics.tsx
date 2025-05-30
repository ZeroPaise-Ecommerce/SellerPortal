
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  BarChart2, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar, 
  Filter, 
  ArrowRight, 
  Users, 
  MousePointerClick, 
  ShoppingBag, 
  Clock, 
  Globe,
  Monitor,
  Smartphone, 
  Tablet,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Eye,
  Heart,
  Award,
  CheckCircle,
  Zap,
  Target,
  AlertTriangle
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Area,
  AreaChart,
  RadialBarChart,
  RadialBar
} from "recharts";

const salesData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 7000 },
  { name: "Jun", value: 6000 },
  { name: "Jul", value: 8000 },
  { name: "Aug", value: 9000 },
  { name: "Sep", value: 7500 },
  { name: "Oct", value: 8500 },
  { name: "Nov", value: 9500 },
  { name: "Dec", value: 10000 },
];

const trafficSourceData = [
  { name: "Direct", value: 35 },
  { name: "Organic", value: 25 },
  { name: "Social", value: 20 },
  { name: "Referral", value: 15 },
  { name: "Paid", value: 5 },
];

const deviceData = [
  { name: "Mobile", value: 65 },
  { name: "Desktop", value: 30 },
  { name: "Tablet", value: 5 },
];

const COLORS = ["#1EAEDB", "#2DA7C4", "#3C9AAE", "#4B8D98", "#5A8082"];
const DEVICE_COLORS = ["#1EAEDB", "#33C3F0", "#0FA0CE"];

const customerRetentionData = [
  { name: "Week 1", new: 500, returning: 0 },
  { name: "Week 2", new: 400, returning: 300 },
  { name: "Week 3", new: 450, returning: 350 },
  { name: "Week 4", new: 470, returning: 400 },
  { name: "Week 5", new: 500, returning: 450 },
  { name: "Week 6", new: 600, returning: 500 },
];

const conversionFunnelData = [
  { name: "Visits", value: 10000 },
  { name: "Product Views", value: 7500 },
  { name: "Add to Cart", value: 3000 },
  { name: "Checkout", value: 1800 },
  { name: "Purchase", value: 1000 },
];

const hourlyTrafficData = [
  { hour: "00:00", traffic: 120 },
  { hour: "02:00", traffic: 80 },
  { hour: "04:00", traffic: 50 },
  { hour: "06:00", traffic: 100 },
  { hour: "08:00", traffic: 250 },
  { hour: "10:00", traffic: 380 },
  { hour: "12:00", traffic: 420 },
  { hour: "14:00", traffic: 450 },
  { hour: "16:00", traffic: 400 },
  { hour: "18:00", traffic: 380 },
  { hour: "20:00", traffic: 320 },
  { hour: "22:00", traffic: 200 },
];

const performanceMetrics = [
  {
    name: "Revenue",
    value: "$128,540",
    change: "+12.5%",
    trend: "up",
  },
  {
    name: "Orders",
    value: "1,254",
    change: "+8.2%",
    trend: "up",
  },
  {
    name: "Average Order Value",
    value: "$102.50",
    change: "+3.7%",
    trend: "up",
  },
  {
    name: "Conversion Rate",
    value: "3.2%",
    change: "-0.8%",
    trend: "down",
  },
];

const socialMediaPerformance = [
  { name: "Facebook", visitors: 5300, conversion: 2.4 },
  { name: "Instagram", visitors: 4200, conversion: 3.1 },
  { name: "Twitter", visitors: 2100, conversion: 1.8 },
  { name: "Pinterest", visitors: 1800, conversion: 4.2 },
  { name: "LinkedIn", visitors: 950, conversion: 0.9 },
];

const topProducts = [
  { name: "Wireless Earbuds", sold: 324, revenue: "$12,960" },
  { name: "Smart Watch", sold: 276, revenue: "$27,600" },
  { name: "Fitness Tracker", sold: 253, revenue: "$12,650" },
  { name: "Bluetooth Speaker", sold: 198, revenue: "$9,900" },
];

const Analytics = () => {
  const [timeframe, setTimeframe] = useState("12months");

  return (
    <DashboardLayout>
      <div className="flex flex-col mb-8">
        <div className="flex items-center mb-2">
          <BarChart2 size={24} className="text-brand-blue mr-3" />
          <h1 className="text-xl font-bold">Analytics Dashboard</h1>
        </div>
        <p className="text-sm text-gray-500">Comprehensive data insights for your business</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Button
            variant={timeframe === "7days" ? "default" : "outline"}
            size="sm"
            className="text-xs font-semibold"
            onClick={() => setTimeframe("7days")}
          >
            7 Days
          </Button>
          <Button
            variant={timeframe === "30days" ? "default" : "outline"}
            size="sm"
            className="text-xs font-semibold"
            onClick={() => setTimeframe("30days")}
          >
            30 Days
          </Button>
          <Button
            variant={timeframe === "12months" ? "default" : "outline"}
            size="sm"
            className="text-xs font-semibold"
            onClick={() => setTimeframe("12months")}
          >
            12 Months
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Custom Range</span>
          </Button>
          <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
            <Filter className="h-3 w-3" />
            <span>Filter</span>
          </Button>
        </div>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {performanceMetrics.map((metric) => (
          <Card key={metric.name} className="border hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">{metric.name}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-lg font-bold">{metric.value}</p>
                <div
                  className={`flex items-center text-xs ${
                    metric.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {metric.trend === "up" ? (
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-3 w-3" />
                  )}
                  {metric.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Row 1 - Main charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="border hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1EAEDB" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#1EAEDB" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="name" fontSize={12} tick={{ fill: '#6B7280' }} />
                  <YAxis fontSize={12} tick={{ fill: '#6B7280' }} />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, "Revenue"]}
                    labelFormatter={(label) => `Month: ${label}`}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#1EAEDB" 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Customer Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={customerRetentionData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                >
                  <defs>
                    <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1EAEDB" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#1EAEDB" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorReturning" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#33C3F0" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#33C3F0" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="name" fontSize={12} tick={{ fill: '#6B7280' }} />
                  <YAxis fontSize={12} tick={{ fill: '#6B7280' }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="new" 
                    name="New Customers" 
                    stroke="#1EAEDB" 
                    fillOpacity={1} 
                    fill="url(#colorNew)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="returning" 
                    name="Returning Customers" 
                    stroke="#33C3F0" 
                    fillOpacity={1} 
                    fill="url(#colorReturning)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2 - Traffic & Conversion */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card className="border hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {trafficSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, "Percentage"]}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Device Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={DEVICE_COLORS[index % DEVICE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, "Percentage"]}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-2">
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4 text-[#1EAEDB]" />
                <span className="text-xs">Desktop</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-[#33C3F0]" />
                <span className="text-xs">Mobile</span>
              </div>
              <div className="flex items-center gap-2">
                <Tablet className="h-4 w-4 text-[#0FA0CE]" />
                <span className="text-xs">Tablet</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  layout="vertical" 
                  data={conversionFunnelData} 
                  margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" fontSize={12} tick={{ fill: '#6B7280' }} />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    fontSize={12} 
                    tick={{ fill: '#6B7280' }} 
                    width={80}
                  />
                  <Tooltip 
                    formatter={(value) => [value, "Count"]}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#1EAEDB" 
                    radius={[0, 4, 4, 0]}
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 3 - Mini Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { 
            title: "Avg. Session Duration", 
            value: "3m 42s", 
            change: "+8.4%",
            trend: "up",
            icon: <Clock className="h-4 w-4" /> 
          },
          { 
            title: "Bounce Rate", 
            value: "42.3%", 
            change: "-3.1%",
            trend: "up",
            icon: <MousePointerClick className="h-4 w-4" /> 
          },
          { 
            title: "Sessions per User", 
            value: "2.4", 
            change: "+0.3%",
            trend: "up",
            icon: <Users className="h-4 w-4" /> 
          },
          { 
            title: "Cart Abandonment", 
            value: "68.7%", 
            change: "-2.3%",
            trend: "up",
            icon: <ShoppingBag className="h-4 w-4" /> 
          },
        ].map((stat, index) => (
          <Card key={index} className="border hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center">
              <div className="bg-brand-blue/10 p-3 rounded-full mr-3">
                <div className="text-brand-blue">
                  {stat.icon}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500">{stat.title}</p>
                <div className="flex items-center gap-2">
                  <p className="text-base font-semibold">{stat.value}</p>
                  <div
                    className={`flex items-center text-xs ${
                      stat.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {stat.change}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Row 4 - Hourly Traffic & Social Media Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="border hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Hourly Traffic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyTrafficData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="hour" fontSize={12} tick={{ fill: '#6B7280' }} />
                  <YAxis fontSize={12} tick={{ fill: '#6B7280' }} />
                  <Tooltip 
                    formatter={(value) => [value, "Visitors"]}
                    labelFormatter={(label) => `Time: ${label}`}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="traffic" 
                    stroke="#1EAEDB" 
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#1EAEDB" }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <CardTitle className="text-base font-semibold">Social Media Performance</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs flex items-center">
                View All <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 text-left font-semibold text-xs">Platform</th>
                    <th className="pb-2 text-right font-semibold text-xs">Visitors</th>
                    <th className="pb-2 text-right font-semibold text-xs">Conv. Rate</th>
                    <th className="pb-2 text-right font-semibold text-xs"></th>
                  </tr>
                </thead>
                <tbody>
                  {socialMediaPerformance.map((platform, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-3 text-xs">{platform.name}</td>
                      <td className="py-3 text-xs text-right">{platform.visitors.toLocaleString()}</td>
                      <td className="py-3 text-xs text-right">{platform.conversion}%</td>
                      <td className="py-3 text-xs text-right">
                        <span 
                          className={`inline-block w-16 h-1.5 rounded-full ${
                            platform.conversion > 3 ? 'bg-green-500' : 
                            platform.conversion > 2 ? 'bg-blue-500' : 
                            platform.conversion > 1 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 5 - Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { 
            title: "Purchase Completion Rate", 
            value: "64.2%", 
            change: "+5.3%",
            trend: "up",
            icon: <CheckCircle className="h-4 w-4" />,
            color: "bg-green-500" 
          },
          { 
            title: "Return Rate", 
            value: "8.7%", 
            change: "-1.2%",
            trend: "up",
            icon: <AlertTriangle className="h-4 w-4" />,
            color: "bg-yellow-500"
          },
          { 
            title: "Customer Lifetime Value", 
            value: "$347", 
            change: "+$23",
            trend: "up",
            icon: <Award className="h-4 w-4" />,
            color: "bg-purple-500"
          },
          { 
            title: "Customer Acquisition Cost", 
            value: "$32.40", 
            change: "-$4.12",
            trend: "up",
            icon: <Target className="h-4 w-4" />,
            color: "bg-blue-500"
          },
        ].map((stat, index) => (
          <Card key={index} className="border hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div className={`p-2 rounded-md bg-opacity-10 ${stat.color.replace('bg-', 'bg-opacity-10 bg-')}`}>
                  <div className={stat.color.replace('bg-', 'text-')}>
                    {stat.icon}
                  </div>
                </div>
                <div
                  className={`flex items-center text-xs ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-3 w-3" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="text-xs text-gray-500">{stat.title}</p>
              <p className="text-lg font-semibold mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Row 6 - Top Products & Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="border hover:shadow-md transition-shadow lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <CardTitle className="text-base font-semibold">Top Selling Products</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs flex items-center">
                View All <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 text-left font-semibold text-xs">Product</th>
                    <th className="pb-2 text-right font-semibold text-xs">Units Sold</th>
                    <th className="pb-2 text-right font-semibold text-xs">Revenue</th>
                    <th className="pb-2 text-right font-semibold text-xs">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-3 text-xs">{product.name}</td>
                      <td className="py-3 text-xs text-right">{product.sold}</td>
                      <td className="py-3 text-xs text-right">{product.revenue}</td>
                      <td className="py-3 text-xs text-right">
                        <TrendingUp className="h-3 w-3 text-green-500 inline" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="border hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Sales Targets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Monthly Goal</span>
                  <span className="font-semibold">$120,000 / $150,000</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-brand-blue rounded-full" style={{ width: '80%' }}></div>
                </div>
                <div className="flex justify-end text-xs mt-1">
                  <span className="text-gray-500">80% achieved</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Quarterly Goal</span>
                  <span className="font-semibold">$325,000 / $450,000</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: '72%' }}></div>
                </div>
                <div className="flex justify-end text-xs mt-1">
                  <span className="text-gray-500">72% achieved</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Annual Goal</span>
                  <span className="font-semibold">$1.2M / $2M</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <div className="flex justify-end text-xs mt-1">
                  <span className="text-gray-500">60% achieved</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 7 - Additional Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[
          { 
            title: "Page Views", 
            value: "143,921", 
            change: "+12.4%",
            icon: <Eye className="h-4 w-4" />,
            color: "text-blue-500"
          },
          { 
            title: "Wishlist Adds", 
            value: "2,845", 
            change: "+23.1%",
            icon: <Heart className="h-4 w-4" />,
            color: "text-pink-500"
          },
          { 
            title: "Click-through Rate", 
            value: "4.3%", 
            change: "+0.7%",
            icon: <Zap className="h-4 w-4" />,
            color: "text-yellow-500"
          },
        ].map((stat, index) => (
          <Card key={index} className="border hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500 mb-1">{stat.title}</p>
                  <p className="text-lg font-semibold">{stat.value}</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-full">
                  <div className={stat.color}>
                    {stat.icon}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>{stat.change} from last period</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
