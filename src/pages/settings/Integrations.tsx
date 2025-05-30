
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, PlusCircle } from "lucide-react";

const Integrations = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Integration settings saved",
      description: "Your integration settings have been updated successfully.",
    });
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Integrations</h1>
      
      <Tabs defaultValue="sms" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="sms">SMS</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
        </TabsList>
        
        {/* SMS Integration Tab */}
        <TabsContent value="sms">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>SMS Integration (MSG91)</CardTitle>
                  <CardDescription>Configure your SMS provider settings</CardDescription>
                </div>
                <Switch id="sms-enabled" defaultChecked />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="msg91-auth-key">MSG91 Auth Key</Label>
                  <div className="relative">
                    <Input id="msg91-auth-key" value="340b3def-2af4-5e83-8e78-a8e425fd" type="password" />
                    <Button variant="ghost" className="absolute right-0 top-0 h-full px-3">
                      Show
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">Your MSG91 authentication key</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="msg91-sender-id">Sender ID</Label>
                  <Input id="msg91-sender-id" placeholder="6-character sender ID" maxLength={6} defaultValue="MYSHOP" />
                  <p className="text-xs text-gray-500">Must be exactly 6 characters</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="msg91-route">Route</Label>
                  <select 
                    id="msg91-route"
                    className="w-full h-10 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="4"
                  >
                    <option value="1">Promotional</option>
                    <option value="4">Transactional</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="msg91-country">Default Country Code</Label>
                  <Input id="msg91-country" placeholder="Default country code" defaultValue="91" />
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-sm font-medium">SMS Templates</h3>
                <p className="text-sm text-gray-500">
                  Templates for various SMS notifications. Use variables like {"{"}{"{"}"name"{"}"}{"}"},  {"{"}{"{"}"order_id"{"}"}{"}"}, etc.
                </p>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="template-order-confirmation">Order Confirmation</Label>
                    <textarea 
                      id="template-order-confirmation" 
                      className="w-full h-24 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="Thank you for your order! Your order #{{order_id}} has been confirmed and will be shipped soon. Track your order at {{tracking_url}}"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="template-order-shipping">Order Shipped</Label>
                    <textarea 
                      id="template-order-shipping" 
                      className="w-full h-24 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="Your order #{{order_id}} has been shipped! Track your delivery at {{tracking_url}}"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="template-otp">OTP Verification</Label>
                    <textarea 
                      id="template-otp" 
                      className="w-full h-24 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="Your OTP for verification is {{otp}}. Valid for 10 minutes. Do not share this OTP with anyone."
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-test-number">Test Phone Number</Label>
                    <div className="flex gap-2 mt-1">
                      <Input id="sms-test-number" placeholder="Enter phone number" />
                      <Button>Send Test SMS</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex justify-end">
              <Button onClick={handleSave}>Save SMS Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Email Integration Tab */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Email Integration</CardTitle>
                  <CardDescription>Configure your email service provider settings</CardDescription>
                </div>
                <Switch id="email-enabled" defaultChecked />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email-provider">Email Provider</Label>
                    <select 
                      id="email-provider"
                      className="w-full h-10 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="smtp"
                    >
                      <option value="smtp">SMTP</option>
                      <option value="sendgrid">SendGrid</option>
                      <option value="mailchimp">Mailchimp</option>
                      <option value="gmail">Gmail</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="from-email">From Email</Label>
                    <Input id="from-email" placeholder="noreply@yourstore.com" defaultValue="noreply@mystore.com" />
                  </div>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="from-name">From Name</Label>
                    <Input id="from-name" placeholder="Your Store Name" defaultValue="MyStore" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reply-to">Reply-To Email</Label>
                    <Input id="reply-to" placeholder="support@yourstore.com" defaultValue="support@mystore.com" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-sm font-medium">SMTP Settings</h3>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-host">SMTP Host</Label>
                    <Input id="smtp-host" placeholder="smtp.example.com" defaultValue="smtp.gmail.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">SMTP Port</Label>
                    <Input id="smtp-port" placeholder="587" defaultValue="587" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="smtp-username">SMTP Username</Label>
                    <Input id="smtp-username" placeholder="username" defaultValue="mystore@gmail.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="smtp-password">SMTP Password</Label>
                    <div className="relative">
                      <Input id="smtp-password" type="password" value="••••••••••••••••" />
                      <Button variant="ghost" className="absolute right-0 top-0 h-full px-3">
                        Show
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="smtp-secure" defaultChecked />
                  <Label htmlFor="smtp-secure">Use Secure Connection (SSL/TLS)</Label>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-test">Test Email</Label>
                    <div className="flex gap-2 mt-1">
                      <Input id="email-test" placeholder="Enter email address" />
                      <Button>Send Test Email</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex justify-end">
              <Button onClick={handleSave}>Save Email Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* WhatsApp Integration Tab */}
        <TabsContent value="whatsapp">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>WhatsApp Integration (Aisensy)</CardTitle>
                  <CardDescription>Configure WhatsApp Business API settings</CardDescription>
                </div>
                <Switch id="whatsapp-enabled" defaultChecked />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="aisensy-api-key">Aisensy API Key</Label>
                  <div className="relative">
                    <Input id="aisensy-api-key" value="574bd8e9-18c2-4a7e-9ab3-8d2f4e7" type="password" />
                    <Button variant="ghost" className="absolute right-0 top-0 h-full px-3">
                      Show
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-phone">WhatsApp Business Phone Number</Label>
                  <Input id="whatsapp-phone" placeholder="+919876543210" defaultValue="+919876543210" />
                  <p className="text-xs text-gray-500">Must be a verified WhatsApp Business number</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-account">Meta Business Account ID</Label>
                  <Input id="whatsapp-account" placeholder="Business account ID" defaultValue="284795271836495" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-namespace">Template Namespace</Label>
                  <Input id="whatsapp-namespace" placeholder="Template namespace" defaultValue="64829ac4_6c37_7bc1_7a34_a89d63d2e1c9" />
                </div>
              </div>
              
              <div className="flex items-center gap-2 pt-4">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-green-600 font-medium">WhatsApp Business Account Connected</span>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-sm font-medium">WhatsApp Message Templates</h3>
                <p className="text-sm text-gray-500">
                  Templates must be approved by Meta before use. Use variables like {"{"}{"{"}"1"{"}"}{"}"}, {"{"}{"{"}"2"{"}"}{"}"}, etc.
                </p>
                
                <div className="grid gap-4">
                  <div className="border p-4 rounded-md">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">order_confirmation</h4>
                        <p className="text-xs text-gray-500">Sends order confirmation details</p>
                      </div>
                      <Badge className="bg-green-500">Approved</Badge>
                    </div>
                    <div className="text-sm">
                      Hello {"{{1}}"}, thank you for your order! Your order #{"{{2}}"} has been confirmed and will be shipped soon. Track your order status at {"{{3}}"}
                    </div>
                  </div>
                  
                  <div className="border p-4 rounded-md">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">shipping_update</h4>
                        <p className="text-xs text-gray-500">Notifies about shipping status</p>
                      </div>
                      <Badge className="bg-green-500">Approved</Badge>
                    </div>
                    <div className="text-sm">
                      Hello {"{{1}}"}, your order #{"{{2}}"} has been shipped! Your package is on the way and is expected to arrive on {"{{3}}"}. Track your delivery at {"{{4}}"}
                    </div>
                  </div>
                  
                  <div className="border p-4 rounded-md">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">abandoned_cart</h4>
                        <p className="text-xs text-gray-500">Reminder for abandoned carts</p>
                      </div>
                      <Badge className="bg-yellow-500">Pending Review</Badge>
                    </div>
                    <div className="text-sm">
                      Hello {"{{1}}"}, we noticed you left some items in your cart. Complete your purchase now to avoid missing out! Click here to checkout: {"{{2}}"}
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add New Template
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="whatsapp-test">Test WhatsApp Message</Label>
                    <div className="flex gap-2 mt-1">
                      <Input id="whatsapp-test" placeholder="Enter phone number with country code" />
                      <Button>Send Test Message</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex justify-end">
              <Button onClick={handleSave}>Save WhatsApp Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Integrations;
