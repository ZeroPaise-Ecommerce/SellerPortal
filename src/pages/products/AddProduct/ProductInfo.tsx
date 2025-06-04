import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRequiredFields } from "@/hooks/useRequiredFields";

const ProductInfo = ({ onValidationChange }) => {
    const {
        fields,
        touched,
        isValid,
        handleChange,
        handleBlur,
        handleNextAttempt,
    } = useRequiredFields(["productName", "productSKU"]);

    React.useEffect(() => {
        if (onValidationChange) onValidationChange(isValid, handleNextAttempt);
    }, [isValid, onValidationChange, handleNextAttempt]);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 space-y-4 text-left">
                <div className="w-100">
                    <Label htmlFor="productName" className="font-bold text-left">
                        Product Name*
                    </Label>
                    <Input id="productName" type="text" required className={`h-9 text-sm placeholder:text-gray-400 ${touched.productName && !fields.productName.trim() ? 'border border-red-500 ring-1 ring-red-400' : ''}`} placeholder="Enter product name" maxLength={200}
                        value={fields.productName}
                        onChange={e => handleChange('productName', e.target.value)}
                        onBlur={() => handleBlur('productName')}
                    />
                    {touched.productName && !fields.productName.trim() && (
                        <span className="text-xs text-red-500">Product Name is required</span>
                    )}
                </div>
                <div className="w-100">
                    <Label htmlFor="productSKU" className="font-bold text-left">
                        Product SKU*
                    </Label>
                    <Input id="productSKU" type="text" required className={`h-9 text-sm placeholder:text-gray-400 ${touched.productSKU && !fields.productSKU.trim() ? 'border border-red-500 ring-1 ring-red-400' : ''}`} placeholder="Enter product SKU"
                        value={fields.productSKU}
                        onChange={e => handleChange('productSKU', e.target.value)}
                        onBlur={() => handleBlur('productSKU')}
                    />
                    {touched.productSKU && !fields.productSKU.trim() && (
                        <span className="text-xs text-red-500">Product SKU is required</span>
                    )}
                </div>

                <div className="w-100">
                    <Label htmlFor="reason" className="font-bold">
                        Product Type
                    </Label>
                    <Select value={'Electronics'}>
                        <SelectTrigger className="w-[100%] h-9">
                            <SelectValue placeholder="Electronics" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All</SelectItem>
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
                    <Select value={'all'}>
                        <SelectTrigger className="w-[100%] h-9">
                            <SelectValue placeholder="all" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All</SelectItem>
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
                    <Select value={'LG'}>
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
                    <Textarea id="description" />
                </div>

                <div className="w-100">
                    <Label htmlFor="sdescription" className="font-bold">
                        Short Description
                    </Label>
                    <Textarea id="sdescription" />
                </div>

            </div>
        </div>
    )
}

export default ProductInfo;