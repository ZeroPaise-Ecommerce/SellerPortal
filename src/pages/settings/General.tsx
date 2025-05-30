
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const General = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your store settings have been updated successfully.",
    });
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">General Settings</h1>
      
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="store-name">Store Name</Label>
            <Input id="store-name" placeholder="Your Store Name" defaultValue="MyStore" />
            <p className="text-sm text-gray-500">This will appear on your storefront and emails.</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="store-url">Store URL</Label>
            <Input id="store-url" placeholder="yourdomain.com" defaultValue="mystore.com" />
            <p className="text-sm text-gray-500">Your store's web address.</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="store-description">Store Description</Label>
          <Textarea 
            id="store-description" 
            placeholder="Describe your business..."
            defaultValue="Welcome to MyStore - your one-stop shop for all your needs."
            className="min-h-[100px]"
          />
          <p className="text-sm text-gray-500">Used for SEO and when sharing on social media.</p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-md font-medium">Store Contact Information</h3>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact-email">Contact Email</Label>
              <Input id="contact-email" type="email" placeholder="contact@yourdomain.com" defaultValue="contact@mystore.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact-phone">Contact Phone</Label>
              <Input id="contact-phone" placeholder="+1 234 567 8900" defaultValue="+1 234 567 8900" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contact-address">Business Address</Label>
            <Textarea 
              id="contact-address" 
              placeholder="Your business address"
              defaultValue="123 Main Street, Anytown, AN 12345"
              className="min-h-[80px]"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-md font-medium">Currency & Regional Settings</h3>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="store-currency">Currency</Label>
              <select 
                id="store-currency"
                className="w-full h-10 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="USD"
              >
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
                <option value="GBP">British Pound (£)</option>
                <option value="INR">Indian Rupee (₹)</option>
                <option value="JPY">Japanese Yen (¥)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <select 
                id="timezone"
                className="w-full h-10 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="UTC"
              >
                <option value="UTC">UTC (Coordinated Universal Time)</option>
                <option value="EST">EST (Eastern Standard Time)</option>
                <option value="CST">CST (Central Standard Time)</option>
                <option value="PST">PST (Pacific Standard Time)</option>
                <option value="IST">IST (Indian Standard Time)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date-format">Date Format</Label>
              <select 
                id="date-format"
                className="w-full h-10 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="MM/DD/YYYY"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <Button onClick={handleSave}>Save Settings</Button>
        </div>
      </div>
    </div>
  );
};

export default General;
