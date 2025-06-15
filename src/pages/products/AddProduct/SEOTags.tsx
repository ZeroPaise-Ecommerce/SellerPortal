import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { saveStepDataLocal, selectStepData } from '@/features/product/addProductSlice';

// Example default values, adjust as needed
const defaultSEO = {
    metaTitle: '',
    metaDescription: '',
    keywords: ''
};

const SEOTags = () => {
    const dispatch = useAppDispatch();
    const stepIndex = 6; // Use the correct step index for SEOTags
    const initial = useAppSelector(state => selectStepData(state, stepIndex));
    const [seo, setSEO] = useState({ ...defaultSEO, ...initial });

    useEffect(() => {
        const merged = { ...defaultSEO, ...initial };
        if (JSON.stringify(merged) !== JSON.stringify(seo)) {
            setSEO(merged);
        }
    }, [initial]);

    const handleChange = (field, value) => {
        const updated = { ...seo, [field]: value };
        setSEO(updated);
        dispatch(saveStepDataLocal({ stepIndex, data: updated }));
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 space-y-4 text-left">
                <div className="w-100">
                    <Label htmlFor="metaTitle" className="font-bold text-left">
                        Meta Title
                    </Label>
                    <Input
                        id="metaTitle"
                        type="text"
                        className="h-9 text-sm"
                        placeholder="Enter Meta Title"
                        value={seo.metaTitle}
                        onChange={e => handleChange('metaTitle', e.target.value)}
                    />
                </div>
                <div className="w-100">
                    <Label htmlFor="metaDescription" className="font-bold text-left">
                        Meta Description
                    </Label>
                    <Input
                        id="metaDescription"
                        type="text"
                        className="h-9 text-sm"
                        placeholder="Enter Meta Description"
                        value={seo.metaDescription}
                        onChange={e => handleChange('metaDescription', e.target.value)}
                    />
                </div>
                <div className="w-100">
                    <Label htmlFor="keywords" className="font-bold text-left">
                        Keywords
                    </Label>
                    <Input
                        id="keywords"
                        type="text"
                        className="h-9 text-sm"
                        placeholder="Enter Keywords"
                        value={seo.keywords}
                        onChange={e => handleChange('keywords', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default SEOTags;