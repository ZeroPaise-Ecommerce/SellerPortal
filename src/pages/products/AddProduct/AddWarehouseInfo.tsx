import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { saveStepDataLocal, selectStepData } from '@/features/product/addProductSlice';

const AddWarehouseInfo = () => {
    const dispatch = useAppDispatch();
    const stepIndex = 3;
    const initial = useAppSelector(state => selectStepData(state, stepIndex));
    const [warehouse, setWarehouse] = useState({
        BatchNumber: '',
        ExpiryDate: '',
        ...initial
    });

    useEffect(() => { setWarehouse(prev => ({ ...prev, ...initial })); }, [initial]);

    // Only call onDataChange if the value actually changed
    const handleChange = (field, value) => {
        const updated = { ...warehouse, [field]: value };
        setWarehouse(updated);
        dispatch(saveStepDataLocal({ stepIndex, data: updated }));
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 space-y-4 text-left">
                <div className="w-100">
                    <Label htmlFor="BatchNumber" className="font-bold text-left">
                        Batch Number
                    </Label>
                    <Input id="BatchNumber" type="text" className="h-9 text-sm" placeholder="Enter Batch Number"
                        value={warehouse.BatchNumber}
                        onChange={e => handleChange('BatchNumber', e.target.value)}
                    />
                </div>
                <div className="w-100">
                    <Label htmlFor="ExpiryDate" className="font-bold text-left">
                        Expiry Date and Time
                    </Label>
                    {/* <Calendar /> */}
                    <Input id="ExpiryDate" type="text" className="h-9 text-sm" placeholder="Enter Expiry Date"
                        value={warehouse.ExpiryDate}
                        onChange={e => handleChange('ExpiryDate', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddWarehouseInfo;