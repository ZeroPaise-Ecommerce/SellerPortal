import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { saveStepDataLocal, selectStepData } from '@/features/product/addProductSlice';
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const SEOTags = () => {
    const dispatch = useAppDispatch();
    const stepIndex = 6;
    const initial = useAppSelector(state => selectStepData(state, stepIndex));
    const [seo, setSeo] = useState({
        MetaTitle: '',
        MetaDescription: '',
        Keywords: '',
        ...initial
    });
    useEffect(() => { setSeo(prev => ({ ...prev, ...initial })); }, [initial]);

    // Only call onDataChange if the value actually changed
    const handleChange = (field, value) => {
        const updated = { ...seo, [field]: value };
        setSeo(updated);
        dispatch(saveStepDataLocal({ stepIndex, data: updated }));
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 space-y-4 text-left">
                <div className="w-100">
                    <Label htmlFor="MetaTitle" className="font-bold text-left">
                        Meta Title
                    </Label>
                    <Input id="MetaTitle" type="text" className="h-9 text-sm" placeholder="Enter Meta Title" maxLength={60}
                        value={seo.MetaTitle}
                        onChange={e => handleChange('MetaTitle', e.target.value)}
                    />
                </div>

                <div className="w-100">
                    <Label htmlFor="MetaDescription" className="font-bold">
                        Meta Description
                    </Label>
                    <Textarea id="MetaDescription" maxLength={160}
                        value={seo.MetaDescription}
                        onChange={e => handleChange('MetaDescription', e.target.value)}
                    />
                </div>

                <div className="w-100">
                    <Label htmlFor="Keywords" className="font-bold">
                        Keywords
                    </Label>
                    <Textarea id="Keywords"
                        value={seo.Keywords}
                        onChange={e => handleChange('Keywords', e.target.value)}
                    />
                </div>

            </div>
        </div>
    );
};

export default SEOTags;