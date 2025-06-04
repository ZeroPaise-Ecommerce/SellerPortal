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
            <div className='flex text-lg font-bold'> <Plus className="h-6 w-4 mr-1" />  Add Product  </div>
            <span>Add your product inventory</span>
            <Stepper steps={addSegments} />
        </DashboardLayout>
    )
}

export default Addproducts;