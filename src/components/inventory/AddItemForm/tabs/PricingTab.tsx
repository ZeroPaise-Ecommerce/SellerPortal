import React from 'react';

const PricingTab = ({ mrp, setMrp, sellingPrice, setSellingPrice, costPrice, setCostPrice,taxClass, setTaxClass, hsnCode, setHsnCode, gstType, setGstType, errors }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">Pricing & Tax</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="space-y-2">
          <label htmlFor="mrp">MRP *</label>
          <input
            id="mrp"
            type="number"
            placeholder="0.00"
            value={mrp}
            onChange={(e) => setMrp(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors['mrp'] ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors['mrp'] && <p className="text-sm text-red-500">{errors['mrp']}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="sellingPrice">Selling Price *</label>
          <input
            id="sellingPrice"
            type="number"
            placeholder="0.00"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors['sellingPrice'] ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors['sellingPrice'] && <p className="text-sm text-red-500">{errors['sellingPrice']}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="costPrice">Cost Price</label>
          <input
            id="costPrice"
            type="number"
            placeholder="0.00"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors['costPrice'] ? 'border-red-500' : 'border-gray-300'}`}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label htmlFor="taxClass">Tax Class</label>
          <select
            id="taxClass"
            value={taxClass}
            onChange={(e) => setTaxClass(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors['taxClass'] ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select Tax Class</option>
            <option value="5">5% GST</option>
            <option value="12">12% GST</option>
            <option value="18">18% GST</option>
            <option value="28">28% GST</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="hsnCode">HSN Code</label>
          <input
            id="hsnCode"
            value={hsnCode}
            onChange={(e) => setHsnCode(e.target.value)}
            placeholder="Enter HSN code"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="gstType">GST Type</label>
          <select
            id="gstType"
            value={gstType}
            onChange={(e) => setGstType(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors['gstType'] ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="inclusive">Inclusive</option>
            <option value="exclusive">Exclusive</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PricingTab; 