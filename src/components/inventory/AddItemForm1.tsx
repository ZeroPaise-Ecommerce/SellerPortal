// Converted AddItemForm.tsx to Stepper UI
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Palette, IndianRupee, Warehouse, Share2, Camera, Search, Eye, Settings } from "lucide-react";
import AddBrandForm from "./forms/AddBrandForm";
import AddCategoryForm from "./forms/AddCategoryForm";
import AddCountryForm from "./forms/AddCountryForm";
import BasicInfoStep from "./steps/BasicInfoStep";
import VariantsStep from "./steps/VariantsStep";
import PricingStep from "./steps/PricingStep";
import InventoryStep from "./steps/InventoryStep";
import ChannelsStep from "./steps/ChannelsStep";
import MediaStep from "./steps/MediaStep";
import SeoStep from "./steps/SeoStep";
import VisibilityStep from "./steps/VisibilityStep";
import AdditionalStep from "./steps/AdditionalStep";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Trash2, 
  Upload, 
  Image as ImageIcon,
  Tag,
  Package,
  Globe,
  Eye,
  Settings,
  Info,
  Palette,
  IndianRupee,
  Warehouse,
  Share2,
  Camera,
  Search
} from "lucide-react";
import AddBrandForm from "./forms/AddBrandForm";
import AddCategoryForm from "./forms/AddCategoryForm";
import AddCountryForm from "./forms/AddCountryForm";


interface AddItemFormProps {
  onClose: () => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddCountry, setShowAddCountry] = useState(false);

  const steps = [
    { id: "basic", label: "Basic Info", icon: Info, content: <BasicInfoStep /> },
    { id: "variants", label: "Variants", icon: Palette, content: <VariantsStep /> },
    { id: "pricing", label: "Pricing & Tax", icon: IndianRupee, content: <PricingStep /> },
    { id: "inventory", label: "Inventory", icon: Warehouse, content: <InventoryStep /> },
    { id: "channels", label: "Channels", icon: Share2, content: <ChannelsStep /> },
    { id: "media", label: "Media", icon: Camera, content: <MediaStep /> },
    { id: "seo", label: "SEO & Tags", icon: Search, content: <SeoStep /> },
    { id: "visibility", label: "Visibility", icon: Eye, content: <VisibilityStep /> },
    { id: "additional", label: "Additional", icon: Settings, content: <AdditionalStep /> },
  ];

  const handleSaveAsDraft = () => {
    console.log("Saving as draft...");
  };

  const handleSaveAndPublish = () => {
    console.log("Saving and publishing...");
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Step Indicators */}
      <div className="flex justify-between items-center mb-6">
        {steps.map((step, index) => (
          <div key={step.id} className="flex-1 flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium
                ${index === activeStep ? "bg-blue-600" : index < activeStep ? "bg-green-500" : "bg-gray-300"}`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && <div className="flex-1 h-1 bg-gray-300 mx-2" />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="space-y-6">{steps[activeStep].content}</div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6 border-t pt-4">
        <Button
          variant="outline"
          disabled={activeStep === 0}
          onClick={() => setActiveStep((prev) => prev - 1)}
        >
          Back
        </Button>

        {activeStep === steps.length - 1 ? (
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button variant="outline" onClick={handleSaveAsDraft}>Save as Draft</Button>
            <Button className="bg-blue-600" onClick={handleSaveAndPublish}>Save & Publish</Button>
          </div>
        ) : (
          <Button onClick={() => setActiveStep((prev) => prev + 1)}>Next</Button>
        )}
      </div>

      {/* Modal Forms */}
      <AddBrandForm isOpen={showAddBrand} onClose={() => setShowAddBrand(false)} onSave={() => {}} />
      <AddCategoryForm isOpen={showAddCategory} onClose={() => setShowAddCategory(false)} onSave={() => {}} />
      <AddCountryForm isOpen={showAddCountry} onClose={() => setShowAddCountry(false)} onSave={() => {}} />
    </div>
  );
};

export default AddItemForm;
