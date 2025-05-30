
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Notification = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification settings have been updated successfully.",
    });
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Notification Settings</h1>
      
      <Tabs defaultValue="customer" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="customer">Customer Notifications</TabsTrigger>
          <TabsTrigger value="admin">Admin Notifications</TabsTrigger>
          <TabsTrigger value="templates">Notification Templates</TabsTrigger>
        </TabsList>
        
        {/* Customer Notifications Tab */}
        <TabsContent value="customer">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Customer Notification Preferences</CardTitle>
              <CardDescription>Configure what notifications your customers will receive</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Order Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="order-placed">Order Placed</Label>
                      <p className="text-xs text-gray-500">
                        Send notification when customer places an order
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Email</span>
                      <Switch id="order-placed-email" defaultChecked />
                      <span className="text-xs">SMS</span>
                      <Switch id="order-placed-sms" defaultChecked />
                      <span className="text-xs">WhatsApp</span>
                      <Switch id="order-placed-whatsapp" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="order-processing">Order Processing</Label>
                      <p className="text-xs text-gray-500">
                        Send notification when order status changes to processing
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Email</span>
                      <Switch id="order-processing-email" defaultChecked />
                      <span className="text-xs">SMS</span>
                      <Switch id="order-processing-sms" />
                      <span className="text-xs">WhatsApp</span>
                      <Switch id="order-processing-whatsapp" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="order-shipped">Order Shipped</Label>
                      <p className="text-xs text-gray-500">
                        Send notification when order is shipped
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Email</span>
                      <Switch id="order-shipped-email" defaultChecked />
                      <span className="text-xs">SMS</span>
                      <Switch id="order-shipped-sms" defaultChecked />
                      <span className="text-xs">WhatsApp</span>
                      <Switch id="order-shipped-whatsapp" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="order-delivered">Order Delivered</Label>
                      <p className="text-xs text-gray-500">
                        Send notification when order is delivered
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Email</span>
                      <Switch id="order-delivered-email" defaultChecked />
                      <span className="text-xs">SMS</span>
                      <Switch id="order-delivered-sms" defaultChecked />
                      <span className="text-xs">WhatsApp</span>
                      <Switch id="order-delivered-whatsapp" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="order-canceled">Order Canceled</Label>
                      <p className="text-xs text-gray-500">
                        Send notification when order is canceled
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Email</span>
                      <Switch id="order-canceled-email" defaultChecked />
                      <span className="text-xs">SMS</span>
                      <Switch id="order-canceled-sms" />
                      <span className="text-xs">WhatsApp</span>
                      <Switch id="order-canceled-whatsapp" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 border-t pt-6">
                  <h3 className="text-sm font-medium">Account Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="account-created">Account Created</Label>
                      <p className="text-xs text-gray-500">
                        Send notification when customer creates an account
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Email</span>
                      <Switch id="account-created-email" defaultChecked />
                      <span className="text-xs">SMS</span>
                      <Switch id="account-created-sms" />
                      <span className="text-xs">WhatsApp</span>
                      <Switch id="account-created-whatsapp" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="password-reset">Password Reset</Label>
                      <p className="text-xs text-gray-500">
                        Send notification for password reset
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Email</span>
                      <Switch id="password-reset-email" defaultChecked />
                      <span className="text-xs">SMS</span>
                      <Switch id="password-reset-sms" defaultChecked />
                      <span className="text-xs">WhatsApp</span>
                      <Switch id="password-reset-whatsapp" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 border-t pt-6">
                  <h3 className="text-sm font-medium">Marketing Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="promotions">Promotions & Offers</Label>
                      <p className="text-xs text-gray-500">
                        Send promotional messages and offers
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Email</span>
                      <Switch id="promotions-email" defaultChecked />
                      <span className="text-xs">SMS</span>
                      <Switch id="promotions-sms" />
                      <span className="text-xs">WhatsApp</span>
                      <Switch id="promotions-whatsapp" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="abandoned-cart">Abandoned Cart</Label>
                      <p className="text-xs text-gray-500">
                        Send reminder for abandoned cart
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Email</span>
                      <Switch id="abandoned-cart-email" defaultChecked />
                      <span className="text-xs">SMS</span>
                      <Switch id="abandoned-cart-sms" />
                      <span className="text-xs">WhatsApp</span>
                      <Switch id="abandoned-cart-whatsapp" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="back-in-stock">Back in Stock</Label>
                      <p className="text-xs text-gray-500">
                        Notify when wishlisted items are back in stock
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Email</span>
                      <Switch id="back-in-stock-email" defaultChecked />
                      <span className="text-xs">SMS</span>
                      <Switch id="back-in-stock-sms" />
                      <span className="text-xs">WhatsApp</span>
                      <Switch id="back-in-stock-whatsapp" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex justify-end">
              <Button onClick={handleSave}>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Admin Notifications Tab */}
        <TabsContent value="admin">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Admin Notification Preferences</CardTitle>
              <CardDescription>Configure what notifications your team will receive</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Order Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="admin-new-order">New Order</Label>
                      <p className="text-xs text-gray-500">
                        Send notification when new order is placed
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Email</span>
                      <Switch id="admin-new-order-email" defaultChecked />
                      <span className="text-xs">SMS</span>
                      <Switch id="admin-new-order-sms" defaultChecked />
                      <span className="text-xs">Dashboard</span>
                      <Switch id="admin-new-order-dashboard" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="admin-order-canceled">Order Canceled</Label>
                      <p className="text-xs text-gray-500">
                        Send notification when order is canceled
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Email</span>
                      <Switch id="admin-order-canceled-email" defaultChecked />
                      <span className="text-xs">SMS</span>
                      <Switch id="admin-order-canceled-sms" />
                      <span className="text-xs">Dashboard</span>
                      <Switch id="admin-order-canceled-dashboard" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="admin-return-request">Return Request</Label>
                      <p className="text-xs text-gray-500">
                        Send notification when customer requests a return
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Email</span>
                      <Switch id="admin-return-request-email" defaultChecked />
                      <span className="text-xs">SMS</span>
                      <Switch id="admin-return-request-sms" defaultChecked />
                      <span className="text-xs">Dashboard</span>
                      <Switch id="admin-return-request-dashboard" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 border-t pt-6">
                  <h3 className="text-sm font-medium">Inventory Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="admin-low-stock">Low Stock Alert</Label>
                      <p className="text-xs text-gray-500">
                        Send notification when product stock is low
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Email</span>
                      <Switch id="admin-low-stock-email" defaultChecked />
                      <span className="text-xs">SMS</span>
                      <Switch id="admin-low-stock-sms" />
                      <span className="text-xs">Dashboard</span>
                      <Switch id="admin-low-stock-dashboard" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="admin-out-of-stock">Out of Stock</Label>
                      <p className="text-xs text-gray-500">
                        Send notification when product is out of stock
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Email</span>
                      <Switch id="admin-out-of-stock-email" defaultChecked />
                      <span className="text-xs">SMS</span>
                      <Switch id="admin-out-of-stock-sms" />
                      <span className="text-xs">Dashboard</span>
                      <Switch id="admin-out-of-stock-dashboard" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 border-t pt-6">
                  <h3 className="text-sm font-medium">Customer Interactions</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="admin-new-review">New Review</Label>
                      <p className="text-xs text-gray-500">
                        Send notification when customer leaves a review
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Email</span>
                      <Switch id="admin-new-review-email" defaultChecked />
                      <span className="text-xs">SMS</span>
                      <Switch id="admin-new-review-sms" />
                      <span className="text-xs">Dashboard</span>
                      <Switch id="admin-new-review-dashboard" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="admin-new-message">New Message</Label>
                      <p className="text-xs text-gray-500">
                        Send notification when customer sends a message
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Email</span>
                      <Switch id="admin-new-message-email" defaultChecked />
                      <span className="text-xs">SMS</span>
                      <Switch id="admin-new-message-sms" defaultChecked />
                      <span className="text-xs">Dashboard</span>
                      <Switch id="admin-new-message-dashboard" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 border-t pt-6">
                  <h3 className="text-sm font-medium">Notification Recipients</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="admin-email-recipients">Email Recipients</Label>
                    <Input 
                      id="admin-email-recipients" 
                      placeholder="Enter email addresses (comma-separated)"
                      defaultValue="admin@yourstore.com,manager@yourstore.com" 
                    />
                    <p className="text-xs text-gray-500">
                      Separate multiple email addresses with commas
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="admin-sms-recipients">SMS Recipients</Label>
                    <Input 
                      id="admin-sms-recipients" 
                      placeholder="Enter phone numbers (comma-separated)"
                      defaultValue="+919876543210,+919876543211" 
                    />
                    <p className="text-xs text-gray-500">
                      Separate multiple phone numbers with commas
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex justify-end">
              <Button onClick={handleSave}>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Notification Templates Tab */}
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notification Templates</CardTitle>
              <CardDescription>Customize the content of your notifications</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Select Template:</Label>
                  <select 
                    className="w-full h-10 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="order-confirmation"
                  >
                    <option value="order-confirmation">Order Confirmation</option>
                    <option value="order-shipped">Order Shipped</option>
                    <option value="order-delivered">Order Delivered</option>
                    <option value="order-canceled">Order Canceled</option>
                    <option value="password-reset">Password Reset</option>
                    <option value="account-created">Account Created</option>
                    <option value="abandoned-cart">Abandoned Cart</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4 col-span-1">
                    <h3 className="text-sm font-medium">Available Variables</h3>
                    <div className="bg-gray-50 p-3 rounded-md text-sm">
                      <ul className="space-y-2">
                        <li><code>{"{{customer_name}}"}</code> - Customer's name</li>
                        <li><code>{"{{order_number}}"}</code> - Order number</li>
                        <li><code>{"{{order_date}}"}</code> - Order date</li>
                        <li><code>{"{{shipping_address}}"}</code> - Shipping address</li>
                        <li><code>{"{{tracking_number}}"}</code> - Tracking number</li>
                        <li><code>{"{{total_amount}}"}</code> - Order total</li>
                        <li><code>{"{{product_list}}"}</code> - List of products</li>
                        <li><code>{"{{reset_link}}"}</code> - Password reset link</li>
                        <li><code>{"{{store_name}}"}</code> - Your store name</li>
                        <li><code>{"{{cart_link}}"}</code> - Link to cart</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4 col-span-2">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="template-subject">Email Subject</Label>
                        <span className="text-xs text-gray-500">For Email templates only</span>
                      </div>
                      <Input 
                        id="template-subject" 
                        defaultValue="Your order #{{order_number}} has been confirmed" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="template-content">Template Content</Label>
                      <textarea 
                        id="template-content" 
                        className="w-full h-64 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue={`Hello {{customer_name}},

Thank you for your order! We're pleased to confirm that we've received your order #{{order_number}} placed on {{order_date}}.

Order Summary:
{{product_list}}

Total: {{total_amount}}

Shipping Address:
{{shipping_address}}

We'll send you another notification when your order ships.

Thank you for shopping with {{store_name}}!`}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline">Preview</Button>
                      <Button variant="outline">Send Test</Button>
                      <Button variant="outline">Reset to Default</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex justify-end">
              <Button onClick={handleSave}>Save Template</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notification;
