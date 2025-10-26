import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddLand = () => {
  const navigate = useNavigate();

  const [land, setLand] = useState({
    title: "",
    location: "",
    area: "",
    soilType: "",
    waterResources: [],
    suitableFor: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLand({ ...land, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setLand({ ...land, waterResources: [...land.waterResources, value] });
    } else {
      setLand({
        ...land,
        waterResources: land.waterResources.filter((r) => r !== value),
      });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://127.0.0.1:8000/api/auth/land/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(land),
    });
    if (!res.ok) {
      const err = await res.json();
      alert("Error: " + JSON.stringify(err));
    } else {
      alert("Land details added successfully!");
      navigate("/dashboard");
    }
  } catch (err) {
    alert("Error submitting land details!");
  }
};


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🏞️ Add Land Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Land Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Land Title
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
              {["Borewell", "Canal", "Open Well", "Tank"].map((resource) => (
                <label key={resource} className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={resource}
                    checked={land.waterResources.includes(resource)}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-green-600"
                  />
                  <span className="text-gray-700">{resource}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Suitable For */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Suitable For
            </label>
            <select
              name="suitableFor"
              value={land.suitableFor}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select option</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="mushroom">Mushroom</option>
              <option value="beekeeping">Bee Keeping</option>
              <option value="mixed">Mixed Farming</option>
            </select>
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
              placeholder="Add any additional details about your land..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 h-24"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors duration-200"
          >
            Submit Land Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLand;
