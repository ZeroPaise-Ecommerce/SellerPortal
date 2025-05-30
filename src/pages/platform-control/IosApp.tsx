
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Download,
  RefreshCw,
  Check,
  AlertCircle,
  Settings,
  Image,
  Palette,
  Bell,
  XCircle,
  Smartphone
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Sample data for iOS app metrics
const appMetrics = {
  installations: 18762,
  activeUsers: 13245,
  rating: 4.8,
  reviews: 1243,
  crashRate: 0.2,
  versionName: "2.4.1",
  buildNumber: "2401",
  lastUpdate: "2023-04-28"
};

// Sample iOS device distribution
const deviceDistribution = [
  { name: "iPhone 14 & 15", percentage: 42 },
  { name: "iPhone 13", percentage: 24 },
  { name: "iPhone 12", percentage: 18 },
  { name: "iPhone 11 & older", percentage: 12 },
  { name: "iPad", percentage: 4 }
];

// Sample iOS OS version distribution
const osVersionDistribution = [
  { name: "iOS 16", percentage: 54 },
  { name: "iOS 15", percentage: 32 },
  { name: "iOS 14", percentage: 11 },
  { name: "iOS 13 & older", percentage: 3 },
];

const IosApp = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <svg className="h-6 w-6 mr-2 text-brand-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            <path d="M18 5a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5Z" />
          </svg>
          <h1 className="text-xl font-semibold">iOS App Management</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            App Store Dashboard
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
              <span>+486</span>
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
              <span>71%</span>
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
              <span>+0.1</span>
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
              <CardDescription>Current iOS app version and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Release Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div className="text-sm font-medium">Current Version</div>
                      <div className="text-sm">{appMetrics.versionName} (build {appMetrics.buildNumber})</div>
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
                      <div className="text-sm">iOS 13.0+</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-sm font-medium">App Size</div>
                      <div className="text-sm">28.4 MB</div>
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
                      <div className="text-sm">App Store guidelines</div>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <div className="text-sm">Battery optimization</div>
                    </div>
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                      <div className="text-sm">iPad optimization</div>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2 border-t pt-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download IPA
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
            <CardDescription>iOS versions running your app</CardDescription>
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
              <TabsTrigger value="testflight">TestFlight</TabsTrigger>
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
                  <div className="font-medium mb-1">Apple Pay</div>
                  <div className="text-sm text-gray-600 mb-3">Seamless payment with Apple Pay</div>
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
            
            <TabsContent value="testflight">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="font-medium mb-1">Face ID Checkout</div>
                  <div className="text-sm text-gray-600 mb-3">Quick checkout with Face ID</div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-100 text-blue-800">TestFlight - 150 testers</Badge>
                    <Button variant="ghost" size="sm">Configure</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="font-medium mb-1">AR Product View</div>
                  <div className="text-sm text-gray-600 mb-3">View products in augmented reality</div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-100 text-blue-800">TestFlight - 75 testers</Badge>
                    <Button variant="ghost" size="sm">Configure</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="font-medium mb-1">Widget Support</div>
                  <div className="text-sm text-gray-600 mb-3">iOS home screen widgets</div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-100 text-blue-800">TestFlight - Internal</Badge>
                    <Button variant="ghost" size="sm">Configure</Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button variant="outline">Manage TestFlight</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="upcoming">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="font-medium mb-1">App Clips</div>
                  <div className="text-sm text-gray-600 mb-3">Quick access to app functionality</div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-gray-100 text-gray-800">In Development</Badge>
                    <Button variant="ghost" size="sm">Preview</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="font-medium mb-1">Dynamic Island</div>
                  <div className="text-sm text-gray-600 mb-3">Live activity integration</div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-gray-100 text-gray-800">Planned</Badge>
                    <Button variant="ghost" size="sm">Details</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="font-medium mb-1">Dark Mode</div>
                  <div className="text-sm text-gray-600 mb-3">Night-friendly app theme</div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-amber-100 text-amber-800">Ready for TestFlight</Badge>
                    <Button variant="ghost" size="sm">Deploy to TestFlight</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>iOS Specific Features</CardTitle>
          <CardDescription>Features leveraging iOS platform capabilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <svg className="h-6 w-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.29 17.71L6.7 13.12C6.31 12.73 6.31 12.1 6.7 11.71C7.09 11.32 7.72 11.32 8.11 11.71L12 15.59L15.88 11.71C16.27 11.32 16.9 11.32 17.29 11.71C17.68 12.1 17.68 12.73 17.29 13.12L12.7 17.71C12.31 18.1 11.68 18.1 11.29 17.71Z" />
                    <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" />
                  </svg>
                  <div className="font-medium mt-1">Touch ID / Face ID</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">Secure biometric authentication</p>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <svg className="h-6 w-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 11H3V9H21V11ZM21 15H3V13H21V15Z" />
                  </svg>
                  <div className="font-medium mt-1">Apple Pay</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">Contactless payment system</p>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <svg className="h-6 w-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                    <path fill="white" d="M12 17.75C15.1766 17.75 17.75 15.1766 17.75 12C17.75 8.82339 15.1766 6.25 12 6.25C8.82339 6.25 6.25 8.82339 6.25 12C6.25 15.1766 8.82339 17.75 12 17.75Z" />
                    <path d="M12 14.75C13.5188 14.75 14.75 13.5188 14.75 12C14.75 10.4812 13.5188 9.25 12 9.25C10.4812 9.25 9.25 10.4812 9.25 12C9.25 13.5188 10.4812 14.75 12 14.75Z" />
                  </svg>
                  <div className="font-medium mt-1">Push Notifications</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">APNS integration for notifications</p>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <svg className="h-6 w-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20ZM4 6H20V10H4V6ZM4 12H8V18H4V12ZM10 12H20V18H10V12Z" />
                  </svg>
                  <div className="font-medium mt-1">Home Screen Widgets</div>
                </div>
                <Badge className="bg-blue-100 text-blue-800">TestFlight</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">Custom iOS home screen widgets</p>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default IosApp;
