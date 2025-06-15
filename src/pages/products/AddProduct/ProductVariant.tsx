import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { saveStepDataLocal, selectStepData } from '@/features/product/addProductSlice';

const ProductVariant = () => {
    const dispatch = useAppDispatch();
    const stepIndex = 1;
    const initial = useAppSelector(state => selectStepData(state, stepIndex));
    const [variant, setVariant] = useState({
        variantoptions: '',
        variantpricing: '',
        variantstock: '',
        ...initial
    });
    useEffect(() => { setVariant({ ...variant, ...initial }); }, [initial]);
    const handleChange = (field, value) => {
        const updated = { ...variant, [field]: value };
        setVariant(updated);
        dispatch(saveStepDataLocal({ stepIndex, data: updated }));
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 space-y-4 text-left">
                <div className="w-100">
                    <Label htmlFor="variantoptions" className="font-bold text-left">
                        Variant Options
                    </Label>
                    <Input id="variantoptions" type="text" className="h-9 text-sm" placeholder="Enter variant options" value={variant.variantoptions} onChange={e => handleChange('variantoptions', e.target.value)} />
                </div>
                <div className="w-100">
                    <Label htmlFor="variantpricing" className="font-bold text-left">
                        Variant Pricing
                    </Label>
                    <Input id="variantpricing" type="number" className="h-9 text-sm" placeholder="Enter variant pricing" value={variant.variantpricing} onChange={e => handleChange('variantpricing', e.target.value)} />
                </div>
                <div className="w-100">
                    <Label htmlFor="variantstock" className="font-bold text-left">
                        Variant Stock
                    </Label>
                    <Input id="variantstock" type="number" className="h-9 text-sm" placeholder="Enter variant stock" value={variant.variantstock} onChange={e => handleChange('variantstock', e.target.value)} />
                </div>
            </div>
        </div>)
}

export default ProductVariant;