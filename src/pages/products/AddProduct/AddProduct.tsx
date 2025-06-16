import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProductInfo from './ProductInfo';
import Stepper from '@/components/ui/stepper';
import ProductVariant from './ProductVariant';
import { Plus } from 'lucide-react';
import { addProductRequest } from '../../../store/Inventory/product/actions'; 
import { CallEffect, PutEffect } from 'redux-saga/effects';
import { useDispatch, useSelector  } from "react-redux";

  interface Product {
  basicInfo: {
    id: string;
    productName: string;
    productSKU: string;
    productType: string;
    category: string;
    brand: string;
    description: string;
    shortDescription: string;
    createdDate: string;
    updatedDate: string;
    createdBy: string;
    updatedBy: string;
    operation: number;
  };
};

const Addproducts = () => {  
    const dispatch = useDispatch();    
    const [product, setProduct] = useState<Product>({
    basicInfo: {
        id: '',
        productName: '',
        productSKU: '',
        productType: '',
        category: '',
        brand: '',
        description: '',
        shortDescription: '',
        createdDate: '',
        updatedDate: '',
        createdBy: '',
        updatedBy: '',
        operation: 0
    },
    });  

    const handleAddBasicInfo = () => {
    return {
        type: 'ADD_PRODUCT_REQUEST',
        payload: product.basicInfo,
    };
    };

    // const handleAddBasicInfo = () => {
    //       dispatch(addProductRequest(product.basicInfo));
    // };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            basicInfo: {
            ...prev.basicInfo,
            [name]: value,
            },
        }));
    };

    const handleSelectChange = (field: keyof typeof product.basicInfo, value: string) => {
    setProduct((prev) => ({
        ...prev,
        basicInfo: {
        ...prev.basicInfo,
        [field]: value,
        },
    }));
    };

    const addSegments = [
        { label: 'Basic Information', 
            content: <ProductInfo BasicInfo={product.basicInfo} handleChange={handleChange} handleSelectChange={handleSelectChange}/> },
        { label: 'Variance', content: <ProductVariant /> },
        { label: 'Pricing and Taxing', 
            content: <ProductInfo BasicInfo={product.basicInfo} handleChange={handleChange} handleSelectChange={handleSelectChange}/> },
        { label: 'Warehousing', content: <ProductInfo BasicInfo={product.basicInfo} handleChange={handleChange} handleSelectChange={handleSelectChange}/> },
        { label: 'Listing', content: <ProductInfo BasicInfo={product.basicInfo} handleChange={handleChange} handleSelectChange={handleSelectChange}/> },
        { label: 'Media', content: <ProductInfo BasicInfo={product.basicInfo} handleChange={handleChange} handleSelectChange={handleSelectChange}/> },
        { label: 'SEO', content: <ProductInfo BasicInfo={product.basicInfo} handleChange={handleChange} handleSelectChange={handleSelectChange}/> }
    ]   

    return (
        <DashboardLayout>
            <div className='flex text-lg font-bold'> <Plus className="h-6 w-4 mr-1" />  Add Product  </div>
            <span>Add your product inventory</span>
            <Stepper steps={addSegments} handleOnClick={handleAddBasicInfo} />
        </DashboardLayout>
    )
}

export default Addproducts;