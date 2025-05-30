
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Users, Plus, Search, Copy, DollarSign, ExternalLink, ArrowUpRight, LineChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Sample data for affiliates
const affiliates = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@influencer.com",
    status: "active",
    referrals: 142,
    conversions: 78,
    revenue: 9360,
    commission: 936,
    joinDate: "2023-01-15"
  },
  {
    id: 2,
    name: "Mike Peterson",
    email: "mike@bloggernetwork.com",
    status: "active",
    referrals: 97,
    conversions: 35,
    revenue: 4200,
    commission: 420,
    joinDate: "2023-02-08"
  },
  {
    id: 3,
    name: "Emma Thompson",
    email: "emma@marketpro.com",
    status: "inactive",
    referrals: 53,
    conversions: 12,
    revenue: 1440,
    commission: 144,
    joinDate: "2023-03-22"
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james@contentcreator.com",
    status: "active",
    referrals: 215,
    conversions: 94,
    revenue: 11280,
    commission: 1128,
    joinDate: "2022-11-05"
  },
  {
    id: 5,
    name: "Olivia Davis",
    email: "olivia@socialmedia.com",
    status: "pending",
    referrals: 0,
    conversions: 0,
    revenue: 0,
    commission: 0,
    joinDate: "2023-05-01"
  }
];

// Sample data for clicks and conversion tracking
const clicksData = [
  { date: "May 1", clicks: 124, conversions: 7 },
  { date: "May 2", clicks: 145, conversions: 8 },
  { date: "May 3", clicks: 132, conversions: 6 },
  { date: "May 4", clicks: 159, conversions: 9 },
  { date: "May 5", clicks: 187, conversions: 12 },
  { date: "May 6", clicks: 168, conversions: 10 },
  { date: "May 7", clicks: 142, conversions: 8 }
];

const Affiliation = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Users className="h-6 w-6 mr-2 text-brand-blue" />
          <h1 className="text-xl font-semibold">Affiliation Program</h1>
        </div>
        <Button className="bg-brand-blue hover:bg-brand-blue/90">
          <Plus className="h-4 w-4 mr-2" /> Invite Affiliate
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-500">Active Affiliates</div>
            </div>
            <div className="text-3xl font-bold">24</div>
            <div className="text-sm text-green-600 mt-1 flex items-center">
              <span>+3</span>
              <span className="text-gray-500 ml-1">this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-500">Total Commissions</div>
            </div>
            <div className="text-3xl font-bold">$2,628</div>
            <div className="text-sm text-green-600 mt-1 flex items-center">
              <span>+18.3%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-500">Revenue Generated</div>
            </div>
            <div className="text-3xl font-bold">$26,280</div>
            <div className="text-sm text-green-600 mt-1 flex items-center">
              <span>+12.5%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Affiliate Partners</CardTitle>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input placeholder="Search affiliates..." className="pl-8" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="w-full">
                <div className="rounded-md border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="px-4 py-3 text-left">Affiliate</th>
                          <th className="px-4 py-3 text-left">Status</th>
                          <th className="px-4 py-3 text-right">Referrals</th>
                          <th className="px-4 py-3 text-right">Conversions</th>
                          <th className="px-4 py-3 text-right">Revenue</th>
                          <th className="px-4 py-3 text-right">Commission</th>
                          <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {affiliates.map(affiliate => (
                          <tr key={affiliate.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div className="font-medium">{affiliate.name}</div>
                              <div className="text-xs text-gray-500">{affiliate.email}</div>
                            </td>
                            <td className="px-4 py-3">
                              <Badge className={
                                affiliate.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                                affiliate.status === "inactive" ? "bg-gray-100 text-gray-800 hover:bg-gray-100" :
                                "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              }>
                                {affiliate.status}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-right">{affiliate.referrals.toLocaleString()}</td>
                            <td className="px-4 py-3 text-right">{affiliate.conversions.toLocaleString()}</td>
                            <td className="px-4 py-3 text-right">${affiliate.revenue.toLocaleString()}</td>
                            <td className="px-4 py-3 text-right">${affiliate.commission.toLocaleString()}</td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm">Details</Button>
                                <Button variant="ghost" size="sm">Pay</Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
              
              {["active", "inactive", "pending"].map(status => (
                <TabsContent key={status} value={status}>
                  <div className="rounded-md border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 border-b">
                            <th className="px-4 py-3 text-left">Affiliate</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-right">Referrals</th>
                            <th className="px-4 py-3 text-right">Conversions</th>
                            <th className="px-4 py-3 text-right">Revenue</th>
                            <th className="px-4 py-3 text-right">Commission</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {affiliates.filter(a => a.status === status).map(affiliate => (
                            <tr key={affiliate.id} className="border-b hover:bg-gray-50">
                              <td className="px-4 py-3">
                                <div className="font-medium">{affiliate.name}</div>
                                <div className="text-xs text-gray-500">{affiliate.email}</div>
                              </td>
                              <td className="px-4 py-3">
                                <Badge className={
                                  affiliate.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                                  affiliate.status === "inactive" ? "bg-gray-100 text-gray-800 hover:bg-gray-100" :
                                  "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                }>
                                  {affiliate.status}
                                </Badge>
                              </td>
                              <td className="px-4 py-3 text-right">{affiliate.referrals.toLocaleString()}</td>
                              <td className="px-4 py-3 text-right">{affiliate.conversions.toLocaleString()}</td>
                              <td className="px-4 py-3 text-right">${affiliate.revenue.toLocaleString()}</td>
                              <td className="px-4 py-3 text-right">${affiliate.commission.toLocaleString()}</td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="sm">Details</Button>
                                  <Button variant="ghost" size="sm">Pay</Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {affiliates.filter(a => a.status === status).length === 0 && (
                            <tr>
                              <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                                No {status} affiliates found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="pb-3">
            <CardTitle>Your Affiliate Program</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-1 block">Your referral link</label>
                <div className="flex">
                  <Input value="https://shop.com/ref?id=yourstore" readOnly className="rounded-r-none" />
                  <Button variant="outline" size="icon" className="rounded-l-none border-l-0">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <div className="mb-3">
                  <div className="text-sm font-medium">Commission rate</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl font-bold">10%</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="text-sm font-medium">Cookie duration</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl font-bold">30 days</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="text-sm font-medium">Approval process</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm">Manual approval</span>
                    <Badge>Current</Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm">Auto approval</span>
                    <Button variant="link" size="sm" className="text-brand-blue px-0 h-auto">Switch</Button>
                  </div>
                </div>
              </div>
              
              <div>
                <Button className="w-full bg-brand-blue hover:bg-brand-blue/90">
                  Program Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Commission Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Standard Commission</div>
                  <div className="text-sm text-gray-500">Default for all affiliates</div>
                </div>
                <div className="text-xl font-bold">10%</div>
              </div>
              
              <div className="border-t pt-4">
                <div className="font-medium mb-2">Tiered Commission Rates</div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">0-10 sales per month</div>
                    <div className="font-medium">10%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">11-50 sales per month</div>
                    <div className="font-medium">12%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">51+ sales per month</div>
                    <div className="font-medium">15%</div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="font-medium mb-2">Special Categories</div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Electronics</div>
                    <div className="font-medium">8%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Digital Products</div>
                    <div className="font-medium">15%</div>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <Button variant="outline" size="sm">
                  Edit Structure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Clicks & Conversion</CardTitle>
              <Button variant="outline" size="sm" className="flex items-center">
                <LineChart className="h-4 w-4 mr-1" /> View Full Analytics
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-600">Total Clicks</div>
                  <div className="text-2xl font-bold">1,057</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-600">Conversion Rate</div>
                  <div className="text-2xl font-bold">5.7%</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-600">Avg. Order Value</div>
                  <div className="text-2xl font-bold">$120</div>
                </div>
              </div>
              
              <div>
                <div className="mb-2 font-medium">Last 7 Days</div>
                <div className="space-y-2">
                  {clicksData.map((day, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <div>{day.date}</div>
                        <div>{day.clicks} clicks / {day.conversions} conversions</div>
                      </div>
                      <div className="flex gap-1 items-center">
                        <Progress value={(day.clicks / 200) * 100} className="h-2" />
                        <span className="text-xs text-gray-500 w-10 text-right">{((day.conversions / day.clicks) * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Marketing Materials</CardTitle>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" /> Add Material
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 hover:border-brand-blue hover:shadow-sm transition-all">
              <div className="font-medium mb-1">Banner Set (728×90, 300×250)</div>
              <p className="text-sm text-gray-600 mb-3">Product showcase banners for all sizes</p>
              <div className="flex justify-between">
                <Button variant="outline" size="sm" className="text-xs">
                  <Copy className="h-3 w-3 mr-1" /> Get Code
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <ExternalLink className="h-3 w-3 mr-1" /> Preview
                </Button>
              </div>
            </div>

            <div className="border rounded-lg p-4 hover:border-brand-blue hover:shadow-sm transition-all">
              <div className="font-medium mb-1">Product Images Pack</div>
              <p className="text-sm text-gray-600 mb-3">High-resolution product images with descriptions</p>
              <div className="flex justify-between">
                <Button variant="outline" size="sm" className="text-xs">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> Download
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <ExternalLink className="h-3 w-3 mr-1" /> Preview
                </Button>
              </div>
            </div>

            <div className="border rounded-lg p-4 hover:border-brand-blue hover:shadow-sm transition-all">
              <div className="font-medium mb-1">Email Template</div>
              <p className="text-sm text-gray-600 mb-3">Ready-to-use email promotion template</p>
              <div className="flex justify-between">
                <Button variant="outline" size="sm" className="text-xs">
                  <Copy className="h-3 w-3 mr-1" /> Get HTML
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <ExternalLink className="h-3 w-3 mr-1" /> Preview
                </Button>
              </div>
            </div>

            <div className="border rounded-lg p-4 hover:border-brand-blue hover:shadow-sm transition-all">
              <div className="font-medium mb-1">Social Media Kit</div>
              <p className="text-sm text-gray-600 mb-3">Graphics and copy for Facebook, Instagram, Twitter</p>
              <div className="flex justify-between">
                <Button variant="outline" size="sm" className="text-xs">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> Download
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <ExternalLink className="h-3 w-3 mr-1" /> Preview
                </Button>
              </div>
            </div>

            <div className="border rounded-lg p-4 hover:border-brand-blue hover:shadow-sm transition-all">
              <div className="font-medium mb-1">Product Review Guidelines</div>
              <p className="text-sm text-gray-600 mb-3">Templates for honest product reviews</p>
              <div className="flex justify-between">
                <Button variant="outline" size="sm" className="text-xs">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> Download PDF
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <ExternalLink className="h-3 w-3 mr-1" /> View Online
                </Button>
              </div>
            </div>

            <div className="border rounded-lg p-4 hover:border-brand-blue hover:shadow-sm transition-all">
              <div className="font-medium mb-1">Discount Codes</div>
              <p className="text-sm text-gray-600 mb-3">Special codes for affiliate promotions</p>
              <div className="flex justify-between">
                <Button variant="outline" size="sm" className="text-xs">
                  <Copy className="h-3 w-3 mr-1" /> View Codes
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <ExternalLink className="h-3 w-3 mr-1" /> Create New
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Affiliation;
