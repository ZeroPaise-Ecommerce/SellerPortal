
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ChevronDownIcon } from "lucide-react";

const Tracking = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Tracking settings saved",
      description: "Your analytics and tracking settings have been updated.",
    });
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Tracking & Analytics</h1>
      
      <div className="space-y-8">
        <section>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Google Analytics</CardTitle>
                  <CardDescription>Track website traffic and user behavior</CardDescription>
                </div>
                <Switch id="ga-enabled" defaultChecked />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ga-tracking-id">Google Analytics Tracking ID</Label>
                  <Input 
                    id="ga-tracking-id" 
                    placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX" 
                    defaultValue="G-XYZ123456"
                  />
                  <p className="text-xs text-gray-500">Your Universal Analytics or GA4 tracking ID</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ga-version">Google Analytics Version</Label>
                  <select 
                    id="ga-version"
                    className="w-full h-10 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="ga4"
                  >
                    <option value="ua">Universal Analytics (Analytics.js)</option>
                    <option value="ga4">Google Analytics 4 (GA4)</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Advanced Settings</Label>
                <div className="border rounded-md">
                  <div className="border-b px-4 py-3 cursor-pointer flex justify-between items-center">
                    <h4 className="font-medium">Events Tracking</h4>
                    <ChevronDownIcon className="h-5 w-5" />
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium">Track Page Views</h5>
                        <p className="text-xs text-gray-500">Track user navigation across pages</p>
                      </div>
                      <Switch id="ga-track-pageviews" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium">Track Ecommerce</h5>
                        <p className="text-xs text-gray-500">Track product views, add to cart, and purchases</p>
                      </div>
                      <Switch id="ga-track-ecommerce" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium">Track User Engagement</h5>
                        <p className="text-xs text-gray-500">Track clicks, scrolls, and other interactions</p>
                      </div>
                      <Switch id="ga-track-engagement" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium">Track Form Submissions</h5>
                        <p className="text-xs text-gray-500">Track when users submit forms</p>
                      </div>
                      <Switch id="ga-track-forms" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex justify-end">
              <Button variant="outline" className="mr-2">Test Connection</Button>
              <Button onClick={handleSave}>Save</Button>
            </CardFooter>
          </Card>
        </section>
        
        <section>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Facebook Pixel</CardTitle>
                  <CardDescription>Track conversions from Facebook ads</CardDescription>
                </div>
                <Switch id="fb-pixel-enabled" defaultChecked />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fb-pixel-id">Facebook Pixel ID</Label>
                  <Input 
                    id="fb-pixel-id" 
                    placeholder="Enter your Facebook Pixel ID" 
                    defaultValue="283946251837465"
                  />
                  <p className="text-xs text-gray-500">Found in your Facebook Events Manager</p>
                </div>
                
                <div className="space-y-4">
                  <Label>Events to Track</Label>
                  
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium">Page View</h5>
                        <p className="text-xs text-gray-500">Track when a user visits a page</p>
                      </div>
                      <Switch id="fb-track-pageview" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium">View Content</h5>
                        <p className="text-xs text-gray-500">Track when a user views a product</p>
                      </div>
                      <Switch id="fb-track-viewcontent" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium">Add to Cart</h5>
                        <p className="text-xs text-gray-500">Track when a user adds a product to cart</p>
                      </div>
                      <Switch id="fb-track-addtocart" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium">Initiate Checkout</h5>
                        <p className="text-xs text-gray-500">Track when a user starts checkout</p>
                      </div>
                      <Switch id="fb-track-checkout" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium">Purchase</h5>
                        <p className="text-xs text-gray-500">Track when a user completes a purchase</p>
                      </div>
                      <Switch id="fb-track-purchase" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium">Subscribe</h5>
                        <p className="text-xs text-gray-500">Track when a user subscribes to newsletter</p>
                      </div>
                      <Switch id="fb-track-subscribe" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fb-advanced">Advanced Matching</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="fb-advanced" defaultChecked />
                    <span className="text-sm">Enable Advanced Matching</span>
                  </div>
                  <p className="text-xs text-gray-500">Match website visitors with Facebook users using customer data</p>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex justify-end">
              <Button variant="outline" className="mr-2">Test Pixel</Button>
              <Button onClick={handleSave}>Save</Button>
            </CardFooter>
          </Card>
        </section>
        
        <section>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Custom Tracking Scripts</CardTitle>
                  <CardDescription>Add custom tracking or analytics scripts</CardDescription>
                </div>
                <Switch id="custom-scripts-enabled" defaultChecked />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="head-scripts">Scripts in Head</Label>
                  <Textarea 
                    id="head-scripts" 
                    placeholder="Paste scripts to be included in the <head> tag"
                    className="min-h-[120px] font-mono text-sm"
                    defaultValue={`<!-- Microsoft Clarity -->
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "abcdefghij");
</script>`}
                  />
                  <p className="text-xs text-gray-500">These scripts will be added to the document head</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="body-scripts">Scripts at End of Body</Label>
                  <Textarea 
                    id="body-scripts" 
                    placeholder="Paste scripts to be included at the end of the <body> tag"
                    className="min-h-[120px] font-mono text-sm"
                    defaultValue={`<!-- Hotjar Tracking -->
<script>
  (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:1234567,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>`}
                  />
                  <p className="text-xs text-gray-500">These scripts will be added at the end of the document body</p>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex justify-end">
              <Button onClick={handleSave}>Save</Button>
            </CardFooter>
          </Card>
        </section>
        
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Consent Settings</CardTitle>
              <CardDescription>Manage cookie consent and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Cookie Consent Banner</h3>
                    <p className="text-sm text-gray-500">Show a cookie consent banner to users</p>
                  </div>
                  <Switch id="cookie-banner" defaultChecked />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Cookie Categories</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Essential Cookies</h4>
                      <p className="text-xs text-gray-500">Required for site functionality</p>
                    </div>
                    <Switch id="essential-cookies" defaultChecked disabled />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Analytics Cookies</h4>
                      <p className="text-xs text-gray-500">Track website usage and performance</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Allow opt-out</span>
                      <Switch id="analytics-cookies-opt" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Marketing Cookies</h4>
                      <p className="text-xs text-gray-500">Used for personalized ads</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Allow opt-out</span>
                      <Switch id="marketing-cookies-opt" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 pt-4">
                  <Label htmlFor="privacy-policy">Privacy Policy URL</Label>
                  <Input 
                    id="privacy-policy" 
                    placeholder="https://yourdomain.com/privacy-policy" 
                    defaultValue="https://mystore.com/privacy-policy"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cookie-policy">Cookie Policy URL</Label>
                  <Input 
                    id="cookie-policy" 
                    placeholder="https://yourdomain.com/cookie-policy" 
                    defaultValue="https://mystore.com/cookie-policy"
                  />
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex justify-end">
              <Button onClick={handleSave}>Save Privacy Settings</Button>
            </CardFooter>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Tracking;
