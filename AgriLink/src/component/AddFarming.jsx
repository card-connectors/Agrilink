import React, { useContext, useState } from "react";
import { AuthContext } from "../ContextFiles/AllContext";

const AddFarming = ({ onClose }) => {
  const { userId, token } = useContext(AuthContext || {}); // token optional

  const [farming, setFarming] = useState({
    experience: "",
    type: "",
    description: "",
    photo: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFarming((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFarming((prev) => ({ ...prev, photo: file }));
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!farming.type || !farming.experience || !farming.description) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("type", farming.type);
      formData.append("experience", farming.experience);
      formData.append("description", farming.description);
      if (farming.photo) formData.append("photo", farming.photo);
      // include user_id if available (optional)
      if (userId) formData.append("user_id", userId);

      const headers = {};
      if (token) headers["Authorization"] = `Bearer ${token}`; // adjust if you use Token auth

      // Use absolute backend URL if your React dev server is separate
      const res = await fetch("http://127.0.0.1:8000/api/farming/", {
        method: "POST",
        body: formData,
        headers, // DO NOT set Content-Type (browser will set multipart/form-data boundary)
        credentials: "include", // include cookies for session auth
      });

      const text = await res.text().catch(() => "");
      let data;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = text;
      }

      if (!res.ok) {
        // show server errors
        const serverMsg =
          (data && (data.error || data.detail || data.message)) ||
          (data && typeof data === "object" ? JSON.stringify(data) : data) ||
          `Server returned ${res.status}`;
        setError(serverMsg);
        setLoading(false);
        return;
      }

      // Success — optionally you can use returned data to update UI
      onClose();
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error — please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* Modal Card */}
      <div className="relative bg-white shadow-xl rounded-xl p-6 w-full max-w-lg z-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Add Farming Details</h2>

        {error && <div className="text-red-600 text-center text-sm mb-3">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type of Farming</label>
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

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={farming.description}
              onChange={handleChange}
              placeholder="Add any additional details..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 h-20"
              required
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="cursor-pointer flex flex-col items-center justify-center">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Farming preview"
                  className="w-32 h-32 object-cover border border-gray-300 mb-2 rounded"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-400 mb-2 rounded">
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
              disabled={loading}
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFarming;
