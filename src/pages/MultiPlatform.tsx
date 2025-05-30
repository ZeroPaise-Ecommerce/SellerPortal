
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Plus, CheckCircle, AlertCircle } from "lucide-react";

const platformsData = [
  {
    name: "Amazon",
    status: "Connected",
    products: 124,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png",
    lastSync: "Today at 09:45 AM",
    health: "Healthy",
  },
  {
    name: "Flipkart",
    status: "Connected",
    products: 98,
    logo: "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png",
    lastSync: "Today at 10:15 AM",
    health: "Healthy",
  },
  {
    name: "Myntra",
    status: "Issue",
    products: 76,
    logo: "https://logos-download.com/wp-content/uploads/2016/10/Myntra_logo.png",
    lastSync: "Yesterday at 02:30 PM",
    health: "API Error",
  },
  {
    name: "Meesho",
    status: "Not Connected",
    products: 0,
    logo: "https://storage.googleapis.com/meesho-io-production/web-next/artifacts/images/meesho-logo-black.png",
    lastSync: "Never",
    health: "Not Connected",
  },
];

const MultiPlatform = () => {
  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center">
        <div className="mr-3">
          <Globe size={24} className="text-brand-blue" />
        </div>
        <div>
          <h1 className="text-lg font-bold">Multi-Platform Integration</h1>
          <p className="text-sm text-gray-500">Manage your marketplace connections</p>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Integration Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-md border">
              <p className="text-sm text-gray-500">Connected Platforms</p>
              <p className="text-lg font-bold">3/4</p>
              <p className="text-xs text-gray-500">Marketplaces</p>
            </div>
            <div className="bg-white p-4 rounded-md border">
              <p className="text-sm text-gray-500">Total Products Synced</p>
              <p className="text-lg font-bold">298</p>
              <p className="text-xs text-green-500">Across all channels</p>
            </div>
            <div className="bg-white p-4 rounded-md border">
              <p className="text-sm text-gray-500">Platform Orders</p>
              <p className="text-lg font-bold">145</p>
              <p className="text-xs text-green-500">Last 30 days</p>
            </div>
            <div className="bg-white p-4 rounded-md border">
              <p className="text-sm text-gray-500">Platform Revenue</p>
              <p className="text-lg font-bold">$24,568</p>
              <p className="text-xs text-green-500">Last 30 days</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {platformsData.map((platform) => (
          <Card key={platform.name} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col">
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center">
                    <div className="h-12 w-12 mr-4 flex items-center justify-center">
                      <img 
                        src={platform.logo} 
                        alt={`${platform.name} logo`}
                        className="max-h-10 max-w-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold">{platform.name}</h3>
                      <div className="flex items-center mt-1">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            platform.status === "Connected"
                              ? "bg-green-100 text-green-800"
                              : platform.status === "Issue"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {platform.status === "Connected" ? (
                            <CheckCircle className="mr-1 h-3 w-3" />
                          ) : platform.status === "Issue" ? (
                            <AlertCircle className="mr-1 h-3 w-3" />
                          ) : (
                            <></>
                          )}
                          {platform.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={platform.status !== "Connected" ? "default" : "outline"}
                    className={platform.status !== "Connected" ? "bg-brand-blue hover:bg-brand-dark-blue" : ""}
                  >
                    {platform.status !== "Connected" ? (
                      <>
                        <Plus className="h-4 w-4 mr-1" /> Connect
                      </>
                    ) : (
                      "Manage"
                    )}
                  </Button>
                </div>
                
                <div className="p-4 bg-gray-50">
                  <dl className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="text-xs text-gray-500">Products</dt>
                      <dd className="mt-1 text-sm font-medium">{platform.products}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-gray-500">Last Sync</dt>
                      <dd className="mt-1 text-sm font-medium">{platform.lastSync}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-gray-500">API Status</dt>
                      <dd className={`mt-1 text-sm font-medium ${
                        platform.health === "Healthy" ? "text-green-600" : 
                        platform.health === "API Error" ? "text-red-600" : 
                        "text-gray-500"
                      }`}>
                        {platform.health}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Marketplace Benefits</CardTitle>
          <CardDescription className="text-xs">
            Expand your reach by integrating with multiple marketplaces
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-brand-blue/5 p-4 rounded-md">
              <h4 className="font-semibold mb-2">Increased Visibility</h4>
              <p className="text-xs text-gray-600">Reach millions of potential customers through established marketplaces.</p>
            </div>
            <div className="bg-brand-blue/5 p-4 rounded-md">
              <h4 className="font-semibold mb-2">Centralized Management</h4>
              <p className="text-xs text-gray-600">Manage inventory, orders, and pricing from one dashboard.</p>
            </div>
            <div className="bg-brand-blue/5 p-4 rounded-md">
              <h4 className="font-semibold mb-2">Diversified Revenue</h4>
              <p className="text-xs text-gray-600">Reduce risk by selling through multiple channels simultaneously.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default MultiPlatform;
