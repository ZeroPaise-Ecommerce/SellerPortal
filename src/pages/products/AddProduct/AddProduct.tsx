import DashboardLayout from '@/components/layout/DashboardLayout';
import React from 'react';
import ProductInfo from './ProductInfo';
import Stepper from '@/components/ui/stepper';
import ProductVariant from './ProductVariant';
import { Plus } from 'lucide-react';

const Addproducts = () => {
    const addSegments = [
        { label: 'Basic Information', content: <ProductInfo /> },
        { label: 'Variance', content: <ProductVariant /> },
        { label: 'Pricing and Taxing', content: <ProductInfo /> },
        { label: 'Warehousing', content: <ProductInfo /> },
        { label: 'Listing', content: <ProductInfo /> },
        { label: 'Media', content: <ProductInfo /> },
        { label: 'SEO', content: <ProductInfo /> }
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