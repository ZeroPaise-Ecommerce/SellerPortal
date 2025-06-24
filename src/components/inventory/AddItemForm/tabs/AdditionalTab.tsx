import React from 'react';
import { Switch } from "@/components/ui/switch";

const AdditionalTab = ({
  countryOfOrigin,
  setCountryOfOrigin,
  countries,
  length,
  setlength,
  width,
  setWidth,
  height,
  setHeight,
  weight,
  setWeight,
  returnable,
  setReturnable,
  returnWindow,
  setReturnWindow,
  returnType,
  setReturnType,
  returnConditions,
  setReturnConditions,
  returnShipping,
  setReturnShipping,
  codAvailable,
  setCodAvailable,
  warrantyInfo,
  setWarrantyInfo,
  customAttributes,
  setCustomAttributes,
  returnSettings,
  setReturnSettings,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">Additional Settings</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="countryOrigin">Country of Origin *</label>
          <select
            id="countryOrigin"
            value={countryOfOrigin}
            onChange={(e) => setCountryOfOrigin(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="weight">Weight (grams) *</label>
          <input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label htmlFor="length">Length (cm)</label>
          <input
            id="length"
            type="number"
            value={length}
            onChange={(e) => setlength(e.target.value)}
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="width">Width (cm)</label>
          <input
            id="width"
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="height">Height (cm)</label>
          <input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-4 p-4 border rounded-lg">
        <h4 className="font-medium">Return Settings</h4>
        <div className="flex items-center justify-between">
          <div>
            <label htmlFor="returnable">Returnable</label>
            <p className="text-sm text-gray-500">Allow returns for this product</p>
          </div>
           <Switch 
              id="returnable" 
              checked={returnSettings.isReturnable}
              onCheckedChange={(checked) => setReturnSettings(prev => ({ ...prev, isReturnable: checked }))}
            />
        </div>
        
         {returnSettings.isReturnable && (
          <><div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="returnWindow">Return Window (Days)</label>
            <select
              id="returnWindow"
              value={returnWindow}
              onChange={(e) => setReturnWindow(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7">7 Days</option>
              <option value="10">10 Days</option>
              <option value="15">15 Days</option>
              <option value="30">30 Days</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="returnType">Return Type</label>
            <select
              id="returnType"
              value={returnType}
              onChange={(e) => setReturnType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="0">Refund Only</option>
              <option value="1">Replacement Only</option>
              <option value="2">Refund or Replacement</option>
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="returnConditions">Return Conditions</label>
          <textarea
            id="returnConditions"
            value={returnConditions}
            onChange={(e) => setReturnConditions(e.target.value)}
            placeholder="e.g., Only unused and unopened items accepted"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="returnShipping">Return Shipping Borne By</label>
          <select
            id="returnShipping"
            value={returnShipping}
            onChange={(e) => setReturnShipping(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="0">Customer</option>
            <option value="1">Seller</option>
            <option value="2">Platform</option>
          </select>
        </div>
        </>)}
        {!returnSettings.isReturnable && (
          <div className="space-y-2">
            <label htmlFor="nonReturnableReason">Reason for Non-Returnable</label>
            <textarea
              id="nonReturnableReason"
              placeholder="e.g., Hygiene reasons, perishable item"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label htmlFor="codAvailable">COD Available</label>
          <p className="text-sm text-gray-500">Cash on delivery</p>
        </div>
        <input type="checkbox" id="codAvailable"  checked={codAvailable}
            onChange={(e) => setCodAvailable(e.target.checked)} defaultChecked />
      </div>

      <div className="space-y-2">
        <label htmlFor="warrantyInfo">Warranty Information</label>
        <textarea
          id="warrantyInfo"
          value={warrantyInfo}
          onChange={(e) => setWarrantyInfo(e.target.value)}
          placeholder="Warranty details"
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="customAttributes">Custom Attributes</label>
        <input
          id="customAttributes"
          value={customAttributes}
          onChange={(e) => setCustomAttributes(e.target.value)}
          placeholder="e.g., Fabric Type: Cotton, Season: Summer"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default AdditionalTab; 