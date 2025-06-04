import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const SEOTags = () => {
    const [seo, setSeo] = useState(() => ({
        MetaTitle: '',
        MetaDescription: '',
        Keywords: '',
    }));


    // Only call onDataChange if the value actually changed
    const handleChange = (field, value) => {
        if (seo[field] === value) return;
        const updated = { ...seo, [field]: value };
        setSeo(updated);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow p-4 space-y-4 text-left">
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