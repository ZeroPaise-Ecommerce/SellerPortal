
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Package, Edit } from "lucide-react";

const ShippingControl = () => {
  const { toast } = useToast();
  
  const [shippingPartners, setShippingPartners] = useState([
    {
      id: 1,
      name: "Delhivery",
      status: "active",
      apiKey: "********-****-****-****-************",
      default: true
    },
    {
      id: 2,
      name: "BlueDart",
      status: "active",
      apiKey: "********-****-****-****-************",
      default: false
    },
    {
      id: 3,
      name: "Shiprocket",
      status: "active",
      apiKey: "********-****-****-****-************",
      default: false
    },
    {
      id: 4,
      name: "DTDC",
      status: "inactive",
      apiKey: "",
      default: false
    }
  ]);
  
  const [shippingZones, setShippingZones] = useState([
    {
      id: 1,
      name: "Domestic",
      regions: ["India"],
      methods: [
        { id: 1, name: "Standard", price: 50, estimatedDays: "3-5", free_threshold: 500 },
        { id: 2, name: "Express", price: 100, estimatedDays: "1-2", free_threshold: 1000 }
      ]
    },
    {
      id: 2,
      name: "International - Asia",
      regions: ["China", "Japan", "Singapore", "Malaysia"],
      methods: [
        { id: 3, name: "Standard", price: 500, estimatedDays: "7-10", free_threshold: 2000 },
        { id: 4, name: "Express", price: 1000, estimatedDays: "3-5", free_threshold: null }
      ]
    },
    {
      id: 3,
      name: "International - Rest of World",
      regions: ["United States", "United Kingdom", "Europe", "Others"],
      methods: [
        { id: 5, name: "Standard", price: 1200, estimatedDays: "10-15", free_threshold: 5000 },
        { id: 6, name: "Express", price: 2000, estimatedDays: "5-7", free_threshold: null }
      ]
    }
  ]);
  
  const handleSave = () => {
    toast({
      title: "Shipping settings saved",
      description: "Your shipping settings have been updated successfully.",
    });
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Shipping Control</h1>
      
      <div className="space-y-8">
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Shipping Partners</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" /> Add Shipping Partner
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[450px]">
                <DialogHeader>
                  <DialogTitle>Add Shipping Partner</DialogTitle>
                  <DialogDescription>
                    Connect your shipping partner account to enable automatic order fulfillment.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-4 space-y-2">
                      <Label htmlFor="partner-name">Shipping Partner</Label>
                      <select 
                        id="partner-name"
                        className="w-full h-10 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="" disabled selected>Select a shipping partner</option>
                        <option value="delhivery">Delhivery</option>
                        <option value="bluedart">BlueDart</option>
                        <option value="ecom_express">Ecom Express</option>
                        <option value="shiprocket">Shiprocket</option>
                        <option value="dtdc">DTDC</option>
                        <option value="amazon_shipping">Amazon Shipping</option>
                        <option value="india_post">India Post</option>
                        <option value="fedex">FedEx</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="partner-api-key">API Key</Label>
                    <Input id="partner-api-key" placeholder="Enter API key or token" />
                    <p className="text-xs text-gray-500">Find this in your shipping partner's developer dashboard</p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="partner-api-secret">API Secret</Label>
                    <Input id="partner-api-secret" type="password" placeholder="Enter API secret" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="partner-default" />
                    <Label htmlFor="partner-default">Set as default shipping partner</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => {
                    toast({
                      title: "Shipping partner added",
                      description: "The shipping partner has been connected successfully.",
                    });
                  }}>Connect Partner</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Shipping Partner</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">API Key</th>
                    <th className="text-left p-4">Default</th>
                    <th className="text-right p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shippingPartners.map(partner => (
                    <tr key={partner.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center">
                          <Package className="h-5 w-5 text-gray-500 mr-2" />
                          {partner.name}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={partner.status === "active" ? "bg-green-500" : "bg-gray-400"}>
                          {partner.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="p-4 text-gray-500">
                        {partner.apiKey ? partner.apiKey : "Not configured"}
                      </td>
                      <td className="p-4">
                        <Switch checked={partner.default} disabled={partner.status !== "active"} />
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <Trash2 className="h-4 w-4 mr-1" /> Remove
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
        
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Shipping Zones & Rates</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" /> Add Shipping Zone
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add Shipping Zone</DialogTitle>
                  <DialogDescription>
                    Create a shipping zone to define shipping rates for specific regions.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="zone-name">Zone Name</Label>
                    <Input id="zone-name" placeholder="e.g., North America, Europe, etc." />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="zone-regions">Regions</Label>
                    <textarea 
                      id="zone-regions" 
                      placeholder="Enter countries/regions (comma separated)"
                      className="w-full h-20 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500">Enter country or region names separated by commas</p>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Shipping Methods</Label>
                    
                    <div className="border p-4 rounded-md space-y-4">
                      <h4 className="font-medium">Standard Shipping</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="standard-price">Price (₹)</Label>
                          <Input id="standard-price" type="number" placeholder="0" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="standard-days">Estimated Days</Label>
                          <Input id="standard-days" placeholder="e.g., 3-5" />
                        </div>
                        <div className="space-y-2 col-span-2">
                          <Label htmlFor="standard-free">Free Shipping Threshold (₹)</Label>
                          <Input id="standard-free" type="number" placeholder="Optional" />
                          <p className="text-xs text-gray-500">Leave empty for no free shipping</p>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" /> Add Shipping Method
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => {
                    toast({
                      title: "Shipping zone added",
                      description: "The shipping zone has been created successfully.",
                    });
                  }}>Create Zone</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {shippingZones.map((zone) => (
            <Card key={zone.id} className="mb-4">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle>{zone.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500">
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Regions: {zone.regions.join(", ")}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Shipping Methods</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-4">Method</th>
                          <th className="text-left py-2 px-4">Price (₹)</th>
                          <th className="text-left py-2 px-4">Est. Delivery</th>
                          <th className="text-left py-2 px-4">Free Shipping</th>
                          <th className="text-right py-2 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {zone.methods.map((method) => (
                          <tr key={method.id} className="border-b">
                            <td className="py-3 px-4 font-medium">{method.name}</td>
                            <td className="py-3 px-4">₹{method.price.toFixed(2)}</td>
                            <td className="py-3 px-4">{method.estimatedDays} days</td>
                            <td className="py-3 px-4">
                              {method.free_threshold ? `Above ₹${method.free_threshold}` : "No"}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
        
        <section>
          <h2 className="text-lg font-medium mb-4">General Shipping Settings</h2>
          
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Enable Shipping Calculation</h3>
                  <p className="text-sm text-gray-500">Calculate shipping rates at checkout</p>
                </div>
                <Switch id="enable-shipping" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Show Estimated Delivery Date</h3>
                  <p className="text-sm text-gray-500">Display estimated delivery dates to customers</p>
                </div>
                <Switch id="show-delivery-date" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Enable International Shipping</h3>
                  <p className="text-sm text-gray-500">Allow shipping to international addresses</p>
                </div>
                <Switch id="international-shipping" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Allow Local Pickup</h3>
                  <p className="text-sm text-gray-500">Let customers pick up orders in person</p>
                </div>
                <Switch id="local-pickup" defaultChecked />
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-3">Default Package Dimensions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-length">Length (cm)</Label>
                    <Input id="default-length" type="number" placeholder="0" defaultValue="30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="default-width">Width (cm)</Label>
                    <Input id="default-width" type="number" placeholder="0" defaultValue="20" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="default-height">Height (cm)</Label>
                    <Input id="default-height" type="number" placeholder="0" defaultValue="15" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="default-weight">Weight (kg)</Label>
                    <Input id="default-weight" type="number" placeholder="0.00" defaultValue="0.5" step="0.01" />
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4">
              <Button onClick={handleSave}>Save Shipping Settings</Button>
            </CardFooter>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default ShippingControl;
