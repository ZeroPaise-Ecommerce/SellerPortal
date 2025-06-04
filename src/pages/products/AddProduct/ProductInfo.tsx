import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRequiredFields } from "@/hooks/useRequiredFields";
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { saveStepDataLocal, selectStepData } from '@/features/product/addProductSlice';

const ProductInfo = ({ onValidationChange }) => {
    const dispatch = useAppDispatch();
    const stepIndex = 0;
    const initial = useAppSelector(state => selectStepData(state, stepIndex));
    const allFields = {
        productName: '',
        productSKU: '',
        productType: 'Electronics',
        category: 'all',
        brand: 'LG',
        description: '',
        sdescription: '',
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
    } = useRequiredFields(["productName", "productSKU"], allFields);

    // Persist to Redux on change
    const handleChange = (field, value) => {
        baseHandleChange(field, value);
        dispatch(saveStepDataLocal({ stepIndex, data: { ...fields, [field]: value } }));
    };

    // Only restore from Redux if initial actually changes (prevents overwriting user input)
    const lastInitialRef = React.useRef(initial);
    React.useEffect(() => {
        setFields(initial);
        // if (JSON.stringify(lastInitialRef.current) !== JSON.stringify(initial)) {
        //     setFields(initial);
        //     lastInitialRef.current = initial;
        // }
    }, [initial, setFields]);

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
                    <Select value={fields.productType || 'Electronics'} onValueChange={val => handleChange('productType', val)}>
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
                    <Select value={fields.category || 'all'} onValueChange={val => handleChange('category', val)}>
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
                    <Select value={fields.brand || 'LG'} onValueChange={val => handleChange('brand', val)}>
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
                    <Textarea id="description" value={fields.description || ''} onChange={e => handleChange('description', e.target.value)} />
                </div>

                <div className="w-100">
                    <Label htmlFor="sdescription" className="font-bold">
                        Short Description
                    </Label>
                    <Textarea id="sdescription" value={fields.sdescription || ''} onChange={e => handleChange('sdescription', e.target.value)} />
                </div>

            </div>
        </div>
    )
}

export default ProductInfo;