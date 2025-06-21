import React from 'react';

const VisibilityTab = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">Visibility Settings</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label htmlFor="onlineStore">Online Store Visibility</label>
            <p className="text-sm text-gray-500">Show product on your website</p>
          </div>
          <input type="checkbox" id="onlineStore" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label htmlFor="amazonVisible">Amazon Marketplace</label>
            <p className="text-sm text-gray-500">List on Amazon</p>
          </div>
          <input type="checkbox" id="amazonVisible" />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label htmlFor="flipkartVisible">Flipkart Marketplace</label>
            <p className="text-sm text-gray-500">List on Flipkart</p>
          </div>
          <input type="checkbox" id="flipkartVisible" />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label htmlFor="meeshoVisible">Meesho Marketplace</label>
            <p className="text-sm text-gray-500">List on Meesho</p>
          </div>
          <input type="checkbox" id="meeshoVisible" />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label htmlFor="myntraVisible">Myntra Marketplace</label>
            <p className="text-sm text-gray-500">List on Myntra</p>
          </div>
          <input type="checkbox" id="myntraVisible" />
        </div>
      </div>
    </div>
  );
};

export default VisibilityTab; 