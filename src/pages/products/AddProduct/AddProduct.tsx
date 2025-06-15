import useAppDispatch from '@/hooks/useAppDispatch';
import { resetAddProduct } from '@/features/product/addProductSlice';
import React, { useEffect, useState } from 'react';
import ProductInfo from './ProductInfo';
import Stepper from '@/components/ui/stepper';
import ProductVariant from './ProductVariant';
import { Plus } from 'lucide-react';
import PriceAndTax from './PriceAndTax';
import AddWarehouseInfo from './AddWarehouseInfo';
import ChannelListing from './ChannelListing';
import Media from './Media';
import SEOTags from './SEOTags';
import AdditionSettings from './AdditionSettings';
import DashboardLayout from '@/components/layout/DashboardLayout';

const Addproducts = () => {
    const dispatch = useAppDispatch();
    // Optionally clear step data on mount
    useEffect(() => { dispatch(resetAddProduct()); }, [dispatch]);

    const [canProceed, setCanProceed] = useState(Object.fromEntries(addSegments.map((_, i) => [i, false])));
    const [activeStep, setActiveStep] = useState(0);
    const [handleNextAttemptFns, setHandleNextAttemptFns] = useState({});
    const [loading, setLoading] = useState(false);

    const addSegments = [
        {
            label: 'Basic Information',
            content: <ProductInfo onValidationChange={(valid, handleNextAttempt) => {
                setCanProceed(prev => ({ ...prev, 0: valid }));
                setHandleNextAttemptFns(prev => ({ ...prev, 0: handleNextAttempt }));
            }} />
        },
        {
            label: 'Variance',
            content: <ProductVariant onValidationChange={(valid, handleNextAttempt) => {
                setCanProceed(prev => ({ ...prev, 1: valid }));
                setHandleNextAttemptFns(prev => ({ ...prev, 1: handleNextAttempt }));
            }} />
        },
        {
            label: 'Pricing and Taxing',
            content: <PriceAndTax onValidationChange={(valid, handleNextAttempt) => {
                setCanProceed(prev => ({ ...prev, 2: valid }));
                setHandleNextAttemptFns(prev => ({ ...prev, 2: handleNextAttempt }));
            }} />
        },
        {
            label: 'Warehousing',
            content: <AddWarehouseInfo onValidationChange={(valid, handleNextAttempt) => {
                setCanProceed(prev => ({ ...prev, 3: valid }));
                setHandleNextAttemptFns(prev => ({ ...prev, 3: handleNextAttempt }));
            }} />
        },
        {
            label: 'Listing',
            content: <ChannelListing onValidationChange={(valid, handleNextAttempt) => {
                setCanProceed(prev => ({ ...prev, 4: valid }));
                setHandleNextAttemptFns(prev => ({ ...prev, 4: handleNextAttempt }));
            }} />
        },
        {
            label: 'Media',
            content: <Media onValidationChange={(valid, handleNextAttempt) => {
                setCanProceed(prev => ({ ...prev, 5: valid }));
                setHandleNextAttemptFns(prev => ({ ...prev, 5: handleNextAttempt }));
            }} />
        },
        {
            label: 'SEO',
            content: <SEOTags onValidationChange={(valid, handleNextAttempt) => {
                setCanProceed(prev => ({ ...prev, 6: valid }));
                setHandleNextAttemptFns(prev => ({ ...prev, 6: handleNextAttempt }));
            }} />
        },
        {
            label: 'Additional Settings',
            content: <AdditionSettings onValidationChange={(valid, handleNextAttempt) => {
                setCanProceed(prev => ({ ...prev, 7: valid }));
                setHandleNextAttemptFns(prev => ({ ...prev, 7: handleNextAttempt }));
            }} />
        },
    ];

    const handleNext = () => {
        if (!canProceed[activeStep]) {
            if (handleNextAttemptFns[activeStep]) {
                handleNextAttemptFns[activeStep]();
            }
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setActiveStep((prev) => Math.min(prev + 1, addSegments.length - 1));
            setLoading(false);
        }, 700);
    };
    const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

    return (
        <DashboardLayout>
            <div className="relative flex justify-between items-center px-8 pt-8 pb-2 bg-white rounded-t-2xl shadow-sm">
                <div className="flex flex-col items-start">
                    <h2 className="text-2xl font-bold text-gray-800">Add Product</h2>
                    <p className="text-sm text-gray-600 mt-1">Add your product inventory</p>
                </div>
            </div>
            <Stepper
                steps={addSegments}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                handleNext={handleNext}
                handleBack={handleBack}
                loading={loading}
            />
        </DashboardLayout>
    );
};

export default Addproducts;