
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Palette, Layout, EyeIcon, Brush, Laptop, Smartphone, CheckCircle, AlertCircle, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const WebsiteDesign = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Globe className="h-6 w-6 mr-2 text-brand-blue" />
          <h1 className="text-xl font-semibold">Website Design</h1>
        </div>
        <Button className="bg-brand-blue hover:bg-brand-blue/90">
          <EyeIcon className="h-4 w-4 mr-2" /> Preview Website
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card className="col-span-1 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="pt-6">
            <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
            <h3 className="font-medium text-lg mb-1">Website Status</h3>
            <p className="text-sm text-gray-600 mb-3">Your website is live and operational</p>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Online</Badge>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-500">Mobile Traffic</div>
            </div>
            <div className="text-3xl font-bold">65%</div>
            <div className="text-sm text-green-600 mt-1 flex items-center">
              <span>+5%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-500">Page Load Time</div>
            </div>
            <div className="text-3xl font-bold">1.8s</div>
            <div className="text-sm text-green-600 mt-1 flex items-center">
              <span>-0.3s</span>
              <span className="text-gray-500 ml-1">improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-500">Active Pages</div>
            </div>
            <div className="text-3xl font-bold">24</div>
            <div className="text-sm text-gray-600 mt-1">
              <span>Last updated: Today</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="col-span-1 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Theme Editor</CardTitle>
              <CardDescription>Customize your website's appearance</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="theme">
                <TabsList className="mb-6">
                  <TabsTrigger value="theme">Themes</TabsTrigger>
                  <TabsTrigger value="colors">Colors</TabsTrigger>
                  <TabsTrigger value="typography">Typography</TabsTrigger>
                  <TabsTrigger value="layout">Layout</TabsTrigger>
                </TabsList>
                
                <TabsContent value="theme" className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {["Modern", "Classic", "Minimal", "Bold", "Elegant", "Professional"].map((theme, i) => (
                      <div key={i} className={`border rounded-lg overflow-hidden hover:border-brand-blue transition-all ${i === 0 ? 'ring-2 ring-brand-blue' : ''}`}>
                        <div className="h-32 bg-gray-200"></div>
                        <div className="p-3 flex justify-between items-center">
                          <div>
                            <div className="font-medium">{theme}</div>
                            {i === 0 && <Badge className="mt-1 bg-blue-100 text-blue-800">Active</Badge>}
                          </div>
                          <Button variant="ghost" size="sm">Preview</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end">
                    <Button variant="outline" className="mr-2">Browse More Themes</Button>
                    <Button className="bg-brand-blue hover:bg-brand-blue/90">Apply Theme</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="colors">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Primary Colors</h3>
                      <div className="flex flex-wrap gap-3">
                        {["#1E40AF", "#0369A1", "#047857", "#7C3AED", "#BE185D", "#F59E0B", "#6B7280"].map((color, i) => (
                          <div key={i} className={`w-12 h-12 rounded-full ${i === 2 ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`} style={{ backgroundColor: color }}></div>
                        ))}
                        <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                          <Plus className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-3">Accent Colors</h3>
                      <div className="flex flex-wrap gap-3">
                        {["#3B82F6", "#06B6D4", "#10B981", "#8B5CF6", "#EC4899", "#F97316", "#64748B"].map((color, i) => (
                          <div key={i} className={`w-12 h-12 rounded-full ${i === 0 ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`} style={{ backgroundColor: color }}></div>
                        ))}
                        <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                          <Plus className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="text-sm font-medium mb-3">Custom Color Scheme</h3>
                      <Button className="mr-2">Save Palette</Button>
                      <Button variant="outline">Reset to Default</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="typography">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Font Family</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-medium">Headings</div>
                            <Badge variant="outline">Inter</Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="text-2xl">Aa Bb Cc 123</div>
                            <Button variant="outline" size="sm">Change</Button>
                          </div>
                        </div>
                        
                        <div className="border p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-medium">Body Text</div>
                            <Badge variant="outline">Roboto</Badge>
                          </div>
                          <div className="space-y-2">
                            <div>Aa Bb Cc 123</div>
                            <Button variant="outline" size="sm">Change</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-3">Font Sizes</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="text-sm">H1 - Main Heading</div>
                          <Badge variant="outline">32px</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm">H2 - Section Heading</div>
                          <Badge variant="outline">24px</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm">Body Text</div>
                          <Badge variant="outline">16px</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm">Small Text</div>
                          <Badge variant="outline">14px</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <Button className="bg-brand-blue hover:bg-brand-blue/90">Apply Typography Changes</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="layout">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Layout Style</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="border p-4 rounded-lg hover:border-brand-blue cursor-pointer">
                          <div className="h-20 mb-2 bg-gray-200 flex flex-col">
                            <div className="w-full h-4 bg-gray-300 mb-1"></div>
                            <div className="flex-1 flex">
                              <div className="w-2/3 bg-gray-300 mr-1"></div>
                              <div className="flex-1 bg-gray-300"></div>
                            </div>
                          </div>
                          <div className="text-center font-medium">Standard</div>
                        </div>
                        
                        <div className="border p-4 rounded-lg hover:border-brand-blue cursor-pointer">
                          <div className="h-20 mb-2 bg-gray-200 flex flex-col">
                            <div className="w-full h-4 bg-gray-300 mb-1"></div>
                            <div className="flex-1 flex">
                              <div className="w-1/4 bg-gray-300 mr-1"></div>
                              <div className="flex-1 bg-gray-300"></div>
                            </div>
                          </div>
                          <div className="text-center font-medium">Sidebar</div>
                        </div>
                        
                        <div className="border p-4 rounded-lg hover:border-brand-blue cursor-pointer ring-2 ring-brand-blue">
                          <div className="h-20 mb-2 bg-gray-200 flex flex-col">
                            <div className="w-full h-4 bg-gray-300 mb-1"></div>
                            <div className="flex-1 bg-gray-300"></div>
                          </div>
                          <div className="text-center font-medium">Full Width</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-3">Spacing</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <div className="text-sm">Section Spacing</div>
                            <div className="text-sm">Medium</div>
                          </div>
                          <div className="relative">
                            <Progress value={66} className="h-2" />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <div className="text-sm">Content Density</div>
                            <div className="text-sm">Comfortable</div>
                          </div>
                          <div className="relative">
                            <Progress value={33} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <Button className="bg-brand-blue hover:bg-brand-blue/90">Apply Layout Changes</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Page Manager</CardTitle>
              <CardDescription>Manage your website pages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Layout className="h-4 w-4 mr-2" />
                  Homepage Editor
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Palette className="h-4 w-4 mr-2" />
                  Product Pages
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Laptop className="h-4 w-4 mr-2" />
                  Collection Pages
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  Blog Manager
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Brush className="h-4 w-4 mr-2" />
                  Custom Pages
                </Button>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <Button className="w-full bg-brand-blue hover:bg-brand-blue/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Page
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Device Optimization</CardTitle>
              <CardDescription>Check performance across devices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center mb-2">
                    <Laptop className="h-4 w-4 mr-2 text-green-500" />
                    <div className="font-medium">Desktop</div>
                    <CheckCircle className="h-4 w-4 ml-auto text-green-500" />
                  </div>
                  <Progress value={96} className="h-2" />
                  <div className="text-xs text-right mt-1 text-gray-500">96/100 - Excellent</div>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <Smartphone className="h-4 w-4 mr-2 text-amber-500" />
                    <div className="font-medium">Mobile</div>
                    <AlertCircle className="h-4 w-4 ml-auto text-amber-500" />
                  </div>
                  <Progress value={78} className="h-2" />
                  <div className="text-xs text-right mt-1 text-gray-500">78/100 - Needs Improvement</div>
                </div>
                
                <div>
                  <Button variant="outline" className="w-full">
                    View Optimization Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>SEO Status</CardTitle>
          <CardDescription>Monitor your website's search engine optimization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-4 border rounded-lg text-center">
              <div className="text-3xl font-bold text-brand-blue">82%</div>
              <div className="text-sm text-gray-600">Overall SEO Score</div>
              <Button variant="link" className="text-brand-blue px-0 mt-1">View Report</Button>
            </div>
            
            <div className="p-4 border rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600">24/24</div>
              <div className="text-sm text-gray-600">Pages with Meta Tags</div>
              <Button variant="link" className="text-brand-blue px-0 mt-1">Edit Meta Tags</Button>
            </div>
            
            <div className="p-4 border rounded-lg text-center">
              <div className="text-3xl font-bold text-amber-600">19/24</div>
              <div className="text-sm text-gray-600">Pages with Alt Text</div>
              <Button variant="link" className="text-brand-blue px-0 mt-1">Fix Alt Text</Button>
            </div>
            
            <div className="p-4 border rounded-lg text-center">
              <div className="text-3xl font-bold text-amber-600">92%</div>
              <div className="text-sm text-gray-600">Mobile Responsiveness</div>
              <Button variant="link" className="text-brand-blue px-0 mt-1">Improve</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default WebsiteDesign;
