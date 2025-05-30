
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { CreditCard, CheckCircle2, PlusCircle } from "lucide-react";

const PaymentIntegration = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Payment settings saved",
      description: "Your payment integration settings have been updated.",
    });
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Payment Integration</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-lg font-medium mb-4">Connected Payment Providers</h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-md bg-blue-500 flex items-center justify-center text-white mr-3">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle>Razorpay</CardTitle>
                      <CardDescription>Primary Payment Processor</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-green-500">Connected</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Account ID</span>
                    <span>rzp_test_*****28VNH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Mode</span>
                    <Badge variant="outline">Test Mode</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status</span>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                      Active
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t flex items-center justify-between">
                  <span className="flex items-center text-green-600">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Webhook Connected
                  </span>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-dashed">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[200px]">
                <PlusCircle className="h-12 w-12 text-gray-400 mb-2" />
                <h3 className="text-lg font-medium">Add Payment Provider</h3>
                <p className="text-gray-500 text-center mb-4">
                  Connect another payment provider to your store
                </p>
                <Button>Connect Provider</Button>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section>
          <h2 className="text-lg font-medium mb-4">Razorpay Settings</h2>
          
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="relative">
                    <Input id="api-key" value="rzp_test_*****28VNH" readOnly />
                    <Button variant="ghost" className="absolute right-0 top-0 h-full px-3">
                      Show
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="api-secret">API Secret</Label>
                  <div className="relative">
                    <Input id="api-secret" value="••••••••••••••••" type="password" readOnly />
                    <Button variant="ghost" className="absolute right-0 top-0 h-full px-3">
                      Show
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 pt-4">
                <Label htmlFor="environment">Environment</Label>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="test-mode" 
                      name="environment" 
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                      defaultChecked 
                    />
                    <label htmlFor="test-mode" className="text-sm">Test Mode</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="live-mode" 
                      name="environment" 
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                    />
                    <label htmlFor="live-mode" className="text-sm">Live Mode</label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-medium">Payment Methods</h3>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-gray-100 rounded flex items-center justify-center">
                        <CreditCard className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium">Credit Cards</div>
                        <div className="text-xs text-gray-500">Visa, Mastercard, Amex</div>
                      </div>
                    </div>
                    <Switch id="cc-enabled" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-gray-100 rounded flex items-center justify-center">
                        <CreditCard className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium">Debit Cards</div>
                        <div className="text-xs text-gray-500">Visa, Mastercard, Rupay</div>
                      </div>
                    </div>
                    <Switch id="dc-enabled" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-gray-100 rounded flex items-center justify-center">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M15 9H9V15H15V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">UPI</div>
                        <div className="text-xs text-gray-500">Google Pay, PhonePe, etc</div>
                      </div>
                    </div>
                    <Switch id="upi-enabled" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-gray-100 rounded flex items-center justify-center">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6H4C2.89543 6 2 6.89543 2 8V16C2 17.1046 2.89543 18 4 18H20C21.1046 18 22 17.1046 22 16V8C22 6.89543 21.1046 6 20 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 10H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">Net Banking</div>
                        <div className="text-xs text-gray-500">All major banks</div>
                      </div>
                    </div>
                    <Switch id="netbanking-enabled" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-gray-100 rounded flex items-center justify-center">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M3 7L12 13L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">Wallets</div>
                        <div className="text-xs text-gray-500">Amazon Pay, Paytm</div>
                      </div>
                    </div>
                    <Switch id="wallets-enabled" />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-gray-100 rounded flex items-center justify-center">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M17 9L12 4L7 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">Pay Later</div>
                        <div className="text-xs text-gray-500">Simpl, LazyPay</div>
                      </div>
                    </div>
                    <Switch id="paylater-enabled" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-sm font-medium">Advanced Settings</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="save-cards">Save Customer Cards</Label>
                    <p className="text-xs text-gray-500">Allow customers to save their cards for future purchases</p>
                  </div>
                  <Switch id="save-cards" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="3ds">Enable 3D Secure</Label>
                    <p className="text-xs text-gray-500">Add an additional layer of security with 3DS verification</p>
                  </div>
                  <Switch id="3ds" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="international">International Payments</Label>
                    <p className="text-xs text-gray-500">Accept payments from international customers</p>
                  </div>
                  <Switch id="international" />
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex justify-end">
              <Button onClick={handleSave}>Save Settings</Button>
            </CardFooter>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default PaymentIntegration;
