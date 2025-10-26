import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    otherName: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (value === "Other") {
      setProduct({ ...product, category: checked ? "Other" : "" });
    } else {
      setProduct({ ...product, category: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // If "Other" is selected, use otherName as category
    const finalProduct = { ...product };
    if (product.category === "Other") {
      finalProduct.category = product.otherName || "Other";
    }
    console.log("Product submitted:", finalProduct);
    alert("Product added successfully!");
    navigate("/dashboard");
  };

  const productCategories = ["Vegetables", "Fruits", "Mushroom", "Honey", "Other"];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🛒 Add Product
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

            {/* Input for Other */}
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

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity (in units)
            </label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (per unit in ₹)
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter price per unit"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
              required
            />
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
              placeholder="Add any additional details about your product..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 h-24"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors duration-200"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
