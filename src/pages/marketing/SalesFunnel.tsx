
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, Plus, Search, BarChart2, Users, DollarSign, ArrowRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

// Sample data for funnels
const funnels = [
  {
    id: 1,
    name: "Product Launch Funnel",
    status: "active",
    stages: 5,
    visitors: 3245,
    conversions: 127,
    revenue: 15840,
    conversionRate: 3.91
  },
  {
    id: 2,
    name: "Free Trial Conversion",
    status: "active",
    stages: 4,
    visitors: 1872,
    conversions: 92,
    revenue: 8280,
    conversionRate: 4.91
  },
  {
    id: 3,
    name: "Holiday Sale Funnel",
    status: "draft",
    stages: 3,
    visitors: 0,
    conversions: 0,
    revenue: 0,
    conversionRate: 0
  },
  {
    id: 4,
    name: "Lead Magnet Funnel",
    status: "active",
    stages: 3,
    visitors: 2156,
    conversions: 318,
    revenue: 3816,
    conversionRate: 14.75
  }
];

// Sample data for funnel stages
const funnelStages = [
  { id: 1, name: "Landing Page", visitors: 3245, conversions: 987, rate: 30.4 },
  { id: 2, name: "Product Page", visitors: 987, conversions: 423, rate: 42.9 },
  { id: 3, name: "Add to Cart", visitors: 423, conversions: 215, rate: 50.8 },
  { id: 4, name: "Checkout Started", visitors: 215, conversions: 154, rate: 71.6 },
  { id: 5, name: "Purchase Completed", visitors: 154, conversions: 127, rate: 82.5 }
];

const SalesFunnel = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Filter className="h-6 w-6 mr-2 text-brand-blue" />
          <h1 className="text-xl font-semibold">Sales Funnels</h1>
        </div>
        <Button className="bg-brand-blue hover:bg-brand-blue/90">
          <Plus className="h-4 w-4 mr-2" /> Create Funnel
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-500">Total Visitors</div>
            </div>
            <div className="text-3xl font-bold">7,273</div>
            <div className="text-sm text-green-600 mt-1 flex items-center">
              <span>+12.5%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-500">Conversion Rate</div>
            </div>
            <div className="text-3xl font-bold">4.67%</div>
            <div className="text-sm text-green-600 mt-1 flex items-center">
              <span>+0.8%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-500">Revenue Generated</div>
            </div>
            <div className="text-3xl font-bold">$27,936</div>
            <div className="text-sm text-green-600 mt-1 flex items-center">
              <span>+23.4%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="col-span-1 lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>Your Funnels</CardTitle>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input placeholder="Search funnels..." className="pl-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="px-4 py-3 text-left">Funnel Name</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Stages</th>
                        <th className="px-4 py-3 text-left">Visitors</th>
                        <th className="px-4 py-3 text-left">Conversions</th>
                        <th className="px-4 py-3 text-left">Revenue</th>
                        <th className="px-4 py-3 text-left">Rate</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {funnels.map(funnel => (
                        <tr key={funnel.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium">{funnel.name}</td>
                          <td className="px-4 py-3">
                            <Badge className={
                              funnel.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                              "bg-gray-100 text-gray-800 hover:bg-gray-100"
                            }>
                              {funnel.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">{funnel.stages}</td>
                          <td className="px-4 py-3">{funnel.visitors.toLocaleString()}</td>
                          <td className="px-4 py-3">{funnel.conversions.toLocaleString()}</td>
                          <td className="px-4 py-3">${funnel.revenue.toLocaleString()}</td>
                          <td className="px-4 py-3">{funnel.conversionRate}%</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm">Analytics</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Audience Segments
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Pricing Options
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Filter className="h-4 w-4 mr-2" />
                  Funnel Templates
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Featured Funnel Performance</CardTitle>
          <div className="text-sm text-gray-500">Product Launch Funnel - Last 30 days</div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="funnel">
            <TabsList className="mb-6">
              <TabsTrigger value="funnel">Funnel View</TabsTrigger>
              <TabsTrigger value="stages">Stage Analysis</TabsTrigger>
            </TabsList>
            <TabsContent value="funnel">
              <div className="space-y-8">
                {funnelStages.map((stage, index) => (
                  <div key={stage.id}>
                    <div className="flex justify-between items-center mb-1">
                      <div>
                        <span className="font-medium">{stage.name}</span>
                        <span className="text-sm text-gray-500 ml-2">({stage.visitors.toLocaleString()} visitors)</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">{stage.rate}%</span>
                        <span className="text-gray-500 ml-1">conversion rate</span>
                      </div>
                    </div>
                    <Progress value={stage.rate} className="h-3" />
                    {index < funnelStages.length - 1 && (
                      <div className="flex justify-center my-3">
                        <ArrowDown className="h-6 w-6 text-gray-300" />
                      </div>
                    )}
                  </div>
                ))}

                <div className="mt-6 border-t pt-6">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-sm text-gray-500">Starting Visitors</div>
                      <div className="text-xl font-bold">3,245</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Final Conversions</div>
                      <div className="text-xl font-bold">127</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Total Conversion Rate</div>
                      <div className="text-xl font-bold">3.91%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Revenue Generated</div>
                      <div className="text-xl font-bold">$15,840</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="stages">
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="px-4 py-3 text-left">Stage</th>
                        <th className="px-4 py-3 text-right">Visitors</th>
                        <th className="px-4 py-3 text-right">Conversions</th>
                        <th className="px-4 py-3 text-right">Drop-off</th>
                        <th className="px-4 py-3 text-right">Conversion Rate</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {funnelStages.map((stage, index) => (
                        <tr key={stage.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium">{stage.name}</td>
                          <td className="px-4 py-3 text-right">{stage.visitors.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right">{stage.conversions.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right">{(stage.visitors - stage.conversions).toLocaleString()}</td>
                          <td className="px-4 py-3 text-right">{stage.rate}%</td>
                          <td className="px-4 py-3 text-right">
                            <Button variant="ghost" size="sm">
                              Optimize <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default SalesFunnel;
