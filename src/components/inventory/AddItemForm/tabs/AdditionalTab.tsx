import React from 'react';
import { Switch } from "@/components/ui/switch";

const AdditionalTab = ({
  countryOfOrigin,
  setCountryOfOrigin,
  countries,
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
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="width">Width (cm)</label>
          <input
            id="width"
            type="number"
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="height">Height (cm)</label>
          <input
            id="height"
            type="number"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="refund">Refund Only</option>
              <option value="replacement">Replacement Only</option>
              <option value="refund_or_replacement">Refund or Replacement</option>
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="returnConditions">Return Conditions</label>
          <textarea
            id="returnConditions"
            placeholder="e.g., Only unused and unopened items accepted"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="returnShipping">Return Shipping Borne By</label>
          <select
            id="returnShipping"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
            <option value="platform">Platform</option>
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
        <input type="checkbox" id="codAvailable" defaultChecked />
      </div>

      <div className="space-y-2">
        <label htmlFor="warrantyInfo">Warranty Information</label>
        <textarea
          id="warrantyInfo"
          placeholder="Warranty details"
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="customAttributes">Custom Attributes</label>
        <input
          id="customAttributes"
          placeholder="e.g., Fabric Type: Cotton, Season: Summer"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default AdditionalTab; 