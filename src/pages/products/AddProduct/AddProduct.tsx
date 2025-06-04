import DashboardLayout from '@/components/layout/DashboardLayout';
import React from 'react';
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

const Addproducts = () => {
    const addSegments = [
        { label: 'Basic Information', content: <ProductInfo /> },
        { label: 'Variance', content: <ProductVariant /> },
        { label: 'Pricing and Taxing', content: <PriceAndTax /> },
        { label: 'Warehousing', content: <AddWarehouseInfo /> },
        { label: 'Listing', content: <ChannelListing /> },
        { label: 'Media', content: <Media /> },
        { label: 'SEO', content: <SEOTags /> },
        { label: 'Additional Settings', content: <AdditionSettings /> },
    ]

    return (
        <DashboardLayout>
             <div className="relative flex justify-between items-center px-8 pt-8 pb-2 bg-white rounded-t-2xl shadow-sm">
               <div className="flex flex-col items-start">
                    <h2 className="text-2xl font-bold text-gray-800">Add Product</h2>
                    <p className="text-sm text-gray-600 mt-1">Add your product inventory</p>
                </div>
             </div>
            
            <Stepper steps={addSegments} />
        </DashboardLayout>
    )
}

export default Addproducts;