// components/AddFarmingModal.jsx
import React, { useState } from "react";

const AddFarming = ({ onClose, onAdd }) => {
  const [farming, setFarming] = useState({
    experience: "",
    type: "",
    description: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFarming({ ...farming, [name]: value });
  };

const handlePhotoChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setFarming({ ...farming, photo: file });
  }
};


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("type", farming.type);
    formData.append("experience", farming.experience);
    formData.append("description", farming.description);
    if (farming.photo) {
      // Here farming.photo should be a File object, NOT a URL string
      formData.append("photo", farming.photo);
    }

    const res = await fetch("http://127.0.0.1:8000/api/auth/farming/", {
      method: "POST",
      body: formData, // Notice no Content-Type header: browser sets it automatically for multipart/form-data
    });

    if (!res.ok) {
      const errorData = await res.json();
      alert("Failed to add farming details: " + JSON.stringify(errorData));
    } else {
      alert("Farming details added successfully!");
      if (onAdd) onAdd(); // call parent callback if passed
      if (onClose) onClose(); // close modal
    }
  } catch (err) {
    console.error("Submit error:", err);
    alert("Error submitting form, please try again.");
  }
};


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose} // click outside to close
      ></div> 

      {/* Modal Card */}
      <div className="relative bg-white shadow-xl rounded-xl p-6 w-full max-w-lg z-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Add Farming Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type */}
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
              <option value="" selected disabled>Select type</option>
              <option value="crops">Crops</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="mushroom">Mushroom Cultivation</option>
              <option value="beekeeping">Beekeeping</option>
              <option value="mixed">Mixed Farming</option>
            </select>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience (years)
            </label>
            <input
              type="number"
              name="experience"
              value={farming.experience}
              onChange={handleChange}
              placeholder="Enter experience"
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
              value={farming.description}
              onChange={handleChange}
              placeholder="Add any additional details..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 h-20"
              required
            />
          </div>

          {/* Photo */}
          <div>
            <label className="cursor-pointer flex flex-col items-center justify-center">
              {farming.photo ? (
                <img
                  src={farming.photo}
                  alt="Farming"
                  className="w-32 h-32 object-cover border border-gray-300 mb-2"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-400 mb-2">
                  Click to Upload
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
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

export default AddFarming;
