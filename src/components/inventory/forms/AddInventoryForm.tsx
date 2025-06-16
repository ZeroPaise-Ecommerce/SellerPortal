
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Settings,
  Save,
  X
} from "lucide-react";

interface AddInventoryFormProps {
  open: boolean;
  onClose: () => void;
}

const AddInventoryForm = ({ open, onClose }: AddInventoryFormProps) => {
  const [formData, setFormData] = useState({
    // Basic Information
    inventoryName: "",
    inventoryCode: "",
    inventoryType: "",
    description: "",
    
    // Location Details
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    
    // Contact Information
    managerName: "",
    email: "",
    phone: "",
    alternatePhone: "",
    
    // Operational Settings
    operatingHours: "",
    timezone: "",
    currency: "",
    
    // Capacity & Configuration
    storageCapacity: "",
    maxItems: "",
    temperatureControlled: false,
    securityLevel: "",
    
    // Integration Settings
    barcodeEnabled: true,
    rfidEnabled: false,
    autoReorderEnabled: false,
    
    // Status
    status: "active"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding new inventory:", formData);
    // Here you would typically submit to your API
    onClose();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-600" />
            Add New Inventory Location
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="inventoryName">Inventory Name *</Label>
                <Input
                  id="inventoryName"
                  value={formData.inventoryName}
                  onChange={(e) => handleInputChange("inventoryName", e.target.value)}
                  placeholder="e.g., Main Warehouse"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inventoryCode">Inventory Code *</Label>
                <Input
                  id="inventoryCode"
                  value={formData.inventoryCode}
                  onChange={(e) => handleInputChange("inventoryCode", e.target.value)}
                  placeholder="e.g., WH001"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inventoryType">Inventory Type</Label>
                <Select value={formData.inventoryType} onValueChange={(value) => handleInputChange("inventoryType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="warehouse">Warehouse</SelectItem>
                    <SelectItem value="retail_store">Retail Store</SelectItem>
                    <SelectItem value="distribution_center">Distribution Center</SelectItem>
                    <SelectItem value="fulfillment_center">Fulfillment Center</SelectItem>
                    <SelectItem value="cold_storage">Cold Storage</SelectItem>
                    <SelectItem value="transit_hub">Transit Hub</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="maintenance">Under Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Brief description of this inventory location"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Location Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Full address"
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="City"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  placeholder="State"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IN">India</SelectItem>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="GB">United Kingdom</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="AU">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code *</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange("postalCode", e.target.value)}
                  placeholder="Postal code"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="managerName">Manager Name</Label>
                <Input
                  id="managerName"
                  value={formData.managerName}
                  onChange={(e) => handleInputChange("managerName", e.target.value)}
                  placeholder="Inventory manager name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="manager@company.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="alternatePhone">Alternate Phone</Label>
                <Input
                  id="alternatePhone"
                  value={formData.alternatePhone}
                  onChange={(e) => handleInputChange("alternatePhone", e.target.value)}
                  placeholder="+1 (555) 987-6543"
                />
              </div>
            </CardContent>
          </Card>

          {/* Operational Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Operational Settings</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="operatingHours">Operating Hours</Label>
                <Input
                  id="operatingHours"
                  value={formData.operatingHours}
                  onChange={(e) => handleInputChange("operatingHours", e.target.value)}
                  placeholder="e.g., 9:00 AM - 6:00 PM"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={formData.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IST">India Standard Time (IST)</SelectItem>
                    <SelectItem value="PST">Pacific Standard Time (PST)</SelectItem>
                    <SelectItem value="EST">Eastern Standard Time (EST)</SelectItem>
                    <SelectItem value="GMT">Greenwich Mean Time (GMT)</SelectItem>
                    <SelectItem value="JST">Japan Standard Time (JST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                    <SelectItem value="USD">US Dollar ($)</SelectItem>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                    <SelectItem value="GBP">British Pound (£)</SelectItem>
                    <SelectItem value="JPY">Japanese Yen (¥)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="securityLevel">Security Level</Label>
                <Select value={formData.securityLevel} onValueChange={(value) => handleInputChange("securityLevel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select security level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="maximum">Maximum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Capacity & Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Capacity & Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storageCapacity">Storage Capacity (sq ft)</Label>
                  <Input
                    id="storageCapacity"
                    type="number"
                    value={formData.storageCapacity}
                    onChange={(e) => handleInputChange("storageCapacity", e.target.value)}
                    placeholder="e.g., 5000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxItems">Max Items Capacity</Label>
                  <Input
                    id="maxItems"
                    type="number"
                    value={formData.maxItems}
                    onChange={(e) => handleInputChange("maxItems", e.target.value)}
                    placeholder="e.g., 10000"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="temperatureControlled">Temperature Controlled</Label>
                    <p className="text-sm text-gray-600">Climate controlled storage facility</p>
                  </div>
                  <Switch
                    id="temperatureControlled"
                    checked={formData.temperatureControlled}
                    onCheckedChange={(checked) => handleInputChange("temperatureControlled", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="barcodeEnabled">Barcode System</Label>
                    <p className="text-sm text-gray-600">Enable barcode scanning</p>
                  </div>
                  <Switch
                    id="barcodeEnabled"
                    checked={formData.barcodeEnabled}
                    onCheckedChange={(checked) => handleInputChange("barcodeEnabled", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="rfidEnabled">RFID System</Label>
                    <p className="text-sm text-gray-600">Enable RFID tracking</p>
                  </div>
                  <Switch
                    id="rfidEnabled"
                    checked={formData.rfidEnabled}
                    onCheckedChange={(checked) => handleInputChange("rfidEnabled", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoReorderEnabled">Auto Reorder</Label>
                    <p className="text-sm text-gray-600">Automatic reorder when stock is low</p>
                  </div>
                  <Switch
                    id="autoReorderEnabled"
                    checked={formData.autoReorderEnabled}
                    onCheckedChange={(checked) => handleInputChange("autoReorderEnabled", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </form>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="h-4 w-4 mr-2" />
            Add Inventory
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddInventoryForm;
