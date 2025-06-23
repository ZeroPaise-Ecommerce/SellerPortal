import React from 'react';
import { Camera, Trash2 } from 'lucide-react';

const MediaTab = ({ mainImages, setMainImages, galleryImages, setGalleryImages, videoUploadLink, setVideoUploadLink }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">Media Upload</h2>
      <div className="space-y-2">
        <label>Main Product Images *</label>
        <div
        onDrop={e => {
          e.preventDefault();
          const files = Array.from(e.dataTransfer.files).filter(
          file => file.type.startsWith("image/")
          );
          if (files.length > 0) {
          setMainImages(prev => [...prev, ...files]);
          }
        }}
        onDragOver={e => e.preventDefault()}
        >
        <label
          htmlFor="mainImages"
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer block"
          style={{ cursor: "pointer" }}
        >
          <Camera className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
          Drop your images here or click to browse
          </p>
          <p className="text-xs text-gray-500">JPG, PNG, WebP up to 10MB</p>
          <input
          id="mainImages"
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={e => {
            const files = Array.from(e.target.files || []);
            setMainImages(prev => [...prev, ...files]);
          }}
          />
        </label>
        {mainImages.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-4">
          {mainImages.map((file: any, idx: number) => (
            <div key={idx} className="relative w-24 h-24">
            <img
              src={typeof file === "string" ? file : URL.createObjectURL(file)}
              alt={`preview-${idx}`}
              className="object-cover w-full h-full rounded"
            />
            <button
              type="button"
              className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
              onClick={() =>
              setMainImages(prev =>
                prev.filter((_: any, i: number) => i !== idx)
              )
              }
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
            </div>
          ))}
          </div>
        )}
        </div>
      </div>

      <div className="space-y-2">
        <label>Gallery Images</label>
        <div
        onDrop={e => {
          e.preventDefault();
          const files = Array.from(e.dataTransfer.files).filter(
          file => file.type.startsWith("image/")
          );
          if (files.length > 0) {
          setGalleryImages(prev => [...prev, ...files]);
          }
        }}
        onDragOver={e => e.preventDefault()}
        >
        <label
          htmlFor="galleryImages"
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer block"
          style={{ cursor: "pointer" }}
        >
          <Camera className="mx-auto h-8 w-8 text-gray-400" />
          <p className="mt-1 text-sm text-gray-600">Drop your images here or click to browse</p>
          <p className="text-xs text-gray-500">JPG, PNG, WebP up to 10MB</p>
          <input
          id="galleryImages"
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={e => {
            const files = Array.from(e.target.files || []);
            setGalleryImages(prev => [...prev, ...files]);
          }}
          />
        </label>
        {galleryImages.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-4">
          {galleryImages.map((file: any, idx: number) => (
            <div key={idx} className="relative w-20 h-20">
            <img
              src={typeof file === "string" ? file : URL.createObjectURL(file)}
              alt={`gallery-preview-${idx}`}
              className="object-cover w-full h-full rounded"
            />
            <button
              type="button"
              className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
              onClick={() =>
              setGalleryImages(prev =>
                prev.filter((_: any, i: number) => i !== idx)
              )
              }
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
            </div>
          ))}
          </div>
        )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="productVideo">Product Video (Optional)</label>
        <input
          id="productVideo"
          value={videoUploadLink}
          onChange={(e) => setVideoUploadLink(e.target.value)}
          placeholder="Video URL or upload"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default MediaTab; 