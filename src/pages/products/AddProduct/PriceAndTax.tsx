import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useEffect } from "react";
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { saveStepDataLocal, selectStepData } from '@/features/product/addProductSlice';
import { useRequiredFields } from "@/hooks/useRequiredFields";

type PriceState = {
    MRP: string;
    SellingPrice: string;
    Cost: string;
    TaxClass: string;
    HSNCode: string;
    GSTType: string;
};

const PriceAndTax = ({ onValidationChange }) => {
    const dispatch = useAppDispatch();
    const stepIndex = 2; // Assuming this is for the third step
    const initial = useAppSelector(state => selectStepData(state, stepIndex));

    const allFields: PriceState = {
        MRP: '',
        SellingPrice: '',
        Cost: '',
        TaxClass: '5', // Default value
        HSNCode: '',
        GSTType: '',
        ...initial
    };

    const {
        fields,
        touched,
        isValid,
        handleChange: baseHandleChange,
        handleBlur,
        handleNextAttempt,
        setFields
    } = useRequiredFields(["MRP", "SellingPrice", "Cost", "HSNCode"], allFields);

    useEffect(() => { setFields(initial); }, [initial, setFields]);

    const handleChange = (field: keyof PriceState, value: string) => {
        baseHandleChange(field, value);
        dispatch(saveStepDataLocal({ stepIndex, data: { ...fields, [field]: value } }));
    };

    useEffect(() => {
        if (onValidationChange) {
            onValidationChange(isValid, handleNextAttempt);
        }
    }, [isValid, onValidationChange, handleNextAttempt]);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 space-y-4 text-left">
                <div className="w-100">
                    <Label htmlFor="MRP" className="font-bold text-left">
                        MRP
                    </Label>
                    <Input
                        id="MRP"
                        type="number"
                        className={`h-9 text-sm placeholder:text-gray-400 ${touched.MRP && !String(fields.MRP).trim() ? 'border border-red-500 ring-1 ring-red-400' : ''}`}
                        placeholder="Enter MRP"
                        value={fields.MRP}
                        onChange={e => handleChange('MRP', e.target.value)}
                        onBlur={() => handleBlur('MRP')}
                    />
                    {touched.MRP && !String(fields.MRP).trim() && (
                        <span className="text-xs text-red-500">MRP is required</span>
                    )}
                </div>
                <div className="w-100">
                    <Label htmlFor="SellingPrice" className="font-bold text-left">
                        Selling Price
                    </Label>
                    <Input
                        id="SellingPrice"
                        type="number"
                        className={`h-9 text-sm placeholder:text-gray-400 ${touched.SellingPrice && !String(fields.SellingPrice).trim() ? 'border border-red-500 ring-1 ring-red-400' : ''}`}
                        placeholder="Enter Selling Price"
                        value={fields.SellingPrice}
                        onChange={e => handleChange('SellingPrice', e.target.value)}
                        onBlur={() => handleBlur('SellingPrice')}
                    />
                    {touched.SellingPrice && !String(fields.SellingPrice).trim() && (
                        <span className="text-xs text-red-500">Selling Price is required</span>
                    )}
                </div>
                <div className="w-100">
                    <Label htmlFor="Cost" className="font-bold text-left">
                        Cost
                    </Label>
                    <Input
                        id="Cost"
                        type="number"
                        className={`h-9 text-sm placeholder:text-gray-400 ${touched.Cost && !String(fields.Cost).trim() ? 'border border-red-500 ring-1 ring-red-400' : ''}`}
                        placeholder="Enter Cost"
                        value={fields.Cost}
                        onChange={e => handleChange('Cost', e.target.value)}
                        onBlur={() => handleBlur('Cost')}
                    />
                    {touched.Cost && !String(fields.Cost).trim() && (
                        <span className="text-xs text-red-500">Cost is required</span>
                    )}
                </div>
                <div className="w-100">
                    <Label htmlFor="TaxClass" className="font-bold">
                        Tax Class
                    </Label>
                    <Select value={fields.TaxClass} onValueChange={val => handleChange('TaxClass', val)}>
                        <SelectTrigger className="w-[100%] h-9">
                            <SelectValue placeholder="TaxClass" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="0">0%</SelectItem>
                                <SelectItem value="5">5%</SelectItem>
                                <SelectItem value="12">12%</SelectItem>
                                <SelectItem value="18">18%</SelectItem>
                                <SelectItem value="28">28%</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-100">
                    <Label htmlFor="HSNCode" className="font-bold text-left">
                        HSN Code
                    </Label>
                    <Input
                        id="HSNCode"
                        type="text"
                        className={`h-9 text-sm placeholder:text-gray-400 ${touched.HSNCode && !String(fields.HSNCode).trim() ? 'border border-red-500 ring-1 ring-red-400' : ''}`}
                        placeholder="Enter HSN Code"
                        value={fields.HSNCode}
                        onChange={e => handleChange('HSNCode', e.target.value)}
                        onBlur={() => handleBlur('HSNCode')}
                    />
                    {touched.HSNCode && !String(fields.HSNCode).trim() && (
                        <span className="text-xs text-red-500">HSN Code is required</span>
                    )}
                </div>
                <div className="w-100">
                    <Label htmlFor="GSTType" className="font-bold text-left">
                        GST Type
                    </Label>
                    <Input
                        id="GSTType"
                        type="text"
                        className="h-9 text-sm placeholder:text-gray-400"
                        placeholder="Enter GST Type"
                        value={fields.GSTType}
                        onChange={e => handleChange('GSTType', e.target.value)}
                        onBlur={() => handleBlur('GSTType')} // Even if not required, track touched
                    />
                </div>
            </div>
        </div>
    );
};

export default PriceAndTax;