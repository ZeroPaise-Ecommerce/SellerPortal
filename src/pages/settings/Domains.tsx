
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Copy, RefreshCw, Globe, ShieldCheck } from "lucide-react";

const Domains = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Domain settings saved",
      description: "Your domain settings have been updated successfully.",
    });
  };
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The value has been copied to your clipboard.",
    });
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Domains & URLs</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-medium mb-4">Connected Domains</h2>
          
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Domain</th>
                    <th className="text-left p-4">Type</th>
                    <th className="text-left p-4">SSL</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-right p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-brand-blue" />
                        <a href="https://mystore.com" target="_blank" className="text-blue-600 hover:underline">mystore.com</a>
                      </div>
                    </td>
                    <td className="p-4">Primary</td>
                    <td className="p-4">
                      <div className="flex items-center text-green-600">
                        <ShieldCheck className="h-4 w-4 mr-1" />
                        <span>Active</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-green-500">Connected</Badge>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">Manage</Button>
                        <Button variant="ghost" size="sm" className="text-red-500">Remove</Button>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-brand-blue" />
                        <a href="https://www.mystore.com" target="_blank" className="text-blue-600 hover:underline">www.mystore.com</a>
                      </div>
                    </td>
                    <td className="p-4">Redirect</td>
                    <td className="p-4">
                      <div className="flex items-center text-green-600">
                        <ShieldCheck className="h-4 w-4 mr-1" />
                        <span>Active</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-green-500">Connected</Badge>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">Manage</Button>
                        <Button variant="ghost" size="sm" className="text-red-500">Remove</Button>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-brand-blue" />
                        <a href="https://mystore.lovable.app" target="_blank" className="text-blue-600 hover:underline">mystore.lovable.app</a>
                      </div>
                    </td>
                    <td className="p-4">Default</td>
                    <td className="p-4">
                      <div className="flex items-center text-green-600">
                        <ShieldCheck className="h-4 w-4 mr-1" />
                        <span>Active</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-blue-500">System</Badge>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">Visit</Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <CardFooter className="border-t p-4">
              <Button>
                <Globe className="h-4 w-4 mr-2" />
                Connect Custom Domain
              </Button>
            </CardFooter>
          </Card>
        </section>
        
        <section>
          <h2 className="text-lg font-medium mb-4">Connect a New Domain</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Add a Custom Domain</CardTitle>
              <CardDescription>Connect your own domain to your online store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="new-domain">Domain Name</Label>
                <Input id="new-domain" placeholder="yourdomain.com" />
                <p className="text-xs text-gray-500">Enter domain without http:// or https://</p>
              </div>
              
              <div className="space-y-4 border p-4 rounded-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Domain Verification</h3>
                  <Badge className="bg-yellow-500">Pending</Badge>
                </div>
                
                <div className="space-y-4 text-sm">
                  <p>To verify domain ownership, add these DNS records to your domain provider:</p>
                  
                  <div className="space-y-3">
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-medium">TXT Record</h4>
                        <Button variant="ghost" size="sm" onClick={() => handleCopy("lovable-verification=123456abcdef")}>
                          <Copy className="h-3 w-3 mr-1" /> Copy
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-gray-500">Host/Name:</span>
                          <div className="font-mono mt-1">@</div>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-500">Value:</span>
                          <div className="font-mono mt-1 break-all">lovable-verification=123456abcdef</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-medium">A Record</h4>
                        <Button variant="ghost" size="sm" onClick={() => handleCopy("185.199.110.153")}>
                          <Copy className="h-3 w-3 mr-1" /> Copy
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-gray-500">Host/Name:</span>
                          <div className="font-mono mt-1">@</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Value:</span>
                          <div className="font-mono mt-1">185.199.110.153</div>
                        </div>
                        <div>
                          <span className="text-gray-500">TTL:</span>
                          <div className="font-mono mt-1">3600 or default</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-medium">CNAME Record</h4>
                        <Button variant="ghost" size="sm" onClick={() => handleCopy("mystore.lovable.app")}>
                          <Copy className="h-3 w-3 mr-1" /> Copy
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-gray-500">Host/Name:</span>
                          <div className="font-mono mt-1">www</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Value:</span>
                          <div className="font-mono mt-1">mystore.lovable.app</div>
                        </div>
                        <div>
                          <span className="text-gray-500">TTL:</span>
                          <div className="font-mono mt-1">3600 or default</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button>Verify Domain</Button>
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Check Status
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        
        <section>
          <h2 className="text-lg font-medium mb-4">Domain Settings</h2>
          
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">HTTPS Enforcement</h3>
                  <p className="text-sm text-gray-500">Redirect all HTTP traffic to HTTPS</p>
                </div>
                <Switch id="https-enforce" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">WWW Redirect</h3>
                  <p className="text-sm text-gray-500">Redirect www subdomain to root domain</p>
                </div>
                <Switch id="www-redirect" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">SSL Certificate</h3>
                  <p className="text-sm text-gray-500">Automatic SSL certificate management</p>
                </div>
                <Switch id="auto-ssl" defaultChecked />
              </div>
              
              <div className="pt-6 border-t">
                <h3 className="text-sm font-medium mb-4">URL Structure</h3>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="product-url">Product URL Format</Label>
                    <select 
                      id="product-url"
                      className="w-full h-10 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="/products/[handle]"
                    >
                      <option value="/products/[handle]">/products/product-name</option>
                      <option value="/shop/[handle]">/shop/product-name</option>
                      <option value="/p/[id]">/p/123456</option>
                    </select>
                    <p className="text-xs text-gray-500">Format of your product URLs</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="collection-url">Collection URL Format</Label>
                    <select 
                      id="collection-url"
                      className="w-full h-10 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="/collections/[handle]"
                    >
                      <option value="/collections/[handle]">/collections/collection-name</option>
                      <option value="/shop/collections/[handle]">/shop/collections/collection-name</option>
                      <option value="/c/[id]">/c/123456</option>
                    </select>
                    <p className="text-xs text-gray-500">Format of your collection URLs</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="blog-url">Blog URL Format</Label>
                    <select 
                      id="blog-url"
                      className="w-full h-10 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="/blog/[handle]"
                    >
                      <option value="/blog/[handle]">/blog/post-title</option>
                      <option value="/articles/[handle]">/articles/post-title</option>
                      <option value="/news/[handle]">/news/post-title</option>
                    </select>
                    <p className="text-xs text-gray-500">Format of your blog post URLs</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="page-url">Page URL Format</Label>
                    <select 
                      id="page-url"
                      className="w-full h-10 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="/pages/[handle]"
                    >
                      <option value="/pages/[handle]">/pages/page-name</option>
                      <option value="/[handle]">/page-name</option>
                    </select>
                    <p className="text-xs text-gray-500">Format of your static page URLs</p>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex justify-end">
              <Button onClick={handleSave}>Save Domain Settings</Button>
            </CardFooter>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Domains;
