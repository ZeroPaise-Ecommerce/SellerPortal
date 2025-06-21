import React from 'react';

const SeoTab = ({ metaTitle, setMetaTitle, metaDescription, setMetaDescription, tags, setTags }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">SEO & Tags</h2>
      <div className="space-y-2">
        <label htmlFor="metaTitle">Meta Title</label>
        <input
          id="metaTitle"
          placeholder="SEO-friendly title"
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="metaDescription">Meta Description</label>
        <textarea
          id="metaDescription"
          placeholder="SEO description for search results"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="searchTags">Search Tags / Keywords</label>
        <input
          id="searchTags"
          placeholder="Comma-separated tags for better searchability"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default SeoTab; 