import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, EntityContext } from '../ContextFiles/AllContext';

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(5);
  const navigate = useNavigate();
    const { userId } = useContext(AuthContext); // stores the userID
const {productId} = useContext(EntityContext); //for productId

  // ✅ Product data
  const product = {
    name: "Raw Organic Honey",
    category: "Organic Honey",
    price: 450,               // Single price per unit
    minimumOrder: 5,          // Minimum bulk order quantity
    images: [
      "https://nisargnutritions.com/cdn/shop/products/ajwain.jpg?v=1680748884",
      "https://i.etsystatic.com/23784133/r/il/c08811/3273966018/il_570xN.3273966018_mo0s.jpg",
      "https://kreateworld.in/cdn/shop/products/8b02c414-e58e-43dc-84ef-48b1bdc33230_1000x.png?v=1672989733"
    ],
    seller: {
      name: "Saran Raj",
    },
    description:
      "Premium raw organic honey sourced from wildflowers. Unprocessed and packed with natural enzymes, antioxidants, and nutrients. Perfect for consumption, baking, or as a natural sweetener."
  };

  const totalPrice = product.price * quantity;

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= product.minimumOrder && newQuantity <= 500) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            
            {/* Left - Images */}
            <div className="space-y-4">
              <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-2xl overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-2xl"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-w-1 aspect-h-1 bg-gray-200 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === idx
                        ? 'border-green-500 ring-2 ring-green-200'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-24 object-cover rounded-xl hover:scale-105 transition-transform duration-200"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right - Details */}
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-green-600 font-medium">
                Seller: {product.seller.name}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price}
                </span>
                <span className="text-gray-600">per Kg/L</span>
              </div>

              {/* ✅ Minimum Order Info (Moved above description) */}
              <p className="text-gray-800 font-medium mt-1">
                Minimum Order: <span className="text-green-700 font-semibold">{product.minimumOrder} Kg/L</span>
              </p>

              {/* Description */}
              <p className="text-gray-700">
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quantity</h3>
                <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    disabled={quantity <= product.minimumOrder}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-l border-r border-gray-300 min-w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    disabled={quantity >= 500}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Price */}
              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-green-600">₹{totalPrice}</span>
                </div>
              </div>

              {/* Button */}
              <button
                onClick={() => navigate("/place-order")}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
