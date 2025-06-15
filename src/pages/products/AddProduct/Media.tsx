import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { saveStepDataLocal, selectStepData } from '@/features/product/addProductSlice';

const Media = () => {
    const dispatch = useAppDispatch();
    const stepIndex = 5;
    const initial = useAppSelector(state => selectStepData(state, stepIndex));
    const MAX_IMAGES = 8;
    const [media, setMedia] = useState({
        VideoUploadLink: '',
        ...initial
    });
    const [images, setImages] = useState<(string | ArrayBuffer | null)[]>(initial.images || []);
    const [dragActive, setDragActive] = useState(false);

    useEffect(() => {
        setMedia(prev => ({ ...prev, ...initial }));
        setImages(initial.images || []);
    }, [initial]);

    // Only call onDataChange if the value actually changed
    const handleChange = (field, value) => {
        const updated = { ...media, [field]: value };
        setMedia(updated);
        dispatch(saveStepDataLocal({ stepIndex, data: { ...updated, images } }));
    };

    // Update Redux when images change
    useEffect(() => {
        dispatch(saveStepDataLocal({ stepIndex, data: { ...media, images } }));
    }, [images]);

    // Handle file input change
    const handleFiles = (files: FileList | null) => {
        if (!files) return;
        const fileArr = Array.from(files).slice(0, MAX_IMAGES - images.length);
        fileArr.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImages(prev => prev.length < MAX_IMAGES ? [...prev, e.target?.result] : prev);
            };
            reader.readAsDataURL(file);
        });
    };

    // Drag and drop handlers
    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
        if (e.type === 'dragleave') setDragActive(false);
    };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    };
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 space-y-4 text-left">
                {/* Photos & Videos Section */}
                <div>
                    <div className="flex flex-row gap-6 items-start mb-4">
                        {/* Drag and Drop Upload Area */}
                        <div
                            className={`flex-1 min-w-[220px] bg-[#f8f8fc] rounded-xl flex flex-col items-center justify-center py-8 border-dashed border-2 border-[#e5e7eb] transition ${dragActive ? 'ring-2 ring-[#7b7bcb] bg-[#ececff]' : ''}`}
                            style={{border: 'none'}} 
                            onDragEnter={handleDrag}
                            onDragOver={handleDrag}
                            onDragLeave={handleDrag}
                            onDrop={handleDrop}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={e => handleFiles(e.target.files)}
                                disabled={images.length >= MAX_IMAGES}
                            />
                            <div className="flex flex-col items-center">
                                <div className="bg-[#ececff] rounded-full p-4 mb-2">
                                    {/* Image icon (use a placeholder SVG) */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#7b7bcb]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="5" width="18" height="14" rx="2" fill="#ececff"/><path d="M8 13l2.5 3.5L15 11l4 6H5l3-4z" fill="#bcbcf7"/></svg>
                                </div>
                                <div className="text-gray-400 text-base mb-3">Drag and drop image here, or click add image</div>
                                <button type="button" onClick={openFileDialog} disabled={images.length >= MAX_IMAGES} className="bg-[#ececff] text-[#7b7bcb] font-semibold rounded-lg px-6 py-2 text-base shadow-none hover:bg-[#e0e0fa] focus:outline-none disabled:opacity-50">Add Image</button>
                            </div>
                        </div>
                        {/* Product Images Row */}
                        <div className="flex flex-col flex-[1.2] min-w-[220px]">
                            <div className="mb-1 text-[16px] font-normal text-gray-700">Product Images</div>
                            <div className="flex flex-col gap-2 mb-2">
                                {/* Show previews or placeholders in two rows of 4 */}
                                {images.length === 0 ? (
                                    <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center">
                                        {/* Single small placeholder */}
                                    </div>
                                ) : (
                                    [0, 1].map(row => (
                                        <div key={row} className="flex gap-3">
                                            {Array.from({ length: 4 }).map((_, col) => {
                                                const idx = row * 4 + col;
                                                if (images[idx]) {
                                                  return (
                                                    <div key={idx} className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden relative group">
                                                      <img src={images[idx] as string} alt="preview" className="object-cover w-full h-full" />
                                                      <button type="button" onClick={() => setImages(imgs => imgs.filter((_, i) => i !== idx))} className="absolute top-0 right-0 bg-white bg-opacity-80 rounded-full p-0.5 m-1 text-xs text-gray-500 hover:text-red-500">&times;</button>
                                                    </div>
                                                  );
                                                } else if (idx === images.length && images.length < MAX_IMAGES) {
                                                  // Place add button at the next available slot
                                                  return (
                                                    <button key="add-btn" type="button" onClick={openFileDialog} className="w-20 h-20 rounded-lg border-dashed border-2 border-[#e5e7eb] flex items-center justify-center text-2xl text-gray-400 hover:bg-gray-100 focus:outline-none">
                                                      +
                                                    </button>
                                                  );
                                                } else if (idx < MAX_IMAGES) {
                                                  // Fill empty slots to keep grid shape
                                                  return <div key={idx} className="w-20 h-20" />;
                                                }
                                                return null;
                                            })}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Video Link Input */}
                <div className="w-100">
                    <Label htmlFor="VideoUploadLink" className="font-bold text-left">
                       Video Link
                    </Label>
                    <Input id="VideoUploadLink" type="text" className="h-9 text-sm" placeholder="Enter Video Link"
                        value={media.VideoUploadLink}
                        onChange={e => handleChange('VideoUploadLink', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Media;