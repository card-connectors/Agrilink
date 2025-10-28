// components/AddLandModal.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../ContextFiles/AllContext";

const AddLand = ({ onClose, onAdd }) => {
  const { userId } = useContext(AuthContext); // user email


  const [land, setLand] = useState({
    title: "",
    location: "",
    area: "",
    pricePerAcre: "",
    soilType: "",
    waterResources: [],
    suitableFor: [],
    description: "",
    photos: [],
  });

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLand({ ...land, [name]: value });
  };

  // handle checkbox (multi-select) changes
  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setLand((prev) => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter((v) => v !== value),
    }));
  };

  // handle image upload
  const handleFileChange = (e, idx) => {
    const file = e.target.files[0];
    if (!file) return;

    const newPhotos = [...land.photos];
    newPhotos[idx] = URL.createObjectURL(file);
    setLand({ ...land, photos: newPhotos });
  };

  // handle photo removal
  const handleRemovePhoto = (e, idx) => {
    e.stopPropagation();
    const newPhotos = land.photos.filter((_, i) => i !== idx);
    setLand({ ...land, photos: newPhotos });
  };

  // local submit handler (no backend)
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd && onAdd(land);
    onClose && onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
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
            <div className="grid grid-cols-2 gap-2 border rounded-lg p-4">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className="w-full h-32 bg-gray-100 flex items-center justify-center cursor-pointer relative rounded"
                  onClick={() => document.getElementById(`photoInput-${idx}`).click()}
                >
                  {land.photos[idx] ? (
                    <>
                      <img
                        src={land.photos[idx]}
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
                    <p className="text-gray-400 text-sm text-center">
                      Click to upload
                    </p>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    id={`photoInput-${idx}`}
                    className="hidden"
                    onChange={(e) => handleFileChange(e, idx)}
                  />
                </div>
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
