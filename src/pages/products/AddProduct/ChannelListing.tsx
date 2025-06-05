import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { saveStepDataLocal, selectStepData } from '@/features/product/addProductSlice';

const ChannelListing = () => {
    const dispatch = useAppDispatch();
    const stepIndex = 4;
    const initial = useAppSelector(state => selectStepData(state, stepIndex));
    const [listing, setListing] = useState({
        Channels: '',
        Category: '',
        Title: '',
        description: '',
        Pricing: '',
        SKU: '',
        FulfillmentType: '',
        ...initial
    });
    useEffect(() => { setListing(prev => ({ ...prev, ...initial })); }, [initial]);

    // Only call onDataChange if the value actually changed
    const handleChange = (field, value) => {
        const updated = { ...listing, [field]: value };
        setListing(updated);
        dispatch(saveStepDataLocal({ stepIndex, data: updated }));
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 space-y-4 text-left">
                <div className="w-100">
                    <Label htmlFor="Channels" className="font-bold text-left">
                       Channels
                    </Label>
                    <Input id="Channels" type="text" className="h-9 text-sm" placeholder="Enter Channels list" maxLength={200}
                        value={listing.Channels}
                        onChange={e => handleChange('Channels', e.target.value)}
                    />
                </div>
                <div className="w-100">
                    <Label htmlFor="Category" className="font-bold text-left">
                        Category
                    </Label>
                    <Input id="Category" type="text" className="h-9 text-sm" placeholder="Enter Category"
                        value={listing.Category}
                        onChange={e => handleChange('Category', e.target.value)}
                    />
                </div>
                <div className="w-100">
                    <Label htmlFor="Title" className="font-bold text-left">
                        Title
                    </Label>
                    <Input id="Title" type="text" className="h-9 text-sm" placeholder="Enter Title"
                        value={listing.Title}
                        onChange={e => handleChange('Title', e.target.value)}
                    />
                </div>
                <div className="w-100">
                    <Label htmlFor="description" className="font-bold">
                        Description
                    </Label>
                    <Textarea id="description"
                        value={listing.description}
                        onChange={e => handleChange('description', e.target.value)}
                    />
                </div>
                 <div className="w-100">
                    <Label htmlFor="Pricing" className="font-bold text-left">
                        Pricing
                    </Label>
                    <Input id="Pricing" type="number" className="h-9 text-sm" placeholder="Enter Price"
                        value={listing.Pricing}
                        onChange={e => handleChange('Pricing', e.target.value)}
                    />
                </div>
                <div className="w-100">
                    <Label htmlFor="SKU" className="font-bold text-left">
                       SKU
                    </Label>
                    <Input id="SKU" type="text" className="h-9 text-sm" placeholder="Enter SKU"
                        value={listing.SKU}
                        onChange={e => handleChange('SKU', e.target.value)}
                    />
                </div>
                <div className="w-100">
                    <Label htmlFor="FulfillmentType" className="font-bold text-left">
                        Fulfillment Type
                    </Label>
                    <Input id="FulfillmentType" type="text" className="h-9 text-sm" placeholder="Enter Fulfillment Type"
                        value={listing.FulfillmentType}
                        onChange={e => handleChange('FulfillmentType', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChannelListing;