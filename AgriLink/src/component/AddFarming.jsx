import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddFarming = () => {
  const navigate = useNavigate();

  const [farming, setFarming] = useState({
    type: "",
    landNeeded: "",
    productsPlanned: [],
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFarming({ ...farming, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFarming({ ...farming, productsPlanned: [...farming.productsPlanned, value] });
    } else {
      setFarming({
        ...farming,
        productsPlanned: farming.productsPlanned.filter((p) => p !== value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Farming details submitted:", farming);
    alert("Farming details added successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🌾 Add Farming Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type of Farming */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type of Farming
            </label>
            <select
              name="type"
              value={farming.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select type</option>
              <option value="crops">Crops</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="mushroom">Mushroom Cultivation</option>
              <option value="beekeeping">Beekeeping</option>
              <option value="mixed">Mixed Farming</option>
            </select>
          </div>

          {/* Land Needed */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Land Needed (in acres)
            </label>
            <input
              type="number"
              name="landNeeded"
              value={farming.landNeeded}
              onChange={handleChange}
              placeholder="Enter land needed in acres"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Products Planned */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Products Planned
            </label>
            <div className="flex flex-wrap gap-4">
              {["Vegetables", "Fruits", "Mushroom", "Honey", "Other"].map((product) => (
                <label key={product} className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={product}
                    checked={farming.productsPlanned.includes(product)}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-green-600"
                  />
                  <span className="text-gray-700">{product}</span>
                </label>
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
              value={farming.description}
              onChange={handleChange}
              placeholder="Add any additional details about your farming plan..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 h-24"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors duration-200"
          >
            Submit Farming Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFarming;
