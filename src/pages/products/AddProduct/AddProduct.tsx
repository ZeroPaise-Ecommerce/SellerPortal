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

    const [canProceed, setCanProceed] = useState({ 0: false });
    const [activeStep, setActiveStep] = useState(0);
    const [handleNextAttemptFns, setHandleNextAttemptFns] = useState({});

    const addSegments = [
        {
            label: 'Basic Information',
            content: <ProductInfo onValidationChange={(valid, handleNextAttempt) => {
                setCanProceed(prev => ({ ...prev, 0: valid }));
                setHandleNextAttemptFns(prev => ({ ...prev, 0: handleNextAttempt }));
            }} />
        },
        { label: 'Variance', content: <ProductVariant /> },
        { label: 'Pricing and Taxing', content: <PriceAndTax /> },
        { label: 'Warehousing', content: <AddWarehouseInfo /> },
        { label: 'Listing', content: <ChannelListing /> },
        { label: 'Media', content: <Media /> },
        { label: 'SEO', content: <SEOTags /> },
        { label: 'Additional Settings', content: <AdditionSettings /> },
    ];

    const handleNext = () => {
        if (activeStep === 0 && !canProceed[0]) {
            if (handleNextAttemptFns[0]) handleNextAttemptFns[0]();
            return;
        }
        setActiveStep((prev) => Math.min(prev + 1, addSegments.length - 1));
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
            />
        </DashboardLayout>
    );
};

export default Addproducts;