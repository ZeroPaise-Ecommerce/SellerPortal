import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { saveStepDataLocal, selectStepData } from '@/features/product/addProductSlice';
import { useRequiredFields } from "@/hooks/useRequiredFields";

interface WarehouseState {
    BatchNumber: string;
    ExpiryDate: string;
}

const AddWarehouseInfo = ({ onValidationChange }) => {
    const dispatch = useAppDispatch();
    const stepIndex = 3; // Assuming this is for the fourth step
    const initial = useAppSelector(state => selectStepData(state, stepIndex));

    const allFields: WarehouseState = {
        BatchNumber: '',
        ExpiryDate: '',
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
    } = useRequiredFields(["BatchNumber", "ExpiryDate"], allFields);

    useEffect(() => { setFields(initial); }, [initial, setFields]);

    const handleChange = (field: keyof WarehouseState, value: string) => {
        baseHandleChange(field, value);
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
                    <Label htmlFor="BatchNumber" className="font-bold text-left">
                        Batch Number
                    </Label>
                    <Input
                        id="BatchNumber"
                        type="text"
                        className={`h-9 text-sm placeholder:text-gray-400 ${touched.BatchNumber && !String(fields.BatchNumber).trim() ? 'border border-red-500 ring-1 ring-red-400' : ''}`}
                        placeholder="Enter Batch Number"
                        value={fields.BatchNumber}
                        onChange={e => handleChange('BatchNumber', e.target.value)}
                        onBlur={() => handleBlur('BatchNumber')}
                    />
                    {touched.BatchNumber && !String(fields.BatchNumber).trim() && (
                        <span className="text-xs text-red-500">Batch Number is required</span>
                    )}
                </div>
                <div className="w-100">
                    <Label htmlFor="ExpiryDate" className="font-bold text-left">
                        Expiry Date
                    </Label>
                    {/* <Calendar /> */} {/* Assuming Calendar is not used or will be replaced by a simple text input for date */}
                    <Input
                        id="ExpiryDate"
                        type="text" // Consider using type="date" for better UX if applicable
                        className={`h-9 text-sm placeholder:text-gray-400 ${touched.ExpiryDate && !String(fields.ExpiryDate).trim() ? 'border border-red-500 ring-1 ring-red-400' : ''}`}
                        placeholder="Enter Expiry Date (e.g., YYYY-MM-DD)"
                        value={fields.ExpiryDate}
                        onChange={e => handleChange('ExpiryDate', e.target.value)}
                        onBlur={() => handleBlur('ExpiryDate')}
                    />
                    {touched.ExpiryDate && !String(fields.ExpiryDate).trim() && (
                        <span className="text-xs text-red-500">Expiry Date is required</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddWarehouseInfo;