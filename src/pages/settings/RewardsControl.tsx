
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gift, Award, Trophy, CheckCircle2 } from "lucide-react";

const RewardsControl = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Rewards settings saved",
      description: "Your rewards and loyalty program settings have been updated.",
    });
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Rewards Control</h1>
      
      <Tabs defaultValue="loyalty" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="loyalty">Loyalty Points</TabsTrigger>
          <TabsTrigger value="referrals">Referral Program</TabsTrigger>
          <TabsTrigger value="tiers">Loyalty Tiers</TabsTrigger>
        </TabsList>
        
        {/* Loyalty Points Tab */}
        <TabsContent value="loyalty">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Loyalty Points Program</CardTitle>
                  <CardDescription>Configure your customer loyalty points system</CardDescription>
                </div>
                <Switch id="loyalty-enabled" defaultChecked />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Points Settings</h3>
                
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="points-name">Points Name</Label>
                    <Input id="points-name" placeholder="e.g., Points, Stars, Coins" defaultValue="MyCoins" />
                    <p className="text-xs text-gray-500">What to call your loyalty points</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="points-ratio">Earning Ratio</Label>
                    <div className="flex items-center gap-2">
                      <Input id="points-ratio" type="number" defaultValue="1" className="w-20" />
                      <span>points for every</span>
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2">₹</span>
                        <Input id="points-ratio-amount" type="number" defaultValue="100" className="pl-6 w-24" />
                      </div>
                      <span>spent</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="points-value">Redemption Value</Label>
                    <div className="flex items-center gap-2">
                      <Input id="points-value" type="number" defaultValue="100" className="w-20" />
                      <span>points =</span>
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2">₹</span>
                        <Input id="points-value-amount" type="number" defaultValue="10" className="pl-6 w-24" />
                      </div>
                      <span>discount</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-sm font-medium">Points Earning Rules</h3>
                <p className="text-sm text-gray-500">Define how customers earn points from different actions</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Gift className="h-5 w-5 text-blue-500" />
                      <div>
                        <h4 className="font-medium">Purchase Points</h4>
                        <p className="text-xs text-gray-500">Points earned from purchases</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="purchase-points-enabled" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-blue-500" />
                      <div>
                        <h4 className="font-medium">Product Review</h4>
                        <p className="text-xs text-gray-500">Points earned for writing product reviews</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue="50" className="w-20" />
                      <span className="text-sm">points per review</span>
                      <Switch id="review-points-enabled" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-blue-500" />
                      <div>
                        <h4 className="font-medium">Account Creation</h4>
                        <p className="text-xs text-gray-500">Points earned for creating an account</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue="100" className="w-20" />
                      <span className="text-sm">points</span>
                      <Switch id="signup-points-enabled" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div>
                        <h4 className="font-medium">Birthday Points</h4>
                        <p className="text-xs text-gray-500">Points awarded on customer's birthday</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue="200" className="w-20" />
                      <span className="text-sm">points</span>
                      <Switch id="birthday-points-enabled" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-sm font-medium">Points Expiration</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Points Expire</h4>
                    <p className="text-sm text-gray-500">Set whether points expire after a period</p>
                  </div>
                  <Switch id="points-expire" defaultChecked />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry-period">Expiry Period</Label>
                    <div className="flex gap-2 items-center">
                      <Input id="expiry-period" type="number" defaultValue="12" className="w-20" />
                      <select 
                        id="expiry-unit"
                        className="h-10 border rounded-md px-3 py-2 text-sm"
                        defaultValue="months"
                      >
                        <option value="days">Days</option>
                        <option value="months">Months</option>
                        <option value="years">Years</option>
                      </select>
                    </div>
                    <p className="text-xs text-gray-500">Time before points expire</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-sm font-medium">Point Redemption</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="min-redemption">Minimum Points for Redemption</Label>
                    <Input id="min-redemption" type="number" defaultValue="100" />
                    <p className="text-xs text-gray-500">Minimum points needed to redeem</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="max-discount">Maximum Discount per Order</Label>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2">₹</span>
                      <Input id="max-discount" type="number" defaultValue="1000" className="pl-6" />
                    </div>
                    <p className="text-xs text-gray-500">Maximum discount allowed per order</p>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex justify-end">
              <Button onClick={handleSave}>Save Loyalty Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Referral Program Tab */}
        <TabsContent value="referrals">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Referral Program</CardTitle>
                  <CardDescription>Configure customer referral rewards</CardDescription>
                </div>
                <Switch id="referral-enabled" defaultChecked />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Referral Rewards</h3>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4 border rounded-md p-4">
                    <h4 className="font-medium">Referrer Rewards</h4>
                    <p className="text-sm text-gray-500">The customer who refers someone</p>
                    
                    <div className="space-y-2">
                      <Label>Reward Type</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="referrer-points" 
                            name="referrer-reward-type" 
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                            defaultChecked 
                          />
                          <label htmlFor="referrer-points" className="text-sm">Loyalty Points</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="referrer-discount" 
                            name="referrer-reward-type" 
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                          />
                          <label htmlFor="referrer-discount" className="text-sm">Discount</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="referrer-amount">Reward Amount</Label>
                      <Input id="referrer-amount" type="number" defaultValue="200" />
                      <p className="text-xs text-gray-500">Points or discount amount to reward</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Switch id="referrer-require-purchase" />
                      <div>
                        <Label htmlFor="referrer-require-purchase">Require Purchase</Label>
                        <p className="text-xs text-gray-500">Referrer must make a purchase to be rewarded</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 border rounded-md p-4">
                    <h4 className="font-medium">Referee Rewards</h4>
                    <p className="text-sm text-gray-500">The new customer who was referred</p>
                    
                    <div className="space-y-2">
                      <Label>Reward Type</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="referee-discount" 
                            name="referee-reward-type" 
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                            defaultChecked 
                          />
                          <label htmlFor="referee-discount" className="text-sm">Discount</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="referee-points" 
                            name="referee-reward-type" 
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                          />
                          <label htmlFor="referee-points" className="text-sm">Loyalty Points</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Discount Type</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="referee-percent" 
                            name="referee-discount-type" 
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                            defaultChecked 
                          />
                          <label htmlFor="referee-percent" className="text-sm">Percentage (%)</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="referee-fixed" 
                            name="referee-discount-type" 
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                          />
                          <label htmlFor="referee-fixed" className="text-sm">Fixed Amount (₹)</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="referee-amount">Discount Amount</Label>
                      <div className="flex items-center gap-2">
                        <Input id="referee-amount" type="number" defaultValue="10" />
                        <span className="text-lg">%</span>
                      </div>
                      <p className="text-xs text-gray-500">Percentage or fixed amount</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="referee-min-order">Minimum Order Value</Label>
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2">₹</span>
                        <Input id="referee-min-order" type="number" defaultValue="500" className="pl-6" />
                      </div>
                      <p className="text-xs text-gray-500">Minimum purchase amount required</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-sm font-medium">Referral Program Settings</h3>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="referral-limit">Maximum Referrals Per Customer</Label>
                    <Input id="referral-limit" type="number" defaultValue="10" />
                    <p className="text-xs text-gray-500">Maximum number of successful referrals per customer</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="referral-expiry">Referral Link Expiration</Label>
                    <div className="flex gap-2 items-center">
                      <Input id="referral-expiry" type="number" defaultValue="30" className="w-20" />
                      <select 
                        id="referral-expiry-unit"
                        className="h-10 border rounded-md px-3 py-2 text-sm"
                        defaultValue="days"
                      >
                        <option value="days">Days</option>
                        <option value="months">Months</option>
                      </select>
                    </div>
                    <p className="text-xs text-gray-500">Time before referral links expire</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="referee-qualifying-action">Qualifying Action for Reward</Label>
                  <select 
                    id="referee-qualifying-action"
                    className="w-full h-10 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="first-purchase"
                  >
                    <option value="signup">Account Creation</option>
                    <option value="first-purchase">First Purchase</option>
                    <option value="min-purchase">Minimum Purchase Amount</option>
                  </select>
                  <p className="text-xs text-gray-500">When are rewards given to both parties</p>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex justify-end">
              <Button onClick={handleSave}>Save Referral Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Loyalty Tiers Tab */}
        <TabsContent value="tiers">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Customer Loyalty Tiers</CardTitle>
                  <CardDescription>Create tiered loyalty levels for your customers</CardDescription>
                </div>
                <Switch id="tiers-enabled" defaultChecked />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Tier Calculation</h3>
                
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Calculation Method</Label>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          id="points-based" 
                          name="tier-calculation" 
                          className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                          defaultChecked 
                        />
                        <label htmlFor="points-based" className="text-sm">Points Based</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          id="spend-based" 
                          name="tier-calculation" 
                          className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                        />
                        <label htmlFor="spend-based" className="text-sm">Total Spend Based</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          id="order-based" 
                          name="tier-calculation" 
                          className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                        />
                        <label htmlFor="order-based" className="text-sm">Number of Orders Based</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tier-period">Calculation Period</Label>
                    <select 
                      id="tier-period"
                      className="w-full h-10 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="yearly"
                    >
                      <option value="lifetime">Lifetime</option>
                      <option value="yearly">Yearly</option>
                      <option value="quarterly">Quarterly</option>
                    </select>
                    <p className="text-xs text-gray-500">How often tiers reset or are recalculated</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-6 border-t">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Loyalty Tiers</h3>
                  <Button variant="outline" size="sm">+ Add New Tier</Button>
                </div>
                
                <div className="space-y-4">
                  <div className="border rounded-md overflow-hidden">
                    <div className="bg-gray-100 p-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-gray-400"></div>
                        <h4 className="font-medium">Standard</h4>
                      </div>
                      <Badge>Default</Badge>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Requirement:</p>
                          <p className="font-medium">New customer (0 points)</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Point Multiplier:</p>
                          <p className="font-medium">1x</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Benefits:</p>
                        <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                          <li>Birthday bonus points</li>
                          <li>Email promotions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md overflow-hidden">
                    <div className="bg-blue-50 p-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-blue-500"></div>
                        <h4 className="font-medium">Silver</h4>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Requirement:</p>
                          <p className="font-medium">500+ points</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Point Multiplier:</p>
                          <p className="font-medium">1.2x</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Benefits:</p>
                        <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                          <li>Everything in Standard</li>
                          <li>Free shipping on orders over ₹500</li>
                          <li>Early access to sales</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md overflow-hidden">
                    <div className="bg-yellow-50 p-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-yellow-500"></div>
                        <h4 className="font-medium">Gold</h4>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Requirement:</p>
                          <p className="font-medium">1,500+ points</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Point Multiplier:</p>
                          <p className="font-medium">1.5x</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Benefits:</p>
                        <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                          <li>Everything in Silver</li>
                          <li>Free shipping on all orders</li>
                          <li>Exclusive discounts</li>
                          <li>Priority customer support</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md overflow-hidden">
                    <div className="bg-purple-50 p-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-purple-500"></div>
                        <h4 className="font-medium">Platinum</h4>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Requirement:</p>
                          <p className="font-medium">5,000+ points</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Point Multiplier:</p>
                          <p className="font-medium">2x</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Benefits:</p>
                        <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                          <li>Everything in Gold</li>
                          <li>Personal shopping assistant</li>
                          <li>Free express shipping</li>
                          <li>Exclusive products and early access</li>
                          <li>Annual gift</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-sm font-medium">Display Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Show Tier Status</h4>
                      <p className="text-sm text-gray-500">Display customer's loyalty tier in their account</p>
                    </div>
                    <Switch id="show-tier-status" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Show Progress to Next Tier</h4>
                      <p className="text-sm text-gray-500">Display progress bar to next tier level</p>
                    </div>
                    <Switch id="show-tier-progress" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Show Tier Benefits</h4>
                      <p className="text-sm text-gray-500">Display tier benefits in customer account</p>
                    </div>
                    <Switch id="show-tier-benefits" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex justify-end">
              <Button onClick={handleSave}>Save Tier Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RewardsControl;
