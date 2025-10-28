import React, { useContext, useState } from "react";
import { AuthContext } from "../ContextFiles/AllContext";

const DeliveryPerson = () => {

    const { userId } = useContext(AuthContext); // user email


  const [activeTab, setActiveTab] = useState("deliveries"); // Assigned Deliveries as active tab

  // Sample delivery person data
  const deliveryPerson = {
    name: "Arun Kumar",
    employeeId: "DEL234567",
    completedDeliveries: 1247,
    experience: "3 years",  
    vehicle: "Hero Honda Splendor",
    vehicleNumber: "TN 09 AB 1234",
    phone: "+91 98765 43210",
    email: "arun.kumar@logistics.com",
    location: "Coimbatore, Tamil Nadu",
    joinedDate: "March 15, 2021",

    performance: {
      onTimeDelivery: "96%",
      customerSatisfaction: "4.8/5",
      averageRating: "4.8",
      completionRate: "98%",
    },

    todayStats: {
      assigned: 18,
      completed: 12,
      pending: 6,
      onTime: 11,
      delayed: 1,
    },



    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",

    };

  // Initial assigned deliveries
  const [assignedDeliveries, setAssignedDeliveries] = useState([
    {
      id: "ORD123456",
      customer: "Rajesh Farm Supplies",
      address: "123 GST Road, Coimbatore, Tamil Nadu - 641001",
      items: 3,
      estimatedTime: "30-45 mins",
      status: "pending",
      priority: "high",
      seller: {
        name: "Green Valley Farms",
        location: "Coimbatore Farm Market, East Zone",
        phone: "+91 98765 43210"
      },
      customerPhone: "+91 98765 43211",
      totalAmount: "1,250",
      paymentMethod: "Paid Online",
      deliveryType: "Express",
      products: [
        "Fresh Tomatoes - 5kg",
        "Organic Potatoes - 3kg",
        "Green Chillies - 1kg"
      ]
    },
    {
      id: "ORD123457",
      customer: "Priya Garden Center",
      address: "45 Mettupalayam Road, Coimbatore, Tamil Nadu - 641043",
      items: 5,
      estimatedTime: "1-2 hours",
      status: "pending",
      priority: "medium",
      seller: {
        name: "Suresh Organic Farms",
        location: "Organic Farming Zone, North Coimbatore",
        phone: "+91 98765 43212"
      },
      customerPhone: "+91 98765 43213",
      totalAmount: "2,150",
      paymentMethod: "Cash on Delivery",
      deliveryType: "Standard",
      products: [
        "Carrots - 4kg",
        "Onions - 5kg",
        "Cabbage - 2kg",
        "Cauliflower - 3pcs",
        "Spinach - 2kg"
      ]
    }
  ]);

  // Current deliveries (accepted and in progress)
  const [currentDeliveries, setCurrentDeliveries] = useState([
    {
      id: "ORD123458",
      customer: "Sunflower Agro",
      address: "789 Avinashi Road, Coimbatore, Tamil Nadu - 641037",
      items: 2,
      estimatedTime: "45-60 mins",
      status: "pickup", // pickup, in_transit, delivered
      priority: "high",
      seller: {
        name: "Fresh Harvest Farms",
        location: "Central Agricultural Market",
        phone: "+91 98765 43214"
      },
      customerPhone: "+91 98765 43215",
      totalAmount: "850",
      paymentMethod: "Paid Online",
      deliveryType: "Express",
      products: [
        "Bell Peppers - 3kg",
        "Brinjal - 2kg"
      ]
    }
  ]);

  // Function to handle delivery acceptance
  const acceptDelivery = (deliveryId) => {
    const delivery = assignedDeliveries.find(d => d.id === deliveryId);
    if (delivery) {
      // Remove from assigned deliveries
      setAssignedDeliveries(assignedDeliveries.filter(d => d.id !== deliveryId));
      // Add to current deliveries with status 'pickup'
      setCurrentDeliveries([...currentDeliveries, { ...delivery, status: 'pickup' }]);
    }
  };

  // Function to handle pickup
  const handlePickup = (deliveryId) => {
    setCurrentDeliveries(currentDeliveries.map(delivery =>
      delivery.id === deliveryId 
        ? { ...delivery, status: 'in_transit' }
        : delivery
    ));
  };

  // Function to handle delivery completion
  const handleDelivered = (deliveryId) => {
    setCurrentDeliveries(currentDeliveries.map(delivery =>
      delivery.id === deliveryId 
        ? { ...delivery, status: 'delivered' }
        : delivery
    ));
  };

  // Function to handle delivery denial
  const denyDelivery = (deliveryId) => {
    setAssignedDeliveries(assignedDeliveries.filter(d => d.id !== deliveryId));
  };

  // Function to contact seller/customer - No alert, just empty function for now
  const contactPerson = () => {
    // Empty function - will be implemented later
    // You can add your contact logic here when ready
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <div className="flex items-center">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  Logistics
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="shrink-0 h-5 w-5 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <a href="#" className="ml-4 text-gray-400 hover:text-gray-500">
                  Delivery Team
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="shrink-0 h-5 w-5 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <a href="#" className="ml-4 text-gray-400 hover:text-gray-500">
                  Coimbatore
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="shrink-0 h-5 w-5 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <span className="ml-4 text-blue-600 font-medium">
                  {deliveryPerson.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Left Side - Profile & Stats */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    src={deliveryPerson.image}
                    alt={deliveryPerson.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 mx-auto"
                  />
                  <div className="absolute bottom-2 right-2 bg-green-500 rounded-full p-1 border-2 border-white">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mt-4">
                  {deliveryPerson.name}
                </h1>
                <p className="text-gray-600">Delivery Executive</p>
              </div>

              {/* Verification Badge */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center">
                  <div className="shrink-0">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      Verified Delivery Partner
                    </h3>
                    <p className="text-sm text-blue-600">
                      Background verified and trained
                    </p>
                  </div>
                </div>
              </div>

              {/* Today's Stats */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Today's Performance
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {currentDeliveries.filter(d => d.status === 'delivered').length}
                    </div>
                    <div className="text-sm text-gray-500">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {assignedDeliveries.length + currentDeliveries.filter(d => d.status !== 'delivered').length}
                    </div>
                    <div className="text-sm text-gray-500">Pending</div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-gray-900">
                      {deliveryPerson.phone}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-gray-900">
                      {deliveryPerson.email}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-gray-900">
                      {deliveryPerson.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Details & Performance */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {["profile", "deliveries"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {tab === "profile" && `Current Deliveries (${currentDeliveries.length})`}
                      {tab === "deliveries" && `Assigned Deliveries (${assignedDeliveries.length})`}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              {activeTab === "deliveries" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Assigned Deliveries
                    </h3>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {assignedDeliveries.length} Deliveries
                    </span>
                  </div>
                  
                  {assignedDeliveries.map((delivery) => (
                    <div
                      key={delivery.id}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
                    >
                      {/* Order ID Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">
                            Order #{delivery.id}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            Placed on {new Date().toLocaleDateString()}
                          </p>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                          Pending Acceptance
                        </span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                        {/* Seller Information */}
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="bg-green-50 p-3 rounded-lg mr-4">
                              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h5 className="font-semibold text-gray-900 mb-2">Seller Information</h5>
                              <div className="space-y-2 text-sm">
                                <div className="flex gap-4">
                                  <span className="text-gray-600">Name:</span>
                                  <span className="font-medium text-gray-900">{delivery.seller.name}</span>
                                </div>
                                <div className="flex gap-4">
                                  <span className="text-gray-600">Location:</span>
                                  <span className="font-medium text-gray-900">{delivery.seller.location}</span>
                                </div>
                                <div className="flex gap-4">
                                  <span className="text-gray-600">Contact:</span>
                                  <span className="font-medium text-gray-900">{delivery.seller.phone}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Customer Information */}
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="bg-blue-50 p-3 rounded-lg mr-4">
                              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h5 className="font-semibold text-gray-900 mb-2">Customer Information</h5>
                              <div className="space-y-2 text-sm">
                                <div className="flex gap-4">
                                  <span className="text-gray-600">Name:</span>
                                  <span className="font-medium text-gray-900">{delivery.customer}</span>
                                </div>
                                <div className="flex gap-4">
                                  <span className="text-gray-600">Address:</span>
                                  <span className="font-medium text-gray-900">{delivery.address}</span>
                                </div>
                                <div className="flex gap-4">
                                  <span className="text-gray-600">Phone:</span>
                                  <span className="font-medium text-gray-900">{delivery.customerPhone}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Order Details */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h5 className="font-semibold text-gray-900 mb-3">Order Details</h5>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Items:</span>
                            <p className="font-medium text-gray-900">{delivery.items} products</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Total Amount:</span>
                            <p className="font-medium text-gray-900">₹{delivery.totalAmount}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Payment:</span>
                            <p className="font-medium text-gray-900">{delivery.paymentMethod}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Delivery Type:</span>
                            <p className="font-medium text-gray-900">{delivery.deliveryType}</p>
                          </div>
                        </div>
                        
                        {/* Products List */}
                        <div className="mt-3">
                          <span className="text-gray-600 text-sm">Products:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {delivery.products.map((product, index) => (
                              <span key={index} className="bg-white px-2 py-1 rounded text-xs text-gray-700 border">
                                {product}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => denyDelivery(delivery.id)}
                          className="px-6 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors duration-200 font-medium"
                        >
                          Deny
                        </button>
                        <button
                          onClick={() => acceptDelivery(delivery.id)}
                          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                        >
                          Accept 
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "profile" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Current Deliveries
                  </h3>
                  {currentDeliveries.map((delivery) => (
                    <div
                      key={delivery.id}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
                    >
                      {/* Order ID Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">
                            Order #{delivery.id}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            Accepted on {new Date().toLocaleDateString()}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            delivery.status === 'pickup'
                              ? 'bg-yellow-100 text-yellow-800'
                              : delivery.status === 'in_transit'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {delivery.status === 'pickup'
                            ? 'Ready for Pickup'
                            : delivery.status === 'in_transit'
                            ? 'On the Way'
                            : 'Delivered'}
                        </span>
                      </div>

                      {/* Dynamic Content based on status */}
                      {delivery.status === 'pickup' && (
                        <>
                          {/* Seller Information Only */}
                          <div className="mb-4">
                            <div className="flex items-start">
                              <div className="bg-green-50 p-3 rounded-lg mr-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <h5 className="font-semibold text-gray-900 mb-2">Pickup From Seller</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Seller Name:</span>
                                    <span className="font-medium text-gray-900">{delivery.seller.name}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Location:</span>
                                    <span className="font-medium text-gray-900">{delivery.seller.location}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Contact:</span>
                                    <span className="font-medium text-gray-900">{delivery.seller.phone}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons for Pickup Stage */}
                          <div className="flex justify-end space-x-3">
                            <button
                              onClick={contactPerson}
                              className="px-6 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium"
                            >
                              Contact Seller
                            </button>
                            <button
                              onClick={() => handlePickup(delivery.id)}
                              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                            >
                              Picked Up
                            </button>
                          </div>
                        </>
                      )}

                      {delivery.status === 'in_transit' && (
                        <>
                          {/* Customer Information Only */}
                          <div className="mb-4">
                            <div className="flex items-start">
                              <div className="bg-blue-50 p-3 rounded-lg mr-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <h5 className="font-semibold text-gray-900 mb-2">Deliver to Customer</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Customer Name:</span>
                                    <span className="font-medium text-gray-900">{delivery.customer}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Address:</span>
                                    <span className="font-medium text-gray-900">{delivery.address}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Contact:</span>
                                    <span className="font-medium text-gray-900">{delivery.customerPhone}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons for In Transit Stage */}
                          <div className="flex justify-end space-x-3">
                            <button
                              onClick={contactPerson}
                              className="px-6 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium"
                            >
                              Contact Customer
                            </button>
                            <button
                              onClick={() => handleDelivered(delivery.id)}
                              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                            >
                              Delivered
                            </button>
                          </div>
                        </>
                      )}

                      {delivery.status === 'delivered' && (
                        <div className="text-center py-8">
                          <div className="bg-green-50 rounded-full p-3 inline-flex mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h5 className="font-semibold text-gray-900 mb-2">Delivery Completed</h5>
                          <p className="text-gray-600">Order #{delivery.id} has been successfully delivered to {delivery.customer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPerson;