// pages/ManageProducts.jsx
import { useContext, useState } from "react";
import AddProducts from "./AddProducts";
import { AuthContext } from "../ContextFiles/AllContext";

const ManageProducts = () => {

    const { userId } = useContext(AuthContext); // user email
  
  const [products, setProducts] = useState([
    { id: 1, name: "Raw Organic Honey", category: "Honey", minQuantity: 5, price: 200, available: true },
    { id: 2, name: "Organic Tomatoes", category: "Vegetables", minQuantity: 3, price: 30, available: true },
  ]);

  const [showModal, setShowModal] = useState(false);

  const markUnavailable = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, available: false } : product
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const addProduct = (newProduct) => {
    setProducts((prev) => [
      ...prev,
      { ...newProduct, id: Date.now(), available: true }
    ]);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Your Products</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-6 py-2 rounded-lg text-lg hover:bg-green-600 transition"
        >
          + Add Product
        </button>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className={`border p-4 rounded-lg shadow-sm hover:shadow-md transition ${
                product.available ? "" : "bg-gray-100 opacity-70"
              }`}
            >
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p>Category: {product.category}</p>
              <p>
                Min {product.minQuantity} kg at ₹{product.price}/kg
              </p>
              <p className={`mt-2 font-semibold ${product.available ? "text-green-600" : "text-red-600"}`}>
                {product.available ? "Available" : "Unavailable"}
              </p>

              <div className="flex gap-2 mt-3">
                {product.available && (
                  <button
                    onClick={() => markUnavailable(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Mark as Unavailable
                  </button>
                )}
                <button
                  onClick={() => deleteProduct(product.id)}
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
          <p className="text-gray-500 mb-6">Click the button above to add your products.</p>
        </div>
      )}

      {showModal && (
        <AddProducts onClose={() => setShowModal(false)} onAdd={addProduct} />
      )}
    </div>
  );
};

export default ManageProducts;
