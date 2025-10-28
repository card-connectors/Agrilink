import React, { useState } from 'react';

const PlaceOrder = () => {
  const [quantity, setQuantity] = useState(1);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false); // Set to false initially
  const [editedAddress, setEditedAddress] = useState({});
  const [newAddress, setNewAddress] = useState({
    type: "Home",
    name: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    phone: ""
  });

  // Premium organic honey product data
  const product = {
    id: "HONEY1001",
    name: "Raw Forest Organic Honey",
    seller: "WildNectar",
    subtitle: "100% Pure, Unprocessed & Unfiltered",
    size: "500g Glass Jar",
    price: 899,
    discount: 25,
    image: "https://plus.unsplash.com/premium_photo-1726704133644-bd521a727cf8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmF3JTIwb3JnYW5pYyUyMGhvbmV5fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",

    deliveryDate: "2 days",
  };

  // Empty addresses object since we removed home and office
  const [addresses, setAddresses] = useState({});

  // const selectedAddressData = addresses[selectedAddress];
  const totalPrice = product.price * quantity;
  const finalTotal = (totalPrice).toFixed(2);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 500) {
      setQuantity(newQuantity);
    }
  };

  const handleConfirmOrder = () => {
    setOrderConfirmed(true);
  };

  const handleEditAddress = (addressKey) => {
    setEditedAddress({ ...addresses[addressKey] });
    setIsEditingAddress(true);
  };

  const handleSaveAddress = () => {
    setAddresses(prev => ({
      ...prev,
      [selectedAddress]: editedAddress
    }));
    setIsEditingAddress(false);
  };

  const handleCancelEdit = () => {
    setIsEditingAddress(false);
    setEditedAddress({});
  };

  const handleInputChange = (field, value) => {
    setEditedAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNewAddressInputChange = (field, value) => {
    setNewAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddNewAddress = () => {
    const newKey = `address_${Date.now()}`;
    setAddresses(prev => ({
      ...prev,
      [newKey]: newAddress
    }));
    setSelectedAddress(newKey);
    setIsAddingNewAddress(false);
    setNewAddress({
      type: "Home",
      name: "",
      address: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      phone: ""
    });
  };

  const handleCancelNewAddress = () => {
    setIsAddingNewAddress(false);
    setNewAddress({
      type: "Home",
      name: "",
      address: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      phone: ""
    });
  };

  if (orderConfirmed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank You for Your Order!</h1>
            <p className="text-gray-600 mb-6">
              Your order has been placed successfully.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <div className="flex items-center space-x-3">
                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.size} • Qty: {quantity}</p>
                  <p className="text-sm font-semibold text-green-600">₹{totalPrice}</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => window.history.back()}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition duration-200"
              >
                Back to Products
              </button>
              <button
                onClick={() => window.location.href = '/orders'}
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
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Place your Order</h1>
          <div className="w-20"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="flex items-start space-x-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">{product.name}</h3>
                  <p className="text-green-600 text-sm mb-1">Seller: {product.seller}</p>
                  <p className="text-gray-600 text-sm mb-3">Size: {product.size}</p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(-1)}
                          className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                          disabled={quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-3 py-2 border-l border-r border-gray-300 min-w-8 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(1)}
                          className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-baseline gap-2 justify-end">
                        <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Delivery Address</h2>
                {!isEditingAddress && !isAddingNewAddress && Object.keys(addresses).length > 0 && (
                  <button
                    onClick={() => handleEditAddress(selectedAddress)}
                    className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Address
                  </button>
                )}
              </div>

              {isEditingAddress ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={editedAddress.name || ''}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={editedAddress.phone || ''}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        value={editedAddress.address || ''}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Landmark</label>
                      <input
                        type="text"
                        value={editedAddress.landmark || ''}
                        onChange={(e) => handleInputChange('landmark', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        value={editedAddress.city || ''}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        value={editedAddress.state || ''}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                      <input
                        type="text"
                        value={editedAddress.pincode || ''}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSaveAddress}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition duration-200"
                    >
                      Save Address
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : isAddingNewAddress ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
                      <select
                        value={newAddress.type}
                        onChange={(e) => handleNewAddressInputChange('type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="Home">Home</option>
                        <option value="Office">Office</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={newAddress.name}
                        onChange={(e) => handleNewAddressInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={newAddress.phone}
                        onChange={(e) => handleNewAddressInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        value={newAddress.address}
                        onChange={(e) => handleNewAddressInputChange('address', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter street address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Landmark</label>
                      <input
                        type="text"
                        value={newAddress.landmark}
                        onChange={(e) => handleNewAddressInputChange('landmark', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Nearby landmark"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        value={newAddress.city}
                        onChange={(e) => handleNewAddressInputChange('city', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        value={newAddress.state}
                        onChange={(e) => handleNewAddressInputChange('state', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter state"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                      <input
                        type="text"
                        value={newAddress.pincode}
                        onChange={(e) => handleNewAddressInputChange('pincode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter PIN code"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleAddNewAddress}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition duration-200"
                    >
                      Add Address
                    </button>
                    <button
                      onClick={handleCancelNewAddress}
                      className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {Object.keys(addresses).length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {Object.entries(addresses).map(([key, address]) => (
                        <div
                          key={key}
                          onClick={() => setSelectedAddress(key)}
                          className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                            selectedAddress === key
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-300 hover:border-green-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">{address.type}</span>
                            {selectedAddress === key && (
                              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <p className="text-sm text-gray-900 font-medium">{address.name}</p>
                          <p className="text-sm text-gray-600">{address.address}</p>
                          <p className="text-sm text-gray-600">{address.landmark}</p>
                          <p className="text-sm text-gray-600">
                            {address.city}, {address.state} - {address.pincode}
                          </p>
                          <p className="text-sm text-gray-600 mt-2">{address.phone}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No addresses added yet. Please add a delivery address.</p>
                    </div>
                  )}

                  {/* Only show Add New Address button when not in edit mode and no form is open */}
                  {!isEditingAddress && !isAddingNewAddress && (
                    <button 
                      onClick={() => setIsAddingNewAddress(true)}
                      className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add New Address
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Information</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Expected Delivery</span>
                  <span className="font-medium text-gray-900">{product.deliveryDate}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">
                    {product.freeDelivery ? 'FREE' : '₹50'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Total */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Total</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items ({quantity})</span>
                  <span className="text-gray-900">₹{totalPrice}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="text-green-600">
                    {product.freeDelivery ? 'FREE' : '₹50'}
                  </span>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-gray-900">Total Amount</span>
                    <span className="text-green-600">₹{finalTotal}</span>
                  </div>
                </div>
              </div>

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