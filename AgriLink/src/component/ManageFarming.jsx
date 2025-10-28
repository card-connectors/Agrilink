import { useContext, useState } from "react";
import AddFarming from "./AddFarming";
import { AuthContext } from "../ContextFiles/AllContext";

const ManageFarming = () => {

  const { userId } = useContext(AuthContext); // user email


  const [farms, setFarms] = useState([
    { id: 1, crop: "Mixed Farming", type: "Mixed", experience: 5, available: true },
    { id: 2, crop: "Honey Bee", type: "Apiculture", experience: 3, available: true },
  ]);

  const [showModal, setShowModal] = useState(false);

  const markUnavailable = (id) => {
    setFarms((prev) =>
      prev.map((farm) =>
        farm.id === id ? { ...farm, available: false } : farm
      )
    );
  };

  const deleteFarm = (id) => {
    setFarms((prev) => prev.filter((farm) => farm.id !== id));
  };

  const addFarm = (newFarm) => {
    setFarms((prev) => [...prev, { ...newFarm, id: Date.now(), available: true }]);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Your Farming</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-6 py-2 rounded-lg text-lg hover:bg-green-600 transition"
        >
          + Add Farming Info
        </button>
      </div>

      {farms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {farms.map((farm) => (
            <div
              key={farm.id}
              className={`border p-4 rounded-lg shadow-sm hover:shadow-md transition ${farm.available ? "" : "bg-gray-100 opacity-70"
                }`}
            >
              <h2 className="text-xl font-semibold">{farm.type}</h2>
              <p>Type: {farm.type}</p>
              <p>Experience: {farm.experience} years</p>
              <p className={`mt-2 font-semibold ${farm.available ? "text-green-600" : "text-red-600"}`}>
                {farm.available ? "Available" : "Unavailable"}
              </p>

              <div className="flex gap-2 mt-3">
                {farm.available && (
                  <button
                    onClick={() => markUnavailable(farm.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Mark as Unavailable
                  </button>
                )}
                <button
                  onClick={() => deleteFarm(farm.id)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-16">
          <p className="text-gray-400 text-4xl font-bold mb-6">Nothing Here</p>
          <p className="text-gray-500 mb-6">Click the button above to add your farming info.</p>
        </div>
      )}

      {showModal && (
        <AddFarming onClose={() => setShowModal(false)} onAdd={addFarm} />
      )}
    </div>
  );
};

export default ManageFarming;
