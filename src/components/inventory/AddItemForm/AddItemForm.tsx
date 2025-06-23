import React, { useState } from "react";
import {
  Info,
  Palette,
  IndianRupee,
  Warehouse,
  Share2,
  Camera,
  Search,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Stepper from "@/components/ui/stepper";
import useAppDispatch from "@/hooks/useAppDispatch";
import { addBasicInfoProductRequest, addMediaProductRequest, addPricingProductRequest, addWarehouseProductRequest } from "@/store/Inventory/product/actions";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";

import BasicInfoTab from "./tabs/BasicInfoTab";
import VariantsTab from "./tabs/VariantsTab";
import PricingTab from "./tabs/PricingTab";
import InventoryTab from "./tabs/InventoryTab";
import ChannelsTab from "./tabs/ChannelsTab";
import MediaTab from "./tabs/MediaTab";
import SeoTab from "./tabs/SeoTab";
import AdditionalTab from "./tabs/AdditionalTab";
import VisibilityTab from "./tabs/VisibilityTab";
import { any } from "zod";
import { createPricing } from "@/store/Inventory/product/sagas";

// --- START: Inlined Form Components (AddBrandForm, AddCategoryForm, AddCountryForm) ---
// These components were previously in separate files but are inlined here to resolve import errors.

const AddBrandForm = ({ isOpen, onClose, onSave }) => {
  const [brandName, setBrandName] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (brandName.trim() === '') {
      setError('Brand name cannot be empty.');
      return;
    }
    onSave(brandName);
    setBrandName('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">Add New Brand</h2>
        <div className="space-y-2">
          <label htmlFor="newBrandName" className="block text-sm font-medium text-gray-700">Brand Name</label>
          <input
            type="text"
            id="newBrandName"
            placeholder="e.g., Nike, Adidas"
            value={brandName}
            onChange={(e) => {
              setBrandName(e.target.value);
              if (e.target.value.trim() !== '') setError(''); // Clear error on input
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Brand
          </Button>
        </div>
      </div>
    </div>
  );
};

const AddCategoryForm = ({ isOpen, onClose, onSave }) => {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (categoryName.trim() === '') {
      setError('Category name cannot be empty.');
      return;
    }
    onSave(categoryName);
    setCategoryName('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">Add New Category</h2>
        <div className="space-y-2">
          <label htmlFor="newCategoryName" className="block text-sm font-medium text-gray-700">Category Name</label>
          <input
            type="text"
            id="newCategoryName"
            placeholder="e.g., Electronics, Apparel"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
              if (e.target.value.trim() !== '') setError(''); // Clear error on input
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Category
          </Button>
        </div>
      </div>
    </div>
  );
};

const AddCountryForm = ({ isOpen, onClose, onSave }) => {
  const [countryName, setCountryName] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (countryName.trim() === '') {
      setError('Country name cannot be empty.');
      return;
    }
    onSave(countryName);
    setCountryName('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">Add New Country</h2>
        <div className="space-y-2">
          <label htmlFor="newCountryName" className="block text-sm font-medium text-gray-700">Country Name</label>
          <input
            type="text"
            id="newCountryName"
            placeholder="e.g., India, USA"
            value={countryName}
            onChange={(e) => {
              setCountryName(e.target.value);
              if (e.target.value.trim() !== '') setError(''); // Clear error on input
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Country
          </Button>
        </div>
      </div>
    </div>
  );
};

interface VariantCombination {
  id: string;
  attributes: { [key: string]: string };
  mrp: string;
  sellingPrice: string;
  costPrice: string;
  stock: string;
  image?: string;
}

function pickFields<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    result[key] = obj[key];
  });
  return result;
}

interface Product {
  basicInfo: { productName: string; productSku: string; productType: string; brand: string; category: string; description: string; shortDescription: string; };
  variants: { variants: { option: string; values: string[] }[]; };
  pricing: { mrp: string; sellingPrice: string; costPrice: string; };
  inventory: { stock: string; warehouse: string; };
  channels: { website: boolean; amazon: boolean; flipkart: boolean; meesho: boolean; myntra: boolean; };
  media: { mainImages: File[]; galleryImages: File[]; mediaFiles: File[]; };
  seo: { metaTitle: string; metaDescription: string; tags: string; };
  visibility: { visible: boolean; featured: boolean; };
  additional: { countryOfOrigin: string; weight: string; returnSettings: { isReturnable: boolean; returnWindowDays: string; returnType: string; returnConditions: string; nonReturnableReason: string; returnShippingBorneBy: string; }; };
  // ...other tab sections
}

const AddItemForm = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const editingProduct = useSelector((state: any) => state.product.editingProduct);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddCountry, setShowAddCountry] = useState(false);
  const [channels, setChannels] = useState({
    website: true,
    amazon: false,
    flipkart: false,
    meesho: false,
    myntra: false
  });
    const [returnSettings, setReturnSettings] = useState({
    isReturnable: true,
    returnWindowDays: "7",
    returnType: "refund_or_replacement",
    returnConditions: "",
    nonReturnableReason: "",
    returnShippingBorneBy: "seller"
  });

  // State for all fields (add more as needed for each step)
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productSku, setProductSku] = useState("");
  const [productType, setProductType] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [variants, setVariants] = useState([{id:null, option: "", values: [""] }]);
  const [mrp, setMrp] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [taxClass, setTaxClass] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [gstType, setGstType] = useState("inclusive");
  const [stock, setStock] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [reorderPoint, setReorderPoint] = useState("");
  const [incomingStock, setIncomingStock] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [batchNumber, setBatchNumber] = useState("")
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mainImages, setMainImages] = useState<File[]>([]);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [videoUploadLink, setVideoUploadLink] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [tags, setTags] = useState("");
  const [visible, setVisible] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [variantCombinations, setVariantCombinations] = useState<VariantCombination[]>([]);


  const generateVariantCombinations = () => {
    if (variants.length === 0 || variants.some(v => !v.option || v.values.some(val => !val))) {
      setVariantCombinations([]);
      return;
    }

    const combinations: VariantCombination[] = [];
    
    const generateCombos = (index: number, currentCombo: { [key: string]: string }) => {
      if (index === variants.length) {
        combinations.push({
          id: Date.now().toString() + Math.random().toString(),
          attributes: { ...currentCombo },
          mrp: "",
          sellingPrice: "",
          costPrice: "",
          stock: ""
        });
        return;
      }

      const variant = variants[index];
      variant.values.forEach(value => {
        if (value.trim()) {
          generateCombos(index + 1, { ...currentCombo, [variant.option]: value });
        }
      });
    };

    generateCombos(0, {});
    setVariantCombinations(combinations);
  };

    const addVariantValue = (index: number) => {
    const newVariants = [...variants];
    newVariants[index].values.push("");
    setVariants(newVariants);
  };

   const addVariantOption = () => {
    setVariants([...variants, { id: crypto.randomUUID, option: "", values: [""] }]);
  };

  const removeVariantOption = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

   const [brands, setBrands] = useState([
    { name: "Apple", value: "apple" },
    { name: "Samsung", value: "samsung" },
    { name: "OnePlus", value: "oneplus" }
  ]);
  const [categories, setCategories] = useState([
    { name: "Electronics", value: "electronics" },
    { name: "Accessories", value: "accessories" },
    { name: "Clothing", value: "clothing" }
  ]);
  const [countries, setCountries] = useState([
    { name: "India", value: "india" },
    { name: "China", value: "china" },
    { name: "USA", value: "usa" }
  ]);

  const removeVariantValue = (optionIndex: number, valueIndex: number) => {
    const newVariants = [...variants];
    newVariants[optionIndex].values = newVariants[optionIndex].values.filter((_, i) => i !== valueIndex);
    setVariants(newVariants);
  };

  const updateVariantCombination = (id: string, field: string, value: string) => {
    setVariantCombinations(prev => 
      prev.map(combo => 
        combo.id === id ? { ...combo, [field]: value } : combo
      )
    );
  };

  const handleAddBrand = (brand: { name: string; description: string }) => {
    const newBrand = { name: brand.name, value: brand.name.toLowerCase().replace(/\s+/g, '_') };
    setBrands([...brands, newBrand]);
  };

  const handleAddCategory = (category: { name: string; description: string; parentCategory: string }) => {
    const newCategory = { name: category.name, value: category.name.toLowerCase().replace(/\s+/g, '_') };
    setCategories([...categories, newCategory]);
  };

  const handleAddCountry = (country: { name: string; code: string }) => {
    const newCountry = { name: country.name, value: country.name.toLowerCase().replace(/\s+/g, '_') };
    setCountries([...countries, newCountry]);
  };

   const renderStepContent = () => {
    const step = steps[currentStep];
    switch (step.id) {
      case "basic":
        return (
          <BasicInfoTab
            productName={productName}
            setProductName={setProductName}
            productSku={productSku}
            setProductSku={setProductSku}
            productType={productType}
            setProductType={setProductType}
            brand={brand}
            setBrand={setBrand}
            category={category}
            setCategory={setCategory}
            description={description}
            setDescription={setDescription}
            shortDescription={shortDescription}
            setShortDescription={setShortDescription}
            errors={errors}
            brands={brands}
            setShowAddBrand={setShowAddBrand}
            categories={categories}
            setShowAddCategory={setShowAddCategory}
          />
        );
      case "variants":
        return (
          <VariantsTab
            productType={productType}
            variants={variants}
            setVariants={setVariants}
            variantCombinations={variantCombinations}
            generateVariantCombinations={generateVariantCombinations}
            addVariantValue={addVariantValue}
            addVariantOption={addVariantOption}
            removeVariantOption={removeVariantOption}
            removeVariantValue={removeVariantValue}
            updateVariantCombination={updateVariantCombination}
          />
        );
      case "pricing":
        return (
          <PricingTab
            mrp={mrp}
            setMrp={setMrp}
            sellingPrice={sellingPrice}
            setSellingPrice={setSellingPrice}
            costPrice={costPrice}
            setCostPrice={setCostPrice}
            taxClass={taxClass}
            setTaxClass={setTaxClass}
            hsnCode={hsnCode}
            setHsnCode={setHsnCode}
            gstType={gstType}
            setGstType={setGstType}
            errors={errors}
          />
        );
      case "inventory":
        return (
          <InventoryTab
            stock={stock}
            setStock={setStock}
            warehouse={warehouse}
            setWarehouse={setWarehouse}
            reOrderPoint={reorderPoint}
            setReOrderPoint={setReorderPoint}
            incomingStock={incomingStock}
            setIncomingStock={setIncomingStock}
            batchNumber={batchNumber}
            setBatchNumber={setBatchNumber}
            expiryDate={expiryDate}
            setExpiryDate={setExpiryDate}
            errors={errors}
          />
        );
      case "channels":
        return <ChannelsTab />;
      case "media":
        return (
          <MediaTab
            mainImages={mainImages}
            setMainImages={setMainImages}
            galleryImages={galleryImages}
            setGalleryImages={setGalleryImages}
            videoUploadLink={videoUploadLink}
            setVideoUploadLink={setVideoUploadLink}
          />
        );
      case "seo":
        return (
          <SeoTab
            metaTitle={metaTitle}
            setMetaTitle={setMetaTitle}
            metaDescription={metaDescription}
            setMetaDescription={setMetaDescription}
            tags={tags}
            setTags={setTags}
          />
        );
      case "visibility":
        return <VisibilityTab />;
      case "additional":
        return (
          <AdditionalTab
            countryOfOrigin={countryOfOrigin}
            setCountryOfOrigin={setCountryOfOrigin}
            countries={countries}
            returnSettings={returnSettings}
            setReturnSettings={setReturnSettings}
          />
        );
      default:
        return null;
    }
  };

  const steps = [
    { id: "basic", label: "Basic Information", icon: Info },
    { id: "variants", label: "Variance", icon: Palette },
    { id: "pricing", label: "Pricing and Taxing", icon: IndianRupee },
    { id: "inventory", label: "Warehousing", icon: Warehouse },
    { id: "channels", label: "Listing", icon: Share2 },
    { id: "media", label: "Media", icon: Camera },
    { id: "seo", label: "SEO", icon: Search },
    { id: "visibility", label: "Visibility", icon: Search },
    { id: "additional", label: "Additional Settings", icon: Settings },
  ];

  const handleNext = () => {
    const currentStepId = steps[currentStep].id;
    const requiredFields = {
      basic: ["productName", "productType"],
      pricing: ["mrp", "sellingPrice"],
      inventory: ["stockQuantity"],
      additional: ["countryOrigin", "weight"],
    };

    const fields = requiredFields[currentStepId];
    if (fields) {
      const newErrors = {};
      for (const id of fields) {
        const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
        if (!el || !el.value) {
          newErrors[id] = `This field is required.`;
        }
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        const firstErrorField = Object.keys(newErrors)[0];
        const el = document.getElementById(firstErrorField);
        el?.focus();
        return;
      }
    }
    setErrors({});
    saveStepToStore(currentStepId);

    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const handleBasicInfoNext = () => {
    const currentStepId = steps[currentStep].id;
    // Required fields for basic info
    const requiredFields = {
      basic: ["productName", "productType"],
      pricing: ["mrp", "sellingPrice"],
      inventory: ["stockQuantity"],
      additional: ["countryOrigin", "weight"],
    };
    //check if all required fields are filled
    const fields = requiredFields[currentStepId];
    if (fields) {
      const newErrors = {};
      for (const id of fields) {
        const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
        if (!el || !el.value) {
          newErrors[id] = `This field is required.`;
        }
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        const firstErrorField = Object.keys(newErrors)[0];
        const el = document.getElementById(firstErrorField);
        el?.focus();
        return;
      }
    }
    //save the step to store
    setErrors({});
    saveStepToStore(currentStepId);

    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
  };


  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleSaveAsDraft = () => alert("Save as draft");
  const handleSaveAndPublish = () => alert("Save and Publish clicked");
  

  const renderStepperNavigation = () => {
    return (
      <div className="flex justify-between pt-6 border-t mt-6">
        <Button
          variant={currentStep === 0 ? "outline" : "destructive"}
          onClick={handleBack}
          disabled={currentStep === 0}
          className={`px-4 py-2 rounded ${currentStep === 0 ? 'bg-gray-300 text-gray-700 disabled:opacity-50' : ''}`}
        >
          Back
        </Button>
         <div className="flex gap-4">
          <Button
            onClick={handleSaveAsDraft}
            className="px-4 py-2 bg-brand-blue text-white rounded"
          >
            Save as Draft
          </Button>
          <Button
            onClick={currentStep === steps.length - 1 ? handleSaveAndPublish : handleNext}
            className="px-4 py-2 bg-green-600 hover:bg-green-700"
          >
           { currentStep === steps.length - 1 ? 'Save & Publish' : 'Save & Next'}
          </Button>
        </div>
      </div>
    );
  }
  

  // Handler to collect all data and dispatch to store/api
  const saveStepToStore = (currentStepId: string) => {
    const currentDate = new Date().toISOString();
    const currentUser = "admin"; // Replace with actual user
    switch (currentStepId) {
      case "basic":
        const basicPayload = {
          productName,
          productSku,
          productType,
          brand,
          category,
          description,
          shortDescription,
        };
        dispatch(addBasicInfoProductRequest(basicPayload));
        break;
      case "variants":       
        const variantPayload = {
          productId: editingProduct?.basicInfo?.productId,
          variants: variants.map((v) => ({
            ...v,
            id: v.id || crypto.randomUUID(), // or generate with uuid
            createdDate: currentDate,
            updatedDate: currentDate,
            createdBy: currentUser,
            updatedBy: currentUser,
          })),
        };
        dispatch(addBasicInfoProductRequest(variantPayload));
        break;
      case "pricing":
        const pricingPayload = {
          productId: editingProduct?.basicInfo?.productId,
          variantId: 0,
          mrp,
          sellingPrice,
          costPrice,
          taxClass,
          hsnCode,
          gstType
        };
        dispatch(addPricingProductRequest(pricingPayload));
        break;  
      case "inventory":
        const inventoryPayload = {
          productId: editingProduct?.basicInfo?.productId,
          variantId: "0",
          warehouseId : 1,
          stock,
          reorderPoint,
          incomingStock,
          expiryDate
        };
        dispatch(addWarehouseProductRequest(inventoryPayload));
        break;
      case "additional":
        const additionalPayload = {
          countryOfOrigin,
          weight: any,
          returnSettings,
        };
        dispatch(addBasicInfoProductRequest(additionalPayload));
        break;
      case "channels":
        const channelsPayload = {
          channels,
        };
        dispatch(addBasicInfoProductRequest(channelsPayload));
        break;  
      case "media":
        const mediaPayload = {
          productId: editingProduct?.basicInfo?.productId,
          variantId: "0",
          mainImages: mainImages.map(file => file.name),
          galleryImages: galleryImages.map(file => file.name),
          ChannelSpecificImages: null,
          videoUploadLink
        };
        dispatch(addMediaProductRequest(mediaPayload));
        break;
      case "seo":
        const seoPayload = { 
          metaTitle,
          metaDescription,
          tags,
        };
        dispatch(addBasicInfoProductRequest(seoPayload));
        break;
      case "visibility":
        const payload = {
          visible,
          featured,
          countryOfOrigin,
        };
        dispatch(addBasicInfoProductRequest(payload));
        break;    
    }
    // const payload1 = {
    //   productName,
    //   productSku,
    //   productType,
    //   brand,
    //   category,
    //   description,
    //   shortDescription,
    //   variants,
    //   mrp,
    //   sellingPrice,
    //   costPrice,
    //   stock,
    //   warehouse,
    //   channels,
    //   mainImages,
    //   galleryImages,
    //   metaTitle,
    //   metaDescription,
    //   tags,
    //   visible,
    //   featured,
    //   countryOfOrigin,
    // };
    //dispatch(addProductRequest(payload));
  };

  const addSegments = [
    { id: "basic", label: "Basic Information", icon: Info },
    { id: "variants", label: "Variance", icon: Palette },
    { id: "pricing", label: "Pricing and Taxing", icon: IndianRupee },
    { id: "inventory", label: "Warehousing", icon: Warehouse },
    { id: "channels", label: "Listing", icon: Share2 },
    { id: "media", label: "Media", icon: Camera },
    { id: "seo", label: "SEO", icon: Search },
    { id: "visibility", label: "Visibility", icon: Search },
    { id: "additional", label: "Additional Settings", icon: Settings },
  ];

  const handleOnClick = (step: string) => {
    switch (steps[currentStep].id) {
      case "basic":
        handleBasicInfoNext();
        break;
      case "pricing":
        handleNext();
        break;
      case "inventory":
        handleNext();
        break;
      case "additional":
        handleNext();
        break;
      case "variants":
        handleNext();
        break;
      case "channels":
        handleNext();
        break;
      case "media":
        handleNext();
        break;
      case "seo":
        handleNext();
        break;
      case "visibility":
        handleNext();
        break;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">

      <Stepper 
        steps={steps.map(step => ({ ...step, content: renderStepContent() }))} 
  handleNext={handleOnClick}
  handleBack={handleBack}
  activeStep={currentStep} 
  setActiveStep={setCurrentStep} 
  navigationSection={renderStepperNavigation()}
/>


      {/* Inline form components remain */}
      <AddBrandForm
        isOpen={showAddBrand}
        onClose={() => setShowAddBrand(false)}
        onSave={handleAddBrand}
      />
      <AddCategoryForm
        isOpen={showAddCategory}
        onClose={() => setShowAddCategory(false)}
        onSave={handleAddCategory}
      />
      <AddCountryForm
        isOpen={showAddCountry}
        onClose={() => setShowAddCountry(false)}
        onSave={handleAddCountry}
      />
    </div>
  );
};

export default AddItemForm; 