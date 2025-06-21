import React from 'react';

const ChannelsTab = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">Channels & Listings</h2>
      <div className="space-y-2">
        <label>Select Channel</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="website">Own Website</option>
          <option value="amazon">Amazon</option>
          <option value="flipkart">Flipkart</option>
          <option value="meesho">Meesho</option>
          <option value="myntra">Myntra</option>
        </select>
      </div>

      <div className="space-y-4 p-4 border rounded-lg">
        <h4 className="font-medium">Website Configuration</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="websiteTitle">Website Title</label>
            <input
              id="websiteTitle"
              placeholder="Product title for website"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="websiteSku">Website SKU</label>
            <input
              id="websiteSku"
              placeholder="SKU for website"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="websiteShortDesc">Short Description</label>
          <textarea
            id="websiteShortDesc"
            placeholder="Short description for website"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="websiteDesc">Description</label>
          <textarea
            id="websiteDesc"
            placeholder="Detailed description for website"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="websiteSpecs">Specifications</label>
          <textarea
            id="websiteSpecs"
            placeholder="Product specifications"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ChannelsTab; 