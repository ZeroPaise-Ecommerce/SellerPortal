import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { saveStepDataLocal, selectStepData } from '@/features/product/addProductSlice';
import { useRequiredFields } from "@/hooks/useRequiredFields";

interface ListingState {
    Channels: string;
    Category: string;
    Title: string;
    description: string;
    Pricing: string;
    SKU: string;
    FulfillmentType: string;
}

const ChannelListing = ({ onValidationChange }) => {
    const dispatch = useAppDispatch();
    const stepIndex = 4; // Assuming this is for the fifth step
    const initial = useAppSelector(state => selectStepData(state, stepIndex));

    const allFields: ListingState = {
        Channels: '',
        Category: '',
        Title: '',
        description: '',
        Pricing: '',
        SKU: '',
        FulfillmentType: '',
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
    } = useRequiredFields(["Channels", "Category", "Title", "Pricing", "SKU", "FulfillmentType"], allFields);

    useEffect(() => { setFields(initial); }, [initial, setFields]);

    const handleChange = (field: keyof ListingState, value: string) => {
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
                    <Label htmlFor="Channels" className="font-bold text-left">
                        Channels
                    </Label>
                    <Input
                        id="Channels"
                        type="text"
                        className={`h-9 text-sm placeholder:text-gray-400 ${touched.Channels && !String(fields.Channels).trim() ? 'border border-red-500 ring-1 ring-red-400' : ''}`}
                        placeholder="Enter Channels list"
                        value={fields.Channels}
                        onChange={e => handleChange('Channels', e.target.value)}
                        onBlur={() => handleBlur('Channels')}
                    />
                    {touched.Channels && !String(fields.Channels).trim() && (
                        <span className="text-xs text-red-500">Channels is required</span>
                    )}
                </div>
                <div className="w-100">
                    <Label htmlFor="Category" className="font-bold text-left">
                        Category
                    </Label>
                    <Input
                        id="Category"
                        type="text"
                        className={`h-9 text-sm placeholder:text-gray-400 ${touched.Category && !String(fields.Category).trim() ? 'border border-red-500 ring-1 ring-red-400' : ''}`}
                        placeholder="Enter Category"
                        value={fields.Category}
                        onChange={e => handleChange('Category', e.target.value)}
                        onBlur={() => handleBlur('Category')}
                    />
                    {touched.Category && !String(fields.Category).trim() && (
                        <span className="text-xs text-red-500">Category is required</span>
                    )}
                </div>
                <div className="w-100">
                    <Label htmlFor="Title" className="font-bold text-left">
                        Title
                    </Label>
                    <Input
                        id="Title"
                        type="text"
                        className={`h-9 text-sm placeholder:text-gray-400 ${touched.Title && !String(fields.Title).trim() ? 'border border-red-500 ring-1 ring-red-400' : ''}`}
                        placeholder="Enter Title"
                        value={fields.Title}
                        onChange={e => handleChange('Title', e.target.value)}
                        onBlur={() => handleBlur('Title')}
                    />
                    {touched.Title && !String(fields.Title).trim() && (
                        <span className="text-xs text-red-500">Title is required</span>
                    )}
                </div>
                <div className="w-100">
                    <Label htmlFor="description" className="font-bold">
                        Description
                    </Label>
                    <Textarea
                        id="description"
                        className="text-sm placeholder:text-gray-400"
                        placeholder="Enter description"
                        value={fields.description}
                        onChange={e => handleChange('description', e.target.value)}
                        onBlur={() => handleBlur('description')}
                    />
                </div>
                <div className="w-100">
                    <Label htmlFor="Pricing" className="font-bold text-left">
                        Pricing
                    </Label>
                    <Input
                        id="Pricing"
                        type="number"
                        className={`h-9 text-sm placeholder:text-gray-400 ${touched.Pricing && !String(fields.Pricing).trim() ? 'border border-red-500 ring-1 ring-red-400' : ''}`}
                        placeholder="Enter Price"
                        value={fields.Pricing}
                        onChange={e => handleChange('Pricing', e.target.value)}
                        onBlur={() => handleBlur('Pricing')}
                    />
                    {touched.Pricing && !String(fields.Pricing).trim() && (
                        <span className="text-xs text-red-500">Pricing is required</span>
                    )}
                </div>
                <div className="w-100">
                    <Label htmlFor="SKU" className="font-bold text-left">
                        SKU
                    </Label>
                    <Input
                        id="SKU"
                        type="text"
                        className={`h-9 text-sm placeholder:text-gray-400 ${touched.SKU && !String(fields.SKU).trim() ? 'border border-red-500 ring-1 ring-red-400' : ''}`}
                        placeholder="Enter SKU"
                        value={fields.SKU}
                        onChange={e => handleChange('SKU', e.target.value)}
                        onBlur={() => handleBlur('SKU')}
                    />
                    {touched.SKU && !String(fields.SKU).trim() && (
                        <span className="text-xs text-red-500">SKU is required</span>
                    )}
                </div>
                <div className="w-100">
                    <Label htmlFor="FulfillmentType" className="font-bold text-left">
                        Fulfillment Type
                    </Label>
                    <Input
                        id="FulfillmentType"
                        type="text"
                        className={`h-9 text-sm placeholder:text-gray-400 ${touched.FulfillmentType && !String(fields.FulfillmentType).trim() ? 'border border-red-500 ring-1 ring-red-400' : ''}`}
                        placeholder="Enter Fulfillment Type"
                        value={fields.FulfillmentType}
                        onChange={e => handleChange('FulfillmentType', e.target.value)}
                        onBlur={() => handleBlur('FulfillmentType')}
                    />
                    {touched.FulfillmentType && !String(fields.FulfillmentType).trim() && (
                        <span className="text-xs text-red-500">Fulfillment Type is required</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChannelListing;