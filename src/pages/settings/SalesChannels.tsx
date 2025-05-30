
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, PlusCircle, ExternalLink, ShoppingBag, Globe } from "lucide-react";

const SalesChannels = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Sales channel settings saved",
      description: "Your sales channel settings have been updated.",
    });
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Sales Channels</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-medium mb-4">Connected Channels</h2>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <div className="h-1 bg-green-500 w-full"></div>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded bg-neutral-100 flex items-center justify-center mr-3">
                      <ShoppingBag className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle>Online Store</CardTitle>
                      <CardDescription>Your main website</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Status:</span>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                      <span>Online</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">URL:</span>
                    <a href="#" className="text-blue-500 flex items-center">
                      mystore.com <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Products:</span>
                    <span>124 active</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t flex justify-between">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Visit Store
                  </Button>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="h-1 bg-blue-500 w-full"></div>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded bg-neutral-100 flex items-center justify-center mr-3">
                      <svg className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                      </svg>
                    </div>
                    <div>
                      <CardTitle>Facebook Shop</CardTitle>
                      <CardDescription>Meta for Business</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-blue-500">Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Status:</span>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                      <span>Connected</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Page:</span>
                    <a href="#" className="text-blue-500 flex items-center">
                      MyStore <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Products:</span>
                    <span>98 active</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t flex justify-between">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Visit Shop
                  </Button>
                  <Button variant="outline" size="sm">Settings</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="h-1 bg-pink-500 w-full"></div>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded bg-neutral-100 flex items-center justify-center mr-3">
                      <svg className="h-6 w-6 text-pink-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 9.52C10.54 9.52 9.32 10.72 9.32 12.22C9.32 13.72 10.54 14.92 12 14.92C13.46 14.92 14.68 13.72 14.68 12.22C14.68 10.72 13.46 9.52 12 9.52ZM12 7C15.1 7 17.66 9.29 17.66 12.22C17.66 15.15 15.1 17.44 12 17.44C8.9 17.44 6.34 15.15 6.34 12.22C6.34 9.29 8.9 7 12 7ZM17.98 6.66C17.98 7.56 17.23 8.29 16.34 8.29C15.45 8.29 14.7 7.56 14.7 6.66C14.7 5.76 15.45 5.03 16.34 5.03C17.23 5.03 17.98 5.76 17.98 6.66ZM21.98 8.29C22.12 10.8 21.76 13.31 20.5 15.41C19.24 17.51 17.23 19.03 14.72 19.38C12.21 19.73 9.59 20.06 7.47 18.81C5.35 17.56 3.81 15.57 3.44 13.04C3.07 10.51 2.76 7.9 4.03 5.76C5.3 3.62 7.31 2.1 9.82 1.75C12.33 1.4 14.95 1.07 17.07 2.32C19.19 3.57 20.73 5.56 21.1 8.09L21.98 8.29ZM19.66 8.29C19.3 6.43 18.11 4.78 16.5 3.76C14.89 2.74 12.89 2.4 10.98 2.65C9.07 2.9 7.42 3.74 6.39 5.13C5.36 6.52 5.01 8.28 5.26 10.16C5.51 12.04 6.37 13.7 7.76 14.74C9.15 15.78 10.91 16.14 12.84 15.89C14.77 15.64 16.42 14.8 17.45 13.41C18.48 12.02 18.83 10.26 18.58 8.38L19.66 8.29Z" />
                      </svg>
                    </div>
                    <div>
                      <CardTitle>Instagram Shopping</CardTitle>
                      <CardDescription>Meta for Business</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-pink-500">Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Status:</span>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                      <span>Connected</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Account:</span>
                    <a href="#" className="text-blue-500 flex items-center">
                      @mystore_official <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Products:</span>
                    <span>76 active</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t flex justify-between">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Visit Profile
                  </Button>
                  <Button variant="outline" size="sm">Settings</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="h-1 bg-red-500 w-full"></div>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded bg-neutral-100 flex items-center justify-center mr-3">
                      <svg className="h-6 w-6 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 15L15.19 12L10 9V15ZM21.56 7.17C21.69 7.64 21.78 8.27 21.84 9.07C21.91 9.87 21.94 10.56 21.94 11.16L22 12C22 14.19 21.84 15.8 21.56 16.83C21.31 17.73 20.73 18.31 19.83 18.56C19.36 18.69 18.5 18.78 17.18 18.84C15.88 18.91 14.69 18.94 13.59 18.94L12 19C7.81 19 5.2 18.84 4.17 18.56C3.27 18.31 2.69 17.73 2.44 16.83C2.31 16.36 2.22 15.73 2.16 14.93C2.09 14.13 2.06 13.44 2.06 12.84L2 12C2 9.81 2.16 8.2 2.44 7.17C2.69 6.27 3.27 5.69 4.17 5.44C4.64 5.31 5.5 5.22 6.82 5.16C8.12 5.09 9.31 5.06 10.41 5.06L12 5C16.19 5 18.8 5.16 19.83 5.44C20.73 5.69 21.31 6.27 21.56 7.17Z" />
                      </svg>
                    </div>
                    <div>
                      <CardTitle>YouTube Shopping</CardTitle>
                      <CardDescription>YouTube Commerce</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-red-500">Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Status:</span>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                      <span>Connected</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Channel:</span>
                    <a href="#" className="text-blue-500 flex items-center">
                      MyStore Official <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Products:</span>
                    <span>42 active</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t flex justify-between">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Visit Channel
                  </Button>
                  <Button variant="outline" size="sm">Settings</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="h-1 bg-purple-500 w-full"></div>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded bg-neutral-100 flex items-center justify-center mr-3">
                      <svg className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2 4.24C2 3.56 2.54 3 3.2 3H20.8C21.46 3 22 3.56 22 4.24V19.76C22 20.44 21.46 21 20.8 21H3.2C2.54 21 2 20.44 2 19.76V4.24ZM20.55 8.8H16.52V13H20.55V8.8ZM11.52 8.8H15.55V13H11.52V8.8ZM11.52 14H15.55V18.2H11.52V14ZM6.52 14H10.55V18.2H6.52V14ZM6.52 8.8H10.55V13H6.52V8.8ZM3.45 8.8H5.55V13H3.45V8.8ZM3.45 14H5.55V18.2H3.45V14ZM16.52 14H20.55V18.2H16.52V14ZM3.45 4.8V7.8H20.55V4.8H3.45Z" />
                      </svg>
                    </div>
                    <div>
                      <CardTitle>Google Merchant</CardTitle>
                      <CardDescription>Google Shopping</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-purple-500">Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Status:</span>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                      <span>Connected</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Account:</span>
                    <a href="#" className="text-blue-500 flex items-center">
                      Merchant Center <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Products:</span>
                    <span>124 active</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t flex justify-between">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Visit Merchant
                  </Button>
                  <Button variant="outline" size="sm">Settings</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-dashed hover:border-gray-400 cursor-pointer transition-colors">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[220px]">
                <div className="rounded-full bg-gray-100 p-3">
                  <PlusCircle className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-medium mt-4">Add Sales Channel</h3>
                <p className="text-gray-500 text-center mt-2 mb-4">
                  Connect to more platforms to increase your reach
                </p>
                <Button>Connect Channel</Button>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section>
          <h2 className="text-lg font-medium mb-4">Available Channels</h2>
          
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Channel</th>
                    <th className="text-left p-4">Type</th>
                    <th className="text-left p-4">Features</th>
                    <th className="text-right p-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded bg-neutral-100 flex items-center justify-center mr-3">
                          <svg className="h-5 w-5 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.5 11.1C15.8 11.1 14.5 12.4 14.5 14.1C14.5 15.8 15.8 17.1 17.5 17.1C19.2 17.1 20.5 15.8 20.5 14.1C20.5 12.4 19.2 11.1 17.5 11.1M6.5 6.9C4.8 6.9 3.5 8.2 3.5 9.9C3.5 11.6 4.8 12.9 6.5 12.9C8.2 12.9 9.5 11.6 9.5 9.9C9.5 8.2 8.2 6.9 6.5 6.9M6.5 14.1L17.5 19.1L28.5 14.1L17.5 9.1L6.5 14.1Z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Amazon Marketplace</div>
                          <div className="text-xs text-gray-500">Amazon Seller Central</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">Marketplace</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">Product Sync</Badge>
                        <Badge variant="outline" className="text-xs">Inventory</Badge>
                        <Badge variant="outline" className="text-xs">Orders</Badge>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <Button>Connect</Button>
                    </td>
                  </tr>
                  
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded bg-neutral-100 flex items-center justify-center mr-3">
                          <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.79 21L9.83 12.79L1.62 9.83L9.83 6.87L12.79 0L15.75 6.87L23.96 9.83L15.75 12.79L12.79 21Z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Shopify</div>
                          <div className="text-xs text-gray-500">Shopify API Integration</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">eCommerce</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">Product Sync</Badge>
                        <Badge variant="outline" className="text-xs">Orders</Badge>
                        <Badge variant="outline" className="text-xs">Customers</Badge>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <Button>Connect</Button>
                    </td>
                  </tr>
                  
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded bg-neutral-100 flex items-center justify-center mr-3">
                          <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,13H13V17H11V13Z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">TikTok Shop</div>
                          <div className="text-xs text-gray-500">TikTok for Business</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">Social Commerce</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">Product Sync</Badge>
                        <Badge variant="outline" className="text-xs">Live Shopping</Badge>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <Button>Connect</Button>
                    </td>
                  </tr>
                  
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded bg-neutral-100 flex items-center justify-center mr-3">
                          <svg className="h-5 w-5 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21.35 11.1H12.18V13.83H18.69C18.36 17.64 15.19 19.27 12.19 19.27C8.36 19.27 5.22 16.25 5.22 12.27C5.22 8.29 8.36 5.27 12.19 5.27C15.68 5.27 17.64 7.98 17.64 7.98L19.56 5.78C19.56 5.78 16.75 2 12.09 2C6.42 2 2.23 6.55 2.23 12.27C2.23 17.99 6.42 22.54 12.09 22.54C17.23 22.54 21.62 18.7 21.62 12.73C21.62 11.87 21.5 11.1 21.35 11.1Z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Pinterest</div>
                          <div className="text-xs text-gray-500">Pinterest Shopping</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">Social Commerce</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">Product Pins</Badge>
                        <Badge variant="outline" className="text-xs">Catalog Sync</Badge>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <Button>Connect</Button>
                    </td>
                  </tr>
                  
                  <tr className="hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded bg-neutral-100 flex items-center justify-center mr-3">
                          <Globe className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">eBay</div>
                          <div className="text-xs text-gray-500">eBay Partner Network</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">Marketplace</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">Product Sync</Badge>
                        <Badge variant="outline" className="text-xs">Inventory</Badge>
                        <Badge variant="outline" className="text-xs">Orders</Badge>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <Button>Connect</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </section>
        
        <section>
          <h2 className="text-lg font-medium mb-4">Channel Settings</h2>
          
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Product Synchronization</h3>
                  <p className="text-sm text-gray-500">Automatically synchronize products across all channels</p>
                </div>
                <Switch id="product-sync" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Inventory Management</h3>
                  <p className="text-sm text-gray-500">Sync inventory levels across all sales channels</p>
                </div>
                <Switch id="inventory-sync" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Order Consolidation</h3>
                  <p className="text-sm text-gray-500">Combine orders from all channels into a unified dashboard</p>
                </div>
                <Switch id="order-consolidation" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Centralized Customer Database</h3>
                  <p className="text-sm text-gray-500">Maintain a single customer database across channels</p>
                </div>
                <Switch id="customer-database" defaultChecked />
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-3">Sync Schedule</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="product-sync-interval">Product Sync Interval</Label>
                    <select 
                      id="product-sync-interval"
                      className="w-full h-10 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="hourly"
                    >
                      <option value="realtime">Real-time</option>
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="manual">Manual Only</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="inventory-sync-interval">Inventory Sync Interval</Label>
                    <select 
                      id="inventory-sync-interval"
                      className="w-full h-10 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="realtime"
                    >
                      <option value="realtime">Real-time</option>
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="manual">Manual Only</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex justify-end">
              <Button onClick={handleSave}>Save Channel Settings</Button>
            </CardFooter>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default SalesChannels;
