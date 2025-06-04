import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const AdditionSettings = () => {
    const [settings, setSettings] = useState(() => ({
        productName: '',
        productSKU: '',
        productType: 'Electronics',
        category: 'all',
        brand: 'LG',
        description: '',
        sdescription: '',
    }));

    // Only call onDataChange if the value actually changed
    const updateSettings = (newSettings) => {
        if (JSON.stringify(settings) === JSON.stringify(newSettings)) return;
        setSettings(newSettings);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow p-4 space-y-4 text-left">
                <div className="w-100">
                    <Label htmlFor="productName" className="font-bold text-left">
                        Product Name
                    </Label>
                    <Input id="productName" type="text" className="h-9 text-sm" placeholder="Enter product name" maxLength={200}
                        value={settings.productName}
                        onChange={e => updateSettings({ ...settings, productName: e.target.value })}
                    />
                </div>
                <div className="w-100">
                    <Label htmlFor="productSKU" className="font-bold text-left">
                        Product SKU
                    </Label>
                    <Input id="productSKU" type="text" className="h-9 text-sm" placeholder="Enter product SKU"
                        value={settings.productSKU}
                        onChange={e => updateSettings({ ...settings, productSKU: e.target.value })}
                    />
                </div>
                <div className="w-100">
                    <Label htmlFor="reason" className="font-bold">
                        Product Type
                    </Label>
                    <Select value={settings.productType} onValueChange={val => updateSettings({ ...settings, productType: val })}>
                        <SelectTrigger className="w-[100%] h-9">
                            <SelectValue placeholder="Electronics" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Electronics">Electronics</SelectItem>
                                <SelectItem value="Home">Home</SelectItem>
                                <SelectItem value="Grocery">Grocery</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-100">
                    <Label htmlFor="reason" className="font-bold">
                        Category
                    </Label>
                    <Select value={settings.category} onValueChange={val => updateSettings({ ...settings, category: val })}>
                        <SelectTrigger className="w-[100%] h-9">
                            <SelectValue placeholder="all" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Electronics">Electronics</SelectItem>
                                <SelectItem value="Home">Home</SelectItem>
                                <SelectItem value="Grocery">Grocery</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-100">
                    <Label htmlFor="brand" className="font-bold">
                        Brand
                    </Label>
                    <Select value={settings.brand} onValueChange={val => updateSettings({ ...settings, brand: val })}>
                        <SelectTrigger className="w-[100%] h-9">
                            <SelectValue placeholder="Electronics" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="LG">LG</SelectItem>
                                <SelectItem value="BOSCH">BOSCH</SelectItem>
                                <SelectItem value="Lenova">Lenova</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-100">
                    <Label htmlFor="description" className="font-bold">
                        Description
                    </Label>
                    <Textarea id="description"
                        value={settings.description}
                        onChange={e => updateSettings({ ...settings, description: e.target.value })}
                    />
                </div>
                <div className="w-100">
                    <Label htmlFor="sdescription" className="font-bold">
                        Short Description
                    </Label>
                    <Textarea id="sdescription"
                        value={settings.sdescription}
                        onChange={e => updateSettings({ ...settings, sdescription: e.target.value })}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdditionSettings;