import React, { useState } from 'react';

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('250g');

  const product = {
    name: "Raw Organic Honey",
    category: "Organic Honey",
    rating: 4.9,
    reviews: 320,
    price: 300,
    originalPrice: 400,
    discount: 25,
    inStock: true,
    stockCount: 60,
    deliveryDate: "Tomorrow, 3 PM - 5 PM",
    freeDelivery: true,
    warranty: "100% Pure Honey Guarantee",
    returnPolicy: "7 Days Returnable",

    images: [
      "https://nisargnutritions.com/cdn/shop/products/ajwain.jpg?v=1680748884",
      "https://i.etsystatic.com/23784133/r/il/c08811/3273966018/il_570xN.3273966018_mo0s.jpg",
      "https://kreateworld.in/cdn/shop/products/8b02c414-e58e-43dc-84ef-48b1bdc33230_1000x.png?v=1672989733"
    ],

    sizes: [
      { size: '250g', price: 120 },
      { size: '500g', price: 230 },
      { size: '1kg', price: 450 },
      { size: '2kg', price: 850 }
    ],

    description: "Premium raw organic honey sourced from wildflowers. Unprocessed and packed with natural enzymes, antioxidants, and nutrients. Perfect for consumption, baking, or as a natural sweetener.",

    seller: {
      name: "Saran Raj",
      rating: 4.9,
      verified: true
    }
  };

  const selectedSizeObj = product.sizes.find(size => size.size === selectedSize);
  const totalPrice = selectedSizeObj ? selectedSizeObj.price * quantity : product.price * quantity;

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) setQuantity(newQuantity);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Left - Images */}
            <div className="space-y-4">
              <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-2xl overflow-hidden">
                <img src={product.images[selectedImage]} alt={product.name} className="w-full h-96 object-cover rounded-2xl" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((img, idx) => (
                  <button key={idx} onClick={() => setSelectedImage(idx)} className={`aspect-w-1 aspect-h-1 bg-gray-200 rounded-xl overflow-hidden border-2 transition-all duration-200 ${selectedImage===idx?'border-green-500 ring-2 ring-green-200':'border-transparent hover:border-gray-300'}`}>
                    <img src={img} alt={`${product.name} ${idx+1}`} className="w-full h-24 object-cover rounded-xl hover:scale-105 transition-transform duration-200"/>
                  </button>
                ))}
              </div>
            </div>

            {/* Right - Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-green-600 font-medium">Seller: {product.seller.name}</p>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-5 h-5 ${i < Math.floor(product.rating)?'text-yellow-400':'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-gray-600">{product.rating} ({product.reviews} reviews)</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-3xl font-bold text-gray-900">₹{selectedSizeObj?.price || product.price}</span>
                  <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                  <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">{product.discount}% off</span>
                </div>
                <p className="text-sm text-gray-600">Inclusive of all taxes</p>

                {/* Size Selection */}
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Size</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((s) => (
                      <button key={s.size} onClick={() => setSelectedSize(s.size)} className={`px-4 py-2 border-2 rounded-lg font-medium transition-all duration-200 ${selectedSize===s.size?'border-green-500 bg-green-50 text-green-700':'border-gray-300 text-gray-700 hover:border-green-300'}`}>
                        {s.size} - ₹{s.price}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Quantity</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button onClick={() => handleQuantityChange(-1)} className="px-4 py-2 text-gray-600 hover:text-gray-800" disabled={quantity<=1}>-</button>
                      <span className="px-4 py-2 border-l border-r border-gray-300 min-w-12 text-center">{quantity}</span>
                      <button onClick={() => handleQuantityChange(1)} className="px-4 py-2 text-gray-600 hover:text-gray-800" disabled={quantity>=10}>+</button>
                    </div>
                    <span className="text-sm text-gray-500">Max 10 per customer</span>
                  </div>
                </div>

                {/* Total Price */}
                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-green-600">₹{totalPrice}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Inclusive of all taxes + FREE Shipping</p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 mt-4">
                  <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-200">
                    Place Order
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
