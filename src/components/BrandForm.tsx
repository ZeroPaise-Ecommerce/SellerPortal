import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { saveBrandRequest } from '../store/Inventory/category/actions';

const BrandForm: React.FC = () => {
  const [brandName, setBrandName] = useState('');
  const dispatch = useDispatch();
  
  const { loading, error, stageCompleted } = useSelector((state: RootState) => state.category);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (brandName.trim()) {
      dispatch(saveBrandRequest({ brandName: brandName.trim() }));
      setBrandName('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Brand</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="brandName" className="block text-sm font-medium text-gray-700 mb-2">
            Brand Name
          </label>
          <input
            type="text"
            id="brandName"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter brand name"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading || !brandName.trim()}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save Brand'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {stageCompleted && !error && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Brand saved successfully!
        </div>
      )}
    </div>
  );
};

export default BrandForm;

