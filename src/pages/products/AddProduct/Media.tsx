import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const Media = () => {
    const [media, setMedia] = useState(() => ({
        VideoUploadLink: ''
    }));


    // Only call onDataChange if the value actually changed
    const handleChange = (field, value) => {
        if (media[field] === value) return;
        const updated = { ...media, [field]: value };
        setMedia(updated);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow p-4 space-y-4 text-left">
                
                <div className="w-100">
                    <Label htmlFor="VideoUploadLink" className="font-bold text-left">
                       Video Link
                    </Label>
                    <Input id="VideoUploadLink" type="text" className="h-9 text-sm" placeholder="Enter Video Link"
                        value={media.VideoUploadLink}
                        onChange={e => handleChange('VideoUploadLink', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Media;