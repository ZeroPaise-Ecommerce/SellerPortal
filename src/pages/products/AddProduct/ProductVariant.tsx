import React, { useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// Select components are imported but not used, consider removing if not needed.
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// Textarea is imported but not used, consider removing if not needed.
// import { Textarea } from "@/components/ui/textarea";
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { saveStepDataLocal, selectStepData } from '@/features/product/addProductSlice';
import { useRequiredFields } from "@/hooks/useRequiredFields";

const ProductVariant = ({ onValidationChange }) => {
    const dispatch = useAppDispatch();
    const stepIndex = 1; // Assuming this is for the second step
    const initial = useAppSelector(state => selectStepData(state, stepIndex));

    const allFields = {
        variantoptions: '',
        variantpricing: '',
        variantstock: '',
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
    } = useRequiredFields(["variantoptions", "variantpricing", "variantstock"], allFields);

    useEffect(() => { setFields(initial); }, [initial, setFields]);

    const handleChange = (field, value) => {
        baseHandleChange(field, value); // Handles local state and validation
        // Ensure that 'fields' used here is the latest state after baseHandleChange
        // Since baseHandleChange updates state asynchronously, we might need to use the value directly
        // or ensure 'fields' is updated before dispatching. For simplicity, dispatching with current value.
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
                    <Label htmlFor="variantoptions" className="font-bold text-left">
                        Variant Options
                    </Label>
                    <Input
                        id="variantoptions"
                        type="text"
                        className={`h-9 text-sm placeholder:text-gray-400 ${touched.variantoptions && !String(fields.variantoptions).trim() ? 'border border-red-500 ring-1 ring-red-400' : ''}`}
                        placeholder="Enter variant options"
                        value={fields.variantoptions}
                        onChange={e => handleChange('variantoptions', e.target.value)}
                        onBlur={() => handleBlur('variantoptions')}
                    />
                    {touched.variantoptions && !String(fields.variantoptions).trim() && (
                        <span className="text-xs text-red-500">Variant Options is required</span>
                    )}
                </div>
                <div className="w-100">
                    <Label htmlFor="variantpricing" className="font-bold text-left">
                        Variant Pricing
                    </Label>
                    <Input
                        id="variantpricing"
                        type="number"
                        className={`h-9 text-sm placeholder:text-gray-400 ${touched.variantpricing && !String(fields.variantpricing).trim() ? 'border border-red-500 ring-1 ring-red-400' : ''}`}
                        placeholder="Enter variant pricing"
                        value={fields.variantpricing}
                        onChange={e => handleChange('variantpricing', e.target.value)}
                        onBlur={() => handleBlur('variantpricing')}
                    />
                    {touched.variantpricing && !String(fields.variantpricing).trim() && (
                        <span className="text-xs text-red-500">Variant Pricing is required</span>
                    )}
                </div>
                <div className="w-100">
                    <Label htmlFor="variantstock" className="font-bold text-left">
                        Variant Stock
                    </Label>
                    <Input
                        id="variantstock"
                        type="number"
                        className={`h-9 text-sm placeholder:text-gray-400 ${touched.variantstock && !String(fields.variantstock).trim() ? 'border border-red-500 ring-1 ring-red-400' : ''}`}
                        placeholder="Enter variant stock"
                        value={fields.variantstock}
                        onChange={e => handleChange('variantstock', e.target.value)}
                        onBlur={() => handleBlur('variantstock')}
                    />
                    {touched.variantstock && !String(fields.variantstock).trim() && (
                        <span className="text-xs text-red-500">Variant Stock is required</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductVariant;