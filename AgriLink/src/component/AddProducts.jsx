// components/AddProductsModal.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../ContextFiles/AllContext";

const AddProducts = ({ onClose, onAdd }) => {
  const { userId } = useContext(AuthContext); // user email

  const [product, setProduct] = useState({
    name: "",
    category: "",
    minQuantity: "",
    price: "",
    otherName: "",
    description: "",
  });

  const [photos, setPhotos] = useState([]);
  const productCategories = ["Vegetables", "Fruits", "Mushroom", "Honey", "Other"];

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle category
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (value === "Other") {
      setProduct({ ...product, category: checked ? "Other" : "" });
    } else {
      setProduct({ ...product, category: value });
    }
  };

  // Handle photo uploads (frontend-only)
  const handleFileChange = (e, idx) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    const newPhotos = [...photos];
    newPhotos[idx] = previewUrl;
    setPhotos(newPhotos);
  };

  const handleRemovePhoto = (e, idx) => {
    e.stopPropagation();
    const updated = photos.filter((_, i) => i !== idx);
    setPhotos(updated);
  };

  // Local-only submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let finalProduct = { ...product };
    if (product.category === "Other") {
      finalProduct.category = product.otherName || "Other";
    }
    onAdd && onAdd(finalProduct);
    onClose && onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      {/* Modal Card */}
      <div className="relative bg-white shadow-xl rounded-xl p-6 w-full max-w-2xl mx-auto overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Product Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Category
            </label>
            <div className="flex flex-wrap gap-4">
              {productCategories.map((cat) => (
                <label key={cat} className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={product.category === cat}
                    onChange={handleCategoryChange}
                    className="h-4 w-4 text-green-600"
                  />
                  <span className="text-gray-700">{cat}</span>
                </label>
              ))}
            </div>

            {product.category === "Other" && (
              <input
                type="text"
                name="otherName"
                value={product.otherName}
                onChange={handleChange}
                placeholder="Enter other product name"
                className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                required
              />
            )}
          </div>

          {/* Minimum Bulk Purchase */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Bulk Purchase (kg/L)
            </label>
            <input
              type="number"
              name="minQuantity"
              value={product.minQuantity}
              onChange={handleChange}
              placeholder="Enter minimum bulk purchase in kg/L"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
              min={1}
              required
            />
          </div>

          {/* Price per kg */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price per unit (₹)
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter price per kg/L"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
              min={1}
              required
            />
          </div>

          {/* Upload Photos (Frontend Only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Photos (Max 4)
            </label>
            <div className="grid grid-cols-2 gap-2 border rounded-lg p-4">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className="w-full h-32 bg-gray-100 flex items-center justify-center cursor-pointer relative rounded"
                  onClick={() =>
                    document.getElementById(`photoInput-${idx}`).click()
                  }
                >
                  {photos[idx] ? (
                    <>
                      <img
                        src={photos[idx]}
                        alt={`uploaded-${idx}`}
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
                      {photos.length < 4
                        ? "Click to upload"
                        : "Maximum photos uploaded"}
                    </p>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    id={`photoInput-${idx}`}
                    className="hidden"
                    onChange={(e) => handleFileChange(e, idx)}
                    disabled={photos.length >= 4 && !photos[idx]}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Add any additional details..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 h-24"
            />
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
