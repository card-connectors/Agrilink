import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../ContextFiles/AllContext";

const AddLand = ({ onClose, onAdd }) => {
  const { userId } = useContext(AuthContext); // stores the userId

// keep your land text fields as before
const [land, setLand] = useState({
  title: "",
  location: "",
  area: "",
  pricePerAcre: "",
  soilType: "",
  waterResources: [],
  suitableFor: [],
  description: "",
});

// NEW: per-slot file storage (4 slots)
const MAX_PHOTOS = 4;
const [photoFiles, setPhotoFiles] = useState(Array(MAX_PHOTOS).fill(null));      // Array<File|null>
const [photoPreviews, setPhotoPreviews] = useState(Array(MAX_PHOTOS).fill(null)); // Array<string|null>
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLand({ ...land, [name]: value });
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setLand((prev) => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter((v) => v !== value),
    }));
  };


  useEffect(() => {
  // initialize with 4 slots if empty (optional)
  if (photoFiles.length === 0) {
    setPhotoFiles([null, null, null, null]);
    setPhotoPreviews([null, null, null, null]);
  }
}, []);

// called like onChange={(e) => handleFileChange(e, idx)}
const handleFileChange = (e, idx) => {
  const files = e?.target?.files;
  if (!files || files.length === 0) return; // prevents your TypeError

  const file = files[0];

  // update file slot
  setPhotoFiles(prev => {
    const next = prev ? [...prev] : Array(MAX_PHOTOS).fill(null);
    next[idx] = file;
    return next;
  });

  // update preview slot (revoke old URL to avoid leaks)
  setPhotoPreviews(prev => {
    const next = prev ? [...prev] : Array(MAX_PHOTOS).fill(null);
    if (next[idx]) URL.revokeObjectURL(next[idx]);
    next[idx] = URL.createObjectURL(file);
    return next;
  });
};

const handleRemovePhoto = (e, idx) => {
  e.stopPropagation();
  setPhotoFiles(prev => {
    const next = prev ? [...prev] : Array(MAX_PHOTOS).fill(null);
    next[idx] = null;
    return next;
  });
  setPhotoPreviews(prev => {
    const next = prev ? [...prev] : Array(MAX_PHOTOS).fill(null);
    if (next[idx]) {
      URL.revokeObjectURL(next[idx]);
      next[idx] = null;
    }
    return next;
  });
};


const handleSubmit = async (e) => {
  e.preventDefault();

  // basic validation
  const selectedFiles = photoFiles.filter(Boolean);
  if (selectedFiles.length === 0) {
    alert("Please upload at least one photo.");
    return;
  }

  const formData = new FormData();

  // append land text fields
  formData.append('title', land.title);
  formData.append('location', land.location);
  formData.append('area', land.area);
  formData.append('pricePerAcre', land.pricePerAcre);
  formData.append('soilType', land.soilType);
  formData.append('description', land.description);
  formData.append('user_id', userId);

  // arrays: append each item (backend can read getlist or JSONField)
  land.waterResources.forEach(item => formData.append('waterResources[]', item));
  land.suitableFor.forEach(item => formData.append('suitableFor[]', item));

  // append files (key 'photos' - backend uses getlist('photos'))
  selectedFiles.forEach(f => formData.append('photos', f));
  const token = '';
  const res = await fetch("http://localhost:8000/api/add-land/", {
      method: "POST",
      headers: {
        'Authorization': `Token ${token}`
      },
      body: formData,
});

  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = { raw: text }; }

  if (!res.ok) {
    console.error("Upload failed:", data);
    alert("Failed to add land: " + (data.error || JSON.stringify(data)));
    return;
  }

  // success: handle response
  onAdd && onAdd(data);
  onClose && onClose();
};


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      <div className="relative bg-white shadow-xl rounded-xl p-6 w-full max-w-2xl z-10 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Land Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Land Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Land Name
            </label>
            <input
              type="text"
              name="title"
              value={land.title}
              onChange={handleChange}
              placeholder="e.g., 5-acre fertile land near Coimbatore"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={land.location}
              onChange={handleChange}
              placeholder="City / Village / District"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Land Area (in acres)
            </label>
            <input
              type="number"
              name="area"
              value={land.area}
              onChange={handleChange}
              placeholder="Enter area in acres"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Price per Acre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price per Acre (₹)
            </label>
            <input
              type="number"
              name="pricePerAcre"
              value={land.pricePerAcre}
              onChange={handleChange}
              placeholder="Enter price per acre"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Soil Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Soil Type
            </label>
            <select
              name="soilType"
              value={land.soilType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select soil type</option>
              <option value="alluvial">Alluvial</option>
              <option value="black">Black</option>
              <option value="red">Red</option>
              <option value="sandy">Sandy</option>
              <option value="clay">Clay</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>

          {/* Water Resources */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Water Resources Available
            </label>
            <div className="flex flex-wrap gap-4">
              {["Borewell", "Canal", "Open Well", "Tank"].map((res) => (
                <label key={res} className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={res}
                    checked={land.waterResources.includes(res)}
                    onChange={(e) => handleCheckboxChange(e, "waterResources")}
                    className="h-4 w-4 text-green-600"
                  />
                  <span className="text-gray-700">{res}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Suitable For */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Suitable For
            </label>
            <div className="flex flex-wrap gap-4">
              {["Vegetables", "Fruits", "Mushroom", "Bee Keeping", "Mixed Farming"].map(
                (opt) => (
                  <label key={opt} className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={opt}
                      checked={land.suitableFor.includes(opt)}
                      onChange={(e) => handleCheckboxChange(e, "suitableFor")}
                      className="h-4 w-4 text-green-600"
                    />
                    <span className="text-gray-700">{opt}</span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={land.description}
              onChange={handleChange}
              placeholder="Add additional details about your land..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 h-24"
              required
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Photos (Max 4)
            </label>
            <div className="grid grid-cols-4 gap-3">
  {Array.from({ length: MAX_PHOTOS }).map((_, idx) => (
    <label
      key={idx}
      className="w-28 h-28 bg-gray-100 rounded overflow-hidden relative cursor-pointer flex items-center justify-center"
    >
      {photoPreviews[idx] ? (
        <>
          <img
            src={photoPreviews[idx]}
            alt={`land-${idx}`}
            className="w-full h-full object-cover rounded"
          />
          <button
            type="button"
            onClick={(e) => handleRemovePhoto(e, idx)}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
          >
            &times;
          </button>
        </>
      ) : (
        <p className="text-gray-400 text-sm text-center">Click to upload</p>
      )}

      {/* per-slot single file input */}
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={(e) => handleFileChange(e, idx)}
      />
    </label>
  ))}
</div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            >
              Add Land
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLand;
