import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [addressSubmitted, setAddressSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
    const { userId } = useContext(AuthContext); // stores the userID



  const [deliveryAddress, setDeliveryAddress] = useState({
    name: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const product = {
    id: "HONEY1001",
    name: "Raw Forest Organic Honey",
    seller: "WildNectar",
    subtitle: "100% Pure, Unprocessed & Unfiltered",
    size: "500g Glass Jar",
    price: 899,
    discount: 25,
    image:
      "https://plus.unsplash.com/premium_photo-1726704133644-bd521a727cf8?auto=format&fit=crop&q=60&w=500",
    deliveryDate: "2 days",
    freeDelivery: false, // set to false → ₹50 default
  };

  const totalPrice = product.price * quantity;
  const deliveryCharge = product.freeDelivery ? 0 : 50; // ✅ default ₹50
  const finalTotal = (totalPrice + deliveryCharge).toFixed(2);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 500) {
      setQuantity(newQuantity);
    }
  };

  const handleConfirmOrder = () => {
    if (!addressSubmitted) {
      setErrorMessage(
        "⚠️ Please select or add a delivery address before confirming."
      );
      return;
    }

    setErrorMessage("");
    setOrderConfirmed(true);
  };

  const handleInputChange = (field, value) => {
    setDeliveryAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (
      !deliveryAddress.name ||
      !deliveryAddress.address ||
      !deliveryAddress.city ||
      !deliveryAddress.state ||
      !deliveryAddress.pincode ||
      !deliveryAddress.phone
    ) {
      alert("Please fill all required fields.");
      return;
    }
    setAddressSubmitted(true);
  };

  if (orderConfirmed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Thank You for Your Order!
            </h1>
            <p className="text-gray-600 mb-6">
              Your order has been placed successfully.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <div className="flex items-center space-x-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    {product.size} • Qty: {quantity}
                  </p>
                  <p className="text-sm font-semibold text-green-600">
                    ₹{finalTotal}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => navigate("/products")}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition duration-200"
              >
                Back to Products
              </button>
              <button
                onClick={() => navigate("/your-orders")}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
              >
                View Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 transition duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Place your Order</h1>
          <div className="w-20"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="flex items-start space-x-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    {product.name}
                  </h3>
                  <p className="text-green-600 text-sm mb-1">
                    Seller: {product.seller}
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    Size: {product.size}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(-1)}
                          className="px-3 py-2 text-gray-600 hover:text-gray-800"
                          disabled={quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-3 py-2 border-l border-r border-gray-300">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(1)}
                          className="px-3 py-2 text-gray-600 hover:text-gray-800"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{product.price} per kg
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Address (Single Form) */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Delivery Address
              </h2>
              <form onSubmit={handleAddressSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={deliveryAddress.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={deliveryAddress.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={deliveryAddress.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full md:col-span-2"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Landmark"
                    value={deliveryAddress.landmark}
                    onChange={(e) =>
                      handleInputChange("landmark", e.target.value)
                    }
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={deliveryAddress.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                    required
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={deliveryAddress.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={deliveryAddress.pincode}
                    onChange={(e) =>
                      handleInputChange("pincode", e.target.value)
                    }
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                    required
                  />
                </div>

                {!addressSubmitted ? (
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
                  >
                    Save Address
                  </button>
                ) : (
                  <p className="text-green-600 font-medium">
                    ✓ Address saved successfully
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Right Column - Order Total */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Total
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items ({quantity})</span>
                  <span className="text-gray-900">₹{totalPrice}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span
                    className={
                      product.freeDelivery ? "text-green-600" : "text-gray-900"
                    }
                  >
                    {product.freeDelivery ? "FREE" : `₹${deliveryCharge}`}
                  </span>
                </div>

                {addressSubmitted && (
                  <div className="border-t border-gray-200 pt-3 text-sm text-gray-700">
                    <p className="font-semibold mb-1">Deliver To:</p>
                    <p>{deliveryAddress.name}</p>
                    <p>
                      {deliveryAddress.address}, {deliveryAddress.city},{" "}
                      {deliveryAddress.state} - {deliveryAddress.pincode}
                    </p>
                    <p>📞 {deliveryAddress.phone}</p>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-gray-900">Total Amount</span>
                    <span className="text-green-600">₹{finalTotal}</span>
                  </div>
                </div>
              </div>

              {errorMessage && (
                <p className="text-red-600 font-medium my-3 text-sm">
                  {errorMessage}
                </p>
              )}

              <button
                onClick={handleConfirmOrder}
                className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 transition duration-200 mt-6"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
