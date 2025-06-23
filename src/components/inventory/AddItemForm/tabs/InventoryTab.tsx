import React from 'react';

const InventoryTab = ({ stock, setStock, warehouse, setWarehouse, reOrderPoint, setReOrderPoint, 
  incomingStock, setIncomingStock, batchNumber, setBatchNumber,expiryDate, setExpiryDate, errors }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">Inventory</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="stockQuantity">Stock Quantity *</label>
          <input
            id="stockQuantity"
            type="number"
            placeholder="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors['stockQuantity'] ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors['stockQuantity'] && <p className="text-sm text-red-500">{errors['stockQuantity']}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="reorderPoint">Reorder Point</label>
          <input
            id="reorderPoint"
            type="number"
            value={reOrderPoint}
            onChange={(e) => setReOrderPoint(e.target.value)}
            placeholder="10"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="warehouse">Warehouse Location</label>
          <select
            id="warehouse"
            value={warehouse}
            onChange={(e) => setWarehouse(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors['warehouse'] ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="main">Main Warehouse</option>
            <option value="store1">Retail Store 1</option>
            <option value="store2">Retail Store 2</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="incomingStock">Incoming Stock</label>
          <input
            id="incomingStock"
            type="number"
            value={incomingStock}
            onChange={(e) => setIncomingStock(e.target.value)}
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="batchNumber">Batch Number</label>
          <input
            id="batchNumber"
            placeholder="Optional"
            value={batchNumber}
            onChange={(e) => setBatchNumber(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            id="expiryDate"
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          Stock quantities are managed at the variant level. Configure stock for each variant in the Variants step.
        </p>
      </div>
    </div>
  );
};

export default InventoryTab; 