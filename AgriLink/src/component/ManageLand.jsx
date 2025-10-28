// pages/ManageLand.jsx
import { useContext, useState } from "react";
import AddLand from "./AddLand";
import { AuthContext } from "../ContextFiles/AllContext";

const ManageLand = () => {
    const { userId } = useContext(AuthContext); // user email

  const [lands, setLands] = useState([
    { id: 1, name: "Green Farm", location: "Thanjavur", size: "2 acres", available: true },
  ]);

  const [showModal, setShowModal] = useState(false);

  const markUnavailable = (id) => {
    setLands((prev) =>
      prev.map((land) =>
        land.id === id ? { ...land, available: false } : land
      )
    );
  };

  const deleteLand = (id) => {
    setLands((prev) => prev.filter((land) => land.id !== id));
  };

  const addLand = (newLand) => {
    // Map modal fields to card fields
    setLands((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newLand.title,     // title from modal -> name on card
        size: `${newLand.area} acres`, // area from modal -> size on card
        location: newLand.location,
        available: true,
        photos: newLand.photos || [],
      },
    ]);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Your Land</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-6 py-2 rounded-lg text-lg hover:bg-green-600 transition"
        >
          + Add Land
        </button>
      </div>

      {lands.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lands.map((land) => (
            <div
              key={land.id}
              className={`border p-4 rounded-lg shadow-sm hover:shadow-md transition ${
                land.available ? "" : "bg-gray-100 opacity-70"
              }`}
            >
              <h2 className="text-xl font-semibold">{land.name}</h2>
              <p>Location: {land.location}</p>
              <p>Size: {land.size}</p>

              {land.photos && land.photos.length > 0 && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {land.photos.map((photo, idx) => (
                    <img
                      key={idx}
                      src={photo}
                      alt={`land-${idx}`}
                      className="w-full h-24 object-cover rounded"
                    />
                  ))}
                </div>
              )}

              <p className={`mt-2 font-semibold ${land.available ? "text-green-600" : "text-red-600"}`}>
                {land.available ? "Available" : "Unavailable"}
              </p>

              <div className="flex gap-2 mt-3">
                {land.available && (
                  <button
                    onClick={() => markUnavailable(land.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Mark as Unavailable
                  </button>
                )}
                <button
                  onClick={() => deleteLand(land.id)}
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
          <p className="text-gray-500 mb-6">Click the button above to add your land info.</p>
        </div>
      )}

      {/* Modal */}
      {showModal && <AddLand onClose={() => setShowModal(false)} onAdd={addLand} />}
    </div>
  );
};

export default ManageLand;
