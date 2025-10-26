import React, { useState, useEffect } from "react";

const ManageDataSection = () => {
  const [lands, setLands] = useState([]);
  const [farming, setFarming] = useState([]);
  const [products, setProducts] = useState([]);

  const [editItem, setEditItem] = useState(null);
  const [editSection, setEditSection] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  // Sample data
  useEffect(() => {
    setLands([
      { id: 1, name: "Sunny Acres", size: "5 acres", location: "Kanyakumari" },
      { id: 2, name: "Green Fields", size: "3 acres", location: "Madurai" },
    ]);
    setFarming([
      { id: 1, type: "Vegetables", duration: "6 months", status: "Active" },
      { id: 2, type: "Beekeeping", duration: "1 year", status: "Planned" },
    ]);
    setProducts([
      { id: 1, name: "Organic Honey", quantity: "10 kg", price: "₹500/kg" },
      { id: 2, name: "Tomatoes", quantity: "50 kg", price: "₹30/kg" },
      { id: 3, name: "Mushrooms", quantity: "20 kg", price: "₹150/kg" },
    ]);
  }, []);

  // Delete item instantly
  const handleDelete = (section, id) => {
    if (section === "lands") setLands(lands.filter((item) => item.id !== id));
    if (section === "farming") setFarming(farming.filter((item) => item.id !== id));
    if (section === "products") setProducts(products.filter((item) => item.id !== id));
  };

  // Open modal for edit
  const handleEdit = (section, item) => {
    setEditSection(section);
    setEditItem(item);
    setFormData({ ...item });
    setModalOpen(true);
  };

  // Handle form changes in modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Save changes from modal
  const handleSave = () => {
    if (editSection === "lands") {
      setLands(lands.map((item) => (item.id === editItem.id ? formData : item)));
    }
    if (editSection === "farming") {
      setFarming(farming.map((item) => (item.id === editItem.id ? formData : item)));
    }
    if (editSection === "products") {
      setProducts(products.map((item) => (item.id === editItem.id ? formData : item)));
    }
    setModalOpen(false);
    setEditItem(null);
    setEditSection(null);
  };

  const sections = [
    { title: "My Lands", color: "indigo", data: lands, key: "lands" },
    { title: "My Farming", color: "teal", data: farming, key: "farming" },
    { title: "My Products", color: "orange", data: products, key: "products" },
  ];

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        📋 Manage Your Data
      </h2>

      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <div
            key={section.title}
            className="bg-white shadow-md rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow flex flex-col"
          >
            <h3 className={`text-lg font-semibold text-${section.color}-700 mb-3`}>
              {section.title}
            </h3>

            <div className="flex-1 mb-4 space-y-2 overflow-auto max-h-64">
              {section.data.length > 0 ? (
                section.data.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-2 bg-gray-50 flex justify-between items-center"
                  >
                    <div className="text-sm">
                      {section.key === "lands" && (
                        <p>
                          <strong>{item.name}</strong> - {item.size}, {item.location}
                        </p>
                      )}
                      {section.key === "farming" && (
                        <p>
                          <strong>{item.type}</strong> - {item.duration} ({item.status})
                        </p>
                      )}
                      {section.key === "products" && (
                        <p>
                          <strong>{item.name}</strong> - {item.quantity} @ {item.price}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(section.key, item)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(section.key, item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No entries yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
            <h3 className="text-xl font-semibold mb-4">Edit {editSection}</h3>
            
            <div className="space-y-3">
              {editSection === "lands" && (
                <>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Land Name"
                    className="w-full border px-3 py-2 rounded"
                  />
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    placeholder="Size"
                    className="w-full border px-3 py-2 rounded"
                  />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="w-full border px-3 py-2 rounded"
                  />
                </>
              )}

              {editSection === "farming" && (
                <>
                  <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    placeholder="Farming Type"
                    className="w-full border px-3 py-2 rounded"
                  />
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="Duration"
                    className="w-full border px-3 py-2 rounded"
                  />
                  <input
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    placeholder="Status"
                    className="w-full border px-3 py-2 rounded"
                  />
                </>
              )}

              {editSection === "products" && (
                <>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Product Name"
                    className="w-full border px-3 py-2 rounded"
                  />
                  <input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Quantity"
                    className="w-full border px-3 py-2 rounded"
                  />
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="w-full border px-3 py-2 rounded"
                  />
                </>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManageDataSection;
