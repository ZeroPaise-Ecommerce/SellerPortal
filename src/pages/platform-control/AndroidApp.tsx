
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  BarChart, 
  Download, 
  RefreshCw, 
  Check, 
  AlertCircle,
  PlayCircle,
  Settings,
  Image,
  Palette,
  Bell,
  XCircle 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Sample data for Android app metrics
const appMetrics = {
  installations: 12458,
  activeUsers: 8273,
  rating: 4.7,
  reviews: 843,
  crashRate: 0.3,
  versionName: "2.4.1",
  versionCode: 241,
  lastUpdate: "2023-04-28"
};

// Sample Android device distribution
const deviceDistribution = [
  { name: "Samsung Galaxy", percentage: 34 },
  { name: "Google Pixel", percentage: 22 },
  { name: "OnePlus", percentage: 18 },
  { name: "Xiaomi", percentage: 14 },
  { name: "Other Android", percentage: 12 }
];

// Sample Android OS version distribution
const osVersionDistribution = [
  { name: "Android 13", percentage: 38 },
  { name: "Android 12", percentage: 31 },
  { name: "Android 11", percentage: 18 },
  { name: "Android 10", percentage: 9 },
  { name: "Older versions", percentage: 4 }
];

const AndroidApp = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Smartphone className="h-6 w-6 mr-2 text-brand-blue" />
          <h1 className="text-xl font-semibold">Android App Management</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <PlayCircle className="h-4 w-4 mr-2" />
            Play Store Dashboard
          </Button>
          <Button className="bg-brand-blue hover:bg-brand-blue/90">
            <Smartphone className="h-4 w-4 mr-2" />
            Preview App
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-500">Total Installations</div>
            </div>
            <div className="text-3xl font-bold">{appMetrics.installations.toLocaleString()}</div>
            <div className="text-sm text-green-600 mt-1 flex items-center">
              <span>+342</span>
              <span className="text-gray-500 ml-1">this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-500">Active Users</div>
            </div>
            <div className="text-3xl font-bold">{appMetrics.activeUsers.toLocaleString()}</div>
            <div className="text-sm text-green-600 mt-1 flex items-center">
              <span>66%</span>
              <span className="text-gray-500 ml-1">retention rate</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-500">App Rating</div>
            </div>
            <div className="text-3xl font-bold">{appMetrics.rating} <span className="text-lg">/ 5</span></div>
            <div className="text-sm text-green-600 mt-1 flex items-center">
              <span>+0.2</span>
              <span className="text-gray-500 ml-1">since last version</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-500">Crash Rate</div>
            </div>
            <div className="text-3xl font-bold">{appMetrics.crashRate}%</div>
            <div className="text-sm text-green-600 mt-1 flex items-center">
              <span>-0.1%</span>
              <span className="text-gray-500 ml-1">since last version</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>App Status</CardTitle>
              <CardDescription>Current Android app version and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Release Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div className="text-sm font-medium">Current Version</div>
                      <div className="text-sm">{appMetrics.versionName} (build {appMetrics.versionCode})</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-sm font-medium">Status</div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Published</Badge>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-sm font-medium">Last Update</div>
                      <div className="text-sm">{appMetrics.lastUpdate}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-sm font-medium">Minimum OS</div>
                      <div className="text-sm">Android 8.0+</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-sm font-medium">App Size</div>
                      <div className="text-sm">24.8 MB</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Quality Checks</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <div className="text-sm">Performance optimization</div>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <div className="text-sm">Accessibility compliance</div>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <div className="text-sm">Google Play policies</div>
                    </div>
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                      <div className="text-sm">Battery optimization</div>
                    </div>
                    <div className="flex items-center">
                      <XCircle className="h-5 w-5 text-red-500 mr-2" />
                      <div className="text-sm">Large screen optimization</div>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2 border-t pt-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download APK
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Submit New Version
                    </Button>
                    <Button className="flex-1 bg-brand-blue hover:bg-brand-blue/90">
                      <BarChart className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common app configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  App Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Image className="h-4 w-4 mr-2" />
                  App Icons & Screenshots
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Palette className="h-4 w-4 mr-2" />
                  Theme Configuration
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Push Notification Setup
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart className="h-4 w-4 mr-2" />
                  Crash Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Device Distribution</CardTitle>
            <CardDescription>Popular devices using your app</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deviceDistribution.map((device, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <div className="text-sm">{device.name}</div>
                    <div className="text-sm font-medium">{device.percentage}%</div>
                  </div>
                  <Progress value={device.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>OS Version Distribution</CardTitle>
            <CardDescription>Android versions running your app</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {osVersionDistribution.map((os, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <div className="text-sm">{os.name}</div>
                    <div className="text-sm font-medium">{os.percentage}%</div>
                  </div>
                  <Progress value={os.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Feature Management</CardTitle>
          <CardDescription>Control app features and deployment</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active">
            <TabsList className="mb-6">
              <TabsTrigger value="active">Active Features</TabsTrigger>
              <TabsTrigger value="beta">Beta Features</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="font-medium mb-1">Product Browsing</div>
                  <div className="text-sm text-gray-600 mb-3">Browse and filter product catalog</div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    <Button variant="ghost" size="sm">Configure</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="font-medium mb-1">Shopping Cart</div>
                  <div className="text-sm text-gray-600 mb-3">Add items and checkout process</div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    <Button variant="ghost" size="sm">Configure</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="font-medium mb-1">User Accounts</div>
                  <div className="text-sm text-gray-600 mb-3">Login, register and profile management</div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    <Button variant="ghost" size="sm">Configure</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="font-medium mb-1">Push Notifications</div>
                  <div className="text-sm text-gray-600 mb-3">Real-time alerts and updates</div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    <Button variant="ghost" size="sm">Configure</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="font-medium mb-1">Order History</div>
                  <div className="text-sm text-gray-600 mb-3">View past orders and status</div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    <Button variant="ghost" size="sm">Configure</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="font-medium mb-1">Product Reviews</div>
                  <div className="text-sm text-gray-600 mb-3">View and submit product reviews</div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    <Button variant="ghost" size="sm">Configure</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="beta">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="font-medium mb-1">Augmented Reality Try-On</div>
                  <div className="text-sm text-gray-600 mb-3">Virtual try-on for products</div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-100 text-blue-800">Beta - 25% of users</Badge>
                    <Button variant="ghost" size="sm">Configure</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="font-medium mb-1">Voice Search</div>
                  <div className="text-sm text-gray-600 mb-3">Search products using voice commands</div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-100 text-blue-800">Beta - 10% of users</Badge>
                    <Button variant="ghost" size="sm">Configure</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="font-medium mb-1">Image Recognition</div>
                  <div className="text-sm text-gray-600 mb-3">Find products using camera</div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-100 text-blue-800">Beta - Staff only</Badge>
                    <Button variant="ghost" size="sm">Configure</Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button variant="outline">Manage Beta Rollout</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="upcoming">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="font-medium mb-1">Loyalty Program</div>
                  <div className="text-sm text-gray-600 mb-3">Points and rewards system</div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-gray-100 text-gray-800">In Development</Badge>
                    <Button variant="ghost" size="sm">Preview</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="font-medium mb-1">Installment Payments</div>
                  <div className="text-sm text-gray-600 mb-3">Split payments over time</div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-gray-100 text-gray-800">Planned</Badge>
                    <Button variant="ghost" size="sm">Details</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="font-medium mb-1">Dark Mode</div>
                  <div className="text-sm text-gray-600 mb-3">Night-friendly app theme</div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-amber-100 text-amber-800">Ready for Test</Badge>
                    <Button variant="ghost" size="sm">Enable for Testing</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AndroidApp;
