
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Plus, Search, ArrowRight, Clock, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data for automation workflows
const automationWorkflows = [
  {
    id: 1,
    name: "Welcome Series",
    trigger: "Sign Up",
    status: "active",
    lastEdited: "2023-05-07",
    steps: 4,
    category: "onboarding"
  },
  {
    id: 2,
    name: "Abandoned Cart Recovery",
    trigger: "Cart Abandoned",
    status: "active",
    lastEdited: "2023-05-05",
    steps: 3,
    category: "sales"
  },
  {
    id: 3,
    name: "Re-engagement Campaign",
    trigger: "Inactivity (30 days)",
    status: "paused",
    lastEdited: "2023-04-28",
    steps: 5,
    category: "retention"
  },
  {
    id: 4,
    name: "Post-Purchase Follow-up",
    trigger: "Order Completed",
    status: "active",
    lastEdited: "2023-05-02",
    steps: 3,
    category: "sales"
  },
  {
    id: 5,
    name: "Birthday Rewards",
    trigger: "Birthday Date",
    status: "draft",
    lastEdited: "2023-05-10",
    steps: 2,
    category: "loyalty"
  },
  {
    id: 6,
    name: "Subscription Renewal",
    trigger: "7 Days Before Renewal",
    status: "active",
    lastEdited: "2023-05-01",
    steps: 2,
    category: "retention"
  }
];

// Featured automation templates
const automationTemplates = [
  {
    id: 1,
    name: "Abandoned Cart Recovery",
    description: "Remind customers about items left in their cart",
    category: "sales",
    steps: 3,
    popularity: "Popular"
  },
  {
    id: 2,
    name: "Welcome Series",
    description: "Introduce new customers to your brand",
    category: "onboarding",
    steps: 4,
    popularity: "Most Used"
  },
  {
    id: 3,
    name: "Win-Back Campaign",
    description: "Re-engage customers who haven't purchased recently",
    category: "retention",
    steps: 3,
    popularity: "Effective"
  }
];

const Automation = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Zap className="h-6 w-6 mr-2 text-brand-blue" />
          <h1 className="text-xl font-semibold">Automation</h1>
        </div>
        <Button className="bg-brand-blue hover:bg-brand-blue/90">
          <Plus className="h-4 w-4 mr-2" /> Create Workflow
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Your Workflows</CardTitle>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input placeholder="Search workflows..." className="pl-8" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
                <TabsTrigger value="sales">Sales</TabsTrigger>
                <TabsTrigger value="retention">Retention</TabsTrigger>
                <TabsTrigger value="loyalty">Loyalty</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="w-full">
                <div className="rounded-md border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="px-4 py-3 text-left">Name</th>
                          <th className="px-4 py-3 text-left">Trigger</th>
                          <th className="px-4 py-3 text-left">Status</th>
                          <th className="px-4 py-3 text-left">Steps</th>
                          <th className="px-4 py-3 text-left">Last Edited</th>
                          <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {automationWorkflows.map(workflow => (
                          <tr key={workflow.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium">{workflow.name}</td>
                            <td className="px-4 py-3">{workflow.trigger}</td>
                            <td className="px-4 py-3">
                              <Badge className={
                                workflow.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                                workflow.status === "paused" ? "bg-amber-100 text-amber-800 hover:bg-amber-100" :
                                "bg-gray-100 text-gray-800 hover:bg-gray-100"
                              }>
                                {workflow.status}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">{workflow.steps} steps</td>
                            <td className="px-4 py-3">{new Date(workflow.lastEdited).toLocaleDateString()}</td>
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
              </TabsContent>
              
              {["onboarding", "sales", "retention", "loyalty"].map(category => (
                <TabsContent key={category} value={category}>
                  <div className="rounded-md border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 border-b">
                            <th className="px-4 py-3 text-left">Name</th>
                            <th className="px-4 py-3 text-left">Trigger</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-left">Steps</th>
                            <th className="px-4 py-3 text-left">Last Edited</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {automationWorkflows.filter(w => w.category === category).map(workflow => (
                            <tr key={workflow.id} className="border-b hover:bg-gray-50">
                              <td className="px-4 py-3 font-medium">{workflow.name}</td>
                              <td className="px-4 py-3">{workflow.trigger}</td>
                              <td className="px-4 py-3">
                                <Badge className={
                                  workflow.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                                  workflow.status === "paused" ? "bg-amber-100 text-amber-800 hover:bg-amber-100" :
                                  "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                }>
                                  {workflow.status}
                                </Badge>
                              </td>
                              <td className="px-4 py-3">{workflow.steps} steps</td>
                              <td className="px-4 py-3">{new Date(workflow.lastEdited).toLocaleDateString()}</td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="sm">Edit</Button>
                                  <Button variant="ghost" size="sm">Analytics</Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {automationWorkflows.filter(w => w.category === category).length === 0 && (
                            <tr>
                              <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                No {category} workflows found. Create one now.
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

        {/* Templates section */}
        <Card className="col-span-1">
          <CardHeader className="pb-3">
            <CardTitle>Automation Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {automationTemplates.map(template => (
                <div key={template.id} className="p-4 border rounded-lg hover:border-brand-blue hover:shadow-sm transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{template.name}</h3>
                    {template.popularity && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {template.popularity}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <Clock className="h-3 w-3 mr-1" />
                    <span className="mr-3">{template.steps} steps</span>
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>~5 days to complete</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-1">
                    Use Template <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              ))}
              <div className="text-center">
                <Button variant="link" className="text-brand-blue">
                  View All Templates
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Automation metrics card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Automation Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <div className="text-3xl font-bold text-brand-blue">87%</div>
              <div className="text-sm text-gray-600">Average Completion Rate</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-3xl font-bold text-brand-blue">1,284</div>
              <div className="text-sm text-gray-600">Customers in Workflows</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-3xl font-bold text-brand-blue">$12,580</div>
              <div className="text-sm text-gray-600">Revenue Generated</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Automation;
