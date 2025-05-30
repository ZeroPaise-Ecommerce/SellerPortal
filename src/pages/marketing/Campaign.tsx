import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MessageSquare, Bell, Search, Plus, Megaphone } from "lucide-react";

const Campaign = () => {
  const [activeTab, setActiveTab] = useState("email");

  const campaignTypes = [
    { id: "email", label: "Email", icon: <Mail className="h-5 w-5" />, count: 12 },
    { id: "sms", label: "SMS", icon: <MessageSquare className="h-5 w-5" />, count: 5 },
    { id: "whatsapp", label: "WhatsApp", icon: <MessageSquare className="h-5 w-5" />, count: 8 },
    { id: "push", label: "Push Notification", icon: <Bell className="h-5 w-5" />, count: 3 },
  ];

  const campaigns = [
    { id: 1, name: "Welcome Series", type: "email", status: "active", sent: 1250, opened: 876, clicked: 432, date: "2023-05-10" },
    { id: 2, name: "Flash Sale", type: "email", status: "scheduled", sent: 0, opened: 0, clicked: 0, date: "2023-05-15" },
    { id: 3, name: "Abandoned Cart", type: "email", status: "active", sent: 875, opened: 542, clicked: 321, date: "2023-04-28" },
    { id: 4, name: "Product Launch", type: "email", status: "draft", sent: 0, opened: 0, clicked: 0, date: "2023-05-20" },
    { id: 5, name: "Order Confirmation", type: "sms", status: "active", sent: 542, opened: 0, clicked: 0, date: "2023-05-02" },
    { id: 6, name: "Shipping Update", type: "sms", status: "active", sent: 423, opened: 0, clicked: 0, date: "2023-05-03" },
    { id: 7, name: "Special Offer", type: "whatsapp", status: "active", sent: 321, opened: 287, clicked: 189, date: "2023-05-07" },
    { id: 8, name: "New Feature Alert", type: "push", status: "draft", sent: 0, opened: 0, clicked: 0, date: "2023-05-18" },
  ];

  const filteredCampaigns = campaigns.filter(campaign => campaign.type === activeTab);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Megaphone className="h-6 w-6 mr-2 text-brand-blue" />
          <h1 className="text-xl font-semibold">Campaign Manager</h1>
        </div>
        <Button className="bg-brand-blue hover:bg-brand-blue/90">
          <Plus className="h-4 w-4 mr-2" /> Create Campaign
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Marketing Campaigns</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search campaigns..." className="pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs 
            defaultValue="email" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full justify-start overflow-auto mb-6">
              {campaignTypes.map(type => (
                <TabsTrigger 
                  key={type.id} 
                  value={type.id}
                  className="flex items-center"
                >
                  {type.icon}
                  <span className="ml-2">{type.label}</span>
                  <Badge variant="outline" className="ml-2 bg-gray-100">
                    {type.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {campaignTypes.map(type => (
              <TabsContent key={type.id} value={type.id} className="w-full">
                <div className="rounded-md border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="px-4 py-3 text-left">Campaign Name</th>
                          <th className="px-4 py-3 text-left">Status</th>
                          <th className="px-4 py-3 text-left">Sent</th>
                          {type.id !== "sms" && <th className="px-4 py-3 text-left">Opened</th>}
                          {(type.id === "email" || type.id === "whatsapp") && <th className="px-4 py-3 text-left">Clicked</th>}
                          <th className="px-4 py-3 text-left">Date</th>
                          <th className="px-4 py-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCampaigns.length > 0 ? (
                          filteredCampaigns.map(campaign => (
                            <tr key={campaign.id} className="border-b hover:bg-gray-50">
                              <td className="px-4 py-3 font-medium">{campaign.name}</td>
                              <td className="px-4 py-3">
                                <Badge className={
                                  campaign.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                                  campaign.status === "scheduled" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" :
                                  "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                }>
                                  {campaign.status}
                                </Badge>
                              </td>
                              <td className="px-4 py-3">{campaign.sent.toLocaleString()}</td>
                              {type.id !== "sms" && <td className="px-4 py-3">{campaign.opened.toLocaleString()}</td>}
                              {(type.id === "email" || type.id === "whatsapp") && <td className="px-4 py-3">{campaign.clicked.toLocaleString()}</td>}
                              <td className="px-4 py-3">{new Date(campaign.date).toLocaleDateString()}</td>
                              <td className="px-4 py-3">
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="sm">Edit</Button>
                                  <Button variant="ghost" size="sm">View</Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                              No campaigns found. Create your first {type.label} campaign.
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
    </DashboardLayout>
  );
};

export default Campaign;
