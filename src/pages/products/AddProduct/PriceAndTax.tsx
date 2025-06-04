import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { saveStepDataLocal, selectStepData } from '@/features/product/addProductSlice';

type PriceState = {
    MRP: string;
    SellingPrice: string;
    Cost: string;
    TaxClass: string;
    HSNCode: string;
    GSTType: string;
};

const PriceAndTax = () => {
    const dispatch = useAppDispatch();
    const stepIndex = 2;
    const initial = useAppSelector(state => selectStepData(state, stepIndex));
    const [price, setPrice] = useState<PriceState>({
        MRP: '',
        SellingPrice: '',
        Cost: '',
        TaxClass: '5',
        HSNCode: '',
        GSTType: '',
        ...initial
    });

    useEffect(() => { setPrice(prev => ({ ...prev, ...initial })); }, [initial]);

    // Only call onDataChange if the value actually changed
    const handleChange = (field, value) => {
        const updated = { ...price, [field]: value };
        setPrice(updated);
        dispatch(saveStepDataLocal({ stepIndex, data: updated }));
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 space-y-4 text-left">
                <div className="w-100">
                    <Label htmlFor="MRP" className="font-bold text-left">
                       MRP
                    </Label>
                    <Input id="MRP" type="number" className="h-9 text-sm" placeholder="Enter MRP" maxLength={200}
                        value={price.MRP}
                        onChange={e => handleChange('MRP', e.target.value)}
                    />
                </div>
                <div className="w-100">
                    <Label htmlFor="SellingPrice" className="font-bold text-left">
                        Selling Price
                    </Label>
                    <Input id="SellingPrice" type="number" className="h-9 text-sm" placeholder="Enter Selling Price"
                        value={price.SellingPrice}
                        onChange={e => handleChange('SellingPrice', e.target.value)}
                    />
                </div>
                <div className="w-100">
                    <Label htmlFor="Cost" className="font-bold text-left">
                        Cost
                    </Label>
                    <Input id="Cost" type="number" className="h-9 text-sm" placeholder="Enter Cost"
                        value={price.Cost}
                        onChange={e => handleChange('Cost', e.target.value)}
                    />
                </div>
                <div className="w-100">
                    <Label htmlFor="reason" className="font-bold">
                        Tax Class
                    </Label>
                    <Select value={price.TaxClass} onValueChange={val => handleChange('TaxClass', val)}>
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
                    <Input id="HSNCode" type="text" className="h-9 text-sm" placeholder="Enter HSN Code"
                        value={price.HSNCode}
                        onChange={e => handleChange('HSNCode', e.target.value)}
                    />
                </div>
                <div className="w-100">
                    <Label htmlFor="GSTType" className="font-bold text-left">
                        GST Type
                    </Label>
                    <Input id="GSTType" type="text" className="h-9 text-sm" placeholder="Enter GST Type"
                        value={price.GSTType}
                        onChange={e => handleChange('GSTType', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default PriceAndTax;